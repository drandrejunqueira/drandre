'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { doctor, specialties } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import LeadForm from '@/components/ui/LeadForm'
import FaqAccordion from '@/components/ui/FaqAccordion'

interface Specialty {
  slug: string
  name: string
  shortDesc: string
  description: string
  treatments: string[]
  icon: string
  color: string
  faqs?: { q: string; a: string }[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

export default function SpecialtyPage({ specialty }: { specialty: Specialty }) {
  const others = specialties.filter(s => s.slug !== specialty.slug).slice(0, 3)
  const paragraphs = specialty.description.split('\n\n').filter(Boolean)

  // Separate list items from text paragraphs
  const conditions: string[] = []
  const textBlocks: string[] = []
  paragraphs.forEach(p => {
    if (p.includes('\n-')) {
      p.split('\n').filter(l => l.startsWith('- ')).forEach(l => conditions.push(l.slice(2)))
    } else if (!p.startsWith('**')) {
      textBlocks.push(p)
    }
  })

  const stats = [
    { value: '10+', label: 'Anos de Experiência' },
    { value: '98%', label: 'Satisfação dos Pacientes' },
    { value: specialty.treatments.length + '+', label: 'Opções de Tratamento' },
    { value: 'SJC', label: 'São José dos Campos' },
  ]

  return (
    <>
      {/* ══ 1. HERO — Conversão acima da dobra ══ */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0E2A1A] overflow-hidden pt-24">
        {/* BG layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_30%,rgba(201,168,76,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_80%,rgba(45,107,74,0.25),transparent)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute left-0 top-1/4 w-0.5 h-40 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Left — copy (spans 2 cols) */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/8 px-4 py-2 rounded-full text-xs font-semibold text-[#DFC06A] tracking-widest uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-[blink_2s_infinite]" />
                Especialidade · Ortopedia
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.5} className="text-7xl mb-4">{specialty.icon}</motion.div>

              <motion.h1
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="font-head text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.0] mb-6"
              >
                {specialty.name.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'italic font-normal text-[#DFC06A]' : ''}>{word} </span>
                ))}
              </motion.h1>

              <motion.p
                initial="hidden" animate="visible" variants={fadeUp} custom={1.5}
                className="text-white/65 text-lg leading-relaxed max-w-lg mb-10"
              >
                {specialty.shortDesc}
              </motion.p>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="flex flex-wrap gap-4 mb-10">
                <a href="#agendar"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-bold shadow-[0_4px_24px_rgba(201,168,76,0.40)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                  Agendar Consulta ↓
                </a>
                <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                  💬 WhatsApp
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2.5} className="flex flex-wrap gap-3">
                {['Sem fila de espera', 'CRM SP 150430', 'Terapias Regenerativas', 'SJC · SP'].map(b => (
                  <div key={b} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/60">
                    <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                    {b}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Lead Form (sticky) */}
            <motion.div
              id="agendar"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="lg:sticky lg:top-28"
            >
              <LeadForm specialty={specialty.name} variant="dark" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#C9A84C]/60 animate-[scroll-line_2s_ease-in-out_infinite]" />
          scroll
        </div>
      </section>

      {/* ══ 2. SOCIAL PROOF — Stats ══ */}
      <section className="bg-white border-b border-[#E4E9E2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <RevealOnScroll key={i} delay={i * 80}
                className={`flex flex-col items-center text-center py-10 px-6 ${i < stats.length - 1 ? 'border-r border-[#E4E9E2]' : ''}`}>
                <div className="font-head text-3xl lg:text-4xl font-bold text-[#0E2A1A] leading-none mb-1.5">
                  {s.value}
                </div>
                <div className="text-xs font-medium text-[#4A6355]">{s.label}</div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. CONDIÇÕES TRATADAS ══ */}
      {conditions.length > 0 && (
        <section className="py-24 bg-[#F0F7F3]">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">O que tratamos</span>
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] mb-4">
                Condições que o <br /><span className="italic font-normal">Dr. André trata</span>
              </h2>
              <p className="text-[#4A6355] max-w-xl mb-14">
                {textBlocks[0] || `Diagnóstico preciso e tratamento individualizado para cada condição de ${specialty.name}.`}
              </p>
            </RevealOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {conditions.map((c, i) => (
                <RevealOnScroll key={i} delay={i * 50}>
                  <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E4E9E2] hover:border-[#C9A84C]/40 hover:shadow-[0_8px_32px_rgba(14,42,26,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-[#0E2A1A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#0E2A1A] leading-snug pt-1">{c}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ 4. TRATAMENTOS — Features ══ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left copy */}
            <RevealOnScroll direction="left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Opções de Tratamento</span>
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] mb-5 leading-tight">
                Tecnologia de ponta<br /><span className="italic font-normal">para a sua recuperação</span>
              </h2>
              <p className="text-[#4A6355] leading-relaxed mb-10">
                O Dr. André utiliza as técnicas mais avançadas da ortopedia moderna — do diagnóstico ao tratamento — com foco na recuperação rápida e duradoura.
              </p>

              <div className="space-y-3">
                {specialty.treatments.map((t, i) => (
                  <RevealOnScroll key={i} delay={i * 60}>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E4E9E2] bg-[#F9FAF8] hover:border-[#C9A84C]/40 hover:translate-x-1.5 transition-all duration-300">
                      <div className="w-9 h-9 rounded-xl bg-[#0E2A1A] flex items-center justify-center flex-shrink-0 text-[#C9A84C] text-xs font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="font-medium text-sm text-[#0E2A1A]">{t}</span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>

            {/* Right — Dark promo card */}
            <RevealOnScroll direction="right">
              <div className="relative bg-[#0E2A1A] rounded-3xl p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(201,168,76,0.15),transparent_70%)] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <div className="absolute top-0 left-10 w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent" />

                <div className="relative z-10">
                  <div className="text-5xl mb-6">{specialty.icon}</div>
                  <h3 className="font-head text-2xl font-semibold text-white mb-4 leading-snug">
                    Tratamento de {specialty.name} em São José dos Campos
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-8">
                    Atendimento especializado, diagnóstico preciso e plano de tratamento individualizado com o Dr. André Elias Junqueira.
                  </p>

                  {/* Trust badges */}
                  <div className="space-y-3 mb-8">
                    {['Consulta com diagnóstico completo', 'Sem tempo de espera', 'Atendimento humanizado e individualizado'].map(b => (
                      <div key={b} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                        {b}
                      </div>
                    ))}
                  </div>

                  <Link href="/contato"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-bold text-sm shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] transition-all">
                    Consultar agora →
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ══ 5. SOBRE O DR — Autoridade ══ */}
      <section className="py-24 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(201,168,76,0.10),transparent_60%)] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Quem irá te tratar</span>
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-white mb-5 leading-tight">
                {doctor.name}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">{doctor.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '🔬', t: 'Terapias Regenerativas', s: 'PRP · BMAC · AH' },
                  { icon: '⚡', t: 'Cirurgia Minimamente Invasiva', s: 'Recuperação rápida' },
                  { icon: '🛡️', t: 'Ortopedia Preventiva', s: 'Antes da dor aparecer' },
                  { icon: '📺', t: 'BAND TV', s: 'Referência na mídia' },
                ].map(h => (
                  <div key={h.t} className="p-4 rounded-xl border border-white/8 bg-white/3 hover:border-[#C9A84C]/30 hover:bg-white/6 transition-all">
                    <div className="text-xl mb-2">{h.icon}</div>
                    <div className="font-semibold text-white text-xs leading-snug">{h.t}</div>
                    <div className="text-white/40 text-[11px] mt-0.5">{h.s}</div>
                  </div>
                ))}
              </div>

              <Link href="/sobre"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                Conheça o Dr. André →
              </Link>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-[radial-gradient(ellipse,rgba(201,168,76,0.08),transparent_70%)]" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                  <Image src="/image/drandre.webp" alt={doctor.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A1A]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
                      <div className="font-semibold text-white text-sm">{doctor.name}</div>
                      <div className="text-white/60 text-xs mt-0.5">{doctor.title} · São José dos Campos</div>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-[#C9A84C] rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(201,168,76,0.40)]">
                  <div className="font-head text-2xl font-bold text-[#0E2A1A]">10+</div>
                  <div className="text-[10px] font-semibold text-[#0E2A1A]/70 uppercase tracking-wide">anos</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ══ 5.5. FAQ — Dúvidas comuns ══ */}
      {specialty.faqs && specialty.faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Dúvidas Frequentes</span>
                <div className="w-8 h-px bg-[#C9A84C]" />
              </div>
              <FaqAccordion items={specialty.faqs} title={`Perguntas Comuns sobre ${specialty.name}`} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ══ 6. OUTRAS ESPECIALIDADES ══ */}
      <section className="py-20 bg-[#F0F7F3]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-[#C9A84C]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Outras Áreas</span>
                </div>
                <h2 className="font-head text-3xl font-semibold text-[#0E2A1A]">Outras Especialidades</h2>
              </div>
              <Link href="/#especialidades"
                className="px-5 py-2.5 rounded-full border-2 border-[#0E2A1A] text-[#0E2A1A] font-semibold text-sm hover:bg-[#0E2A1A] hover:text-white transition-all">
                Ver todas
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((sp, i) => (
              <RevealOnScroll key={sp.slug} delay={i * 80}>
                <Link href={`/${sp.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-[#E4E9E2] hover:shadow-[0_20px_60px_rgba(14,42,26,0.12)] hover:-translate-y-1.5 hover:border-[#C9A84C]/30 transition-all duration-400 relative overflow-hidden block">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#DFC06A] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <div className="text-3xl mb-4">{sp.icon}</div>
                  <h3 className="font-head text-lg font-semibold text-[#0E2A1A] mb-2">{sp.name}</h3>
                  <p className="text-sm text-[#4A6355] leading-relaxed mb-4 line-clamp-2">{sp.shortDesc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] group-hover:gap-3 transition-all">
                    Saiba mais
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CTA FINAL — Conversão ══ */}
      <section id="agendar-final" className="py-24 bg-[#F0F7F3] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(14,42,26,0.04),transparent)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — copy */}
            <RevealOnScroll direction="left">
              <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#C9A84C] tracking-widest uppercase mb-6">
                Agende sua Consulta
              </div>

              <h2 className="font-head text-4xl md:text-5xl font-semibold text-[#0E2A1A] mb-5 leading-tight">
                Pronto para resolver<br />
                <span className="italic font-normal text-[#1B4D35]">sua dor de vez?</span>
              </h2>

              <p className="text-[#4A6355] text-lg mb-8">
                Agende sua consulta com o Dr. André Elias Junqueira e receba um diagnóstico completo e plano de tratamento personalizado para <strong className="text-[#0E2A1A]">{specialty.name}</strong>.
              </p>

              {/* Trust list */}
              <div className="space-y-3 mb-10">
                {[
                  'Consulta com diagnóstico completo',
                  'Sem fila de espera',
                  'Atendimento humanizado e individualizado',
                  'Tecnologias regenerativas de ponta',
                  'Retorno em até 1h útil após solicitação',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#0E2A1A]">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Contact row */}
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${doctor.phones.consultorioHref}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E4E9E2] bg-white text-sm font-medium text-[#0E2A1A] hover:border-[#C9A84C]/40 transition-all">
                  📞 {doctor.phones.consultorio}
                </a>
                <span className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#E4E9E2] bg-white text-sm text-[#4A6355]">
                  📍 {doctor.address.neighborhood}, {doctor.address.city}
                </span>
              </div>
            </RevealOnScroll>

            {/* Right — Lead Form */}
            <RevealOnScroll direction="right">
              <LeadForm specialty={specialty.name} variant="light" />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}
