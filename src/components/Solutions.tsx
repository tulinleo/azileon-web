import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from '@phosphor-icons/react'
import Panel from './Panel'
import SectionHeader from './SectionHeader'
import { solutions, type Solution } from '../data/solutions'
import type { LabelId } from '../scene/buildProducts'
import { useDesktop } from '../hooks/useDesktop'
import { useT } from '../i18n'

/* The five product lines as cards, in the reading order of the 3D showcase; each links to its own page. The picture
   on a card is its product from the 3D scene (scene/stills.ts) — rendered once, after the hero has had the browser
   to itself, then faded in. Phones, which do not load three.js, skip the picture and open the card with its icon. */

type Stills = Partial<Record<LabelId, string>>

function useStills(enabled: boolean): Stills {
  const [stills, setStills] = useState<Stills>({})
  useEffect(() => {
    if (!enabled) return
    let live = true
    const run = () => {
      import('../scene/stills')
        .then((m) => m.productStills(260, 200)) // the card's picture box is about 5:4
        .then((r) => live && setStills(r))
        .catch((e) => console.error(e)) // no WebGL: the icons stay
    }
    let cancel: () => void
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(run, { timeout: 1500 })
      cancel = () => window.cancelIdleCallback(id)
    } else {
      const id = window.setTimeout(run, 400)
      cancel = () => window.clearTimeout(id)
    }
    return () => {
      live = false
      cancel()
    }
  }, [enabled])
  return stills
}

function Visual({ s, still, alt }: { s: Solution; still?: string; alt: string }) {
  const [shown, setShown] = useState(false)
  return (
    <div className="absolute inset-0 grid place-items-center text-line-2">
      <s.icon size={72} weight="thin" aria-hidden="true" className={`transition-opacity duration-500 ${shown ? 'opacity-0' : 'opacity-100'}`} />
      {still && (
        <img
          src={still}
          alt={alt}
          onLoad={() => setShown(true)}
          className={`absolute inset-0 w-full h-full object-contain transition-[opacity,transform] duration-700 ease-soft group-hover:scale-105 ${shown ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}

export default function Solutions() {
  const t = useT()
  const desktop = useDesktop()
  const stills = useStills(desktop)

  return (
    <Panel id="solutions">
      <SectionHeader layout="split" label={t('solutionsLabel')} title={t('solutionsTitle')} sub={t('solutionsSub')} className="fade-in mb-11" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
        {solutions.map((s, i) => (
          <div key={s.slug} className={`fade-in stagger-${Math.min(i + 1, 6)}`}>
            <Link to={`/solutions/${s.slug}`} className="group lift block h-full text-ink no-underline hover:text-ink">
              <div className="lift-body h-full flex flex-col overflow-hidden rounded-tile bg-paper border border-line">
                {/* the picture box is for md and up; phones open the card with the icon tile instead */}
                <div className="relative hidden md:block h-[170px] bg-page overflow-hidden">
                  <Visual s={s} still={stills[s.labelId]} alt={t(s.keys.title)} />
                  <span className="absolute top-3 left-3 w-[38px] h-[38px] rounded-xl bg-surface grid place-items-center shadow-badge">
                    <s.icon size={19} weight="bold" className="text-accent" />
                  </span>
                </div>
                <div className="p-[22px] flex flex-col flex-1">
                  <span className="md:hidden w-[42px] h-[42px] rounded-xl bg-page grid place-items-center mb-4">
                    <s.icon size={21} weight="bold" className="text-accent" />
                  </span>
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Panel>
  )
}
