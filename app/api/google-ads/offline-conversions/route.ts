import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { neon } from '@neondatabase/serverless'

/**
 * Feed de conversões offline para o Google Ads.
 *
 * O Google Ads importa este CSV em agenda (Metas > Conversões > Uploads >
 * Programações > URL HTTPS). Cada lead do CRM que chegou a "consulta agendada"
 * (ou além) e tem um ID de clique do Google vira uma conversão atribuída ao
 * clique original — fechando o ciclo que o site sozinho não consegue medir.
 *
 * Regras:
 * - protegido por OFFLINE_CONVERSIONS_KEY (503 se não definida): o Google usa HTTP Basic
 *   (qualquer usuário, senha = chave); para testes manuais também vale ?key=…;
 * - a hora da conversão é congelada em tracking_data.ads_conversion_time na
 *   primeira exportação, para reuploads não contarem a mesma consulta duas vezes;
 * - só leads dos últimos 90 dias (janela de conversão do clique).
 */

export const dynamic = 'force-dynamic'

const CONVERSION_NAME = 'Consulta agendada (CRM)'
const CONVERTED_STATUSES = ['scheduled', 'attended', 'active_patient']
const LOOKBACK_DAYS = 90
const TIMEZONE_OFFSET = '-03:00'

interface LeadRow {
  id: number
  status: string
  phone: string | null
  converted_at: string | null
  updated_at: string
  tracking_data: Record<string, string> | null
}

function keyMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Chave vinda do Basic Auth (Central de Dados do Google Ads) ou de ?key= (teste manual). */
function providedKey(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') ?? ''
  if (auth.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8')
    const separator = decoded.indexOf(':')
    return separator >= 0 ? decoded.slice(separator + 1) : decoded
  }
  return req.nextUrl.searchParams.get('key')
}

/** "2026-09-16 14:05:00-03:00" — formato aceito pelo upload do Google Ads. */
function formatConversionTime(iso: string): string {
  const d = new Date(iso)
  const local = new Date(d.getTime() - 3 * 60 * 60 * 1000) // UTC → Brasília
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())} ` +
    `${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:${pad(local.getUTCSeconds())}${TIMEZONE_OFFSET}`
  )
}

/** Telefone em E.164 (+55…): o Google usa para conversões otimizadas para leads. */
function toE164(phone: string | null): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10 || digits.length === 11) return `+55${digits}`
  if (digits.length === 12 || digits.length === 13) return `+${digits}`
  return ''
}

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export async function GET(req: NextRequest) {
  const expectedKey = process.env.OFFLINE_CONVERSIONS_KEY
  if (!expectedKey) {
    console.error('OFFLINE_CONVERSIONS_KEY não configurada')
    return NextResponse.json({ error: 'Feed não configurado' }, { status: 503 })
  }
  if (!keyMatches(providedKey(req), expectedKey)) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="offline-conversions"' } }
    )
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('DATABASE_URL não configurada')
    return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 })
  }

  try {
    const sql = neon(dbUrl)
    const rows = (await sql`
      SELECT id, status, phone, converted_at, updated_at, tracking_data
      FROM leads
      WHERE status::text = ANY(${CONVERTED_STATUSES}::text[])
        AND created_at > NOW() - make_interval(days => ${LOOKBACK_DAYS})
        AND tracking_data IS NOT NULL
        AND (
          tracking_data ? 'gclid' OR tracking_data ? 'gbraid' OR tracking_data ? 'wbraid'
        )
      ORDER BY id
    `) as LeadRow[]

    const lines: string[] = [
      `Parameters:TimeZone=${TIMEZONE_OFFSET.replace(':', '')};`,
      'Google Click ID,GBRAID,WBRAID,Phone Number,Conversion Name,Conversion Time,Conversion Value,Conversion Currency',
    ]

    for (const lead of rows) {
      const tracking = lead.tracking_data ?? {}
      let conversionTime = tracking.ads_conversion_time

      // Congela a hora na primeira exportação: reuploads ficam idempotentes no Google Ads.
      if (!conversionTime) {
        conversionTime = formatConversionTime(lead.converted_at ?? lead.updated_at)
        await sql`
          UPDATE leads
          SET tracking_data = tracking_data || jsonb_build_object('ads_conversion_time', ${conversionTime}::text)
          WHERE id = ${lead.id}
        `
      }

      lines.push(
        [
          tracking.gclid ?? '',
          tracking.gbraid ?? '',
          tracking.wbraid ?? '',
          toE164(lead.phone),
          CONVERSION_NAME,
          conversionTime,
          '',
          'BRL',
        ]
          .map(csvCell)
          .join(',')
      )
    }

    return new NextResponse(lines.join('\n') + '\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Conversions': String(rows.length),
      },
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Offline conversions feed error:', err.message)
    return NextResponse.json({ error: 'Erro ao gerar feed', message: err.message }, { status: 500 })
  }
}
