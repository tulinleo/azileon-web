import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Button from './Button'
import CircuitLines from './illustrations/CircuitLines'
import { hardwareProjects } from '../data/hardwareProjects'
import { webProjects } from '../data/webProjects'
import { useT } from '../i18n'

/**
 * Home-page teaser for /projects: one horizontally scrollable row with every project
 * from the projects page (hardware first, then web). Arrows scroll one card at a time;
 * on touch devices the row swipes natively.
 */
export default function Projects() {
  const t = useT()
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const items = [
    ...hardwareProjects.map((p) => ({
      key: p.key,
      image: p.photos.device,
      title: t(p.titleKey),
      client: p.client,
      kind: t('hwSectionLabel'),
      tagBg: 'var(--color-tag-amber-bg)',
      tagColor: 'var(--color-tag-amber)',
      to: '/projects#hardware',
    })),
    ...webProjects.map((w) => ({
      key: w.key,
      image: w.image,
      title: t(w.titleKey),
      client: w.client,
      kind: t('webSectionLabel'),
      tagBg: 'var(--color-tag-blue-bg)',
      tagColor: 'var(--color-tag-blue)',
      to: '/projects#web',
    })),
  ]

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    const first = el?.firstElementChild
    const last = el?.lastElementChild
    if (!el || !first || !last) return
    // Compare card edges with the padded viewport: snap positions never reach scrollWidth exactly.
    const box = el.getBoundingClientRect()
    const style = getComputedStyle(el)
    const padL = parseFloat(style.paddingLeft) || 0
    const padR = parseFloat(style.paddingRight) || 0
    setCanPrev(first.getBoundingClientRect().left < box.left + padL - 4)
    setCanNext(last.getBoundingClientRect().right > box.right - padR + 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrowClass =
    'w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[var(--color-border-hover)] disabled:opacity-30 disabled:cursor-default focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:outline-none'

  return (
    <AnimatedSection id="projects">
      <CircuitLines side="right" />
      <div className="max-w-6xl mx-auto bg-[var(--color-bg-warm)] rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Header: label + title left, controls right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
              {t('projectsLabel')}
            </p>
            <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1]">
              {t('projectsTitle')}
            </h2>
          </div>
          <div className="fade-in stagger-2 flex items-center gap-3">
            <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label={t('carouselPrev')} className={arrowClass}>
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label={t('carouselNext')} className={arrowClass}>
              <ArrowRight size={18} weight="bold" />
            </button>
            <Button href="/projects" variant="secondary" className="ml-2">{t('allProjects')}</Button>
          </div>
        </div>

        {/* Scrollable row. Negative margins let cards run to the container edge and peek. */}
        <div
          ref={trackRef}
          className="fade-in stagger-3 flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-8 px-8 scroll-pl-8 md:-mx-12 md:px-12 md:scroll-pl-12 lg:-mx-16 lg:px-16 lg:scroll-pl-16 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={t('projectsTitle')}
        >
          {items.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="group snap-start shrink-0 w-[calc(100vw_-_5.5rem)] sm:w-[46%] lg:w-[31%] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-3 no-underline transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none"
            >
              <div className="relative rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]" style={{ aspectRatio: '16 / 10' }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="px-1 pt-4 pb-1">
                <span
                  className="inline-block text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full mb-2.5"
                  style={{ background: item.tagBg, color: item.tagColor }}
                >
                  {item.kind}
                </span>
                <h3 className="font-[var(--font-heading)] text-base md:text-lg font-medium text-[var(--color-text)] leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.client}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
