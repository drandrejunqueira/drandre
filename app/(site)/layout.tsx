import Navbar from '@/components/Navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import PhysicianJsonLd from '@/components/seo/PhysicianJsonLd'

/** Layout do site institucional: menu, rodapé cinematográfico e botão flutuante. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <PhysicianJsonLd />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 bg-background min-h-screen">{children}</main>
      <CinematicFooter />
      <WhatsAppFloat />
    </SmoothScroll>
  )
}
