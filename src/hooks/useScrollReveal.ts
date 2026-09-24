import { useEffect } from 'react'

const STAGGER_MS = 70
const REVEAL_MS = 800

/**
 * Reveals `.fade-in` elements as they scroll into view. Once the rise has played, the classes are removed so the
 * element's own transitions (hover lifts and the like) are no longer shadowed by the reveal's.
 * `key` re-runs the pass — the page or the language changed and new elements are in the DOM.
 */
export function useScrollReveal(key?: string) {
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers = new Set<ReturnType<typeof setTimeout>>()

    const settle = (el: Element) => {
      el.classList.add('visible')
      const stagger = [...el.classList].find((c) => c.startsWith('stagger-'))
      const delay = stagger ? Number(stagger.slice('stagger-'.length)) * STAGGER_MS : 0
      const t = setTimeout(() => {
        el.classList.remove('fade-in', 'visible')
        timers.delete(t)
      }, still ? 0 : REVEAL_MS + delay + 50)
      timers.add(t)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          settle(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const raf = requestAnimationFrame(() => {
      for (const el of document.querySelectorAll('.fade-in')) {
        if (el.classList.contains('visible')) continue
        observer.observe(el)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      for (const t of timers) clearTimeout(t)
    }
  }, [key])
}
