import { ArrowUpRight } from '@phosphor-icons/react'

const clients = [
  {
    name: 'Payment4U a.s.',
    url: 'https://payment4u.eu',
    desc: 'Provider of payment terminals and automated delivery box solutions.',
  },
  {
    name: 'Alvla s.r.o.',
    url: 'https://alvla.eu',
    desc: 'Company developing BLE-based tracking and logistics solutions.',
  },
]

export default function Clients() {
  return (
    <section id="clients" className="glass-section py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-3 font-medium font-mono">
          Our clients
        </p>
        <h2 className="fade-in stagger-1 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[var(--color-text)] mb-16">
          Companies we work with
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((c, i) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`fade-in stagger-${i + 1} group block glass-card p-8 md:p-10 no-underline`}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold text-[var(--color-text)] leading-snug">
                  {c.name}
                </h3>
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                />
              </div>
              <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed">
                {c.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
