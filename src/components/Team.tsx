import { LinkedinLogo, Envelope } from '@phosphor-icons/react'
import { useT, type TKey } from '../i18n'

/* Who we are: an intro card, then one card per person — ink, white and accent. */
const MEMBERS: {
  name: string
  initials: string
  role: TKey
  bio: TKey
  tags: TKey
  linkedin: string
  email: string
  card: string
  avatar: string
  button: string
  chip: string
  roleColor: string
}[] = [
  {
    name: 'Yehor Zhyliaiev',
    initials: 'YZ',
    role: 'roleYehor',
    bio: 'bioYehor',
    tags: 'tagsYehor',
    linkedin: 'https://www.linkedin.com/in/yzazileon',
    email: 'yz@azileon.cz',
    card: 'bg-ink text-paper',
    avatar: 'bg-accent text-white',
    button: 'bg-dark-2 hover:bg-accent hover:text-white',
    chip: 'bg-dark-2',
    roleColor: 'text-accent-2',
  },
  {
    name: 'Leonid Tulin',
    initials: 'LT',
    role: 'roleLeonid',
    bio: 'bioLeonid',
    tags: 'tagsLeonid',
    linkedin: 'https://www.linkedin.com/in/leonidtulin',
    email: 'tulin@azileon.cz',
    card: 'bg-surface text-ink',
    avatar: 'bg-page text-accent',
    button: 'bg-page hover:bg-accent hover:text-white',
    chip: 'bg-page',
    roleColor: 'text-accent',
  },
  {
    name: 'Viktor Zhuk',
    initials: 'VZ',
    role: 'roleViktor',
    bio: 'bioViktor',
    tags: 'tagsViktor',
    linkedin: 'https://www.linkedin.com/in/viktor-zhuk-fullstack',
    email: 'zazplay3881@gmail.com',
    card: 'bg-accent text-white',
    avatar: 'bg-surface text-accent',
    button: 'bg-white/18 hover:bg-surface hover:text-accent',
    chip: 'bg-white/18',
    roleColor: 'text-accent-pale-3',
  },
]

export default function Team() {
  const t = useT()
  const facts = [
    { label: t('teamFactBasedLabel'), value: t('teamFactBased') },
    { label: t('teamFactScopeLabel'), value: t('teamFactScope') },
    { label: t('teamFactEngagementLabel'), value: t('teamFactEngagement') },
  ]

  return (
    <section id="team" className="flex flex-col gap-bento">
      <div className="fade-in bg-surface rounded-card p-[clamp(28px,4vw,56px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-x-16 gap-y-7 items-end">
        <div>
          <p className="text-xs tracking-[0.15em] uppercase font-semibold mb-4 text-accent">{t('teamLabel')}</p>
          <h2 className="font-heading text-[clamp(2rem,3.6vw,3rem)] font-medium tracking-[-0.035em] leading-[1.06] text-balance">{t('teamTitle')}</h2>
        </div>
        <div className="flex flex-col gap-[22px]">
          <p className="text-base leading-[1.65] text-ink-2 text-pretty">{t('teamBody')}</p>
          <dl className="m-0 grid grid-cols-3 gap-4 border-t border-line pt-[18px]">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-ink-3 mb-1">{f.label}</dt>
                <dd className="m-0 font-heading text-base font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-bento">
        {MEMBERS.map((m, i) => (
          <div key={m.name} className={`fade-in stagger-${i + 1}`}>
            <article className={`h-full rounded-card p-[clamp(28px,4vw,40px)] flex flex-col gap-10 min-h-[280px] ${m.card}`}>
              <div className="flex justify-between items-start">
                <span className={`w-[84px] h-[84px] rounded-3xl grid place-items-center font-heading text-[26px] font-semibold ${m.avatar}`} aria-hidden="true">
                  {m.initials}
                </span>
                <div className="flex gap-2">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} ${t('onLinkedin')}`}
                    className={`w-[42px] h-[42px] rounded-xl grid place-items-center hover:-translate-y-0.5 ${m.button}`}
                  >
                    <LinkedinLogo size={18} weight="bold" />
                  </a>
                  <a href={`mailto:${m.email}`} aria-label={`${t('emailPerson')} ${m.name}`} className={`w-[42px] h-[42px] rounded-xl grid place-items-center hover:-translate-y-0.5 ${m.button}`}>
                    <Envelope size={18} weight="bold" />
                  </a>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-4">
                <div>
                  <h3 className="font-heading text-[26px] font-medium tracking-[-0.02em] mb-1.5">{m.name}</h3>
                  <p className={`text-sm font-semibold tracking-[0.02em] ${m.roleColor}`}>{t(m.role)}</p>
                </div>
                <p className="text-sm leading-[1.6] opacity-[.82] text-pretty">{t(m.bio)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t(m.tags)
                    .split('|')
                    .map((tag) => (
                      <span key={tag} className={`text-xs font-medium px-2.5 py-[5px] rounded-lg ${m.chip}`}>
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
