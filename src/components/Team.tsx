import { LinkedinLogo, Envelope } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'

const members = [
  {
    name: 'Yehor Zhyliaiev',
    role: 'Co-founder / Software Architect',
    initials: 'YZ',
    email: 'yz@azileon.cz',
    linkedin: 'https://www.linkedin.com/in/yzazileon',
  },
  {
    name: 'Leonid Tulin',
    role: 'Co-founder / Project Lead',
    initials: 'LT',
    email: 'tulin@azileon.cz',
    linkedin: 'https://www.linkedin.com/in/leonidtulin',
  },
]

export default function Team() {
  return (
    <AnimatedSection id="team">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          The team
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-6">
          Who we are
        </h2>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch] mb-12 text-[15px]">
          A small, senior team with hands-on experience in embedded software, IoT systems and custom hardware integration. We treat your product as our own.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <Card key={m.name} className={`fade-in stagger-${i + 1} p-8`}>
              <div className="w-14 h-14 rounded-xl bg-[var(--color-bg)] flex items-center justify-center mb-5">
                <span className="text-sm font-medium text-[var(--color-accent)]">
                  {m.initials}
                </span>
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] mb-1">
                {m.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-5">
                {m.role}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <LinkedinLogo size={18} weight="bold" />
                </a>
                <a
                  href={`mailto:${m.email}`}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`Email ${m.name}`}
                >
                  <Envelope size={18} weight="bold" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
