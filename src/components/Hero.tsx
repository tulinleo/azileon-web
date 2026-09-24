import { lazy, Suspense, useSyncExternalStore } from 'react'
import Button from './Button'
import { useT } from '../i18n'

/* First screen: the pitch on the left, the "Our products" 3D showcase on the right — the products in two tiers,
   each with its label, on a fixed camera. The showcase carries three.js: loaded on demand, and only where it is
   shown (md and up); phones get the text alone. */
const ProductShowcase = lazy(() => import('./ProductShowcase'))
const DESKTOP = '(min-width: 768px)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useDesktop = () => useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)

export default function Hero() {
  const t = useT()
  const desktop = useDesktop()

  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-16 dot-grid">
      {/* wider than the other sections (7xl vs 6xl): the showcase needs the room */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[minmax(0,9fr)_minmax(0,14fr)] items-center gap-10 lg:gap-8 py-12 md:py-16">
        <div className="max-w-xl">
          <p className="hero-animate hero-delay-1 text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4 font-medium">
            {t('heroLabel')}
          </p>
          <h1 className="hero-animate hero-delay-2 font-[var(--font-heading)] text-[clamp(2.5rem,3vw_+_0.75rem,3.75rem)] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6 text-balance">
            {t('heroTitle')}
          </h1>
          <p className="hero-animate hero-delay-3 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[46ch] mb-8">
            {t('heroBody')}
          </p>
          <div className="hero-animate hero-delay-4">
            <Button href="#contact">{t('heroCta')}</Button>
          </div>
        </div>

        {/* "Our products" 3D showcase — desktop only, fixed camera; runs a little past the container on the right */}
        <div className="hidden md:block relative h-[480px] lg:h-[640px] lg:-mr-4 2xl:-mr-20 hero-animate hero-delay-3">
          {desktop && (
            <Suspense fallback={null}>
              <ProductShowcase />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
