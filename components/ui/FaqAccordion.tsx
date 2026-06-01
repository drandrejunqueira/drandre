'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FAQItem[]
  title?: string
}

export default function FaqAccordion({ items, title = 'Perguntas Frequentes' }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (!items || items.length === 0) return null

  return (
    <div className="w-full max-w-3xl mx-auto">
      {title && (
        <h3 className="font-head text-2xl lg:text-3xl font-semibold text-[#0E2A1A] mb-8 text-center">
          {title}
        </h3>
      )}
      
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = activeIndex === index
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E4E9E2] overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/40 hover:shadow-[0_8px_24px_rgba(14,42,26,0.04)]"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-btn-${index}`}
                className="w-full flex items-center justify-between text-left p-6 gap-6 cursor-pointer focus:outline-none"
              >
                <span className="font-head text-base lg:text-lg font-semibold text-[#0E2A1A] group-hover:text-[#C9A84C] transition-colors">
                  {item.q}
                </span>
                
                {/* Custom animated toggle icon */}
                <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {/* Horizontal line */}
                  <div className="absolute w-4 h-0.5 bg-[#C9A84C] rounded-full transition-transform duration-300" />
                  {/* Vertical line (rotates/fades out) */}
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-0.5 h-4 bg-[#C9A84C] rounded-full"
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.25, delay: 0.05 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3, ease: 'easeInOut' },
                        opacity: { duration: 0.15 }
                      }
                    }}
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-[#F0F7F3] text-sm lg:text-base text-[#4A6355] leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
