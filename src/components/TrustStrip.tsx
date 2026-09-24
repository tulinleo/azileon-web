import { useT } from '../i18n'

/* One quiet white row under the hero: who has trusted us. */
const CLIENTS = ['Košík.cz', 'Payment4U', 'Haymarket Media', 'Anand and Anand', 'Alvib Sistemas', 'Hroda Law']

export default function TrustStrip() {
  const t = useT()
  return (
    <section aria-label={t('trustLabel')} className="fade-in bg-surface rounded-inner px-7 py-[22px] flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5">
      <span className="text-xs tracking-[0.15em] uppercase text-ink-3 font-medium">{t('trustLabel')}</span>
      {CLIENTS.map((c) => (
        <span key={c} className="font-heading text-[17px] font-medium text-ink-2 transition-colors duration-300 hover:text-accent">
          {c}
        </span>
      ))}
    </section>
  )
}
