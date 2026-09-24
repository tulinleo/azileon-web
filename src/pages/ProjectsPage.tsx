import { useState, useCallback } from 'react'
import { ArrowUpRight, Cube, Monitor } from '@phosphor-icons/react'
import Panel from '../components/Panel'
import SectionHeader from '../components/SectionHeader'
import CtaBand from '../components/CtaBand'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import Lightbox from '../components/Lightbox'
import { LIFT } from '../components/Card'
import { hardwareProjects } from '../data/hardwareProjects'
import { webProjects } from '../data/webProjects'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

/* /projects: the hardware cases in full (task, what we built, the device and its admin) and the web portfolio. */
const subLabelClass = 'text-xs tracking-[0.1em] uppercase text-ink-3 mb-1.5 font-medium'
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
      {/* Page header — the same card as the home hero's first block */}
      <section className="bg-surface rounded-card px-[clamp(24px,3.8vw,52px)] py-[clamp(24px,3.4vw,44px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-x-14 gap-y-6 items-end">
        <div className="flex flex-col">
          <p className="hero-animate hero-delay-1 self-start mb-[22px] inline-flex items-center text-[13px] font-medium px-3.5 py-2 rounded-full bg-paper border border-line text-ink-2">
            {t('projectsPageLabel')}
          </p>
          <h1 className="hero-animate hero-delay-2 font-heading text-[clamp(2.3rem,4.4vw,4rem)] font-semibold tracking-[-0.045em] leading-none text-balance">{t('projectsPageHeading')}</h1>
        </div>
        <p className="hero-animate hero-delay-3 text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-ink-2 max-w-[52ch] text-pretty">{t('projectsPageIntro')}</p>
      </section>

      {/* Hardware */}
      <Panel id="hardware">
        <SectionHeader label={t('hwSectionLabel')} title={t('hwSectionTitle')} className="fade-in mb-10" />
        <div className="flex flex-col gap-4">
          {hardwareProjects.map((p, i) => (
            <article key={p.key} className={`fade-in stagger-${i + 1} bg-paper border border-line rounded-tile p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start`}>
              <div>
                <span className="inline-block text-[11px] uppercase tracking-[0.05em] font-semibold px-2.5 py-[5px] rounded-full mb-4" style={{ background: p.tagBg, color: p.tagColor }}>
                  {t(p.tagKey)}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-snug mb-2">{t(p.titleKey)}</h3>
                <a href={p.clientUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-base font-medium text-ink-2 hover:text-accent no-underline mb-6">
                  {p.client}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className={subLabelClass}>{t('taskLabel')}</p>
                    <p className="text-ink-2 leading-relaxed text-base max-w-[55ch]">{t(p.taskKey)}</p>
                  </div>
                  <div>
                    <p className={subLabelClass}>{t('solutionLabel')}</p>
                    <p className="text-ink-2 leading-relaxed text-base max-w-[55ch]">{t(p.solutionKey)}</p>
                  </div>
                </div>
              </div>

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
      </Panel>

      {/* Web */}
      <Panel id="web">
        <SectionHeader layout="split" label={t('webSectionLabel')} title={t('webSectionTitle')} sub={t('webSectionIntro')} className="fade-in mb-10" />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
          {webProjects.map((w, i) => (
            <div key={w.key} className={`fade-in stagger-${Math.min(i + 1, 6)}`}>
              <article className={`h-full flex flex-col overflow-hidden rounded-tile bg-paper border border-line ${LIFT}`}>
                <button
                  type="button"
                  onClick={openPhoto(w.image, t(w.titleKey), w.client)}
                  aria-label={`${t('lightboxOpen')}: ${t(w.titleKey)}`}
                  className="group relative block w-full aspect-[16/10] bg-page overflow-hidden border-0 p-0 cursor-zoom-in"
                >
                  <img src={w.image} alt={t(w.titleKey)} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top block transition-transform duration-700 ease-soft group-hover:scale-105" />
                </button>
                <div className="px-5 pt-[18px] pb-[22px] flex flex-col gap-2.5 flex-1">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-[13px] text-ink-3">{w.client}</span>
                    <span className="text-[11px] uppercase tracking-[0.05em] font-semibold px-2.5 py-[5px] rounded-full bg-tag-blue-bg text-tag-blue">{t('webSectionLabel')}</span>
                  </div>
                  <h3 className="font-heading text-[19px] font-medium leading-[1.3]">{t(w.titleKey)}</h3>
                  <p className="text-sm leading-[1.55] text-ink-2">{t(w.descKey)}</p>
                  <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-ink-3">{w.tech}</span>
                    <a href={w.clientUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-accent no-underline hover:text-accent-hover">
                      {w.client}
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Panel>

      <CtaBand title={t('projectsCtaTitle')} body={t('projectsCtaBody')} cta={t('projectsCta')} />

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} caption={lightbox.caption} onClose={closeLightbox} />}
    </>
  )
}
