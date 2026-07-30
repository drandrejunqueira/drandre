'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GTM_ID, captureTrackingParams, pushEvent } from '@/lib/tracking'

const WHATSAPP_HOSTS = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com']
const MAX_LINK_TEXT = 80

/**
 * Carrega o GTM e centraliza a medição do site.
 *
 * Os cliques de WhatsApp e telefone são capturados por delegação em um único
 * listener — os ~25 links espalhados pelas páginas não precisam de handler
 * próprio, e qualquer link novo já nasce rastreado.
 */
export default function Analytics() {
  useEffect(() => {
    captureTrackingParams()
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null
      const link = target?.closest?.('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      const context = {
        link_text: (link.textContent || '').trim().slice(0, MAX_LINK_TEXT),
        link_url: href,
        page_path: window.location.pathname,
      }

      if (href.startsWith('tel:')) {
        pushEvent('phone_click', { contact_method: 'telefone', ...context })
        return
      }

      if (WHATSAPP_HOSTS.some(host => href.includes(host))) {
        pushEvent('whatsapp_click', { contact_method: 'whatsapp', ...context })
      }
    }

    // Fase de captura: garante o registro antes de qualquer navegação.
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
