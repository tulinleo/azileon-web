import { useEffect } from 'react'

export function useScrollReveal() {
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

    const elements = document.querySelectorAll('.fade-in')
    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])
}
