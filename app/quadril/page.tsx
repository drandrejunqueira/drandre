import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'quadril')!

export const metadata: Metadata = {
  title: 'Quadril — Artrose, FAI e Lesão do Labrum',
  description: 'Tratamento da artrose do quadril, síndrome do impacto femoroacetabular e lesão do labrum. PRP, BMAC e artroscopia com Dr. André Elias Junqueira em SJC.',
  alternates: { canonical: '/quadril' },
}

export default function QuadrilPage() {
  return <SpecialtyPage specialty={specialty} />
}
