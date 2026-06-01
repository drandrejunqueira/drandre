import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos e conteúdo educativo sobre ortopedia, terapias regenerativas e saúde articular pelo Dr. André Elias Junqueira.',
}

const categories = ['Todos', 'Joelho', 'Ombro', 'Regenerativa', 'Terapias', 'Coluna']

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(201,168,76,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(45,107,74,0.3),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] mb-5">
            <span className="block w-6 h-0.5 bg-[#C9A84C] rounded-full" />
            Conteúdo Educativo
          </span>
          <h1 className="font-head text-4xl md:text-5xl font-semibold text-white mb-4">Blog e Artigos</h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Informação de qualidade sobre ortopedia, prevenção e saúde articular para você tomar as melhores decisões.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === 'Todos'
                    ? 'bg-[#0E2A1A] text-white shadow-[0_4px_12px_rgba(14,42,26,0.25)]'
                    : 'bg-white border border-[#E4E9E2] text-[#0E2A1A] hover:bg-[#0E2A1A] hover:text-white hover:border-[#0E2A1A]'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-7">
            {blogPosts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 80}>
                <Link href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-[#E4E9E2] overflow-hidden flex flex-col hover:shadow-[0_20px_60px_rgba(14,42,26,0.10)] hover:-translate-y-1 transition-all duration-400">
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
                        ${post.type === 'type-1' ? 'bg-[#F0F7F3]' :
                          post.type === 'type-2' ? 'bg-[#F0F7F3]/60' :
                          post.type === 'type-3' ? 'bg-amber-50' :
                          'bg-emerald-50'}`}>
                        {post.emoji}
                      </div>
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] px-2.5 py-1 bg-[#C9A84C]/8 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#8FA89A]">{post.date}</span>
                      <span className="text-xs text-[#8FA89A] ml-auto">{post.readTime} leitura</span>
                    </div>
                    <h2 className="font-head text-xl font-semibold text-[#0E2A1A] leading-snug mb-3">{post.title}</h2>
                    <p className="text-sm text-[#4A6355] leading-relaxed flex-1 mb-5">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8FA89A]">{post.author}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] group-hover:gap-3 transition-all">
                        Ler artigo
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="bg-[#F0F7F3] border border-[#CDD6C9] rounded-3xl p-10 lg:p-14 text-center">
              <SectionHeader tag="Fique informado" title="Conteúdo de ortopedia direto para você" center />
              <p className="text-[#4A6355] mt-4 mb-6 max-w-lg mx-auto">
                Acompanhe nosso blog para dicas de saúde articular, novidades em tratamentos e muito mais.
              </p>
              <Link href="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] hover:-translate-y-0.5 transition-all">
                Agendar Consulta
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
