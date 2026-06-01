'use client'

import { useState } from 'react'
import { doctor, specialties, services } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

const especialidades = [
  ...specialties.map(s => s.name),
  ...services.map(s => s.name),
  'Avaliação Preventiva',
  'Outra',
]

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', sobrenome: '', email: '', celular: '', especialidade: '', mensagem: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Falha ao enviar')

      setSubmitted(true)
      setForm({ nome: '', sobrenome: '', email: '', celular: '', especialidade: '', mensagem: '' })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error(err)
      setError('Houve um erro ao enviar sua mensagem. Por favor, tente novamente ou use o WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const contactItems = [
    {
      icon: '📍',
      label: 'Endereço',
      content: (
        <span className="text-sm text-[#4A6355] leading-relaxed">
          {doctor.address.street}<br/>
          {doctor.address.neighborhood}<br/>
          {doctor.address.city}
        </span>
      ),
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      content: (
        <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="text-sm text-[#4A6355] hover:text-[#0E2A1A] transition-colors">
          {doctor.phones.whatsappDisplay}
        </a>
      ),
    },
    {
      icon: '📞',
      label: 'Telefone',
      content: (
        <a href={`tel:${doctor.phones.consultorioHref}`}
          className="text-sm text-[#4A6355] hover:text-[#0E2A1A] transition-colors">
          {doctor.phones.consultorio}
        </a>
      ),
    },
  ]

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
              Fale Conosco
            </span>
            <h1 className="font-head text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              Agende sua Consulta
            </h1>
            <p className="text-white/65 text-lg">
              Estamos prontos para atendê-lo em São José dos Campos. Entre em contato e nossa equipe retornará em até 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-20 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Informações */}
            <div>
              <RevealOnScroll direction="left">
                <SectionHeader tag="Contato" title="Como nos encontrar" />
                <p className="text-[#4A6355] leading-relaxed mt-5 mb-10">
                  Atendemos pacientes de São José dos Campos e região. Agende pelo WhatsApp, telefone ou pelo formulário ao lado.
                </p>

                <div className="space-y-6 mb-10">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#0E2A1A] flex items-center justify-center text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0E2A1A] mb-1">{item.label}</div>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8FA89A] mb-4">Redes Sociais</p>
                  <div className="flex gap-3">
                    {[
                      { href: doctor.social.instagram, label: 'Instagram', icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="2" y="2" width="20" height="20" rx="5"/>
                          <circle cx="12" cy="12" r="5"/>
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                      )},
                      { href: doctor.social.facebook, label: 'Facebook', icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      )},
                      { href: `https://wa.me/${doctor.phones.whatsapp}`, label: 'WhatsApp', icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                        </svg>
                      )},
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-11 h-11 rounded-xl bg-white border border-[#E4E9E2] flex items-center justify-center text-[#4A6355] hover:bg-[#0E2A1A] hover:text-[#C9A84C] hover:border-[#0E2A1A] transition-all hover:-translate-y-0.5">
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Formulário */}
            <RevealOnScroll direction="right">
              <div className="bg-white rounded-3xl border border-[#E4E9E2] p-8 lg:p-10 shadow-[0_2px_12px_rgba(14,42,26,0.06)]">
                <h2 className="font-head text-2xl font-semibold text-[#0E2A1A] mb-2">Envie uma mensagem</h2>
                <p className="text-sm text-[#4A6355] mb-8">Retornaremos em até 24 horas.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="nome">Nome *</label>
                      <input id="nome" type="text" required placeholder="Seu nome"
                        value={form.nome}
                        onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A] placeholder:text-[#8FA89A]
                                   focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="sobrenome">Sobrenome *</label>
                      <input id="sobrenome" type="text" required placeholder="Sobrenome"
                        value={form.sobrenome}
                        onChange={e => setForm(f => ({ ...f, sobrenome: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A] placeholder:text-[#8FA89A]
                                   focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="email">E-mail *</label>
                      <input id="email" type="email" required placeholder="seu@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A] placeholder:text-[#8FA89A]
                                   focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="celular">Celular *</label>
                      <input id="celular" type="tel" required placeholder="(12) 9 9999-9999"
                        value={form.celular}
                        onChange={e => setForm(f => ({ ...f, celular: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A] placeholder:text-[#8FA89A]
                                   focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="especialidade">Área de interesse</label>
                    <select id="especialidade"
                      value={form.especialidade}
                      onChange={e => setForm(f => ({ ...f, especialidade: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A]
                                 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all">
                      <option value="">Selecione uma área</option>
                      {especialidades.map(esp => (
                        <option key={esp} value={esp}>{esp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A1A] mb-2" htmlFor="mensagem">Mensagem</label>
                    <textarea id="mensagem" rows={4} placeholder="Descreva seu caso ou dúvida..."
                      value={form.mensagem}
                      onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E9E2] bg-white text-sm text-[#0E2A1A] placeholder:text-[#8FA89A] resize-none
                                 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/15 transition-all" />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading || submitted}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm transition-all
                      ${submitted
                        ? 'bg-[#2D6B4A] text-white cursor-default'
                        : 'bg-[#C9A84C] text-[#0E2A1A] shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed'}`}>
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
                          <path d="M21 12a9 9 0 00-9-9"/>
                        </svg>
                        Enviando...
                      </>
                    ) : submitted ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Mensagem Enviada!
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mapa placeholder */}
      <section className="h-80 bg-[#F0F7F3] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <div className="text-5xl mb-3">📍</div>
          <p className="font-semibold text-[#0E2A1A]">{doctor.address.street}</p>
          <p className="text-sm text-[#4A6355]">{doctor.address.neighborhood} · {doctor.address.city}</p>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(doctor.address.full)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#0E2A1A] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(14,42,26,0.25)] hover:bg-[#1B4D35] hover:-translate-y-0.5 transition-all">
            Abrir no Google Maps →
          </a>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04),transparent_60%)]" />
      </section>
    </>
  )
}
