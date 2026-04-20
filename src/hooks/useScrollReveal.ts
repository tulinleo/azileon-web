import { useEffect } from 'react'

export function useScrollReveal(lang?: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )

    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.fade-in')
      for (const el of elements) {
        if (el.classList.contains('visible')) continue
        observer.observe(el)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [lang])
}
