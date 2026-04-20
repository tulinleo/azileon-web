import { Envelope, MapPin } from '@phosphor-icons/react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import AnimatedSection from './AnimatedSection'
import Button from './Button'
import MailRobot, { MailEnvelope } from './illustrations/MailRobot'
import CircuitLines from './illustrations/CircuitLines'
import { useT } from '../i18n'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t = useT()

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) clearTimeout(resetTimerRef.current)
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const company = data.get('company')
    const email = data.get('email')
    const message = data.get('message')

    window.location.href = `mailto:info@azileon.cz?subject=${t('mailSubjectPrefix')} ${name}${company ? ` (${company})` : ''}&body=${encodeURIComponent(`${t('mailFrom')}: ${name}\nEmail: ${email}\n${t('mailCompany')}: ${company || t('mailNa')}\n\n${message}`)}`
    setSubmitted(true)
    resetTimerRef.current = setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = 'border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm bg-[var(--color-surface)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 transition-colors duration-200 placeholder:text-[var(--color-text-muted)]'

  return (
    <AnimatedSection id="contact">
      <CircuitLines side="right" />
      <MailEnvelope />
      <div className="max-w-6xl mx-auto relative">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          {t('contactLabel')}
        </p>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] min-w-0">
            {t('contactTitle')}
          </h2>
          <div className="hidden md:block relative w-[120px] h-[120px] shrink-0">
            <MailRobot />
          </div>
        </div>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-12 text-base">
          {t('contactBody')}
        </p>

        <div className="fade-in stagger-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center shrink-0">
                  <Envelope size={18} weight="bold" className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">{t('contactEmail')}</p>
                  <a
                    href="mailto:info@azileon.cz"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
                  >
                    info@azileon.cz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center shrink-0">
                  <MapPin size={18} weight="bold" className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">{t('contactLocation')}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t('contactLocationValue')}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">{t('formName')}</label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder={t('formNamePlaceholder')} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-[var(--color-text)]">{t('formCompany')}</label>
                  <input id="company" name="company" type="text" className={inputClass} placeholder={t('formCompanyPlaceholder')} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">{t('formEmail')}</label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder={t('formEmailPlaceholder')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">{t('formMessage')}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-vertical font-[inherit]`}
                  placeholder={t('formMessagePlaceholder')}
                />
              </div>
              <div className="self-start">
                <Button type="submit">
                  {submitted ? t('formSubmitted') : t('formSubmit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
