import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'joelho')!

export const metadata: Metadata = {
  title: 'Joelho — LCA, Menisco, Artrose e Condromalácia',
  description: 'Tratamento de lesões do LCA, menisco, artrose do joelho e condromalácia com PRP, BMAC e cirurgia minimamente invasiva. Dr. André Elias Junqueira, São José dos Campos.',
  alternates: { canonical: '/joelho' },
}

export default function JoelhoPage() {
  return <SpecialtyPage specialty={specialty} />
}
