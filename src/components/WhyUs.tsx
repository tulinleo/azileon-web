import {
  Crosshair,
  Users,
  MapPin,
  CalendarCheck,
} from '@phosphor-icons/react'

const reasons = [
  {
    icon: Crosshair,
    title: 'Focused expertise',
    desc: 'We specialise in software for terminals, lockers and self-service devices, not everything for everyone.',
  },
  {
    icon: Users,
    title: 'Senior, lean teams',
    desc: 'Small experienced squads instead of large, slow agencies.',
  },
  {
    icon: MapPin,
    title: 'Based in Prague',
    desc: 'Local collaboration and communication, easy to meet in person.',
  },
  {
    icon: CalendarCheck,
    title: 'Predictable delivery',
    desc: 'Clear scope, milestones and regular demos.',
  },
]

export default function WhyUs() {
  return (
    <section className="glass-section py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-3 font-medium font-mono">
          Why us
        </p>
        <h2 className="fade-in stagger-1 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[var(--color-text)] mb-16">
          Why teams choose us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`fade-in stagger-${i + 1} glass-card p-8 flex gap-5`}
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-raised)] flex items-center justify-center shrink-0">
                <r.icon size={20} weight="bold" className="text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-1.5">
                  {r.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
