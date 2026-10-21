import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/data'

const SITE_URL = 'https://drandreortopedia.com.br'

// Páginas institucionais. As /lp ficam de fora: são noindex (destino de anúncio).
const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/sobre', priority: 0.8 },
  { path: '/joelho', priority: 0.8 },
  { path: '/ombro-cotovelo', priority: 0.8 },
  { path: '/coluna', priority: 0.8 },
  { path: '/quadril', priority: 0.8 },
  { path: '/pe-tornozelo', priority: 0.8 },
  { path: '/maos-punhos', priority: 0.8 },
  { path: '/ortopedia-regenerativa', priority: 0.8 },
  { path: '/cirurgia-minimamente-invasiva', priority: 0.8 },
  { path: '/blog', priority: 0.6 },
  { path: '/contato', priority: 0.7 },
]

/** Sitemap gerado dos dados: post novo em lib/data.ts entra sozinho. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, priority })),
    ...blogPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, priority: 0.6 })),
  ]
}
