'use client'

import type { ComponentPropsWithRef } from 'react'
import { useWhatsAppCapture, type OpenOptions } from './WhatsAppCaptureProvider'

type Props = OpenOptions &
  Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'type'> & {
    children: React.ReactNode
  }

/**
 * Substitui qualquer `<a href="https://wa.me/...">` do site.
 * Mesmas classes, mesmo visual — mas abre o modal de captura em vez de sair
 * direto para o WhatsApp. Aceita `specialty` e `source` para o CRM/GA4.
 * `ref` é repassado ao <button> (React 19), então funciona dentro do MagneticButton.
 */
export default function WhatsAppButton({ specialty, source, children, ref, ...rest }: Props) {
  const { open } = useWhatsAppCapture()
  return (
    <button
      ref={ref}
      type="button"
      data-whatsapp-cta
      onClick={() => open({ specialty, source })}
      {...rest}
    >
      {children}
    </button>
  )
}
