import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'pe-tornozelo')!

export const metadata: Metadata = {
  title: 'Pé e Tornozelo — Fascite Plantar e Tendão de Aquiles',
  description: 'Tratamento de fascite plantar, entorse de tornozelo, ruptura do tendão de Aquiles e joanete com PRP, artroscopia e cirurgia minimamente invasiva em São José dos Campos.',
  alternates: { canonical: '/pe-tornozelo' },
}

export default function PeTornozeloPage() {
  return <SpecialtyPage specialty={specialty} />
}
