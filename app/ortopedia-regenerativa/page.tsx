import type { Metadata } from 'next'
import Link from 'next/link'
import { services, doctor } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Ortopedia Regenerativa',
  description: 'Trate artrose, tendinites e lesões musculares sem cirurgia. PRP, BMAC e Ácido Hialurônico com o Dr. André Elias Junqueira em SJC.',
}

const service = services.find(s => s.slug === 'ortopedia-regenerativa')!

export default function OrtopediaRegenerativaPage() {
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
              Inovação Médica
            </span>
            <h1 className="font-head text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-white/65 text-lg mb-8">{service.tagline}</p>
            <Link href="/contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold text-sm shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
              Consultar sobre Regenerativa
            </Link>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <RevealOnScroll>
              <SectionHeader tag="O que é?" title="A medicina que usa seu próprio corpo para curar" center />
              <p className="text-[#4A6355] leading-relaxed mt-5">{service.description}</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Técnicas */}
      <section className="py-20 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <SectionHeader tag="Técnicas" title="Nossas Terapias Regenerativas" center />
            </RevealOnScroll>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {service.techniques?.map((tech, i) => (
              <RevealOnScroll key={tech.abbr} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-[#E4E9E2] p-8 hover:shadow-[0_20px_60px_rgba(14,42,26,0.10)] hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#0E2A1A] flex items-center justify-center text-[#C9A84C] font-bold text-sm flex-shrink-0">
                      {tech.abbr}
                    </div>
                    <h3 className="font-head text-xl font-semibold text-[#0E2A1A]">{tech.name}</h3>
                  </div>
                  <p className="text-[#4A6355] text-sm leading-relaxed mb-6">{tech.description}</p>
                  <div className="space-y-2">
                    {tech.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm text-[#0E2A1A]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C9A84C] flex-shrink-0">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Condições tratadas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <SectionHeader tag="Indicações" title="Condições tratadas com Regenerativa" />
              <p className="text-[#4A6355] leading-relaxed mt-5 mb-8">
                As terapias regenerativas são indicadas para diversas condições ortopédicas, especialmente quando se deseja evitar ou postergar cirurgias.
              </p>
              <div className="flex flex-wrap gap-2">
                {service.conditions?.map((c) => (
                  <span key={c} className="px-4 py-2 bg-[#F0F7F3] border border-[#CDD6C9] rounded-full text-sm font-medium text-[#0E2A1A] hover:bg-[#0E2A1A] hover:text-white hover:border-[#0E2A1A] transition-all cursor-default">
                    {c}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="bg-[#0E2A1A] rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(201,168,76,0.12),transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="font-head text-xl font-semibold mb-3">
                    Tratamento Regenerativo em São José dos Campos
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">
                    {doctor.address.full}
                  </p>
                  <div className="space-y-3">
                    <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                      <span>📱</span> {doctor.phones.whatsappDisplay}
                    </a>
                    <a href={`tel:${doctor.phones.consultorioHref}`}
                      className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                      <span>📞</span> {doctor.phones.consultorio}
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.08),transparent)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-head text-3xl font-semibold text-white mb-4">
              Descubra se a Regenerativa é para você
            </h2>
            <p className="text-white/65 mb-8">Agende uma consulta de avaliação e discuta o melhor tratamento para seu caso.</p>
            <Link href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
              Agendar Avaliação
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
