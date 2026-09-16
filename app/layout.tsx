import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import { WhatsAppCaptureProvider } from '@/components/whatsapp/WhatsAppCaptureProvider'
import { GTM_ID } from '@/lib/tracking'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dr. André Elias Junqueira — Ortopedista SJC',
    default: 'Dr. André Elias Junqueira — Ortopedista em São José dos Campos',
  },
  description:
    'Cirurgião ortopédico com foco em prevenção, terapias regenerativas (PRP, BMAC, ácido hialurônico) e cirurgia minimamente invasiva. São José dos Campos – SP.',
  keywords: [
    'ortopedista São José dos Campos',
    'ortopedia regenerativa SJC',
    'PRP joelho',
    'cirurgia minimamente invasiva',
    'Dr André Elias Junqueira',
    'ortopedista SJC',
    'tratamento artrose joelho',
  ],
  authors: [{ name: 'Dr. André Elias Junqueira' }],
  creator: '2TimeWeb',
  metadataBase: new URL('https://drandreortopedia.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://drandreortopedia.com.br',
    siteName: 'Dr. André Elias Junqueira — Ortopedista SJC',
    images: [
      {
        url: '/image/drandre.webp',
        width: 1200,
        height: 630,
        alt: 'Dr. André Elias Junqueira',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'v853giZlFnZiRCeyRWPYh1OKe02UjrtUljy6LhsB7Wk',
  },
}

/**
 * Root layout: só o que é comum a TODO o site — fontes, GTM, tracking e o
 * modal global de captura do WhatsApp. Menu, rodapé e smooth scroll vivem no
 * layout do grupo (site); as landing pages de anúncio (/lp) não os carregam.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        <WhatsAppCaptureProvider>{children}</WhatsAppCaptureProvider>
      </body>
    </html>
  )
}
