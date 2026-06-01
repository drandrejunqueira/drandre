import type { Metadata } from 'next'
import Link from 'next/link'
import { services, doctor } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Cirurgia Minimamente Invasiva',
  description: 'Cirurgia com menor dor, menos internação e recuperação mais rápida. Técnicas avançadas com o Dr. André Elias Junqueira em São José dos Campos.',
}

const service = services.find(s => s.slug === 'cirurgia-minimamente-invasiva')!

export default function CirurgiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(201,168,76,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(45,107,74,0.3),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
              <span className="block w-6 h-0.5 bg-[#C9A84C] rounded-full" />
              Tecnologia Avançada
            </span>
            <h1 className="font-head text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-white/65 text-lg mb-8">{service.tagline}</p>
            <Link href="/contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold text-sm shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
              Agendar Avaliação
            </Link>
          </div>
        </div>
      </section>

      {/* Descrição */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <SectionHeader tag="O que é?" title="Precisão que transforma resultados" />
              <p className="text-[#4A6355] leading-relaxed mt-5">{service.description}</p>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="grid grid-cols-2 gap-4">
                {service.benefits?.map((b, i) => (
                  <div key={i} className={`p-6 rounded-2xl border transition-all hover:shadow-[0_8px_32px_rgba(14,42,26,0.08)] hover:-translate-y-1
                    ${i % 3 === 0 ? 'bg-[#0E2A1A] border-transparent text-white' : 'bg-[#F9FAF8] border-[#E4E9E2]'}`}>
                    <div className="text-3xl mb-3">{b.icon}</div>
                    <div className={`font-semibold text-sm mb-1.5 ${i % 3 === 0 ? 'text-white' : 'text-[#0E2A1A]'}`}>{b.title}</div>
                    <div className={`text-xs leading-relaxed ${i % 3 === 0 ? 'text-white/70' : 'text-[#4A6355]'}`}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Condições tratadas */}
      <section className="py-20 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <RevealOnScroll>
              <SectionHeader tag="Indicações" title="Condições tratadas cirurgicamente" center />
            </RevealOnScroll>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {service.conditions?.map((c) => (
              <RevealOnScroll key={c}>
                <span className="px-5 py-3 bg-white border border-[#E4E9E2] rounded-full text-sm font-medium text-[#0E2A1A] hover:bg-[#0E2A1A] hover:text-white hover:border-[#0E2A1A] transition-all cursor-default shadow-[0_2px_12px_rgba(14,42,26,0.06)]">
                  {c}
                </span>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contato rápido */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0E2A1A] rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(201,168,76,0.08),transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-head text-3xl font-semibold text-white mb-4">
                  A cirurgia certa, no momento certo
                </h2>
                <p className="text-white/65 leading-relaxed mb-6">
                  Nem toda situação exige cirurgia. O Dr. André avalia cada caso individualmente e só indica o procedimento quando é realmente necessário — sempre buscando a opção menos invasiva possível.
                </p>
                <div className="space-y-3">
                  <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <span>📱</span> WhatsApp: {doctor.phones.whatsappDisplay}
                  </a>
                  <a href={`tel:${doctor.phones.consultorioHref}`}
                    className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <span>📞</span> Consultório: {doctor.phones.consultorio}
                  </a>
                  <span className="flex items-center gap-3 text-sm text-white/50">
                    <span>📍</span> {doctor.address.full}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/contato"
                  className="block text-center px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                  Agendar Avaliação
                </Link>
                <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="block text-center px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:-translate-y-0.5 transition-all">
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
