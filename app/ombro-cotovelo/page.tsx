import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'ombro-cotovelo')!

export const metadata: Metadata = {
  title: 'Ombro e Cotovelo — Manguito Rotador e Tendinites',
  description: 'Tratamento de lesões do manguito rotador, instabilidade do ombro, capsulite adesiva e tendinites com artroscopia e PRP. São José dos Campos.',
  alternates: { canonical: '/ombro-cotovelo' },
}

export default function OmbroCotoveloPage() {
  return <SpecialtyPage specialty={specialty} />
}
