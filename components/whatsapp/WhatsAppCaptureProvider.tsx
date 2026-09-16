'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { doctor } from '@/lib/data'
import { getAttribution, leadUserData, pushEvent } from '@/lib/tracking'
import { WhatsAppIcon } from './WhatsAppIcon'

/**
 * Captura de lead antes de abrir o WhatsApp.
 *
 * Todo CTA de WhatsApp do site abre este modal (nome + celular). O lead é salvo
 * no CRM, o evento `generate_lead` é disparado e só então o visitante é levado
 * para a conversa. Assim a conversão medida no Google Ads é um lead real, e não
 * um toque em link — e o contato fica registrado mesmo se a pessoa não mandar
 * mensagem.
 */

export interface OpenOptions {
  /** Especialidade gravada no CRM (ex.: "Joelho"). Padrão: "WhatsApp". */
  specialty?: string
  /** Onde o CTA estava (ex.: "hero_lp_joelho"). Vai para o GA4 como form_location. */
  source?: string
}

interface CaptureContextValue {
  open: (options?: OpenOptions) => void
  close: () => void
}

const CaptureContext = createContext<CaptureContextValue | null>(null)

export function useWhatsAppCapture(): CaptureContextValue {
  const ctx = useContext(CaptureContext)
  if (!ctx) throw new Error('useWhatsAppCapture precisa estar dentro de WhatsAppCaptureProvider')
  return ctx
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const REDIRECT_DELAY_MS = 800

/** Formata celular BR enquanto digita: (XX) XXXXX-XXXX */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length > 0) return `(${digits}`
  return ''
}

function buildWhatsAppUrl(nome: string, specialty?: string): string {
  const assunto = specialty && specialty !== 'WhatsApp' ? ` sobre ${specialty.toLowerCase()}` : ''
  const text = `Olá! Meu nome é ${nome}. Gostaria de agendar uma consulta com o Dr. André${assunto}.`
  return `https://api.whatsapp.com/send?phone=${doctor.phones.whatsapp}&text=${encodeURIComponent(text)}`
}

export function WhatsAppCaptureProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<OpenOptions | null>(null)
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const nameRef = useRef<HTMLInputElement>(null)

  const isOpen = options !== null

  const open = useCallback((opts: OpenOptions = {}) => {
    setStatus('idle')
    setOptions(opts)
  }, [])

  const close = useCallback(() => setOptions(null), [])

  // Foco no primeiro campo, Escape fecha, trava o scroll do fundo.
  useEffect(() => {
    if (!isOpen) return
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, close])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || celular.replace(/\D/g, '').length < 10) return

    const specialty = options?.specialty || 'WhatsApp'
    const source = options?.source || 'whatsapp_cta'
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
          especialidade: specialty,
          mensagem: `Contato via WhatsApp iniciado no site (origem: ${source}).`,
          attribution: getAttribution(),
        }),
      })
      if (!res.ok) throw new Error(`CRM respondeu ${res.status}`)

      pushEvent('generate_lead', {
        contact_method: 'whatsapp',
        form_location: source,
        specialty,
        user_data: leadUserData(celular),
      })
      setStatus('success')

      const url = buildWhatsAppUrl(nome.trim(), options?.specialty)
      window.setTimeout(() => {
        window.location.href = url
        setOptions(null)
        setNome('')
        setCelular('')
        setStatus('idle')
      }, REDIRECT_DELAY_MS)
    } catch (error) {
      console.error('[whatsapp-capture] falha ao salvar lead', error)
      setStatus('error')
    }
  }

  const value = useMemo(() => ({ open, close }), [open, close])

  return (
    <CaptureContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Fechar"
              onClick={close}
              className="absolute inset-0 bg-green/70 backdrop-blur-sm cursor-default"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-capture-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full sm:max-w-[380px] rounded-t-3xl sm:rounded-3xl overflow-hidden
                         bg-white shadow-card-xl border border-gold/25"
            >
              {/* Header */}
              <div className="bg-green p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(201,168,76,0.14),transparent)]" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-white/10 relative flex-shrink-0 border border-gold/30">
                    <Image
                      src="/image/dr.webp"
                      alt={doctor.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2
                      id="whatsapp-capture-title"
                      className="font-head font-semibold text-white text-base leading-tight"
                    >
                      {doctor.name}
                    </h2>
                    <p className="text-[11px] text-gold flex items-center gap-1.5 font-medium tracking-wide mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Atendimento pelo WhatsApp
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 -m-2"
                  aria-label="Fechar formulário"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <p className="text-sm text-text-mid leading-relaxed mb-4">
                  Informe seu nome e WhatsApp — a conversa abre em seguida com a equipe do Dr.
                  André.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <div>
                    <label
                      htmlFor="wa-nome"
                      className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-1"
                    >
                      Nome
                    </label>
                    <input
                      id="wa-nome"
                      ref={nameRef}
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-base font-medium
                                 text-green placeholder-text-soft outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wa-celular"
                      className="block text-[10px] font-bold uppercase tracking-widest text-text-soft mb-1"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="wa-celular"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      required
                      placeholder="(12) 99999-9999"
                      value={celular}
                      onChange={(e) => setCelular(formatPhone(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-base font-medium
                                 text-green placeholder-text-soft outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="text-xs text-red-600 text-center font-medium">
                      Não foi possível registrar. Tente novamente ou ligue para{' '}
                      {doctor.phones.consultorio}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99]
                               text-white font-bold text-sm shadow-wpp flex items-center justify-center gap-2
                               transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' && 'Registrando…'}
                    {status === 'success' && 'Abrindo o WhatsApp…'}
                    {(status === 'idle' || status === 'error') && (
                      <>
                        <WhatsAppIcon size={18} />
                        Iniciar conversa
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-[10px] text-text-soft font-semibold">
                  <span>🔒 Dados protegidos (LGPD)</span>
                  <span>⚡ Retorno rápido</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CaptureContext.Provider>
  )
}
