import { ArrowUpRight } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import LockerGrid from './illustrations/LockerGrid'
import CircuitLines from './illustrations/CircuitLines'
import { useT } from '../i18n'

export default function Projects() {
  const t = useT()

  const projects = [
    {
      key: 'payment',
      title: t('projPaymentTitle'),
      client: 'Payment4U a.s.',
      clientUrl: 'https://payment4u.eu',
      desc: t('projPaymentDesc'),
      tag: t('tagFintech'),
      tagBg: 'var(--color-tag-blue-bg)',
      tagColor: 'var(--color-tag-blue)',
    },
    {
      key: 'ble',
      title: t('projBleTitle'),
      client: 'Alvla s.r.o.',
      clientUrl: 'https://alvla.eu',
      desc: t('projBleDesc'),
      tag: t('tagIot'),
      tagBg: 'var(--color-tag-green-bg)',
      tagColor: 'var(--color-tag-green)',
    },
    {
      key: 'selfservice',
      title: t('projSelfServiceTitle'),
      client: 'Payment4U a.s.',
      clientUrl: 'https://payment4u.eu',
      desc: t('projSelfServiceDesc'),
      tag: t('tagHardware'),
      tagBg: 'var(--color-tag-amber-bg)',
      tagColor: 'var(--color-tag-amber)',
    },
  ]

  return (
    <AnimatedSection id="projects">
      <CircuitLines side="right" />
      <div className="max-w-6xl mx-auto bg-[var(--color-bg-warm)] rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <LockerGrid />
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          {t('projectsLabel')}
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          {t('projectsTitle')}
        </h2>

        <div className="flex flex-col border-t border-[var(--color-border)]">
          {projects.map((p, i) => (
            <div
              key={p.key}
              className={`fade-in stagger-${i + 1} group py-8 md:py-10 border-b border-[var(--color-border)] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12`}
            >
              <div>
                <span
                  className="inline-block text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full mb-3"
                  style={{ background: p.tagBg, color: p.tagColor }}
                >
                  {p.tag}
                </span>
                <a
                  href={p.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[18px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 no-underline"
                >
                  {p.client}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-xl font-medium text-[var(--color-text)] mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[55ch]">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
