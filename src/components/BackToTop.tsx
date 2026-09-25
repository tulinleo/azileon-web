import { useEffect, useState } from 'react'
import { ArrowUp } from '@phosphor-icons/react'
import { useT } from '../i18n'

/* Fixed in the bottom-right corner once the page has scrolled a screen or so. */
export default function BackToTop() {
  const [show, setShow] = useState(false)
  const t = useT()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t('backToTop')}
      tabIndex={show ? 0 : -1}
      className={`btn-dark fixed right-5 bottom-5 z-40 w-12 h-12 rounded-2xl grid place-items-center border-0 cursor-pointer ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} weight="bold" />
    </button>
  )
}
