import { CheckCircle } from '@phosphor-icons/react'
import { useT } from '../i18n'

/* One quiet row under the hero: who has trusted us, and the three things every engagement includes. */
const CLIENTS = ['Košík.cz', 'Payment4U', 'Haymarket Media', 'Anand and Anand', 'Alvib Sistemas', 'Hroda Law']

export default function TrustStrip() {
  const t = useT()
  const facts = [t('trustFact1'), t('trustFact2'), t('trustFact3')]
  return (
    <section className="px-6" aria-label={t('trustLabel')}>
      <div className="max-w-6xl mx-auto border-y border-[var(--color-border)] py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] font-medium mr-1">{t('trustLabel')}</span>
          {CLIENTS.map((c) => (
            <span key={c} className="font-[var(--font-heading)] text-base font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
              {c}
            </span>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 m-0 p-0 list-none">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
              <CheckCircle size={16} weight="bold" className="text-[var(--color-accent)] shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
