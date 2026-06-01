import Link from 'next/link'
import { doctor, specialties, services } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-[#0E2A1A] text-white/60">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center text-[#C9A84C] font-bold font-head text-lg">
                A
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold font-head text-white/90">{doctor.name}</span>
                <span className="text-xs text-white/50">{doctor.title}</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Cirurgião ortopédico em São José dos Campos com foco em prevenção, terapias regenerativas e cirurgia minimamente invasiva.
            </p>
            <div className="flex gap-3">
              <a href={doctor.social.instagram} aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A84C]/15 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href={doctor.social.facebook} aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A84C]/15 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/20 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Especialidades */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-5">Especialidades</h4>
            <ul className="space-y-3">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-sm hover:text-white/90 transition-colors duration-150">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-5">Serviços</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-sm hover:text-white/90 transition-colors duration-150">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/prevencao" className="text-sm hover:text-white/90 transition-colors duration-150">
                  Prevenção Ortopédica
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-white/90 transition-colors duration-150">
                  Blog e Artigos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-5">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${doctor.phones.consultorioHref}`} className="hover:text-white/90 transition-colors">
                  {doctor.phones.consultorio}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/90 transition-colors">
                  WhatsApp: {doctor.phones.whatsappDisplay}
                </a>
              </li>
              <li className="pt-2 text-white/40 leading-relaxed">
                {doctor.address.street}<br/>
                {doctor.address.neighborhood}<br/>
                {doctor.address.city}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {doctor.name}. Todos os direitos reservados.</span>
          <span>
            Desenvolvido por{' '}
            <a href="https://2timeweb.com.br" target="_blank" rel="noopener noreferrer"
              className="text-[#C9A84C] font-semibold hover:text-[#DFC06A] transition-colors">
              2TimeWeb
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
