import { Cpu, CloudArrowUp, Rocket, Wrench } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'

const services = [
  {
    icon: Cpu,
    title: 'Embedded & device software',
    desc: 'Business logic and control software for payment terminals, parcel lockers and custom self-service devices.',
  },
  {
    icon: CloudArrowUp,
    title: 'Backend & integrations',
    desc: 'APIs, payment gateway integrations, ERP/WMS connections and remote monitoring dashboards.',
  },
  {
    icon: Rocket,
    title: 'Prototyping & MVPs',
    desc: 'Rapid prototypes and pilot projects delivered in weeks, not months.',
  },
  {
    icon: Wrench,
    title: 'Long-term support',
    desc: 'Ongoing feature development, maintenance and SLA-based support.',
  },
]

export default function Services() {
  return (
    <AnimatedSection id="services">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          What we do
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          Focused expertise for<br />specialized hardware
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <Card key={s.title} className={`fade-in stagger-${i + 1} p-6 md:p-8`}>
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
