'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { specialties } from '@/lib/data'

export default function JointSelector() {
  const [selectedSlug, setSelectedSlug] = useState(specialties[0].slug)

  const activeJoint = specialties.find(s => s.slug === selectedSlug) || specialties[0]

  return (
    <section className="py-24 bg-[#0E2A1A] relative overflow-hidden">
      {/* Background visual effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,168,76,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(45,107,74,0.2),transparent_60%)]" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C]">Diagnóstico Rápido</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-head text-4xl lg:text-5xl font-semibold text-white mb-4">
            Seletor de Sintomas & Articulações
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm lg:text-base">
            Selecione a articulação onde sente desconforto ou dor para ver de forma instantânea as patologias associadas e os caminhos modernos de regeneração.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-stretch">
          
          {/* Left: Buttons list */}
          <div className="flex flex-col gap-3 justify-center">
            {specialties.map(joint => {
              const isSelected = joint.slug === selectedSlug
              return (
                <button
                  key={joint.slug}
                  onClick={() => setSelectedSlug(joint.slug)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer focus:outline-none
                    ${isSelected
                      ? 'bg-gradient-to-r from-[#C9A84C]/15 to-[#C9A84C]/5 border-[#C9A84C] shadow-[0_8px_32px_rgba(201,168,76,0.15)] text-white'
                      : 'bg-white/3 border-white/8 text-white/60 hover:bg-white/8 hover:border-white/20'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                      ${isSelected ? 'bg-[#C9A84C] text-[#0E2A1A]' : 'bg-white/5 text-white'}`}
                    >
                      {joint.icon}
                    </div>
                    <div>
                      <span className="block font-semibold text-sm lg:text-base">{joint.name}</span>
                      <span className="block text-[11px] opacity-60 mt-0.5">Clique para analisar</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs opacity-60">
                    →
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Dynamic Interactive Info Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJoint.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-md flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual glow accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(201,168,76,0.12),transparent_70%)] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
                <div className="absolute top-0 left-12 w-20 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent" />

                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-xs font-semibold text-[#DFC06A] uppercase tracking-wide mb-6">
                    <span>{activeJoint.icon}</span>
                    <span>Análise do {activeJoint.name}</span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-head text-3xl lg:text-4xl font-semibold text-white mb-5 leading-snug">
                    Problemas no <span className="italic font-normal text-[#DFC06A]">{activeJoint.name}</span>
                  </h3>
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed mb-8">
                    {activeJoint.shortDesc}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Column 1: Conditions list (parsed from description or generic) */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC06A] mb-4">
                        💡 Patologias Comuns
                      </h4>
                      <ul className="space-y-2">
                        {(activeJoint.slug === 'joelho' 
                          ? ['Artrose (Gonartrose)', 'Lesão do Menisco', 'Ruptura de LCA / LCP', 'Condromalácia Patelar']
                          : activeJoint.slug === 'ombro-cotovelo'
                          ? ['Lesão do Manguito Rotador', 'Tendinite do Bíceps', 'Síndrome do Impacto', 'Epicondilite Lateral']
                          : activeJoint.slug === 'coluna'
                          ? ['Hérnia de Disco', 'Dor Lombar Crônica', 'Artrose Facetária', 'Estenose de Canal']
                          : ['Dor Articular Crônica', 'Desgaste da Cartilagem', 'Tendinites Localizadas', 'Bursites / Processo Inflamatório']
                        ).map((cond, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                            {cond}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Suggested Treatments */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC06A] mb-4">
                        🔬 Terapias Avançadas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeJoint.treatments.slice(0, 4).map((treat, i) => (
                          <span 
                            key={i} 
                            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-white/90 hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 transition-colors"
                          >
                            {treat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/8 mt-auto">
                  <Link 
                    href={`/${activeJoint.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all"
                  >
                    Ver Tudo Sobre {activeJoint.name}
                  </Link>
                  <Link 
                    href="/contato"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                  >
                    Marcar Consulta
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
