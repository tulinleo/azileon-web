import {
  Cpu,
  CloudArrowUp,
  Rocket,
  Wrench,
} from '@phosphor-icons/react'

const services = [
  {
    icon: Cpu,
    title: 'Embedded & device software',
    desc: 'Business logic and control software for payment terminals, parcel lockers and custom self-service devices.',
    accent: 'var(--color-pale-blue-bg)',
    accentText: 'var(--color-pale-blue)',
  },
  {
    icon: CloudArrowUp,
    title: 'Backend & integrations',
    desc: 'APIs, payment gateway integrations, ERP/WMS connections and remote monitoring dashboards.',
    accent: 'var(--color-pale-green-bg)',
    accentText: 'var(--color-pale-green)',
  },
  {
    icon: Rocket,
    title: 'Prototyping & MVPs',
    desc: 'Rapid prototypes and pilot projects delivered in weeks, not months.',
    accent: 'var(--color-pale-yellow-bg)',
    accentText: 'var(--color-pale-yellow)',
  },
  {
    icon: Wrench,
    title: 'Long-term support',
    desc: 'Ongoing feature development, maintenance and SLA-based support.',
    accent: 'var(--color-pale-red-bg)',
    accentText: 'var(--color-pale-red)',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="video-overlay-section bg-[var(--color-bone)] py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3 font-medium">
          What we do
        </p>
        <h2 className="fade-in stagger-1 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[var(--color-charcoal)] mb-16">
          Focused expertise for<br />
          specialized hardware
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`fade-in stagger-${i + 1} group bg-white border border-[var(--color-border)] rounded-[10px] p-8 md:p-10 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: s.accent }}
              >
                <s.icon size={20} weight="bold" style={{ color: s.accentText }} />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-charcoal)] mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-[15px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
