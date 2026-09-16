import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { doctor } from '@/lib/data'
import { getLandingPage, lpSlugs } from '@/lib/lp'
import LpLeadForm from '@/components/lp/LpLeadForm'
import LpStickyBar from '@/components/lp/LpStickyBar'
import LpTrustStrip from '@/components/lp/LpTrustStrip'
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton'
import { WhatsAppIcon } from '@/components/whatsapp/WhatsAppIcon'

/**
 * Landing page de anúncio (Google Ads) — /lp/[slug]
 *
 * Diferenças em relação ao site institucional, todas por conversão:
 * - sem menu e sem rodapé com links: a única saída é o formulário ou o WhatsApp;
 * - message match: o H1 repete a intenção da busca ("dor no joelho");
 * - formulário na primeira dobra também no mobile (99% do tráfego pago);
 * - prova social real (BAND TV, ALESP, BAMR) antes do conteúdo;
 * - sem framer-motion/Lenis: página leve, LCP é texto;
 * - noindex: é destino de anúncio, não concorre com as páginas orgânicas.
 */

const CRM = 'CRM-SP 150430'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.address.full)}`

const STEPS = [
  {
    n: '01',
    title: 'Você pede a consulta',
    text: 'Preenche o formulário ou chama no WhatsApp. A equipe retorna em horário comercial com os horários disponíveis.',
  },
  {
    n: '02',
    title: 'Avaliação com o Dr. André',
    text: 'Consulta clínica completa: histórico, exame físico e análise dos exames que você já tiver. Se precisar, pedimos os complementares.',
  },
  {
    n: '03',
    title: 'Plano de tratamento claro',
    text: 'Você sai sabendo o diagnóstico, as opções (da mais conservadora à cirúrgica) e os próximos passos.',
  },
]

export const dynamicParams = false

export function generateStaticParams() {
  return lpSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const lp = getLandingPage(slug)
  if (!lp) return {}
  return {
    title: { absolute: lp.title },
    description: lp.description,
    alternates: { canonical: `/lp/${lp.slug}` },
    robots: { index: false, follow: false },
  }
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lp = getLandingPage(slug)
  if (!lp) notFound()

  const complaints = lp.conditions.slice(0, 8)
  const [headBefore, headHighlight, headAfter] = lp.headline

  return (
    <div className="lp bg-off-white text-green">
      {/* ── Header enxuto: logo + telefone. Sem menu = sem vazamento. ── */}
      <header className="bg-green">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          <div className="relative w-[112px] h-[60px]">
            <Image
              src="/image/logo.png"
              alt={doctor.name}
              fill
              sizes="112px"
              priority
              className="object-contain"
            />
          </div>
          <a
            href={`tel:${doctor.phones.consultorioHref}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-gold transition-colors"
          >
            <span
              className="w-8 h-8 rounded-lg border border-gold/30 bg-gold/10 flex items-center justify-center text-sm"
              aria-hidden="true"
            >
              📞
            </span>
            <span className="hidden sm:inline">{doctor.phones.consultorio}</span>
            <span className="sm:hidden">Ligar</span>
          </a>
        </div>
      </header>

      {/* ── Hero: promessa + formulário na dobra ── */}
      <section className="relative bg-green overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_20%,rgba(201,168,76,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_5%_90%,rgba(45,107,74,0.35),transparent)]" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 grid lg:grid-cols-12 gap-8 lg:gap-x-12 lg:gap-y-8 items-start">
          {/* Bloco 1 — promessa. No mobile o formulário vem logo abaixo (ordem do DOM). */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 border border-gold/40 bg-gold/8 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-gold-light tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-blink" />
              {lp.eyebrow}
            </p>

            <h1 className="font-head text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-semibold text-white mb-5">
              {headBefore}{' '}
              <span className="italic font-normal text-gold-light">{headHighlight}</span>{' '}
              {headAfter}
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl">{lp.sub}</p>
          </div>

          {/* Bloco 2 — formulário: primeira dobra no mobile, coluna direita no desktop. */}
          <div
            id="agendar"
            data-lp-form
            className="lg:col-span-5 lg:row-span-2 lg:col-start-8 scroll-mt-4"
          >
            <LpLeadForm formSpecialty={lp.formSpecialty} location="hero" complaints={complaints} />
            <WhatsAppButton
              specialty={lp.formSpecialty}
              source={`lp_${lp.slug}_hero`}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 text-white font-semibold text-sm hover:bg-[#25D366]/20 transition-all"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              Prefiro falar pelo WhatsApp
            </WhatsAppButton>
          </div>

          {/* Bloco 3 — por que confiar: bullets + médico. */}
          <div className="lg:col-span-7 lg:col-start-1">
            <ul className="space-y-3 mb-8">
              {lp.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-white/85 text-sm sm:text-base leading-snug"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center flex-shrink-0">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Credenciais + médico: prova antes do pedido */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 pr-5 max-w-md">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
                <Image
                  src="/image/dr.webp"
                  alt={doctor.name}
                  fill
                  sizes="56px"
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <div className="font-head text-white font-semibold leading-tight">
                  {doctor.name}
                </div>
                <div className="text-xs text-white/55 mt-0.5">
                  {doctor.title} · {CRM} · 10+ anos
                </div>
                <div className="text-xs text-gold mt-0.5">
                  📍 {doctor.address.neighborhood}, São José dos Campos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LpTrustStrip />

      {/* ── Dores: o visitante se reconhece ── */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-pains-heading">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
              Sinais de alerta
            </p>
            <h2
              id="lp-pains-heading"
              className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-4"
            >
              {lp.painsTitle}
            </h2>
            <p className="text-text-mid leading-relaxed mb-6">
              Quanto antes a causa é identificada, mais opções conservadoras existem — e menor a
              chance de precisar de cirurgia.
            </p>
            <WhatsAppButton
              specialty={lp.formSpecialty}
              source={`lp_${lp.slug}_dores`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold text-sm shadow-green hover:-translate-y-0.5 transition-all"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              Descrever meu caso no WhatsApp
            </WhatsAppButton>
          </div>
          <ul className="grid gap-3">
            {lp.pains.map((pain) => (
              <li
                key={pain}
                className="flex items-start gap-3 rounded-2xl bg-white border border-border p-4 shadow-card"
              >
                <span
                  className="mt-0.5 w-6 h-6 rounded-lg bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 text-sm"
                  aria-hidden="true"
                >
                  !
                </span>
                <span className="text-sm sm:text-base leading-snug">{pain}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="py-14 sm:py-20 bg-green text-white" aria-labelledby="lp-steps-heading">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            Como funciona
          </p>
          <h2
            id="lp-steps-heading"
            className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-10 max-w-2xl"
          >
            Três passos entre a dor de hoje e um plano de tratamento
          </h2>
          <ol className="grid md:grid-cols-3 gap-5">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="font-head text-4xl text-gold mb-3">{step.n}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── O que tratamos ── */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-conditions-heading">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
              Condições
            </p>
            <h2
              id="lp-conditions-heading"
              className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-6"
            >
              {lp.conditionsTitle}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {lp.conditions.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm sm:text-base">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 rounded-3xl bg-green-tint border border-border p-6">
            <h3 className="font-head text-xl font-semibold mb-4">Abordagens que usamos</h3>
            <ul className="flex flex-wrap gap-2">
              {lp.treatments.map((t) => (
                <li
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-white border border-border text-xs sm:text-sm font-medium"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-xs text-text-mid leading-relaxed mt-5">
              A indicação depende da avaliação individual. Nenhum tratamento é definido antes da
              consulta.
            </p>
          </div>
        </div>
      </section>

      {/* ── Médico ── */}
      <section
        className="py-14 sm:py-20 bg-white border-y border-border"
        aria-labelledby="lp-doctor-heading"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-5 gap-8 sm:gap-12 items-center">
          <div className="md:col-span-2 relative aspect-[705/1000] max-h-[420px] md:max-h-none rounded-3xl overflow-hidden mx-auto w-full max-w-[300px] md:max-w-none">
            <Image
              src="/image/dr.webp"
              alt={doctor.name}
              fill
              sizes="(min-width: 768px) 360px, 300px"
              className="object-cover object-top"
            />
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
              Quem vai te atender
            </p>
            <h2
              id="lp-doctor-heading"
              className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-2"
            >
              {doctor.name}
            </h2>
            <p className="text-sm font-semibold text-text-mid mb-5">
              {doctor.title} · {CRM}
            </p>
            <p className="text-text-mid leading-relaxed mb-6">{doctor.description}</p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                'Cirurgião ortopédico com mais de 10 anos de prática',
                'Foco em prevenção e cirurgia minimamente invasiva',
                'Terapias regenerativas quando há indicação',
                'Consultório no Jardim Aquarius, São José dos Campos',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-green-tint text-green-soft flex items-center justify-center flex-shrink-0">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ (details nativo: zero JS) ── */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-faq-heading">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            Dúvidas frequentes
          </p>
          <h2
            id="lp-faq-heading"
            className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-8"
          >
            O que os pacientes perguntam antes da consulta
          </h2>
          <div className="space-y-3">
            {lp.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-white border border-border p-5 open:shadow-card-md transition-shadow"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-base [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    className="w-7 h-7 rounded-full bg-green-tint text-green flex items-center justify-center flex-shrink-0 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-sm sm:text-base text-text-mid leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Local + CTA final ── */}
      <section
        id="agendar-final"
        className="py-14 sm:py-20 bg-green text-white scroll-mt-4"
        aria-labelledby="lp-final-heading"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">
              Consultório em SJC
            </p>
            <h2
              id="lp-final-heading"
              className="font-head text-3xl sm:text-4xl font-semibold leading-tight mb-6"
            >
              Dê o primeiro passo hoje. O resto a gente organiza com você.
            </h2>
            <address className="not-italic space-y-4 text-white/80 text-sm sm:text-base">
              <p className="flex items-start gap-3">
                <span
                  className="w-9 h-9 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  📍
                </span>
                <span>
                  {doctor.address.street}
                  <br />
                  {doctor.address.neighborhood} — {doctor.address.city}
                  <br />
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-4 text-sm"
                  >
                    Ver no Google Maps
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  🕗
                </span>
                {doctor.hours}
              </p>
              <p className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  📞
                </span>
                <a
                  href={`tel:${doctor.phones.consultorioHref}`}
                  className="hover:text-gold transition-colors"
                >
                  {doctor.phones.consultorio}
                </a>
              </p>
            </address>
          </div>
          <div className="lg:col-span-6" data-lp-form>
            <LpLeadForm
              formSpecialty={lp.formSpecialty}
              location="final"
              complaints={complaints}
              variant="dark"
            />
          </div>
        </div>
      </section>

      <footer className="bg-green text-white/45 text-xs border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-6 pb-28 lg:pb-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>
            {doctor.name} · {CRM} · {doctor.address.full}
          </span>
          <span>
            © {new Date().getFullYear()} · Responsável técnico: {doctor.name}
          </span>
        </div>
      </footer>

      <LpStickyBar formSpecialty={lp.formSpecialty} lpSlug={lp.slug} />
    </div>
  )
}
