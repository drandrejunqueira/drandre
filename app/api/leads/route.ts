import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

/** Valores de utm_medium que caracterizam mídia paga. */
const PAID_MEDIUMS = ['cpc', 'ppc', 'paid', 'paidsearch', 'paid_search', 'cpm', 'display']

/**
 * Traduz a atribuição capturada no navegador para o enum lead_source do CRM.
 * Os IDs de clique são o sinal mais confiável — vêm direto da plataforma e não
 * dependem de o anúncio estar com as UTMs corretas.
 */
function resolveLeadSource(attr: Record<string, string>): string {
  if (attr.gclid || attr.gbraid || attr.wbraid || attr.gad_source) return 'google_ads'
  if (attr.fbclid) return 'meta_ads'

  const medium = (attr.utm_medium || '').toLowerCase()
  const source = (attr.utm_source || '').toLowerCase()
  const isPaid = PAID_MEDIUMS.includes(medium)
  const isMeta =
    source.includes('facebook') || source.includes('instagram') || source.includes('meta')

  if (isPaid && source.includes('google')) return 'google_ads'
  if (isPaid && isMeta) return 'meta_ads'
  if (source.includes('instagram')) return 'instagram_organic'
  if (source.includes('facebook')) return 'facebook_organic'
  return 'google_organic'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, sobrenome, celular, email, especialidade, mensagem, attribution } = body

    const attr: Record<string, string> =
      attribution && typeof attribution === 'object' ? attribution : {}
    const leadSource = resolveLeadSource(attr)
    const utmSource = attr.utm_source || 'site-dr-andre'
    const utmCampaign = attr.utm_campaign || null

    // Validação básica
    if (!nome || !celular || !especialidade) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      console.error('DATABASE_URL não configurada')
      return NextResponse.json({ error: 'Banco de dados não configurado' }, { status: 500 })
    }

    const fullName = `${nome} ${sobrenome || ''}`.trim()
    const complaint = mensagem
      ? `${mensagem}\n\n(Enviado via Site Dr. André)`
      : '(Enviado via Site Dr. André)'

    const sql = neon(dbUrl)

    // 1. Inserir Lead no banco
    // source / utm_*: derivados da atribuição real da sessão (ver resolveLeadSource).
    const rows = await sql`
      INSERT INTO leads (
        name, phone, email,
        status, source,
        specialty, complaint,
        utm_source, utm_campaign,
        created_at, updated_at
      )
      VALUES (
        ${fullName},
        ${celular},
        ${email || null},
        'new',
        ${leadSource},
        ${especialidade},
        ${complaint},
        ${utmSource},
        ${utmCampaign},
        NOW(), NOW()
      )
      RETURNING id
    `

    const leadId = rows[0]?.id

    // 2. Buscar config para notificação WhatsApp
    let settings: Record<string, string> | null = null
    try {
      const cfgRows = await sql`
        SELECT
          evolution_api_url,
          evolution_api_key,
          evolution_instance,
          notify_new_lead_number
        FROM clinic_settings
        WHERE id = 1
        LIMIT 1
      `
      settings = (cfgRows[0] as Record<string, string>) ?? null
    } catch (err) {
      console.warn('Não foi possível buscar clinic_settings:', err)
    }

    // 3. Enviar notificação WhatsApp se configurado
    if (
      settings?.evolution_api_url &&
      settings?.evolution_api_key &&
      settings?.evolution_instance &&
      settings?.notify_new_lead_number
    ) {
      const campanha = utmCampaign ? `\n🎯 Campanha: ${utmCampaign}` : ''
      const msg =
        `🔔 *Novo Lead no CRM*\n\n` +
        `👤 *${fullName}*\n` +
        `📱 ${celular}\n` +
        `📌 Origem: Site Dr. André — ${especialidade}\n` +
        `📊 Canal: ${leadSource}${campanha}\n\n` +
        `Acesse o sistema para acompanhar.`

      try {
        await fetch(
          `${settings.evolution_api_url}/message/sendText/${settings.evolution_instance}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: settings.evolution_api_key,
            },
            body: JSON.stringify({
              number: settings.notify_new_lead_number.replace(/\D/g, ''),
              text: msg,
            }),
          }
        )
      } catch (err) {
        console.error('Erro ao enviar WhatsApp (non-blocking):', err)
      }
    }

    return NextResponse.json({ ok: true, leadId }, { status: 201 })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Lead API Error:', err.message)
    return NextResponse.json(
      { error: 'Erro ao processar lead', message: err.message },
      { status: 500 }
    )
  }
}
