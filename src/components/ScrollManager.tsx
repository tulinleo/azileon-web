import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Keeps scroll position sane across client-side navigation:
 * - a hash (/#contact) scrolls to that element, waiting one frame for the page to render
 * - a plain route change scrolls to the top
 * - the very first render is left alone so the browser can restore scroll on reload
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView()
        return Boolean(el)
      }
      if (!scrollToTarget()) {
        const raf = requestAnimationFrame(scrollToTarget)
        return () => cancelAnimationFrame(raf)
      }
      return
    }
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
