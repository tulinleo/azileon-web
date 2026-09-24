import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from '@phosphor-icons/react'
import Panel from './Panel'
import SectionHeader from './SectionHeader'
import { LIFT } from './Card'
import ShowcaseSkeleton from './ShowcaseSkeleton'
import { solutions, type Solution } from '../data/solutions'
import { useDesktop } from '../hooks/useDesktop'
import { useT } from '../i18n'

/* The five product lines as picture cards, in the reading order of the 3D showcase; each links to its own page.
   A line with a photo shows it; the one without (smart vending) shows its product from the 3D scene instead. */
const ProductShowcase = lazy(() => import('./ProductShowcase'))

function Visual({ s, alt }: { s: Solution; alt: string }) {
  const desktop = useDesktop()
  if (s.image) {
    return (
      <img
        src={s.image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
        style={{ objectPosition: s.imagePosition }}
      />
    )
  }
  return (
    <div className="absolute inset-0 grid place-items-center text-line-2">
      {desktop ? (
        <div className="absolute inset-0">
          <Suspense fallback={<ShowcaseSkeleton />}>
            <ProductShowcase focus={s.labelId} />
          </Suspense>
        </div>
      ) : (
        <s.icon size={72} weight="thin" aria-hidden="true" />
      )}
    </div>
  )
}

export default function Solutions() {
  const t = useT()
  return (
    <Panel id="solutions">
      <SectionHeader layout="split" label={t('solutionsLabel')} title={t('solutionsTitle')} sub={t('solutionsSub')} className="fade-in mb-11" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
        {solutions.map((s, i) => (
          <div key={s.slug} className={`fade-in stagger-${Math.min(i + 1, 6)}`}>
            <Link
              to={`/solutions/${s.slug}`}
              className={`group h-full flex flex-col overflow-hidden rounded-tile bg-paper border border-line text-ink no-underline hover:text-ink ${LIFT}`}
            >
              <div className="relative h-[170px] bg-page overflow-hidden">
                <Visual s={s} alt={t(s.keys.title)} />
                <span className="absolute top-3 left-3 w-[38px] h-[38px] rounded-xl bg-surface grid place-items-center shadow-badge">
                  <s.icon size={19} weight="bold" className="text-accent" />
                </span>
              </div>
              <div className="p-[22px] flex flex-col flex-1">
                <p className="text-[11px] uppercase tracking-[0.06em] text-accent-hover font-semibold mb-2">{t(s.keys.family)}</p>
                <h3 className="font-heading text-[21px] font-medium tracking-[-0.01em] mb-2">{t(s.keys.title)}</h3>
                <p className="text-sm leading-[1.55] text-ink-2 mb-4">{t(s.keys.card)}</p>
                <ul className="m-0 p-0 list-none flex flex-col gap-[7px] mb-5">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-2 text-[13px] text-ink-2 leading-[1.4]">
                      <Check size={13} weight="bold" className="text-accent mt-[3px] shrink-0" />
                      {t(f)}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {t('learnMore')}
                  <ArrowRight size={14} weight="bold" className="transition-transform duration-300 ease-soft group-hover:translate-x-[3px]" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Panel>
  )
}
