'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { doctor, specialties, blogPosts, preventionItems, stats } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import JointSelector from '@/components/ui/JointSelector'

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO — branco sobre verde escuro com foto real
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0E2A1A]">

        {/* Camadas de fundo */}
        <div className="absolute inset-0">
          {/* Placeholder foto — substituir por <Image> real */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A1A] via-[#0E2A1A]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A1A] via-transparent to-[#0E2A1A]/30 z-10" />
          {/* Fundo com anatomia / textura */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_40%,rgba(201,168,76,0.08),transparent)]" />
          <div className="w-full h-full flex items-end justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full h-[90vh] lg:h-screen max-w-4xl"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full"
              >
                <Image 
                  src="/image/drandre-alias.png" 
                  alt={doctor.name}
                  fill
                  className="object-contain object-bottom select-none"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Conteúdo hero */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-20 pt-40">
          <div className="max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/8
                            px-4 py-2 rounded-full text-xs font-medium text-[#DFC06A] tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-[blink_2s_infinite]" />
              Ortopedia Regenerativa · São José dos Campos
            </div>

            {/* Nome */}
            <p className="text-[#C9A84C] font-body text-base mb-3 tracking-wide">
              {doctor.name}
            </p>

            {/* Headline */}
            <h1 className="font-head text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.0] mb-6">
              Ortopedia<br/>
              <span className="italic font-normal text-[#DFC06A]">regenerativa:</span><br/>
              mais inovação<br/>
              e menos dor.
            </h1>

            <p className="text-white/60 text-base leading-relaxed max-w-md mb-10">
              Tratamento individualizado com base em ciência, tecnologia médica de ponta e foco total em qualidade de vida.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A]
                           font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(201,168,76,0.35)]
                           hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                Agendar Consulta
              </Link>
              <Link href="/sobre"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full
                           border border-white/20 bg-white/5 text-white font-semibold text-sm
                           hover:bg-white/10 hover:-translate-y-0.5 transition-all backdrop-blur-sm">
                Conheça o Dr. André
              </Link>
            </div>

            {/* Phones */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'WhatsApp', value: doctor.phones.whatsappDisplay, href: `https://wa.me/${doctor.phones.whatsapp}`, external: true },
                { label: 'Consultório', value: doctor.phones.consultorio, href: `tel:${doctor.phones.consultorioHref}`, external: false },
              ].map(p => (
                <a key={p.label} href={p.href} target={p.external ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/8 flex items-center justify-center">
                    <span className="text-[#C9A84C] text-sm">{p.external ? '📱' : '📞'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest">{p.label}</span>
                    <span className="block text-sm font-semibold text-white group-hover:text-[#DFC06A] transition-colors">{p.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/25 text-[10px] tracking-widest uppercase">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#C9A84C]/50 animate-[scroll-line_2s_ease-in-out_infinite]" />
          scroll
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          STATS — branco com borda verde suave
      ════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E4E9E2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <RevealOnScroll key={i} delay={i * 80}
                className={`flex flex-col items-center text-center py-10 px-6
                           ${i < stats.length - 1 ? 'border-r border-[#E4E9E2]' : ''}`}>
                <span className="text-2xl mb-2">{s.icon}</span>
                <div className="font-head text-3xl font-bold text-[#0E2A1A] leading-none mb-1.5">
                  {s.number}<span className="text-[#C9A84C] text-xl">{s.suffix}</span>
                </div>
                <div className="text-xs font-medium text-[#4A6355]">{s.label}</div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SOBRE — branco clean
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Foto */}
            <RevealOnScroll direction="left" className="hidden lg:block relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#C9A84C]/10 blur-xl" />
              <div className="aspect-[4/5] rounded-3xl overflow-hidden
                              bg-gradient-to-br from-[#F0F7F3] to-[#E6F2EA]
                              border border-[#E4E9E2] relative">
                <Image 
                  src="/image/drandre.webp" 
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge flutuante */}
              <div className="absolute -bottom-8 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(14,42,26,0.12)] border border-[#E4E9E2]">
                <div className="w-11 h-11 rounded-xl bg-[#0E2A1A] flex items-center justify-center text-[#C9A84C] text-xl mb-3">🏥</div>
                <div className="font-bold text-sm text-[#0E2A1A]">CRM Registrado</div>
                <div className="text-xs text-[#4A6355] mt-0.5">Cirurgião Ortopédico</div>
              </div>
              {/* Gold accent line */}
              <div className="absolute top-8 -left-3 w-1 h-20 bg-gradient-to-b from-[#C9A84C] to-transparent rounded-full" />
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="right">
              {/* Tag dourada */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Sobre o Médico</span>
              </div>

              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] leading-tight mb-6">
                Sou o Dr. André<br/>
                <span className="italic font-normal text-[#1B4D35]">Elias Junqueira</span>
              </h2>

              <p className="text-[#4A6355] leading-relaxed mb-4">
                Cirurgião ortopédico com atuação focada em prevenção, terapias regenerativas e cirurgia minimamente invasiva. Seu tratamento é feito de forma individualizada, com base em ciência, tecnologia médica de ponta e foco total em qualidade de vida.
              </p>
              <p className="text-[#4A6355] leading-relaxed mb-10">
                Se você sofre com dores no joelho, coluna, ombro ou outras articulações — ou deseja prevenir desgastes e evitar cirurgias —, este é o seu lugar.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: '🔬', title: 'Terapias Regenerativas', sub: 'PRP · BMAC · Ácido Hialurônico' },
                  { icon: '⚡', title: 'Cirurgia Minimamente Invasiva', sub: 'Recuperação mais rápida' },
                  { icon: '🛡️', title: 'Ortopedia Preventiva', sub: 'Antes de sentir dor' },
                  { icon: '📺', title: 'BAND TV', sub: 'Referência em medicina' },
                ].map(h => (
                  <div key={h.title} className="flex items-start gap-3 p-4 rounded-xl border border-[#E4E9E2] bg-[#F9FAF8] hover:border-[#C9A84C]/40 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[#0E2A1A] flex items-center justify-center text-base flex-shrink-0">
                      {h.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#0E2A1A]">{h.title}</div>
                      <div className="text-[11px] text-[#8FA89A] mt-0.5">{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contato"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2A1A] text-white font-semibold text-sm
                             shadow-[0_4px_20px_rgba(14,42,26,0.25)] hover:bg-[#1B4D35] hover:-translate-y-0.5 transition-all">
                  Agendar Consulta
                </Link>
                <Link href="/sobre"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0E2A1A] text-[#0E2A1A]
                             font-semibold text-sm hover:bg-[#0E2A1A] hover:text-white hover:-translate-y-0.5 transition-all">
                  Ver mais sobre mim
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          RECONHECIMENTO & IMPRENSA — fundo cinza/verde suave
      ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F9FAF8] border-t border-b border-[#E4E9E2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Credibilidade & Destaques</span>
                <div className="w-8 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-head text-4xl font-semibold text-[#0E2A1A]">
                Reconhecimento e Presença na Mídia
              </h2>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* ALESP */}
            <RevealOnScroll direction="left" className="h-full">
              <div className="bg-white rounded-3xl border border-[#E4E9E2] overflow-hidden shadow-[0_8px_30px_rgba(14,42,26,0.04)] flex flex-col h-full hover:shadow-[0_16px_40px_rgba(14,42,26,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative bg-[#F0F7F3] overflow-hidden group">
                  <Image 
                    src="/image/dr andre/leticiaaguiar.jpeg" 
                    alt="Dr. André Elias Junqueira recebendo moção de congratulação na ALESP da Deputada Leticia Aguiar"
                    fill
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#0E2A1A] px-3 py-1.5 rounded-full border border-[#E4E9E2]">
                      Homenagem Oficial
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">Assembleia Legislativa de SP</span>
                  <h3 className="font-head text-xl font-bold text-[#0E2A1A] mb-3">Homenageado na ALESP</h3>
                  <p className="text-sm text-[#4A6355] leading-relaxed flex-grow">
                    Homenagem oficial de Congratulação conferida pela Deputada Estadual Leticia Aguiar em reconhecimento à dedicação à medicina regenerativa e o compromisso ético e humanizado no cuidado com os pacientes.
                  </p>
                  <div className="mt-6">
                    <Link href="/sobre" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A84C] hover:text-[#DFC06A] transition-colors">
                      Ler sobre a moção
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* BAND TV */}
            <RevealOnScroll direction="right" className="h-full">
              <div className="bg-white rounded-3xl border border-[#E4E9E2] overflow-hidden shadow-[0_8px_30px_rgba(14,42,26,0.04)] flex flex-col h-full hover:shadow-[0_16px_40px_rgba(14,42,26,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative bg-[#0E2A1A] overflow-hidden group">
                  <Image 
                    src="/image/dr andre/band.png" 
                    alt="Entrevista do Dr. André Elias Junqueira na BAND TV"
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#CC0000] px-3 py-1.5 rounded-full border border-[#E4E9E2]">
                      BAND TV
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#C9A84C] text-[#0E2A1A] flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      ▶
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#CC0000] mb-2">Entrevista Televisiva</span>
                  <h3 className="font-head text-xl font-bold text-[#0E2A1A] mb-3">Medicina Regenerativa em Foco</h3>
                  <p className="text-sm text-[#4A6355] leading-relaxed flex-grow">
                    Entrevista especial concedida à BAND TV discutindo como as terapias regenerativas estão revolucionando o tratamento de artrose e dores crônicas, evitando procedimentos cirúrgicos.
                  </p>
                  <div className="mt-6 font-semibold flex items-center gap-4">
                    <a href="https://www.youtube.com/results?search_query=dr+andre+elias+junqueira" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E2A1A] hover:text-[#C9A84C] transition-colors">
                      Assistir Entrevista
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ESPECIALIDADES — fundo tint verde
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F0F7F3]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Especialidades</span>
                <div className="w-8 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] mb-4">
                Áreas de Atuação
              </h2>
              <p className="text-[#4A6355] max-w-xl mx-auto">
                Tratamento ortopédico completo, da prevenção à reabilitação, com tecnologia e cuidado individualizado.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialties.map((sp, i) => (
              <RevealOnScroll key={sp.slug} delay={i * 70}>
                <Link href={`/${sp.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-[#E4E9E2]
                             hover:shadow-[0_20px_60px_rgba(14,42,26,0.12)] hover:-translate-y-1.5
                             hover:border-[#C9A84C]/30 transition-all duration-400 relative overflow-hidden block">
                  {/* Borda top dourada no hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#DFC06A]
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                  <div className="w-14 h-14 rounded-xl bg-[#F0F7F3] border border-[#E4E9E2] flex items-center justify-center text-2xl mb-5
                                  group-hover:bg-[#0E2A1A] group-hover:border-[#0E2A1A] transition-all duration-300">
                    {sp.icon}
                  </div>

                  <h3 className="font-head text-xl font-semibold text-[#0E2A1A] mb-2">{sp.name}</h3>
                  <p className="text-sm text-[#4A6355] leading-relaxed mb-5 line-clamp-2">{sp.shortDesc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] group-hover:gap-3 transition-all">
                    Saiba mais
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Seletor Interativo de Articulações */}
      <JointSelector />

      {/* ════════════════════════════════════════════════
          ORTOPEDIA REGENERATIVA — branco
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Conteúdo */}
            <RevealOnScroll direction="left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Inovação Médica</span>
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] mb-5 leading-tight">
                Ortopedia<br/>
                <span className="italic font-normal">Regenerativa</span>
              </h2>
              <p className="text-[#4A6355] leading-relaxed mb-8">
                Você sabia que é possível tratar artrose, tendinites e lesões musculares <strong className="text-[#0E2A1A]">sem cirurgia</strong>?
                Com as terapias regenerativas, seu próprio corpo pode ser estimulado a se curar.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  { abbr: 'PRP', name: 'Plasma Rico em Plaquetas', desc: 'Regeneração tecidual com concentrado do seu próprio sangue' },
                  { abbr: 'BMAC', name: 'Células-tronco da Medula Óssea', desc: 'Técnica avançada para articulações desgastadas' },
                  { abbr: 'AH', name: 'Ácido Hialurônico', desc: 'Restaura a lubrificação articular e reduz dor' },
                  { abbr: 'REAB', name: 'Reabilitação Funcional', desc: 'Retorno rápido com programa individualizado' },
                ].map((t, i) => (
                  <RevealOnScroll key={t.abbr} delay={i * 60}>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E4E9E2] hover:border-[#C9A84C]/40
                                    hover:bg-[#F9FAF8] hover:translate-x-1.5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-[#0E2A1A] text-[#C9A84C] text-xs font-bold
                                      flex items-center justify-center flex-shrink-0">
                        {t.abbr}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0E2A1A]">{t.name}</div>
                        <div className="text-xs text-[#4A6355] mt-0.5">{t.desc}</div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <Link href="/ortopedia-regenerativa"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2A1A] text-white font-semibold text-sm
                           shadow-[0_4px_20px_rgba(14,42,26,0.25)] hover:bg-[#1B4D35] hover:-translate-y-0.5 transition-all">
                Ver terapias disponíveis
              </Link>
            </RevealOnScroll>

            {/* Card verde escuro */}
            <RevealOnScroll direction="right">
              <div className="relative bg-[#0E2A1A] rounded-3xl p-12 overflow-hidden">
                {/* Glow dourado */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(201,168,76,0.15),transparent_70%)] -translate-y-1/2 translate-x-1/2 rounded-full" />
                {/* Gold line top */}
                <div className="absolute top-0 left-12 w-16 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent" />

                <div className="relative z-10">
                  <div className="text-5xl mb-6">🔬</div>
                  <h3 className="font-head text-2xl font-semibold text-white mb-4 leading-snug">
                    Tratamento Regenerativo em São José dos Campos
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-8">
                    Com excelência e segurança, utilizamos as mais modernas técnicas de medicina regenerativa — sem cirurgia, com resultados reais.
                  </p>
                  <Link href="/contato"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#0E2A1A]
                               font-bold text-sm shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] transition-all">
                    Consultar agora →
                  </Link>

                  <div className="grid grid-cols-3 gap-3 mt-10 pt-8 border-t border-white/8">
                    {[{ val: 'PRP' }, { val: 'BMAC' }, { val: 'AH' }].map(s => (
                      <div key={s.val} className="text-center">
                        <div className="font-head text-xl font-bold text-[#C9A84C]">{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CIRURGIA MINIMAMENTE INVASIVA — tint verde
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F0F7F3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Mini cards */}
            <RevealOnScroll direction="left" className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', title: 'Menor Dor', desc: 'Mínimo trauma aos tecidos', dark: true },
                { icon: '🏠', title: 'Menos Internação', desc: 'Procedimentos ambulatoriais', dark: false },
                { icon: '🏃', title: 'Recuperação Rápida', desc: 'Retorno ágil à rotina', dark: false },
                { icon: '🎯', title: 'Alta Precisão', desc: 'Imagem e instrumentação avançada', dark: true },
              ].map((c, i) => (
                <RevealOnScroll key={i} delay={i * 80}
                  className={`p-6 rounded-2xl border transition-all hover:shadow-[0_8px_32px_rgba(14,42,26,0.10)] hover:-translate-y-1
                    ${c.dark ? 'bg-[#0E2A1A] border-transparent' : 'bg-white border-[#E4E9E2]'}`}>
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className={`font-semibold text-sm mb-1.5 ${c.dark ? 'text-[#DFC06A]' : 'text-[#0E2A1A]'}`}>{c.title}</div>
                  <div className={`text-xs leading-relaxed ${c.dark ? 'text-white/60' : 'text-[#4A6355]'}`}>{c.desc}</div>
                </RevealOnScroll>
              ))}
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Tecnologia Avançada</span>
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-[#0E2A1A] mb-5 leading-tight">
                Cirurgia<br/>
                <span className="italic font-normal">Minimamente Invasiva</span>
              </h2>
              <p className="text-[#4A6355] leading-relaxed mb-7">
                Quando a cirurgia é necessária, a escolha certa faz toda a diferença. Com técnicas menos agressivas, mais precisas e com recuperação rápida.
              </p>

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8FA89A] mb-3">Condições Tratadas</p>
                <div className="flex flex-wrap gap-2">
                  {['Hérnia de Disco', 'Manguito Rotador', 'Artrose', 'Reparos Tendíneos', 'Joelho', 'Quadril', 'Coluna'].map(c => (
                    <span key={c} className="px-3.5 py-1.5 bg-white border border-[#E4E9E2] rounded-full text-sm text-[#0E2A1A]
                                            font-medium hover:bg-[#0E2A1A] hover:text-white hover:border-[#0E2A1A] transition-all cursor-default">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/cirurgia-minimamente-invasiva"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2A1A] text-white font-semibold text-sm
                           shadow-[0_4px_20px_rgba(14,42,26,0.25)] hover:bg-[#1B4D35] hover:-translate-y-0.5 transition-all">
                Ver técnicas disponíveis
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PREVENÇÃO — verde escuro com textura
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0E2A1A] relative overflow-hidden">
        {/* Textura grid */}
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize:'48px 48px'}} />
        {/* Glow dourado top-right */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(201,168,76,0.1),transparent_60%)] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Saúde Proativa</span>
                <div className="w-8 h-px bg-[#C9A84C]" />
              </div>
              <h2 className="font-head text-4xl lg:text-5xl font-semibold text-white mb-4">
                Prevenção é o<br/>
                <span className="italic font-normal text-[#DFC06A]">melhor caminho</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Antes de sentir dor, é possível avaliar o risco de lesões e iniciar um plano de fortalecimento articular.
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {preventionItems.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="group p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm
                                hover:bg-white/6 hover:-translate-y-1.5 hover:border-[#C9A84C]/30
                                transition-all duration-400">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-3 text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/40 mb-6 text-sm">Invista na sua saúde articular antes de sentir dor.</p>
            <Link href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A]
                         font-bold shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
              Agendar Consulta Preventiva
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          BLOG — branco clean
      ════════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Conteúdo Educativo</span>
              </div>
              <h2 className="font-head text-4xl font-semibold text-[#0E2A1A]">Blog e Artigos</h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <Link href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0E2A1A]
                           text-[#0E2A1A] font-semibold text-sm hover:bg-[#0E2A1A] hover:text-white transition-all">
                Ver todos
              </Link>
            </RevealOnScroll>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 80}>
                <Link href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-[#E4E9E2] overflow-hidden flex flex-col
                             hover:shadow-[0_20px_60px_rgba(14,42,26,0.12)] hover:-translate-y-1 transition-all duration-400 block">
                  {/* Imagem */}
                  <div className="aspect-video relative overflow-hidden bg-[#F9FAF8]">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-5xl
                        ${post.type === 'type-1' ? 'bg-[#EBF5EF]' :
                          post.type === 'type-2' ? 'bg-[#F0F7F3]' :
                          post.type === 'type-3' ? 'bg-[#FEF9ED]' :
                          'bg-[#F5F0FE]'}`}>
                        {post.emoji}
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#0E2A1A] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs text-[#8FA89A]">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} leitura</span>
                    </div>
                    <h3 className="font-head text-lg font-semibold text-[#0E2A1A] leading-snug mb-3">{post.title}</h3>
                    <p className="text-sm text-[#4A6355] leading-relaxed flex-1 mb-5 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] group-hover:gap-3 transition-all">
                      Ler artigo
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REGENORTO — tint verde
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F0F7F3]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="rounded-3xl border border-[#C9A84C]/20 bg-white p-10 lg:p-14
                            grid lg:grid-cols-[1fr_auto] gap-12 items-center
                            shadow-[0_8px_40px_rgba(14,42,26,0.06)]">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#C9A84C]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Parceria Tecnológica</span>
                </div>
                <h2 className="font-head text-3xl lg:text-4xl font-semibold text-[#0E2A1A] mb-4">RegenOrto</h2>
                <p className="text-[#4A6355] leading-relaxed mb-6 max-w-lg">
                  O Dr. André Elias Junqueira é associado à <strong className="text-[#0E2A1A]">RegenOrto</strong>, empresa referência em ortopedia regenerativa que une ciência, tecnologia e medicina para os melhores tratamentos articulares sem cirurgia.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Medicina Regenerativa', 'Inovação Ortopédica', 'Tecnologia Médica', 'Resultados Comprovados'].map(t => (
                    <span key={t} className="px-3.5 py-1.5 bg-[#F0F7F3] border border-[#C9A84C]/25 rounded-full text-xs font-medium text-[#0E2A1A]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 min-w-[160px]">
                <div className="w-24 h-24 rounded-2xl bg-[#0E2A1A] flex items-center justify-center
                                text-[#C9A84C] font-head text-2xl font-bold
                                shadow-[0_8px_32px_rgba(14,42,26,0.25)]">
                  RO
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#0E2A1A]">RegenOrto</div>
                  <div className="text-xs text-[#8FA89A]">Em breve — site oficial</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA FINAL — gradiente verde→escuro
      ════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.08),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Agende Agora</span>
              <div className="w-8 h-px bg-[#C9A84C]" />
            </div>
            <h2 className="font-head text-4xl md:text-5xl font-semibold text-white mb-4">
              Pronto para cuidar<br/>
              <span className="italic font-normal text-[#DFC06A]">da sua saúde?</span>
            </h2>
            <p className="text-white/50 mb-10">
              Agende sua consulta com o Dr. André Elias Junqueira e descubra o tratamento ideal para você.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contato"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A]
                           font-bold shadow-[0_4px_24px_rgba(201,168,76,0.4)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                Agendar Consulta
              </Link>
              <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full
                           border border-white/20 bg-white/5 text-white font-semibold
                           hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                WhatsApp → {doctor.phones.whatsappDisplay}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
