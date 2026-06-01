import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { blogPosts, doctor } from '@/lib/data'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-head text-2xl font-semibold text-[#0E2A1A] mt-10 mb-4">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="font-head text-xl font-semibold text-[#0E2A1A] mt-8 mb-3">{line.slice(4)}</h3>
      }
      if (line.startsWith('- ')) {
        return (
          <div key={i} className="flex items-start gap-2.5 my-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C9A84C] flex-shrink-0 mt-0.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span className="text-[#4A6355]">{line.slice(2)}</span>
          </div>
        )
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-[#0E2A1A] my-2">{line.replace(/\*\*/g, '')}</p>
      }
      if (line.trim() === '') return <div key={i} className="h-3" />
      return <p key={i} className="text-[#4A6355] leading-relaxed my-2">{line}</p>
    })
  }

  return (
    <>
      {/* Hero do post */}
      <section className="pt-32 pb-16 bg-[#0E2A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.07),transparent)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-xs text-white/40 mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#C9A84C]">{post.category}</span>
            </nav>

            <span className="inline-block px-3 py-1 bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-semibold rounded-full uppercase tracking-widest mb-5">
              {post.category}
            </span>
            <h1 className="font-head text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-white/50">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagem de capa */}
      <div className="w-full aspect-[21/7] md:aspect-[21/6] relative overflow-hidden bg-[#F0F7F3]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {post.emoji}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Artigo */}
            <article className="lg:col-span-2">
              <RevealOnScroll>
                <div className="prose max-w-none">
                  {renderContent(post.content)}
                </div>
              </RevealOnScroll>

              {/* Author bio */}
              <div className="mt-12 pt-8 border-t border-[#E4E9E2]">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#0E2A1A] flex items-center justify-center text-[#C9A84C] font-head font-bold text-xl flex-shrink-0">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-[#0E2A1A]">{doctor.name}</div>
                    <div className="text-sm text-[#4A6355] mt-1">{doctor.title} · São José dos Campos – SP</div>
                    <p className="text-sm text-[#4A6355] mt-2 leading-relaxed">
                      Especialista em ortopedia regenerativa, cirurgia minimamente invasiva e prevenção. Atua em SJC com foco em qualidade de vida e tecnologia médica de ponta.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA */}
              <RevealOnScroll direction="right">
                <div className="bg-[#0E2A1A] rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,rgba(201,168,76,0.10),transparent)]" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-3">🩺</div>
                    <h3 className="font-semibold mb-2">Agende uma consulta</h3>
                    <p className="text-white/65 text-sm mb-5">Tire suas dúvidas diretamente com o Dr. André.</p>
                    <Link href="/contato"
                      className="block text-center py-3 rounded-xl bg-[#C9A84C] text-[#0E2A1A] font-semibold text-sm hover:bg-[#DFC06A] transition-colors">
                      Agendar Consulta
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Contato */}
              <RevealOnScroll direction="right" delay={100}>
                <div className="bg-[#F9FAF8] rounded-2xl border border-[#E4E9E2] p-6">
                  <h3 className="font-semibold text-[#0E2A1A] mb-4 text-sm">Fale conosco</h3>
                  <div className="space-y-3">
                    <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[#4A6355] hover:text-[#0E2A1A] transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center">📱</span>
                      {doctor.phones.whatsappDisplay}
                    </a>
                    <a href={`tel:${doctor.phones.consultorioHref}`}
                      className="flex items-center gap-3 text-sm text-[#4A6355] hover:text-[#0E2A1A] transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-[#F0F7F3] flex items-center justify-center">📞</span>
                      {doctor.phones.consultorio}
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Artigos relacionados */}
              <RevealOnScroll direction="right" delay={200}>
                <div className="bg-white rounded-2xl border border-[#E4E9E2] p-6">
                  <h3 className="font-semibold text-[#0E2A1A] mb-4 text-sm">Outros artigos</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`}
                        className="group flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-[#F0F7F3] flex items-center justify-center text-xl flex-shrink-0">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            p.emoji
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#0E2A1A] group-hover:text-[#C9A84C] transition-colors line-clamp-2 leading-snug">
                            {p.title}
                          </div>
                          <div className="text-xs text-[#8FA89A] mt-1">{p.readTime} leitura</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
