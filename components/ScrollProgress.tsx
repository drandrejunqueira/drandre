'use client'

import { useLenis } from 'lenis/react'
import { useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useLenis(({ progress }: { progress: number }) => {
    if (barRef.current) {
      barRef.current.style.width = `${progress * 100}%`
    }
  })

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
    />
  )
}
