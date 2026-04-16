import { LinkedinLogo, Envelope } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'
import TeamRobots from './illustrations/TeamRobots'
import CircuitLines from './illustrations/CircuitLines'
import { useT } from '../i18n'

export default function Team() {
  const t = useT()

  const members = [
    {
      name: 'Yehor Zhyliaiev',
      role: t('roleYehor'),
      initials: 'YZ',
      email: 'yz@azileon.cz',
      linkedin: 'https://www.linkedin.com/in/yzazileon',
    },
    {
      name: 'Leonid Tulin',
      role: t('roleLeonid'),
      initials: 'LT',
      email: 'tulin@azileon.cz',
      linkedin: 'https://www.linkedin.com/in/leonidtulin',
    },
  ]

  return (
    <AnimatedSection id="team">
      <CircuitLines side="left" />
      <TeamRobots />
      <div className="max-w-6xl mx-auto relative">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          {t('teamLabel')}
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-6">
          {t('teamTitle')}
        </h2>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch] mb-12 text-base">
          {t('teamBody')}
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
                  aria-label={`${m.name} ${t('onLinkedin')}`}
                >
                  <LinkedinLogo size={18} weight="bold" />
                </a>
                <a
                  href={`mailto:${m.email}`}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`${t('emailPerson')} ${m.name}`}
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
