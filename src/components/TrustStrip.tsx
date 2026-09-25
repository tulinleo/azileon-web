import { CheckCircle } from '@phosphor-icons/react'
import { useT } from '../i18n'

/* One quiet white card under the hero: who has trusted us, and under a hairline the three things every engagement
   includes. */
const CLIENTS = ['Košík.cz', 'Payment4U', 'Haymarket Media', 'Anand and Anand', 'Alvib Sistemas', 'Hroda Law']

export default function TrustStrip() {
  const t = useT()
  const facts = [t('trustFact1'), t('trustFact2'), t('trustFact3')]
  return (
    <section aria-label={t('trustLabel')} className="fade-in bg-surface rounded-inner px-7 py-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5">
        <span className="text-xs tracking-[0.15em] uppercase text-ink-3 font-medium">{t('trustLabel')}</span>
        {CLIENTS.map((c) => (
          <span key={c} className="font-heading text-[17px] font-medium text-ink-2 transition-colors duration-300 hover:text-accent">
            {c}
          </span>
        ))}
      </div>
      <ul className="m-0 p-0 list-none mt-[18px] pt-[18px] border-t border-line flex flex-wrap justify-between gap-x-7 gap-y-2.5">
        {facts.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-ink-2">
            <CheckCircle size={16} weight="bold" className="text-accent shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </section>
  )
}
