interface Props {
  tag?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeader({ tag, title, subtitle, center = false, light = false }: Props) {
  return (
    <div className={center ? 'text-center' : ''}>
      {tag && (
        <span className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4 ${light ? 'text-[#DFC06A]' : 'text-[#C9A84C]'}`}>
          <span className={`block w-6 h-0.5 rounded-full ${light ? 'bg-[#DFC06A]' : 'bg-[#C9A84C]'}`} />
          {tag}
        </span>
      )}
      <h2 className={`font-head text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${light ? 'text-white' : 'text-[#0E2A1A]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/65' : 'text-[#4A6355]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
