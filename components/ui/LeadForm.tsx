'use client'

import { useState } from 'react'
import { doctor } from '@/lib/data'

interface LeadFormProps {
  specialty?: string
  variant?: 'light' | 'dark' | 'gold'
  compact?: boolean
}

const specialtyOptions = [
  'Joelho (LCA, Menisco, Artrose)',
  'Coluna Vertebral (Hérnia, Estenose)',
  'Ombro e Cotovelo',
  'Quadril (Artrose, FAI)',
  'Pé e Tornozelo',
  'Mãos e Punhos',
  'Ortopedia Preventiva',
  'Medicina Regenerativa (PRP, BMAC)',
  'Cirurgia Minimamente Invasiva',
  'Outro / Avaliação Geral',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm({ specialty, variant = 'light', compact = false }: LeadFormProps) {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    celular: '',
    email: '',
    especialidade: specialty || '',
    mensagem: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.celular || !form.especialidade) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Falha ao enviar')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Não foi possível enviar. Tente via WhatsApp.')
    }
  }

  // ── Style tokens by variant ──────────────────────────────
  const isDark = variant === 'dark'
  const isGold = variant === 'gold'

  const cardBg = isDark
    ? 'bg-white/5 border-white/10 backdrop-blur-sm'
    : isGold
    ? 'bg-[#0E2A1A] border-[#C9A84C]/20'
    : 'bg-white border-[#E4E9E2] shadow-[0_4px_40px_rgba(14,42,26,0.08)]'

  const labelColor = isDark || isGold ? 'text-white/70' : 'text-[#4A6355]'
  const inputClass = isDark || isGold
    ? 'bg-white/8 border-white/15 text-white placeholder-white/30 focus:border-[#C9A84C]/60 focus:bg-white/12'
    : 'bg-[#F9FAF8] border-[#E4E9E2] text-[#0E2A1A] placeholder-[#8FA89A] focus:border-[#C9A84C] focus:bg-white'
  const titleColor = isDark || isGold ? 'text-white' : 'text-[#0E2A1A]'
  const subColor = isDark || isGold ? 'text-white/55' : 'text-[#4A6355]'

  const inputBase = `w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all duration-200 ${inputClass}`

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border p-8 text-center ${cardBg}`}>
        <div className="text-4xl mb-4">🎉</div>
        <h3 className={`font-head text-xl font-semibold mb-2 ${titleColor}`}>
          Recebemos sua solicitação!
        </h3>
        <p className={`text-sm mb-6 ${subColor}`}>
          Em breve nossa equipe entrará em contato. Você também pode nos chamar agora no WhatsApp.
        </p>
        <a
          href={`https://wa.me/${doctor.phones.whatsapp}?text=Ol%C3%A1!%20Quero%20agendar%20uma%20consulta%20com%20o%20Dr.%20Andr%C3%A9.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all"
        >
          💬 Chamar no WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border ${cardBg} ${compact ? 'p-6' : 'p-8'}`}>
      {!compact && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-px bg-[#C9A84C]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Agendamento</span>
          </div>
          <h3 className={`font-head text-xl font-semibold ${titleColor}`}>
            Agende sua consulta
          </h3>
          <p className={`text-sm mt-1 ${subColor}`}>
            Preencha e entraremos em contato em até 1h útil.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome + Sobrenome */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Nome *</label>
            <input
              type="text"
              value={form.nome}
              onChange={e => set('nome', e.target.value)}
              placeholder="João"
              required
              className={inputBase}
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Sobrenome</label>
            <input
              type="text"
              value={form.sobrenome}
              onChange={e => set('sobrenome', e.target.value)}
              placeholder="Silva"
              className={inputBase}
            />
          </div>
        </div>

        {/* Celular */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>WhatsApp / Celular *</label>
          <input
            type="tel"
            value={form.celular}
            onChange={e => set('celular', e.target.value)}
            placeholder="(12) 99999-9999"
            required
            className={inputBase}
          />
        </div>

        {/* Email */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="joao@email.com"
            className={inputBase}
          />
        </div>

        {/* Especialidade */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Especialidade / Motivo *</label>
          <select
            value={form.especialidade}
            onChange={e => set('especialidade', e.target.value)}
            required
            className={`${inputBase} cursor-pointer`}
          >
            <option value="">Selecione uma opção...</option>
            {specialtyOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Mensagem */}
        {!compact && (
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Descreva brevemente sua queixa</label>
            <textarea
              value={form.mensagem}
              onChange={e => set('mensagem', e.target.value)}
              placeholder="Ex: Dor no joelho há 3 meses, piora ao subir escadas..."
              rows={3}
              className={`${inputBase} resize-none`}
            />
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <p className="text-red-400 text-xs text-center">{errorMsg}</p>
        )}

        {/* CTA */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-xl bg-[#C9A84C] text-[#0E2A1A] font-bold text-sm shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Enviando...
            </span>
          ) : 'Solicitar Consulta →'}
        </button>

        {/* Disclaimer */}
        <p className={`text-center text-[10px] ${subColor}`}>
          Seus dados são protegidos · LGPD · Retorno em até 1h útil
        </p>

        {/* WhatsApp alt */}
        <div className="flex items-center gap-3">
          <div className={`flex-1 h-px ${isDark || isGold ? 'bg-white/10' : 'bg-[#E4E9E2]'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${subColor}`}>ou</span>
          <div className={`flex-1 h-px ${isDark || isGold ? 'bg-white/10' : 'bg-[#E4E9E2]'}`} />
        </div>
        <a
          href={`https://wa.me/${doctor.phones.whatsapp}?text=Ol%C3%A1!%20Vi%20o%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/20 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chamar no WhatsApp
        </a>
      </form>
    </div>
  )
}
