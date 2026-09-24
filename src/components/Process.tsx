import Panel from './Panel'
import SectionHeader from './SectionHeader'
import { useT } from '../i18n'

/* Four steps from the first visit to the handover, on four surfaces: paper, beige, ink, accent. */
const TONE = [
  { card: 'bg-paper text-ink', num: 'text-accent', chip: 'bg-page' },
  { card: 'bg-page text-ink', num: 'text-accent', chip: 'bg-surface' },
  { card: 'bg-ink text-paper', num: 'text-accent-2', chip: 'bg-dark-2' },
  { card: 'bg-accent text-white', num: 'text-white', chip: 'bg-white/18' },
]

export default function Process() {
  const t = useT()
  const steps = [
    { title: t('step1Title'), text: t('step1Text'), when: t('step1When') },
    { title: t('step2Title'), text: t('step2Text'), when: t('step2When') },
    { title: t('step3Title'), text: t('step3Text'), when: t('step3When') },
    { title: t('step4Title'), text: t('step4Text'), when: t('step4When') },
  ]
  return (
    <Panel id="process">
      <SectionHeader label={t('processLabel')} title={t('processTitle')} className="fade-in mb-11" />
      <ol className="m-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3.5">
        {steps.map((s, i) => (
          <li key={s.title} className={`fade-in stagger-${i + 1} lift`}>
            <div className={`lift-body h-full rounded-tile p-[26px] min-h-[230px] flex flex-col ${TONE[i].card}`}>
              <div className="flex justify-between items-center mb-auto">
                <span className={`font-heading text-[44px] font-medium tracking-[-0.04em] leading-none ${TONE[i].num}`}>0{i + 1}</span>
                <span className={`text-xs font-semibold tracking-[0.06em] uppercase px-2.5 py-1.5 rounded-full ${TONE[i].chip}`}>{s.when}</span>
              </div>
              <h3 className="font-heading text-[21px] font-medium mt-9 mb-2">{s.title}</h3>
              <p className="text-sm leading-[1.55] opacity-80">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  )
}
