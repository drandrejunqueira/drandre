import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, sobrenome, celular, email, especialidade, mensagem } = body

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
    // source: 'google_organic' = visita orgânica ao site (enum válido)
    // utm_source: identifica que veio especificamente do site dr-andre
    const rows = await sql`
      INSERT INTO leads (
        name, phone, email,
        status, source,
        specialty, complaint,
        utm_source,
        created_at, updated_at
      )
      VALUES (
        ${fullName},
        ${celular},
        ${email || null},
        'new',
        'google_organic',
        ${especialidade},
        ${complaint},
        'site-dr-andre',
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
      const msg =
        `🔔 *Novo Lead no CRM*\n\n` +
        `👤 *${fullName}*\n` +
        `📱 ${celular}\n` +
        `📌 Origem: Site Dr. André — ${especialidade}\n\n` +
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
