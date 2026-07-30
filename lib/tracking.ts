/**
 * Tracking centralizado do site.
 *
 * Responsabilidades:
 * - capturar TODOS os parâmetros de campanha da URL (sem lista fixa),
 * - persistir em sessionStorage para sobreviver à navegação interna do App Router,
 * - expor a atribuição completa (params + cookies) para o formulário de lead,
 * - empurrar eventos no dataLayer, de onde o GTM dispara GA4 e Google Ads.
 *
 * Toda a lógica vive aqui — nenhuma página deve ler UTM ou cookie inline.
 */

export const GTM_ID = 'GTM-M5XW9TSZ'

const STORAGE_KEY = 'dra_tracking'

/** Parâmetros conhecidos, ordenados primeiro na atribuição final. */
const TRACKED_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'gbraid',
  'wbraid',
  'gad_source',
  'gad_campaignid',
  'fbclid',
  'msclkid',
  'ttclid',
  'src',
  'sck',
] as const

/** Cookies de atribuição repassados junto com o lead. */
const TRACKED_COOKIES = ['_ga', '_gcl_aw', '_gcl_gs', '_fbp', '_fbc'] as const

export type Attribution = Record<string, string>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  try {
    const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')
    const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'))
    return match ? decodeURIComponent(match[1]) : null
  } catch {
    return null
  }
}

/** Lê a query da URL, com fallback para a query dentro do hash. */
function readUrlParams(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const hashQuery = window.location.hash.includes('?')
      ? window.location.hash.split('?')[1]
      : ''
    const search = new URLSearchParams(window.location.search || hashQuery)
    const params: Attribution = {}
    search.forEach((value, key) => {
      if (value) params[key] = value
    })
    return params
  } catch {
    return {}
  }
}

function readStored(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    // Modo privado / sandbox pode lançar SecurityError.
    return {}
  }
}

/**
 * Une o que já estava persistido com os params da URL atual e regrava.
 * Chamado uma vez no carregamento: a partir daí a campanha sobrevive à
 * navegação entre páginas, mesmo que a query string se perca.
 */
export function captureTrackingParams(): Attribution {
  if (typeof window === 'undefined') return {}
  const merged = { ...readStored(), ...readUrlParams() }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // Sem storage, seguimos apenas com os params da URL — nunca quebra o fluxo.
  }
  return merged
}

/** Atribuição completa: params persistidos + params atuais + cookies. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  const merged: Attribution = { ...readStored(), ...readUrlParams() }

  for (const name of TRACKED_COOKIES) {
    const value = readCookie(name)
    if (value) merged[name] = value
  }
  if (!merged._fbc && merged.fbclid) {
    merged._fbc = `fb.1.${Date.now()}.${merged.fbclid}`
  }

  const ordered: Attribution = {}
  for (const key of TRACKED_KEYS) {
    if (merged[key]) ordered[key] = merged[key]
  }
  for (const [key, value] of Object.entries(merged)) {
    if (value && !ordered[key]) ordered[key] = value
  }
  return ordered
}

/** Push no dataLayer. Nunca lança, mesmo se o GTM ainda não carregou. */
export function pushEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch (error) {
    console.error('[tracking] falha ao registrar evento', event, error)
  }
}
