'use client'

import { useId, useState } from 'react'
import { doctor } from '@/lib/data'
import { getAttribution, pushEvent } from '@/lib/tracking'
import { WhatsAppIcon } from '@/components/whatsapp/WhatsAppIcon'

interface Props {
  /** Valor gravado no CRM e enviado ao GA4 (specialty). */
  formSpecialty: string
  /** Identifica a posição do formulário na página (form_location). */
  location: 'hero' | 'final'
  /** Opções do campo "principal queixa". */
  complaints: string[]
  variant?: 'light' | 'dark'
}

type Status = 'idle' | 'loading' | 'success' | 'error'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length > 0) return `(${digits}`
  return ''
}

/**
 * Formulário curto da LP: 3 campos, sem e-mail, sem mensagem livre.
 * Cada campo a menos no mobile é conversão a mais — o resto a equipe pergunta no retorno.
 */
export default function LpLeadForm({
  formSpecialty,
  location,
  complaints,
  variant = 'light',
}: Props) {
  const id = useId()
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')
  const [queixa, setQueixa] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isDark = variant === 'dark'
  const inputClass = isDark
    ? 'bg-white/8 border-white/15 text-white placeholder-white/35 focus:border-gold/70 focus:bg-white/12'
    : 'bg-off-white border-border text-green placeholder-text-soft focus:border-gold focus:bg-white'
  const labelClass = isDark ? 'text-white/70' : 'text-text-mid'
  const inputBase = `w-full px-4 py-3.5 rounded-xl border text-base font-medium outline-none transition-all duration-200 ${inputClass}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || celular.replace(/\D/g, '').length < 10) return

    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          sobrenome: '',
          celular,
          email: '',
          especialidade: formSpecialty,
          mensagem: queixa ? `Principal queixa: ${queixa}` : '',
          attribution: getAttribution(),
        }),
      })
      if (!res.ok) throw new Error(`CRM respondeu ${res.status}`)

      pushEvent('generate_lead', {
        contact_method: 'formulario',
        form_location: `lp_${location}`,
        specialty: formSpecialty,
      })
      setStatus('success')
    } catch (error) {
      console.error('[lp-form] falha ao enviar lead', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    const text = `Olá! Meu nome é ${nome.trim()}. Acabei de pedir um agendamento pelo site (${formSpecialty}).`
    return (
      <div
        className={`rounded-3xl border p-7 text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-border shadow-card-md'}`}
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3
          className={`font-head text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-green'}`}
        >
          Pedido recebido, {nome.trim().split(' ')[0]}!
        </h3>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-text-mid'}`}>
          A equipe do Dr. André vai te chamar no WhatsApp em horário comercial. Se preferir, adiante
          a conversa agora:
        </p>
        <a
          href={`https://wa.me/${doctor.phones.whatsapp}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-skip-tracking
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-wpp hover:-translate-y-0.5 transition-all"
        >
          <WhatsAppIcon size={18} />
          Falar agora no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-3xl border p-6 sm:p-7 ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-sm' : 'bg-white border-border shadow-card-md'}`}
    >
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-4 h-px bg-gold" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-gold">
            Agendamento
          </span>
        </div>
        <h3
          className={`font-head text-2xl font-semibold leading-tight ${isDark ? 'text-white' : 'text-green'}`}
        >
          Peça sua consulta
        </h3>
        <p className={`text-sm mt-1 ${isDark ? 'text-white/55' : 'text-text-mid'}`}>
          Retornamos pelo WhatsApp com horários disponíveis.
        </p>
      </div>

      <div className="space-y-3.5">
        <div>
          <label
            htmlFor={`${id}-nome`}
            className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${labelClass}`}
          >
            Nome
          </label>
          <input
            id={`${id}-nome`}
            type="text"
            autoComplete="name"
            required
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={inputBase}
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-celular`}
            className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${labelClass}`}
          >
            WhatsApp
          </label>
          <input
            id={`${id}-celular`}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            required
            placeholder="(12) 99999-9999"
            value={celular}
            onChange={(e) => setCelular(formatPhone(e.target.value))}
            className={inputBase}
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-queixa`}
            className={`block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${labelClass}`}
          >
            Principal queixa{' '}
            <span className="normal-case font-medium tracking-normal opacity-70">(opcional)</span>
          </label>
          <div className="relative">
            <select
              id={`${id}-queixa`}
              value={queixa}
              onChange={(e) => setQueixa(e.target.value)}
              className={`${inputBase} appearance-none pr-11`}
            >
              <option value="">Selecione…</option>
              {complaints.map((c) => (
                <option key={c} value={c} className="text-green">
                  {c}
                </option>
              ))}
            </select>
            <svg
              className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-text-soft'}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {status === 'error' && (
          <p role="alert" className="text-xs text-red-500 text-center font-medium">
            Não foi possível enviar. Ligue para {doctor.phones.consultorio} ou tente de novo.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-green font-bold text-base
                     shadow-gold hover:-translate-y-0.5 active:translate-y-0 transition-all
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === 'loading' ? 'Enviando…' : 'Quero agendar minha consulta'}
        </button>

        <p
          className={`text-[11px] text-center leading-relaxed ${isDark ? 'text-white/40' : 'text-text-soft'}`}
        >
          🔒 Seus dados ficam protegidos (LGPD). Sem spam — só o contato para agendar.
        </p>
      </div>
    </form>
  )
}
