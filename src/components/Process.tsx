import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import CircuitLines from './illustrations/CircuitLines'
import { useT } from '../i18n'

/* Four steps from the first visit to the handover — the same for every product line. */
export default function Process() {
  const t = useT()
  const steps = [
    { title: t('step1Title'), text: t('step1Text') },
    { title: t('step2Title'), text: t('step2Text') },
    { title: t('step3Title'), text: t('step3Text') },
    { title: t('step4Title'), text: t('step4Text') },
  ]
  return (
    <AnimatedSection id="process">
      <CircuitLines />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader label={t('processLabel')} title={t('processTitle')} />
        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className={`fade-in stagger-${i + 1} border-t-2 border-[var(--color-accent)] pt-5`}>
              <span className="block font-[var(--font-heading)] text-sm font-medium tracking-[0.1em] text-[var(--color-accent)] mb-3">0{i + 1}</span>
              <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] mb-2">{s.title}</h3>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  )
}
