import { Cpu, CloudArrowUp, Rocket, Wrench } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'
import CircuitLines from './illustrations/CircuitLines'
import { useT } from '../i18n'

export default function Services() {
  const t = useT()

  const featured = {
    icon: Cpu,
    title: t('svcEmbeddedTitle'),
    desc: t('svcEmbeddedDesc'),
  }

  const rest = [
    {
      key: 'backend',
      icon: CloudArrowUp,
      title: t('svcBackendTitle'),
      desc: t('svcBackendDesc'),
    },
    {
      key: 'prototyping',
      icon: Rocket,
      title: t('svcPrototypingTitle'),
      desc: t('svcPrototypingDesc'),
    },
    {
      key: 'support',
      icon: Wrench,
      title: t('svcSupportTitle'),
      desc: t('svcSupportDesc'),
    },
  ]

  return (
    <AnimatedSection id="services">
      <CircuitLines />
      <div className="max-w-6xl mx-auto relative">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          {t('servicesLabel')}
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          {t('servicesTitle').split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
        </h2>

        {/* Featured card — full width */}
        <Card className="fade-in stagger-2 p-8 md:p-10 mb-5">
          <featured.icon size={32} className="text-[var(--color-accent)] mb-4" weight="bold" />
          <h3 className="font-[var(--font-heading)] text-lg md:text-xl font-medium text-[var(--color-text)] mb-2">
            {featured.title}
          </h3>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[60ch]">
            {featured.desc}
          </p>
        </Card>

        {/* Remaining 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((s, i) => (
            <Card key={s.key} className={`fade-in stagger-${i + 3} p-6 md:p-8`}>
              <s.icon size={24} className="text-[var(--color-accent)] mb-4" weight="bold" />
              <h3 className="font-[var(--font-heading)] text-base font-medium text-[var(--color-text)] mb-2">
                {s.title}
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
