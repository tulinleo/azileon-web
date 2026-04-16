import { ArrowUpRight } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'

const projects = [
  {
    title: 'Payment terminal & parcel locker platform',
    client: 'Payment4U a.s.',
    clientUrl: 'https://payment4u.eu',
    desc: 'Development of software for cash and cashless payment terminals and automated parcel locker systems. Full-stack platform handling device communication, payment processing and operator management.',
    tag: 'Fintech',
    tagBg: 'var(--color-tag-blue-bg)',
    tagColor: 'var(--color-tag-blue)',
  },
  {
    title: 'BLE asset tracking system',
    client: 'Alvla s.r.o.',
    clientUrl: 'https://alvla.eu',
    desc: 'Design and implementation of a Bluetooth Low Energy tracking system for indoor asset management. Real-time positioning, geofencing and analytics dashboard.',
    tag: 'IoT',
    tagBg: 'var(--color-tag-green-bg)',
    tagColor: 'var(--color-tag-green)',
  },
  {
    title: 'Self-service device software',
    client: 'Payment4U a.s.',
    clientUrl: 'https://payment4u.eu',
    desc: 'Continuous development and feature expansion for a range of self-service devices. Modular architecture enabling rapid deployment of new device types.',
    tag: 'Hardware',
    tagBg: 'var(--color-tag-amber-bg)',
    tagColor: 'var(--color-tag-amber)',
  },
]

export default function Projects() {
  return (
    <AnimatedSection id="projects">
      <div className="max-w-6xl mx-auto bg-[#F0EDE8] rounded-3xl p-8 md:p-12 lg:p-16">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          Selected work
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          Projects that shipped
        </h2>

        <div className="flex flex-col border-t border-[var(--color-border)]">
          {projects.map((p, i) => (
            <div
              key={p.title}
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
