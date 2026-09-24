import { useState } from 'react'
import { ChartLineUp, Pulse, ChatCircleText, Check, type Icon } from '@phosphor-icons/react'
import SectionHeader from './SectionHeader'
import Button from './Button'
import { BATTERY_DISPATCHER_URL } from '../data/solutions'
import { asset } from '../lib/asset'
import { useT } from '../i18n'

/* The AI layer as a pair of cards: on ink, what it does — three items that open one at a time; on white, the
   dispatcher that already runs, with a screenshot that opens the live demo. */

function Item({ icon: Icon, title, text, open, onToggle }: { icon: Icon; title: string; text: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`text-left rounded-[18px] px-[22px] py-5 flex gap-4 items-start cursor-pointer border text-paper transition-colors duration-300 ${
        open ? 'bg-dark-3 border-dark-line' : 'bg-transparent border-dark-2 hover:border-[#4A4642]'
      }`}
    >
      <span className="w-10 h-10 rounded-xl bg-dark-2 grid place-items-center shrink-0">
        <Icon size={20} weight="bold" className="text-accent-2" />
      </span>
      <span className="flex flex-col gap-1.5 flex-1 min-w-0">
        <span className="flex justify-between items-center gap-3 min-h-10">
          <span className="font-heading text-[19px] font-medium">{title}</span>
          <span
            aria-hidden="true"
            className={`w-[26px] h-[26px] rounded-full border border-dark-line grid place-items-center shrink-0 text-accent-2 text-base leading-none transition-transform duration-[400ms] ease-soft ${open ? 'rotate-45' : ''}`}
          >
            +
          </span>
        </span>
        <span className={`grid transition-[grid-template-rows,opacity] duration-[450ms] ease-soft ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <span className="overflow-hidden min-h-0">
            <span className="block text-sm leading-[1.6] text-cream-2 pt-0.5">{text}</span>
          </span>
        </span>
      </span>
    </button>
  )
}

export default function AiSection() {
  const t = useT()
  const [open, setOpen] = useState(0)
  const items = [
    { icon: ChartLineUp, title: t('ai1Title'), text: t('ai1Text') },
    { icon: Pulse, title: t('ai2Title'), text: t('ai2Text') },
    { icon: ChatCircleText, title: t('ai3Title'), text: t('ai3Text') },
  ]

  return (
    <section id="ai" className="grid grid-cols-1 lg:grid-cols-2 gap-bento">
      <div className="fade-in bg-ink text-paper rounded-card p-[clamp(28px,4.5vw,56px)] flex flex-col gap-8">
        <SectionHeader tone="dark" label={t('aiLabel')} title={t('aiTitle')} sub={t('aiSub')} className="[&>h2]:mb-0 [&>p:last-child]:max-w-[46ch]" />
        <div className="flex flex-col gap-2.5">
          {items.map((it, i) => (
            <Item key={it.title} {...it} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>

      <div className="fade-in stagger-1 bg-surface rounded-card overflow-hidden flex flex-col">
        <div className="px-[clamp(12px,1.4vw,16px)] pt-[clamp(12px,1.4vw,16px)]">
          <a
            href={BATTERY_DISPATCHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-inner overflow-hidden border border-line bg-page transition-[transform,box-shadow] duration-[350ms] ease-soft hover:-translate-y-[3px] hover:shadow-[0_18px_36px_-22px_rgba(26,26,26,.35)]"
          >
            <img
              src={asset('/projects/web/battery-dispatcher.webp')}
              alt={t('aiLiveTitle')}
              loading="lazy"
              className="block w-full aspect-[16/10] object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </a>
        </div>
        <div className="p-[clamp(24px,3vw,36px)] flex flex-col gap-[18px]">
          <span className="self-start inline-flex items-center gap-2 bg-ok-bg text-ok px-3.5 py-2 rounded-full text-xs font-semibold tracking-[0.06em] uppercase">
            <span className="w-[7px] h-[7px] rounded-full bg-ok animate-pulse-dot" />
            {t('aiLive')}
          </span>
          <div>
            <h3 className="font-heading text-[26px] font-medium tracking-[-0.02em] mb-2">{t('aiLiveTitle')}</h3>
            <p className="text-[15px] leading-[1.6] text-ink-2">{t('aiLiveText')}</p>
          </div>
          <ul className="m-0 p-0 list-none flex flex-col gap-2 text-sm text-ink-2">
            {[t('aiFact1'), t('aiFact2')].map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check size={14} weight="bold" className="text-accent mt-[3px] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button href={BATTERY_DISPATCHER_URL} arrow="external" className="self-start !px-6 !py-3.5">
            {t('aiLiveCta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
