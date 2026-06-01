'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLenis } from 'lenis/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation, doctor } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useLenis(({ scroll }: { scroll: number }) => {
    setScrolled(scroll > 60)
  })

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBase = scrolled
    ? 'bg-white/97 backdrop-blur-xl shadow-[0_1px_24px_rgba(14,42,26,0.10)] py-3.5'
    : 'bg-transparent py-5'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ${navBase}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="/image/logo.png"
                alt="Dr. André Elias Junqueira"
                className="h-12 w-auto object-contain transition-all duration-300"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                item.children ? (
                  <div key={item.label} className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}>
                    <button className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${scrolled ? 'text-[#0E2A1A] hover:bg-[#F0F7F3]' : 'text-white/90 hover:bg-white/10'}`}>
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-[0_8px_32px_rgba(14,42,26,0.12)] border border-[#E4E9E2] py-2 z-50">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              className="block px-4 py-2.5 text-sm text-[#0E2A1A] hover:bg-[#F0F7F3] hover:text-[#0E2A1A] transition-colors duration-150">
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href!}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${scrolled ? 'text-[#0E2A1A] hover:bg-[#F0F7F3]' : 'text-white/90 hover:bg-white/10'}`}>
                    {item.label}
                  </Link>
                )
              ))}
              <Link href="/contato"
                className={`ml-3 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5
                  ${scrolled
                    ? 'bg-[#C9A84C] text-[#0E2A1A] shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A]'
                    : 'bg-white text-[#0E2A1A] hover:bg-[#F9FAF8]'}`}>
                Agendar Consulta
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Abrir menu">
              {[0,1,2].map(i => (
                <span key={i} className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${scrolled ? 'bg-[#0E2A1A]' : 'bg-white'}`} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1001] bg-white flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E9E2]">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <img
                  src="/image/logo.png"
                  alt="Dr. André Elias Junqueira"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F0F7F3] transition-colors"
                aria-label="Fechar menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
              {navigation.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.2 }}
                  key={item.label}
                >
                  {item.children ? (
                    <div>
                      <span className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8FA89A] mt-4 mb-1">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-3 rounded-xl text-base font-medium text-[#0E2A1A] hover:bg-[#F0F7F3] transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-lg font-head font-semibold text-[#0E2A1A] hover:bg-[#F0F7F3] transition-colors">
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-6 pb-8 pt-4 border-t border-[#E4E9E2]">
              <Link href="/contato" onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-4 rounded-full bg-[#C9A84C] text-[#0E2A1A] font-semibold text-base shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-[#DFC06A] transition-all">
                Agendar Consulta
              </Link>
              <div className="flex gap-4 mt-4 justify-center text-sm text-[#4A6355]">
                <a href={`tel:${doctor.phones.consultorioHref}`} className="hover:text-[#0E2A1A] transition-colors">{doctor.phones.consultorio}</a>
                <span>·</span>
                <a href={`https://wa.me/${doctor.phones.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0E2A1A] transition-colors">{doctor.phones.whatsappDisplay}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
