import { type FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowRight, Envelope } from '@phosphor-icons/react'
import Button from './Button'
import { solutions } from '../data/solutions'
import { useT } from '../i18n'

/* The accent card: the invitation and two contact tiles on the left, the form on a white card on the right.
   Topic chips let the visitor say which product line it is about. There is no backend: submitting opens the
   visitor's mail client with the message filled in, the form says so and keeps its contents, and offers the plain
   address in case no mail client opened. */
export default function Contact() {
  const t = useT()
  const [topics, setTopics] = useState<string[]>([])
  const [state, setState] = useState<'idle' | 'opening' | 'opened'>('idle')
  const [mailHref, setMailHref] = useState('mailto:info@azileon.cz')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const topicList = [...solutions.map((s) => t(s.keys.title)), t('formTopicOther')]
  const toggle = (topic: string) => setTopics((ts) => (ts.includes(topic) ? ts.filter((x) => x !== topic) : [...ts, topic]))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const company = String(data.get('company') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = `${t('mailSubjectPrefix')} ${name}${company ? ` (${company})` : ''}`
    const body = [
      `${t('mailFrom')}: ${name}`,
      `Email: ${email}`,
      `${t('mailCompany')}: ${company || t('mailNa')}`,
      topics.length ? `${t('mailTopics')}: ${topics.join(', ')}` : '',
      '',
      message,
    ]
      .filter((line, i, arr) => line !== '' || i === arr.length - 2)
      .join('\n')

    const href = `mailto:info@azileon.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setMailHref(href)
    setState('opening')
    window.location.href = href
    timers.current.forEach(clearTimeout)
    timers.current = [setTimeout(() => setState('opened'), 1200)]
  }

  const inputClass =
    'px-4 py-3.5 border border-line rounded-btn bg-paper text-[15px] text-ink outline-none placeholder:text-ink-3 focus:border-accent focus:bg-surface transition-[border-color,background-color,box-shadow] duration-200'
  const labelClass = 'flex flex-col gap-[7px] text-[13px] font-medium text-ink-2'

  return (
    <section
      id="contact"
      className="fade-in relative overflow-hidden bg-accent text-white rounded-card p-[clamp(12px,1.6vw,20px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-[clamp(12px,1.6vw,20px)] dot-grid-light"
    >
      <div className="p-[clamp(20px,4vw,44px)] flex flex-col justify-between gap-12">
        <div>
          <p className="text-xs tracking-[0.15em] uppercase font-semibold mb-4 text-accent-pale">{t('contactLabel')}</p>
          <h2 className="font-heading text-[clamp(3rem,6vw,4.8rem)] font-semibold tracking-[-0.05em] leading-[.95] mb-5">{t('contactTitle')}</h2>
          <p className="text-[17px] leading-[1.6] text-accent-pale-2 max-w-[40ch]">{t('contactBody')}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-2.5">
          <a href="mailto:info@azileon.cz" className="bg-white/14 rounded-[18px] px-5 py-[18px] flex flex-col gap-1.5 text-white no-underline hover:bg-white/22 hover:text-white">
            <span className="text-xs text-accent-pale">{t('contactEmail')}</span>
            <span className="font-heading text-[19px] font-medium">info@azileon.cz</span>
          </a>
          <div className="bg-white/14 rounded-[18px] px-5 py-[18px] flex flex-col gap-1.5">
            <span className="text-xs text-accent-pale">{t('contactLocation')}</span>
            <span className="font-heading text-[19px] font-medium">{t('contactLocationValue')}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface text-ink rounded-tile p-[clamp(24px,3.6vw,40px)] flex flex-col gap-[18px]" style={{ boxShadow: 'var(--shadow-form)' }}>
        <div className="flex justify-between items-center gap-4 pb-[18px] border-b border-line">
          <div>
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] mb-1">{t('formTitle')}</h3>
            <p className="text-sm text-ink-3">{t('formHint')}</p>
          </div>
          <span className="w-12 h-12 rounded-btn bg-page grid place-items-center shrink-0">
            <Envelope size={22} weight="bold" className="text-accent" />
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-medium text-ink-2">{t('formTopicLabel')}</span>
          <div className="flex flex-wrap gap-2">
            {topicList.map((topic) => {
              const on = topics.includes(topic)
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggle(topic)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-[9px] rounded-xl text-sm whitespace-nowrap cursor-pointer border ${
                    on ? 'bg-ink text-white border-ink' : 'bg-paper text-ink-2 border-line hover:border-accent'
                  }`}
                >
                  <span aria-hidden="true" className={`inline-block overflow-hidden text-accent-2 transition-[width,opacity] duration-250 ${on ? 'w-3 opacity-100' : 'w-0 opacity-0'}`}>
                    ✓
                  </span>
                  {topic}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <label className={labelClass}>
            {t('formName')}
            <input name="name" type="text" required placeholder={t('formNamePlaceholder')} className={inputClass} />
          </label>
          <label className={labelClass}>
            {t('formCompany')}
            <input name="company" type="text" placeholder={t('formCompanyPlaceholder')} className={inputClass} />
          </label>
        </div>
        <label className={labelClass}>
          {t('formEmail')}
          <input name="email" type="email" required placeholder={t('formEmailPlaceholder')} className={inputClass} />
        </label>
        <label className={labelClass}>
          {t('formMessage')}
          <textarea name="message" required rows={4} placeholder={t('formMessagePlaceholder')} className={`${inputClass} resize-y`} />
        </label>

        <div className="flex flex-col-reverse items-stretch gap-3 mt-1">
          {state === 'opened' ? (
            <p role="status" className="text-[13px] leading-[1.5] text-ink-2 text-center bg-paper border border-line rounded-xl px-4 py-3 animate-rise">
              {t('formOpened')}{' '}
              <a href={mailHref} className="font-semibold text-accent hover:text-accent-hover">
                info@azileon.cz
              </a>
            </p>
          ) : (
            state === 'idle' && <span className="text-[13px] text-ink-3 text-center">{t('formNote')}</span>
          )}
          <Button type="submit" size="lg" arrow={false} disabled={state === 'opening'} className="w-full">
            {state === 'opening' ? (
              <>
                <span aria-hidden="true" className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin-slow" />
                {t('formSending')}
              </>
            ) : (
              <>
                {t('formSubmit')}
                <ArrowRight size={16} weight="bold" className="transition-transform duration-300 ease-soft group-hover:translate-x-[3px]" />
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  )
}
