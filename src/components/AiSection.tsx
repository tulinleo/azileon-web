import { ChartLineUp, Pulse, ChatCircleText, CheckCircle } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import SectionHeader from './SectionHeader'
import Card from './Card'
import Button from './Button'
import CircuitLines from './illustrations/CircuitLines'
import { BATTERY_DISPATCHER_URL } from '../data/solutions'
import { useT } from '../i18n'

/* The AI layer: what it does today (the dispatcher exists and can be opened live) and where else it applies. */
export default function AiSection() {
  const t = useT()
  const items = [
    { icon: ChartLineUp, title: t('ai1Title'), text: t('ai1Text') },
    { icon: Pulse, title: t('ai2Title'), text: t('ai2Text') },
    { icon: ChatCircleText, title: t('ai3Title'), text: t('ai3Text') },
  ]
  return (
    <AnimatedSection id="ai">
      <CircuitLines side="right" />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader label={t('aiLabel')} title={t('aiTitle')} sub={t('aiSub')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {items.map((it, i) => (
            <Card key={it.title} className={`fade-in stagger-${i + 1} p-6 md:p-8`}>
              <div className="w-11 h-11 rounded-xl bg-[var(--color-bg)] flex items-center justify-center mb-5">
                <it.icon size={22} weight="bold" className="text-[var(--color-accent)]" />
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] mb-2">{it.title}</h3>
              <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{it.text}</p>
            </Card>
          ))}
        </div>

        {/* the live demo band */}
        <div className="fade-in stagger-4 bg-[var(--color-bg-warm)] rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-[60ch]">
            <h3 className="font-[var(--font-heading)] text-2xl font-medium text-[var(--color-text)] tracking-tight leading-[1.15] mb-2">{t('aiLiveTitle')}</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-base mb-4">{t('aiLiveText')}</p>
            <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
              {[t('aiFact1'), t('aiFact2')].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <CheckCircle size={16} weight="bold" className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Button href={BATTERY_DISPATCHER_URL} className="shrink-0">{t('aiLiveCta')}</Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
