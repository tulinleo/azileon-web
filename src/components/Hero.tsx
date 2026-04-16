import Button from './Button'
import KioskIllustration from './KioskIllustration'
import { useT } from '../i18n'

export default function Hero() {
  const t = useT()

  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-16 dot-grid">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-12">
        <div className="max-w-2xl">
          <p className="hero-animate hero-delay-1 text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4 font-medium">
            {t('heroLabel')}
          </p>
          <h1 className="hero-animate hero-delay-2 font-[var(--font-heading)] text-5xl md:text-6xl lg:text-[5.5rem] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6">
            {t('heroTitle')}
          </h1>
          <p className="hero-animate hero-delay-3 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-8">
            {t('heroBody')}
          </p>
          <div className="hero-animate hero-delay-4">
            <Button href="#contact">{t('heroCta')}</Button>
          </div>
        </div>

        {/* Kiosk illustration — desktop only */}
        <div className="hidden md:block shrink-0 opacity-70 kiosk-float-delayed">
          <KioskIllustration />
        </div>
      </div>
    </section>
  )
}
