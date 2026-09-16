'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWhatsAppCapture } from '@/components/whatsapp/WhatsAppCaptureProvider'
import { WhatsAppIcon } from '@/components/whatsapp/WhatsAppIcon'

/** Fração da altura da tela que precisa ser rolada antes do botão aparecer. */
const REVEAL_AFTER_VIEWPORT_RATIO = 0.6

/**
 * Botão flutuante do WhatsApp.
 *
 * Só aparece depois que o visitante rola além do hero: na primeira tela os
 * CTAs do próprio hero já cobrem o contato, e no mobile o botão ficava por
 * cima do link de WhatsApp do hero — zona do polegar, toque acidental que
 * virava "conversão" no Google Ads.
 */
export default function WhatsAppFloat() {
  const { open } = useWhatsAppCapture()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * REVEAL_AFTER_VIEWPORT_RATIO)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={() => open({ specialty: 'WhatsApp Flutuante', source: 'whatsapp_flutuante' })}
          aria-label="WhatsApp — Falar com a equipe"
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[999] w-14 h-14 rounded-full
                     flex items-center justify-center bg-[#25D366] text-white shadow-wpp
                     hover:scale-110 transition-transform duration-300 active:scale-95 focus:outline-none
                     focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        >
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping opacity-60" />
          <WhatsAppIcon size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
