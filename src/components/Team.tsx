import { LinkedinLogo, Envelope } from '@phosphor-icons/react'

const members = [
  {
    name: 'Yehor Zhyliaiev',
    role: 'Co-founder / Software Architect',
    initials: 'YZ',
    email: 'yz@azileon.cz',
    linkedin: 'https://linkedin.com/',
  },
  {
    name: 'Leonid Tulin',
    role: 'Co-founder / Project Lead',
    initials: 'LT',
    email: 'tulin@azileon.cz',
    linkedin: 'https://linkedin.com/',
  },
]

export default function Team() {
  return (
    <section id="team" className="glass-section py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-3 font-medium font-mono">
          The team
        </p>
        <h2 className="fade-in stagger-1 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[var(--color-text)] mb-6">
          Who we are
        </h2>
        <p className="fade-in stagger-2 text-[var(--color-text-muted)] leading-relaxed max-w-[55ch] mb-16 text-[15px]">
          We are a small, senior team with hands-on experience in embedded software, IoT systems and custom hardware integration. We treat your product as our own.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <div
              key={m.name}
              className={`fade-in stagger-${i + 1} glass-card p-8`}
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-raised)] flex items-center justify-center mb-5">
                <span className="font-mono text-sm font-medium text-[var(--color-accent)]">
                  {m.initials}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
                {m.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-5">
                {m.role}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg-raised)] flex items-center justify-center text-[var(--color-text-faint)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <LinkedinLogo size={18} weight="bold" />
                </a>
                <a
                  href={`mailto:${m.email}`}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg-raised)] flex items-center justify-center text-[var(--color-text-faint)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`Email ${m.name}`}
                >
                  <Envelope size={18} weight="bold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
