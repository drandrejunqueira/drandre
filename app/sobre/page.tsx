import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { doctor } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Sobre o Dr. André Elias Junqueira',
  description: 'Conheça o Dr. André Elias Junqueira, cirurgião ortopédico em São José dos Campos com foco em prevenção, terapias regenerativas e cirurgia minimamente invasiva.',
}

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(201,168,76,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(45,107,74,0.3),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
              <span className="block w-6 h-0.5 bg-[#C9A84C] rounded-full" />
              Sobre o Médico
            </span>
            <h1 className="font-head text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              {doctor.name}
            </h1>
            <p className="text-white/65 text-lg">{doctor.title} · São José dos Campos – SP</p>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Foto */}
            <RevealOnScroll direction="left" className="sticky top-24">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#C9A84C] rounded-full opacity-8" />
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#F0F7F3]
                                border border-[#E4E9E2] relative">
                  <Image 
                    src="/image/drandre.webp" 
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Badges flutuantes */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(14,42,26,0.10)] border border-[#E4E9E2]">
                  <div className="w-11 h-11 rounded-xl bg-[#0E2A1A] flex items-center justify-center text-xl mb-3">🏥</div>
                  <div className="font-bold text-sm text-[#0E2A1A]">CRM Registrado</div>
                  <div className="text-xs text-[#4A6355] mt-0.5">Cirurgião Ortopédico</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(14,42,26,0.10)] border border-[#E4E9E2]">
                  <div className="font-head text-2xl font-bold text-[#0E2A1A]">10<span className="text-[#C9A84C] text-lg">+</span></div>
                  <div className="text-xs text-[#4A6355]">anos de experiência</div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="right">
              <SectionHeader tag="Quem é o Dr. André" title="Cirurgião com propósito: menos dor, mais vida." />
              <div className="mt-6 space-y-5 text-[#4A6355] leading-relaxed">
                <p>{doctor.description}</p>
                <p>
                  Se você sofre com dores no joelho, coluna, ombro ou outras articulações — ou deseja prevenir desgastes e evitar cirurgias —, este é o seu lugar.
                </p>
                <p>
                  Com as técnicas mais modernas da medicina ortopédica, trabalhamos para que você recupere sua mobilidade com segurança e agilidade.
                </p>
              </div>

              {/* Diferenciais */}
              <div className="mt-10 space-y-4">
                <h3 className="font-head text-xl font-semibold text-[#0E2A1A]">Diferenciais da atuação</h3>
                {[
                  { icon: '🔬', title: 'Terapias Regenerativas', desc: 'PRP, BMAC e Ácido Hialurônico para tratamento sem cirurgia' },
                  { icon: '⚡', title: 'Cirurgia Minimamente Invasiva', desc: 'Técnicas avançadas com menor trauma e recuperação mais rápida' },
                  { icon: '🛡️', title: 'Ortopedia Preventiva', desc: 'Check-up e avaliação de riscos antes que a dor apareça' },
                  { icon: '🎯', title: 'Atendimento Individualizado', desc: 'Tratamento personalizado com foco total em qualidade de vida' },
                  { icon: '📺', title: 'Referência na Mídia', desc: 'Entrevistado pela BAND TV e em revistas especializadas' },
                ].map((d) => (
                  <div key={d.title} className="flex items-start gap-4 p-4 bg-[#F9FAF8] rounded-xl border border-[#E4E9E2] hover:border-[#C9A84C]/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#0E2A1A] flex items-center justify-center text-xl flex-shrink-0">
                      {d.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#0E2A1A]">{d.title}</div>
                      <div className="text-xs text-[#4A6355] mt-0.5">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contato"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold text-sm shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                  Agendar Consulta
                </Link>
                <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all">
                  WhatsApp
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ══ Filosofia de Cuidado ══ */}
      <section className="py-24 bg-[#F0F7F3] border-t border-b border-[#E4E9E2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Diferencial Clínico</span>
                <div className="w-8 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-head text-3xl lg:text-4xl font-semibold text-[#0E2A1A] mb-4">
                Minha Filosofia de Cuidado
              </h2>
              <p className="text-[#4A6355] max-w-xl mx-auto text-sm lg:text-base">
                O corpo humano funciona como um sistema integrado. Minha abordagem vai além de tratar a dor isolada, buscando restaurar a biomecânica e a qualidade de vida.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Prevenir Antes da Dor', desc: 'Identificar riscos e desequilíbrios funcionais através de avaliações antes que virem lesões estruturais.' },
              { num: '02', title: 'Regenerar Sempre', desc: 'Priorizar terapias biológicas (PRP, BMAC, SVF) para reduzir inflamação, aliviar dor e evitar cirurgias.' },
              { num: '03', title: 'Operar com Precisão', desc: 'Quando a cirurgia é inevitável, optar por técnicas minimamente invasivas para menor trauma e retorno ágil.' },
              { num: '04', title: 'Olhar Sistêmico', desc: 'Avaliar a postura, sono, força muscular, saúde intestinal e hábitos que impactam diretamente nos resultados.' },
              { num: '05', title: 'Plano Individual', desc: 'Cada paciente tem seu próprio caminho. Desenho a conduta com base nos exames, rotina e objetivos pessoais.' }
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80} className="h-full">
                <div className="bg-white p-6 rounded-2xl border border-[#E4E9E2] hover:border-[#C9A84C]/40 hover:shadow-[0_8px_32px_rgba(14,42,26,0.06)] transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <span className="block font-head text-2xl font-bold text-[#C9A84C] mb-4">{item.num}</span>
                    <h3 className="font-head text-sm font-bold text-[#0E2A1A] mb-3">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[#4A6355] leading-relaxed mt-auto">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Formação & Sociedades ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Academics Timeline */}
            <RevealOnScroll direction="left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Histórico de Excelência</span>
              </div>
              <h2 className="font-head text-3xl lg:text-4xl font-semibold text-[#0E2A1A] mb-8">
                Formação Acadêmica & Títulos
              </h2>

              <div className="relative pl-8 border-l-2 border-[#E4E9E2] space-y-10">
                {[
                  { tag: 'Graduação', place: 'EPM-UNIFESP', desc: 'Graduação em Medicina pela conceituada Escola Paulista de Medicina da Universidade Federal de São Paulo.' },
                  { tag: 'Residência Médica', place: 'EPM-UNIFESP', desc: 'Residência Médica credenciada em Ortopedia e Traumatologia.' },
                  { tag: 'Especialização', place: 'EPM-UNIFESP', desc: 'Especialização em cirurgia ortopédica do ombro e cotovelo.' },
                  { tag: 'Pós-Graduação', place: 'IOT-FMUSP', desc: 'Procedimentos minimamente invasivos guiados por ultrassom para o tratamento de dor crônica no Instituto de Ortopedia da USP.' }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    {/* Circle timeline dot */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-white bg-[#C9A84C] shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0E2A1A]" />
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#F0F7F3] border border-[#C9A84C]/25 text-[10px] font-semibold text-[#0E2A1A] uppercase tracking-wide mb-2">
                        {item.tag}
                      </span>
                      <h3 className="font-head text-base font-bold text-[#0E2A1A]">{item.place}</h3>
                      <p className="text-xs text-[#4A6355] leading-relaxed mt-1.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Right Column: Medical Memberships */}
            <RevealOnScroll direction="right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Membro Titular</span>
              </div>
              <h2 className="font-head text-3xl lg:text-4xl font-semibold text-[#0E2A1A] mb-8">
                Sociedades Médicas
              </h2>
              <p className="text-sm text-[#4A6355] leading-relaxed mb-8">
                O Dr. André Elias Junqueira participa ativamente das principais comunidades ortopédicas e de estudo da dor, assegurando tratamentos guiados pela mais alta ciência médica internacional.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'SBRET', desc: 'Sociedade Brasileira de Regeneração Tecidual' },
                  { label: 'AAOS', desc: 'American Academy of Orthopaedic Surgeons' },
                  { label: 'SBOT (Dor)', desc: 'Comitê de Dor da Sociedade Brasileira de Ortopedia e Traumatologia' },
                  { label: 'SBED', desc: 'Sociedade Brasileira do Estudo da Dor' },
                  { label: 'SOBRAMID', desc: 'Sociedade Brasileira de Médicos Intervencionistas de Dor' },
                  { label: 'ABETI', desc: 'Assoc. Brasileira para Estudos dos Tratamentos por Infiltração' }
                ].map((soc, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E4E9E2] bg-[#F9FAF8] hover:border-[#C9A84C]/40 hover:bg-white transition-all duration-300">
                    <div className="font-head text-sm font-bold text-[#0E2A1A] mb-1">{soc.label}</div>
                    <div className="text-[11px] text-[#4A6355] leading-relaxed">{soc.desc}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mídia */}
      <section className="py-20 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <RevealOnScroll>
              <SectionHeader tag="Na Mídia" title="Dr. André na Imprensa" center />
            </RevealOnScroll>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { logo: 'BAND TV', color: '#CC0000', type: 'Entrevista Televisiva', desc: 'Revolução no Tratamento da Dor e Artrose com Medicina Regenerativa', icon: '📺' },
              { logo: 'REVISTA', color: '#0E2A1A', type: 'Reportagem Especializada', desc: 'Destaque em publicação sobre inovações em ortopedia regenerativa', icon: '📰' },
            ].map((m) => (
              <RevealOnScroll key={m.logo}>
                <div className="bg-white rounded-2xl border border-[#E4E9E2] p-8 flex flex-col items-center gap-4 text-center hover:shadow-[0_8px_32px_rgba(14,42,26,0.08)] hover:-translate-y-1 transition-all">
                  <div className="text-3xl">{m.icon}</div>
                  <div className="font-black text-2xl" style={{ color: m.color }}>{m.logo}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#8FA89A]">{m.type}</div>
                  <p className="text-sm text-[#4A6355] leading-relaxed">{m.desc}</p>
                  <button className="mt-2 px-5 py-2.5 rounded-full border-2 border-[#C9A84C] text-[#C9A84C] font-semibold text-sm hover:bg-[#C9A84C] hover:text-[#0E2A1A] transition-all">
                    Ver conteúdo →
                  </button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.08),transparent)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-head text-3xl font-semibold text-white mb-4">Agende sua consulta hoje</h2>
            <p className="text-white/65 mb-8">Tratamento individualizado com foco em qualidade de vida.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contato"
                className="px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                Marcar Consulta
              </Link>
              <a href={`tel:${doctor.phones.consultorioHref}`}
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 hover:-translate-y-0.5 transition-all">
                {doctor.phones.consultorio}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
