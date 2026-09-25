import { type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Panel from './Panel'
import SectionHeader from './SectionHeader'
import Button from './Button'
import { hardwareProjects } from '../data/hardwareProjects'
import { webProjects } from '../data/webProjects'
import { useT } from '../i18n'

/* A preview of /projects: one row of every project, hardware first, that scrolls sideways — by swipe, by dragging
   with the mouse, or one card at a time with the arrows — with a thin accent line showing where in the row you are.
   The full write-ups live on /projects; a card leads to its section there. */
export default function Projects() {
  const t = useT()
  const trackRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [bar, setBar] = useState({ left: 0, width: 1 })
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const swallowClick = useRef(false)

  const items = [
    ...hardwareProjects.map((p) => ({
      key: p.key,
      image: p.photos.device,
      title: t(p.titleKey),
      client: p.client,
      label: t('hwSectionLabel'),
      tag: { background: 'var(--color-tag-amber-bg)', color: 'var(--color-tag-amber)' },
      to: '/projects#hardware',
    })),
    ...webProjects.map((w) => ({
      key: w.key,
      image: w.image,
      title: t(w.titleKey),
      client: w.client,
      label: t('webSectionLabel'),
      tag: { background: 'var(--color-tag-blue-bg)', color: 'var(--color-tag-blue)' },
      to: '/projects#web',
    })),
  ]

  // where the row stands: which arrows still have somewhere to go, and the indicator's thumb
  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
    setBar({ left: max > 0 ? el.scrollLeft / el.scrollWidth : 0, width: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1 })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [measure])

  const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cardStep = (el: HTMLDivElement) => {
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap || '0')
    return card ? card.offsetWidth + gap : el.clientWidth * 0.8
  }
  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * cardStep(el), behavior: still() ? 'auto' : 'smooth' })
  }

  // dragging with the mouse (touch and trackpads scroll natively); a drag must not count as a click on a card
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = trackRef.current
    if (!el) return
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false }
    el.classList.add('is-dragging')
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const el = trackRef.current
    if (!d || !el) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 4) d.moved = true
    el.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    const d = drag.current
    const el = trackRef.current
    drag.current = null
    if (!d || !el) return
    if (d.moved) {
      swallowClick.current = true
      setTimeout(() => (swallowClick.current = false), 0)
      // settle on the nearest card, then let the snap points take over again
      const s = cardStep(el)
      el.scrollTo({ left: Math.round(el.scrollLeft / s) * s, behavior: still() ? 'auto' : 'smooth' })
      setTimeout(() => el.classList.remove('is-dragging'), 450)
    } else {
      el.classList.remove('is-dragging')
    }
  }
  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!swallowClick.current) return
    e.preventDefault()
    e.stopPropagation()
  }

  const arrowClass = 'btn-white w-11 h-11 rounded-full grid place-items-center border-0 cursor-pointer disabled:opacity-40 disabled:shadow-none disabled:cursor-default'

  return (
    <Panel id="projects" className="overflow-hidden">
      <div className="fade-in flex flex-wrap justify-between items-end gap-6 mb-10">
        <SectionHeader label={t('projectsLabel')} title={t('projectsTitle')} className="mb-0" />
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label={t('carouselPrev')} className={arrowClass}>
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label={t('carouselNext')} className={arrowClass}>
            <ArrowRight size={18} weight="bold" />
          </button>
          <Button href="/projects" variant="secondary" size="sm" className="ml-1">
            {t('allProjects')}
          </Button>
        </div>
      </div>

      {/* the row runs out to the panel's edges, so the next card peeks in from the right */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="carousel fade-in stagger-1 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-panel px-panel scroll-pl-panel pb-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={t('projectsTitle')}
      >
        {items.map((p) => (
          <Link key={p.key} to={p.to} className="group lift snap-start shrink-0 w-[min(100%,300px)] sm:w-[46%] lg:w-[calc((100%-2rem)/3)] block text-ink no-underline hover:text-ink">
            <div className="lift-body h-full flex flex-col overflow-hidden rounded-tile bg-paper border border-line">
              <div className="aspect-[16/10] bg-page overflow-hidden">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover object-top block transition-transform duration-700 ease-soft group-hover:scale-105"
                  />
                )}
              </div>
              <div className="px-5 pt-[18px] pb-[22px] flex flex-col gap-2.5">
                <div className="flex justify-between items-center gap-3">
                  <span className="text-[13px] text-ink-3">{p.client}</span>
                  <span className="text-[11px] uppercase tracking-[0.05em] font-semibold px-2.5 py-[5px] rounded-full" style={p.tag}>
                    {p.label}
                  </span>
                </div>
                <h3 className="font-heading text-[19px] font-medium leading-[1.3]">{p.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* where you are in the row */}
      <div className="fade-in stagger-2 relative mt-6 h-0.5 rounded-full bg-page" aria-hidden="true">
        <span
          className="absolute top-0 bottom-0 rounded-full bg-accent transition-[left,width] duration-150 ease-linear"
          style={{ left: `${bar.left * 100}%`, width: `${Math.max(bar.width * 100, 6)}%` }}
        />
      </div>
    </Panel>
  )
}
