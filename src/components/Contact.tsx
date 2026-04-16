import { Envelope, MapPin } from '@phosphor-icons/react'
import { type FormEvent, useState } from 'react'
import AnimatedSection from './AnimatedSection'
import Button from './Button'
import MailRobot, { MailEnvelope } from './illustrations/MailRobot'
import CircuitLines from './illustrations/CircuitLines'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const company = data.get('company')
    const email = data.get('email')
    const message = data.get('message')

    window.location.href = `mailto:info@azileon.cz?subject=Inquiry from ${name}${company ? ` (${company})` : ''}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\n${message}`)}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = 'border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm bg-[var(--color-surface)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors duration-200 placeholder:text-[var(--color-text-muted)]'

  return (
    <AnimatedSection id="contact">
      <CircuitLines side="right" />
      <MailEnvelope />
      <div className="max-w-6xl mx-auto relative">
        <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          Contact
        </p>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1]">
            Let's talk
          </h2>
          <div className="relative w-[80px] h-[80px] shrink-0">
            <MailRobot />
          </div>
        </div>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-12 text-base">
          Tell us about your terminals, lockers or self-service devices and we will get back to you within one business day.
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
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">Email</p>
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
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">Location</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Prague, Czech Republic</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">Name</label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-[var(--color-text)]">Company</label>
                  <input id="company" name="company" type="text" className={inputClass} placeholder="Your company" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">Email</label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-vertical font-[inherit]`}
                  placeholder="Tell us about your project"
                />
              </div>
              <div className="self-start">
                <Button type="submit">
                  {submitted ? 'Opening email client...' : 'Send message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
