'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3
}

// Konten dengan class w-reveal disembunyikan (opacity 0) sampai class w-visible ditambahkan.
// Fallback: kalau IntersectionObserver tidak ada, atau elemen sudah terlihat saat load,
// langsung tampilkan. Tanpa ini konten bisa tetap tersembunyi di browser tertentu.
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => el.classList.add('w-visible')

    if (typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(el)

    // Pengaman: setelah 2.5 detik, paksa tampil supaya konten tidak pernah hilang permanen.
    const timer = window.setTimeout(show, 2500)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  const delayClass = delay > 0 ? ` w-reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={`w-reveal${delayClass} ${className}`}>
      {children}
    </div>
  )
}
