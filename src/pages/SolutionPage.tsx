import { lazy, Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CheckCircle, Sparkle } from '@phosphor-icons/react'
import Panel from '../components/Panel'
import SectionHeader from '../components/SectionHeader'
import CtaBand from '../components/CtaBand'
import Button from '../components/Button'
import ShowcaseSkeleton from '../components/ShowcaseSkeleton'
import { findSolution, TAG_STYLE } from '../data/solutions'
import { useDesktop } from '../hooks/useDesktop'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

/* One template for the five product lines (data/solutions.ts): hero with the 3D showcase focused on the product,
   what we deliver, features, what it works with, the AI note, the case and the closing call to action. */
const ProductShowcase = lazy(() => import('../components/ProductShowcase'))

const DELIVER_TONE = [
  { card: 'bg-paper text-ink', num: 'text-accent' },
  { card: 'bg-page text-ink', num: 'text-accent' },
  { card: 'bg-ink text-paper', num: 'text-accent-2' },
]

export default function SolutionPage() {
  const { slug } = useParams()
  const s = findSolution(slug)
  const t = useT()
  const desktop = useDesktop()
  // hooks above must run unconditionally; an unknown slug goes home
  usePageMeta(s ? `${t(s.keys.title)} — Azileon` : 'Azileon', s ? t(s.keys.lead) : '')
  if (!s) return <Navigate to="/" replace />

  return (
    <>
      {/* Hero */}
      <section className="bg-surface rounded-card px-[clamp(24px,3.8vw,52px)] py-[clamp(24px,3.4vw,44px)] grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center gap-10">
        <div>
          <p className="hero-animate hero-delay-1 mb-5">
            <span className="text-[11px] uppercase tracking-[0.05em] font-semibold px-2.5 py-[5px] rounded-full" style={TAG_STYLE[s.tag]}>
              {t(s.keys.family)}
            </span>
          </p>
          <h1 className="hero-animate hero-delay-2 font-heading text-[clamp(2.25rem,3.6vw_+_0.5rem,4rem)] font-semibold tracking-[-0.045em] leading-[1.02] mb-6 text-balance">{t(s.keys.heading)}</h1>
          <p className="hero-animate hero-delay-3 text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-ink-2 max-w-[52ch] mb-8 text-pretty">{t(s.keys.lead)}</p>
          <div className="hero-animate hero-delay-4 flex flex-wrap gap-2.5">
            <Button href="/#contact">{t('heroCta')}</Button>
            <Button href="/#solutions" variant="secondary">
              {t('allSolutions')}
            </Button>
          </div>
        </div>
        <div className="hidden md:block hero-animate hero-delay-3 relative h-[360px] lg:h-[440px] rounded-tile bg-paper border border-line overflow-hidden">
          {desktop && (
            <Suspense fallback={<ShowcaseSkeleton />}>
              <ProductShowcase focus={s.labelId} />
            </Suspense>
          )}
        </div>
      </section>

      {/* What we deliver */}
      <Panel>
        <SectionHeader label={t('solDeliverLabel')} title={t('solDeliverTitle')} className="fade-in mb-11" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3.5">
          {s.deliver.map((d, i) => (
            <div key={d.title} className={`fade-in stagger-${i + 1} lift`}>
              <div className={`lift-body h-full rounded-tile p-[26px] min-h-[200px] flex flex-col ${DELIVER_TONE[i].card}`}>
                <span className={`font-heading text-[44px] font-medium tracking-[-0.04em] leading-none mb-auto ${DELIVER_TONE[i].num}`}>0{i + 1}</span>
                <h3 className="font-heading text-[21px] font-medium mt-9 mb-2">{t(d.title)}</h3>
                <p className="text-sm leading-[1.55] opacity-80">{t(d.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Features + works with + AI */}
      <Panel>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader label={t('solFeaturesLabel')} title={t('solFeaturesTitle')} className="fade-in mb-8" />
            <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {s.features.map((f, i) => (
                <li key={f} className={`fade-in stagger-${Math.min(i + 1, 6)} flex items-start gap-3 text-base text-ink-2 bg-paper border border-line rounded-2xl px-4 py-3.5`}>
                  <CheckCircle size={20} weight="bold" className="text-accent shrink-0 mt-0.5" />
                  {t(f)}
                </li>
              ))}
            </ul>
          </div>
          <div className="fade-in stagger-2 flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-accent font-semibold mb-4">{t('solWorksWithLabel')}</p>
              <div className="flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span key={c} className="text-sm px-3 py-1.5 rounded-full bg-page text-ink-2">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-ink text-paper rounded-tile p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-xl bg-dark-2 grid place-items-center">
                  <Sparkle size={18} weight="bold" className="text-accent-2" />
                </span>
                <p className="text-xs tracking-[0.15em] uppercase text-accent-2 font-semibold">{t('solAiLabel')}</p>
              </div>
              <p className="text-[15px] leading-[1.6] text-cream-2">{t(s.keys.ai)}</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Case */}
      {s.caseStudy && (
        <Panel>
          <SectionHeader label={t('solCaseLabel')} title={t(s.caseStudy.title)} className="fade-in mb-8" />
          <div className="fade-in stagger-1 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-center bg-paper border border-line rounded-tile p-6 md:p-8">
            <div>
              <p className="text-ink-2 leading-relaxed text-base mb-6 max-w-[48ch]">{t(s.caseStudy.text)}</p>
              <Button href={s.caseStudy.to} variant="dark" arrow={s.caseStudy.external ? 'external' : true}>
                {t('solCaseCta')}
              </Button>
            </div>
            {s.caseStudy.image && (
              <div className="rounded-inner overflow-hidden border border-line bg-page" style={{ aspectRatio: '16 / 10' }}>
                <img src={s.caseStudy.image} alt={t(s.caseStudy.title)} loading="lazy" className="w-full h-full object-cover object-top block" />
              </div>
            )}
          </div>
        </Panel>
      )}

      <CtaBand title={t('solCtaTitle')} body={t('solCtaBody')} cta={t('heroCta')} />
    </>
  )
}
