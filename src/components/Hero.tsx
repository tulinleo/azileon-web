import { lazy, Suspense } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import Button from './Button'
import ShowcaseSkeleton from './ShowcaseSkeleton'
import { useDesktop } from '../hooks/useDesktop'
import { useT } from '../i18n'

/* First screen, three cards: the pitch (badge and headline left, body and buttons right, bottom-aligned), the
   "Our products" 3D showcase on a paper card, and three facts in ink / white / accent. The showcase carries
   three.js: loaded on demand and only where it is shown (md and up); phones get the text and the facts. */
const ProductShowcase = lazy(() => import('./ProductShowcase'))

const FACT_TONE = [
  { card: 'bg-ink text-paper', icon: 'text-accent-2' },
  { card: 'bg-surface text-ink', icon: 'text-accent' },
  { card: 'bg-accent text-white', icon: 'text-white' },
]

export default function Hero() {
  const t = useT()
  const desktop = useDesktop()
  const facts = [t('trustFact1'), t('trustFact2'), t('trustFact3')]

  return (
    <section id="home" className="flex flex-col gap-bento">
      <div className="bg-surface rounded-card px-[clamp(24px,3.8vw,52px)] py-[clamp(24px,3.4vw,44px)] grid grid-cols-1 min-[900px]:grid-cols-[1.35fr_1fr] gap-x-14 gap-y-6 items-stretch">
        <div className="flex flex-col">
          <p className="hero-animate hero-delay-1 self-start mb-[22px] inline-flex items-center gap-2 text-[13px] font-medium px-3.5 py-2 rounded-full bg-paper border border-line text-ink-2 whitespace-nowrap">
            <span className="w-[7px] h-[7px] rounded-full bg-ok animate-pulse-dot" />
            {t('heroLabel')}
          </p>
          <h1 className="hero-animate hero-delay-2 font-heading text-[clamp(2.3rem,4.2vw,3.75rem)] font-semibold tracking-[-0.045em] leading-none text-balance">
            {t('heroTitle')} <span className="text-accent">{t('heroTitleAccent')}</span>
          </h1>
        </div>
        {/* the right column mirrors the left: the body starts level with the badge, the buttons end level with the headline */}
        <div className="flex flex-col min-[900px]:justify-between min-[900px]:pt-2">
          <p className="hero-animate hero-delay-3 text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-ink-2 max-w-[52ch] mb-6 text-pretty">{t('heroBody')}</p>
          <div className="hero-animate hero-delay-4 flex flex-wrap gap-2.5">
            <Button href="#contact">{t('heroCta')}</Button>
            <Button href="#solutions" variant="secondary">
              {t('heroSecondary')}
            </Button>
          </div>
        </div>
      </div>

      {/* "Our products" — the five product lines in two tiers on a fixed camera, each with its label */}
      <div className="hidden md:block hero-animate hero-delay-2 bg-paper rounded-card px-[clamp(8px,2vw,32px)] py-[clamp(12px,2.4vw,36px)]">
        <div className="relative h-[clamp(320px,38vw,600px)]">
          {desktop && (
            <Suspense fallback={<ShowcaseSkeleton />}>
              <ProductShowcase />
            </Suspense>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 auto-rows-fr gap-bento">
        {facts.map((f, i) => (
          <div key={f} className={`hero-animate hero-delay-${i + 2} lift lift-sm`}>
            <div className={`lift-body h-full rounded-inner p-5 min-h-[120px] flex flex-col justify-between gap-3 text-base font-medium leading-[1.4] ${FACT_TONE[i].card}`}>
              <CheckCircle size={20} weight="bold" className={FACT_TONE[i].icon} />
              {f}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
