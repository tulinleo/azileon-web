import { useState, useCallback } from 'react'
import { ArrowUpRight, Cube, Monitor, Browser } from '@phosphor-icons/react'
import AnimatedSection from '../components/AnimatedSection'
import SectionDivider from '../components/SectionDivider'
import Button from '../components/Button'
import Card from '../components/Card'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import Lightbox from '../components/Lightbox'
import CircuitLines from '../components/illustrations/CircuitLines'
import { hardwareProjects } from '../data/hardwareProjects'
import { webProjects } from '../data/webProjects'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

const labelClass = 'text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium'
const h2Class = 'font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1]'
const subLabelClass = 'text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1.5 font-medium'

type LightboxState = { src: string; alt: string; caption: string } | null

export default function ProjectsPage() {
  const t = useT()
  usePageMeta(t('projectsPageTitle'), t('projectsPageMeta'))
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const openPhoto = (src: string | undefined, title: string, kind: string) =>
    src ? () => setLightbox({ src, alt: `${title} — ${kind}`, caption: `${title} · ${kind}` }) : undefined

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-6 md:pt-40 md:pb-10 px-6 dot-grid">
        <div className="max-w-6xl mx-auto">
          <p className={`hero-animate hero-delay-1 ${labelClass} mb-4`}>{t('projectsPageLabel')}</p>
          <h1 className="hero-animate hero-delay-2 font-[var(--font-heading)] text-[clamp(2.25rem,4vw_+_1rem,4.5rem)] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6 max-w-4xl">
            {t('projectsPageHeading')}
          </h1>
          <p className="hero-animate hero-delay-3 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch]">
            {t('projectsPageIntro')}
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Hardware */}
      <AnimatedSection id="hardware">
        <CircuitLines side="right" />
        <div className="max-w-6xl mx-auto relative">
          <p className={`fade-in ${labelClass}`}>{t('hwSectionLabel')}</p>
          <h2 className={`fade-in stagger-1 ${h2Class} mb-10 md:mb-12`}>{t('hwSectionTitle')}</h2>

          <div className="flex flex-col gap-6 md:gap-8">
            {hardwareProjects.map((p, i) => (
              <article
                key={p.key}
                className={`fade-in stagger-${i + 2} bg-[var(--color-bg-warm)] rounded-3xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start`}
              >
                {/* Text */}
                <div>
                  <span
                    className="inline-block text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full mb-4"
                    style={{ background: p.tagBg, color: p.tagColor }}
                  >
                    {t(p.tagKey)}
                  </span>
                  <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-medium text-[var(--color-text)] leading-snug mb-2">
                    {t(p.titleKey)}
                  </h3>
                  <a
                    href={p.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 no-underline mb-6"
                  >
                    {p.client}
                    <ArrowUpRight size={14} weight="bold" />
                  </a>

                  <div className="flex flex-col gap-5">
                    <div>
                      <p className={subLabelClass}>{t('taskLabel')}</p>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[55ch]">
                        {t(p.taskKey)}
                      </p>
                    </div>
                    <div>
                      <p className={subLabelClass}>{t('solutionLabel')}</p>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[55ch]">
                        {t(p.solutionKey)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photos: device + admin system */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <PhotoPlaceholder
                    src={p.photos.device}
                    alt={`${t(p.titleKey)} — ${t('photoDevice')}`}
                    label={t('photoDevice')}
                    icon={Cube}
                    aspect="4 / 3"
                    onOpen={openPhoto(p.photos.device, t(p.titleKey), t('photoDevice'))}
                  />
                  <PhotoPlaceholder
                    src={p.photos.admin}
                    alt={`${t(p.titleKey)} — ${t('photoAdmin')}`}
                    label={t('photoAdmin')}
                    icon={Monitor}
                    aspect="16 / 10"
                    onOpen={openPhoto(p.photos.admin, t(p.titleKey), t('photoAdmin'))}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider />

      {/* Web */}
      <AnimatedSection id="web">
        <CircuitLines />
        <div className="max-w-6xl mx-auto relative">
          <p className={`fade-in ${labelClass}`}>{t('webSectionLabel')}</p>
          <h2 className={`fade-in stagger-1 ${h2Class} mb-4`}>{t('webSectionTitle')}</h2>
          <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[55ch] mb-10">
            {t('webSectionIntro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {webProjects.map((w, i) => (
              <Card key={w.key} className={`fade-in stagger-${Math.min(i + 2, 6)} p-4 flex flex-col`}>
                <PhotoPlaceholder
                  src={w.image}
                  alt={t(w.titleKey)}
                  label={w.tech}
                  icon={Browser}
                  aspect="16 / 10"
                  onOpen={openPhoto(w.image, t(w.titleKey), w.client)}
                />
                <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] leading-snug mt-4 mb-2">
                  {t(w.titleKey)}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px] mb-4">
                  {t(w.descKey)}
                </p>
                <a
                  href={w.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
                >
                  {w.client}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider />

      {/* CTA */}
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <div className="fade-in bg-[var(--color-bg-warm)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-2">
                {t('projectsCtaTitle')}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-[50ch]">
                {t('projectsCtaBody')}
              </p>
            </div>
            <Button href="/#contact" className="shrink-0">{t('projectsCta')}</Button>
          </div>
        </div>
      </AnimatedSection>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} caption={lightbox.caption} onClose={closeLightbox} />
      )}
    </>
  )
}
