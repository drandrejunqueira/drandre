import Image from 'next/image'

/**
 * Prova social que hoje só existe em /sobre, trazida para a primeira dobra da LP.
 * Fotos reais (BAND TV, ALESP, BAMR) valem mais que qualquer selo genérico.
 */
const PROOFS = [
  {
    src: '/image/dr andre/band.png',
    alt: 'Dr. André Elias Junqueira em entrevista na BAND TV',
    label: 'Entrevistado pela BAND TV',
    detail: 'Medicina regenerativa no tratamento da dor',
  },
  {
    src: '/image/dr andre/congratulacao.webp',
    alt: 'Dr. André recebendo moção de congratulação na ALESP',
    label: 'Moção de congratulação — ALESP',
    detail: 'Reconhecimento público pela Assembleia Legislativa de SP',
  },
  {
    src: '/image/dr andre/abmr.avif',
    alt: 'Certificado da Academia Brasileira de Medicina Regenerativa',
    label: 'Membro da BAMR',
    detail: 'Academia Brasileira de Medicina Regenerativa',
  },
]

export default function LpTrustStrip() {
  return (
    <section aria-labelledby="lp-proof-heading" className="bg-white border-y border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <h2 id="lp-proof-heading" className="sr-only">
          Reconhecimento e credenciais
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {PROOFS.map((proof) => (
            <figure
              key={proof.label}
              className="flex sm:flex-col items-center sm:items-start gap-4 rounded-2xl border border-border bg-off-white p-3 sm:p-4"
            >
              <div className="relative w-24 h-16 sm:w-full sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-green-tint">
                <Image
                  src={proof.src}
                  alt={proof.alt}
                  fill
                  sizes="(min-width: 640px) 320px, 96px"
                  className="object-cover"
                />
              </div>
              <figcaption>
                <div className="font-semibold text-sm text-green leading-snug">{proof.label}</div>
                <div className="text-xs text-text-mid mt-0.5 leading-snug">{proof.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
