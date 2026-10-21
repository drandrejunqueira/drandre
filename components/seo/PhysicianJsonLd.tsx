import { doctor } from '@/lib/data'

const SITE_URL = 'https://drandreortopedia.com.br'

/**
 * Schema.org do consultório (Physician). Liga o site ao Perfil da Empresa no
 * Google e aos perfis externos (sameAs) para o Google e as IAs de busca
 * entenderem que é a mesma entidade. Sem aggregateRating de propósito:
 * reaproveitar avaliações do Google no próprio schema viola a diretriz.
 */
const physician = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': `${SITE_URL}/#physician`,
  name: doctor.name,
  description: doctor.description,
  url: SITE_URL,
  image: `${SITE_URL}/image/drandre.webp`,
  telephone: doctor.phones.consultorioHref,
  email: doctor.email,
  medicalSpecialty: ['https://schema.org/Musculoskeletal', 'https://schema.org/Surgical'],
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'CRM-SP', value: doctor.crm.replace(/\D/g, '') },
    { '@type': 'PropertyValue', propertyID: 'RQE', value: doctor.rqe.replace(/\D/g, '') },
  ],
  address: { '@type': 'PostalAddress', ...doctor.address.schema },
  areaServed: { '@type': 'City', name: doctor.address.schema.addressLocality },
  sameAs: [doctor.social.instagram, doctor.social.doctoralia],
}

export default function PhysicianJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(physician).replace(/</g, '\\u003c') }}
    />
  )
}
