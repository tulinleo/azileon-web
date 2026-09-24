import { ArrowRight, Check } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import Card from './Card'
import CircuitLines from './illustrations/CircuitLines'
import { solutions, TAG_STYLE } from '../data/solutions'
import { useT } from '../i18n'

/* The five product lines as cards, in the reading order of the 3D showcase; each links to its own page. */
export default function Solutions() {
  const t = useT()
  return (
    <AnimatedSection id="solutions">
      <CircuitLines />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader label={t('solutionsLabel')} title={t('solutionsTitle')} sub={t('solutionsSub')} />

        {/* three cards in the first row, two wider ones in the second */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {solutions.map((s, i) => (
            <Card
              key={s.slug}
              to={`/solutions/${s.slug}`}
              className={`fade-in stagger-${Math.min(i + 1, 6)} group p-6 md:p-7 flex flex-col ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-bg)] flex items-center justify-center">
                  <s.icon size={22} weight="bold" className="text-[var(--color-accent)]" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full" style={TAG_STYLE[s.tag]}>
                  {t(s.keys.family)}
                </span>
              </div>
              <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-medium text-[var(--color-text)] mb-2">{t(s.keys.title)}</h3>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-5">{t(s.keys.card)}</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2 mb-6">
                {s.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                    <Check size={14} weight="bold" className="text-[var(--color-accent)] mt-1 shrink-0" />
                    {t(f)}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                {t('learnMore')}
                <ArrowRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
