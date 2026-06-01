'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doctor } from '@/lib/data'
import Image from 'next/image'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  // Formatar celular automaticamente: (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 11) val = val.slice(0, 11)

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`
    } else if (val.length > 0) {
      val = `(${val}`
    }
    setCelular(val)
  }

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !celular) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          sobrenome: '',
          celular,
          email: '',
          especialidade: 'WhatsApp Flutuante',
          mensagem: 'Contato direto iniciado via botão flutuante do WhatsApp do site.',
        }),
      })

      if (!res.ok) throw new Error('Erro ao salvar no CRM')
      
      setStatus('success')
      
      // Criar mensagem personalizada
      const text = `Olá! Meu nome é ${nome}. Gostaria de solicitar informações sobre agendamento de consulta com o Dr. André.`
      const wppUrl = `https://api.whatsapp.com/send?phone=${doctor.phones.whatsapp}&text=${encodeURIComponent(text)}`
      
      // Redirecionamento instantâneo
      setTimeout(() => {
        window.location.href = wppUrl
        setIsOpen(false)
        setNome('')
        setCelular('')
        setStatus('idle')
      }, 800)

    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Ocorreu um erro. Tente novamente.')
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3" ref={modalRef}>
      
      {/* Popover Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-[#C9A84C]/25
                       bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(14,42,26,0.18)]
                       origin-bottom-right mb-2"
          >
            {/* Header */}
            <div className="bg-[#0E2A1A] p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(201,168,76,0.12),transparent)]" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 relative flex-shrink-0 border border-[#C9A84C]/30">
                  <Image
                    src="/image/dr.webp"
                    alt="Dr. André Elias Junqueira"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-head font-semibold text-white text-sm">Dr. André Elias Junqueira</h4>
                  <p className="text-[10px] text-[#C9A84C] flex items-center gap-1.5 font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Atendimento Clínico
                  </p>
                </div>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1"
                aria-label="Fechar formulário"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-xs text-[#4A6355] leading-relaxed mb-4">
                Olá! Para iniciar seu atendimento personalizado no WhatsApp, por favor informe seu nome e celular abaixo:
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8FA89A] mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E9E2] bg-[#F9FAF8] 
                               text-sm font-medium text-[#0E2A1A] placeholder-[#8FA89A] outline-none 
                               focus:border-[#C9A84C] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8FA89A] mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (12) 99999-9999"
                    value={celular}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E9E2] bg-[#F9FAF8] 
                               text-sm font-medium text-[#0E2A1A] placeholder-[#8FA89A] outline-none 
                               focus:border-[#C9A84C] focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-xs text-red-500 text-center font-medium">{errorMsg}</p>
                )}

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99]
                             text-white font-bold text-sm shadow-[0_4px_16px_rgba(37,211,102,0.3)]
                             flex items-center justify-center gap-2 transition-all duration-200
                             disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Salvando no CRM...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-bounce">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Redirecionando...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                      Iniciar Conversa
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-between text-[9px] text-[#8FA89A] font-semibold">
                <span>🔒 DADOS PROTEGIDOS (LGPD)</span>
                <span>⚡ RETORNO IMEDIATO</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp — Falar com a equipe"
        className="w-14 h-14 rounded-full flex items-center justify-center relative
                   bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)]
                   hover:scale-110 hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)]
                   transition-all duration-300 active:scale-95 group focus:outline-none"
      >
        {/* Pulsing indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center z-10 shadow-sm animate-pulse">
          <span className="w-1.5 h-1.5 bg-[#0E2A1A] rounded-full" />
        </span>

        {/* Glow pulsing ring around button when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping duration-1000 opacity-60" />
        )}

        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="group-hover:rotate-12 transition-transform duration-300">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </button>
      
    </div>
  )
}
