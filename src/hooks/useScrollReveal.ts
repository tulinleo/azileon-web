import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useScrollRevealAll(selector = '.fade-in', threshold = 0.12) {
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is painted before observing
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll(selector)

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold }
      )

      elements.forEach((el) => observer.observe(el))

      // Store for cleanup
      ;(window as unknown as Record<string, IntersectionObserver>).__scrollRevealObserver = observer
    })

    return () => {
      cancelAnimationFrame(raf)
      const obs = (window as unknown as Record<string, IntersectionObserver>).__scrollRevealObserver
      if (obs) obs.disconnect()
    }
  }, [selector, threshold])
}
