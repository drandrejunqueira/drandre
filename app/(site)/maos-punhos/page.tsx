import type { Metadata } from 'next'
import { specialties } from '@/lib/data'
import SpecialtyPage from '@/components/SpecialtyPage'

const specialty = specialties.find(s => s.slug === 'maos-punhos')!

export const metadata: Metadata = {
  title: 'Mãos e Punhos — Túnel do Carpo e Tendinites',
  description: 'Tratamento de síndrome do túnel do carpo, dedo em gatilho, tendinites e cistos no punho. Cirurgia percutânea e PRP com Dr. André Elias Junqueira em São José dos Campos.',
  alternates: { canonical: '/maos-punhos' },
}

export default function MaosPunhosPage() {
  return <SpecialtyPage specialty={specialty} />
}
