'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GTM_ID, captureTrackingParams, pushEvent } from '@/lib/tracking'

const WHATSAPP_HOSTS = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com']
const MAX_LINK_TEXT = 80

/**
 * Critério de engajamento antes de contar um clique de contato.
 *
 * Tráfego de Display/apps gera toques acidentais nos primeiros instantes da
 * página (o visitante nem queria estar aqui). Em set/2026 isso virou 590
 * "conversões" de WhatsApp/telefone no Google Ads para ~10 leads reais no CRM.
 * Um clique só vira `whatsapp_click`/`phone_click` se a pessoa já estava há
 * alguns segundos na página ou rolou; antes disso vira `contact_click_bounce`
 * (fica no GA4 para auditoria, mas não alimenta o lance do Google Ads).
 */
const ENGAGED_AFTER_MS = 3000
const ENGAGED_SCROLL_PX = 120

/**
 * Carrega o GTM e centraliza a medição do site.
 *
 * Os cliques de WhatsApp e telefone são capturados por delegação em um único
 * listener — links novos já nascem rastreados. Links com `data-skip-tracking`
 * são ignorados (ex.: o WhatsApp da tela de sucesso, cujo lead já foi contado).
 */
export default function Analytics() {
  useEffect(() => {
    captureTrackingParams()
  }, [])

  useEffect(() => {
    const loadedAt = Date.now()
    let scrolled = false
    const onScroll = () => {
      if (window.scrollY > ENGAGED_SCROLL_PX) scrolled = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    function isEngaged(): boolean {
      return scrolled || Date.now() - loadedAt >= ENGAGED_AFTER_MS
    }

    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null
      const link = target?.closest?.('a')
      if (!link || link.dataset.skipTracking !== undefined) return

      const href = link.getAttribute('href')
      if (!href) return

      const isPhone = href.startsWith('tel:')
      const isWhatsApp = WHATSAPP_HOSTS.some((host) => href.includes(host))
      if (!isPhone && !isWhatsApp) return

      const contactMethod = isPhone ? 'telefone' : 'whatsapp'
      const context = {
        contact_method: contactMethod,
        link_text: (link.textContent || '').trim().slice(0, MAX_LINK_TEXT),
        link_url: href,
        page_path: window.location.pathname,
        seconds_on_page: Math.round((Date.now() - loadedAt) / 1000),
      }

      if (!isEngaged()) {
        pushEvent('contact_click_bounce', context)
        return
      }
      pushEvent(isPhone ? 'phone_click' : 'whatsapp_click', context)
    }

    // Fase de captura: garante o registro antes de qualquer navegação.
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('scroll', onScroll)
    }
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
