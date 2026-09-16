'use client'

import { useEffect, useState } from 'react'
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton'
import { WhatsAppIcon } from '@/components/whatsapp/WhatsAppIcon'

interface Props {
  formSpecialty: string
  lpSlug: string
}

/**
 * Barra fixa de CTA no rodapé do mobile.
 * Só aparece quando nenhum formulário (`[data-lp-form]`) está visível — assim
 * nunca cobre o próprio formulário nem fica na zona do polegar logo no carregamento.
 */
export default function LpStickyBar({ formSpecialty, lpSlug }: Props) {
  const [formVisible, setFormVisible] = useState(true)

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLElement>('[data-lp-form]'))
    // Sem formulário na página não há o que proteger — e a barra fica oculta (estado inicial).
    if (forms.length === 0) return
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setFormVisible(visible.size > 0)
      },
      { threshold: 0.15 }
    )
    forms.forEach((form) => observer.observe(form))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden={formVisible}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[900] transition-transform duration-300
                  ${formVisible ? 'translate-y-full pointer-events-none' : 'translate-y-0'}`}
    >
      <div className="bg-green/95 backdrop-blur-md border-t border-gold/25 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3">
        <a
          href="#agendar"
          className="flex-1 inline-flex items-center justify-center py-3.5 rounded-xl bg-gold text-green font-bold text-sm shadow-gold"
        >
          Agendar consulta
        </a>
        <WhatsAppButton
          specialty={formSpecialty}
          source={`lp_${lpSlug}_sticky`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-wpp"
        >
          <WhatsAppIcon size={18} />
          WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  )
}
