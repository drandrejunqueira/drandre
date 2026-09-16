import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'coluna')!

export const metadata: Metadata = {
  title: 'Coluna Vertebral — Hérnia de Disco e Dor nas Costas',
  description: 'Tratamento especializado para hérnia de disco, estenose, escoliose e dores na coluna com cirurgia minimamente invasiva e terapias regenerativas em São José dos Campos.',
  alternates: { canonical: '/coluna' },
}

export default function ColunaPage() {
  return <SpecialtyPage specialty={specialty} />
}
