import { lazy, Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ArrowUpRight, CheckCircle, Sparkle } from '@phosphor-icons/react'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeader from '../components/SectionHeader'
import SectionDivider from '../components/SectionDivider'
import Button from '../components/Button'
import Card from '../components/Card'
import CircuitLines from '../components/illustrations/CircuitLines'
import { findSolution, TAG_STYLE } from '../data/solutions'
import { useDesktop } from '../hooks/useDesktop'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

/* One template for the five product lines (data/solutions.ts): hero with the 3D showcase focused on the product,
   what we deliver, features, what it works with, the AI note, the case and the closing call to action. */
const ProductShowcase = lazy(() => import('../components/ProductShowcase'))

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
      <section className="pt-28 pb-10 md:pt-36 md:pb-14 px-6 dot-grid">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center gap-10">
          <div>
            <p className="hero-animate hero-delay-1 mb-4">
              <span className="text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full" style={TAG_STYLE[s.tag]}>
                {t(s.keys.family)}
              </span>
            </p>
            <h1 className="hero-animate hero-delay-2 font-[var(--font-heading)] text-[clamp(2.25rem,3.5vw_+_0.5rem,4rem)] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6 text-balance">
              {t(s.keys.heading)}
            </h1>
            <p className="hero-animate hero-delay-3 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[52ch] mb-8">
              {t(s.keys.lead)}
            </p>
            <div className="hero-animate hero-delay-4 flex flex-wrap gap-3">
              <Button href="/#contact">{t('heroCta')}</Button>
              <Button href="/#solutions" variant="secondary">{t('allSolutions')}</Button>
            </div>
          </div>
          <div className="hidden md:block relative h-[360px] lg:h-[440px] hero-animate hero-delay-3">
            {desktop && (
              <Suspense fallback={null}>
                <ProductShowcase focus={s.labelId} />
              </Suspense>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What we deliver */}
      <AnimatedSection>
        <CircuitLines />
        <div className="max-w-6xl mx-auto relative">
          <SectionHeader label={t('solDeliverLabel')} title={t('solDeliverTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {s.deliver.map((d, i) => (
              <Card key={d.title} className={`fade-in stagger-${i + 1} p-6 md:p-8`}>
                <span className="block font-[var(--font-heading)] text-sm font-medium tracking-[0.1em] text-[var(--color-accent)] mb-3">0{i + 1}</span>
                <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] mb-2">{t(d.title)}</h3>
                <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{t(d.text)}</p>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider />

      {/* Features + works with */}
      <AnimatedSection>
        <CircuitLines side="right" />
        <div className="max-w-6xl mx-auto relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeader label={t('solFeaturesLabel')} title={t('solFeaturesTitle')} className="mb-8" />
            <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {s.features.map((f, i) => (
                <li key={f} className={`fade-in stagger-${Math.min(i + 1, 6)} flex items-start gap-3 text-base text-[var(--color-text-secondary)]`}>
                  <CheckCircle size={20} weight="bold" className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                  {t(f)}
                </li>
              ))}
            </ul>
          </div>
          <div className="fade-in stagger-3">
            <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">{t('solWorksWithLabel')}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {s.chips.map((c) => (
                <span key={c} className="text-sm px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                  {c}
                </span>
              ))}
            </div>
            <Card className="p-6 bg-[var(--color-bg-warm)]!">
              <div className="flex items-center gap-2.5 mb-3">
                <Sparkle size={18} weight="bold" className="text-[var(--color-accent)]" />
                <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] font-medium">{t('solAiLabel')}</p>
              </div>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{t(s.keys.ai)}</p>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Case */}
      {s.caseStudy && (
        <>
          <SectionDivider />
          <AnimatedSection>
            <div className="max-w-6xl mx-auto">
              <SectionHeader label={t('solCaseLabel')} title={t(s.caseStudy.title)} className="mb-8" />
              <div className="fade-in stagger-1 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 md:p-8">
                <div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-base mb-6 max-w-[48ch]">{t(s.caseStudy.text)}</p>
                  <Button href={s.caseStudy.to} variant="secondary">
                    {t('solCaseCta')}
                    {s.caseStudy.external && <ArrowUpRight size={14} weight="bold" />}
                  </Button>
                </div>
                {s.caseStudy.image && (
                  <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]" style={{ aspectRatio: '16 / 10' }}>
                    <img src={s.caseStudy.image} alt={t(s.caseStudy.title)} loading="lazy" className="w-full h-full object-cover object-top block" />
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </>
      )}

      <SectionDivider />

      {/* CTA */}
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <div className="fade-in bg-[var(--color-bg-warm)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-2">{t('solCtaTitle')}</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[50ch]">{t('solCtaBody')}</p>
            </div>
            <Button href="/#contact" className="shrink-0">{t('heroCta')}</Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
