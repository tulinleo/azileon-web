import { Link } from 'react-router-dom'
import Logo from './Logo'
import { solutions, BATTERY_DISPATCHER_URL } from '../data/solutions'
import { useT } from '../i18n'

const linkClass = 'self-start no-underline text-cream-2 hover:text-paper hover:translate-x-[3px]'
const headClass = 'text-xs tracking-[0.12em] uppercase text-ink-3 mb-1'

const PEOPLE = [
  { name: 'Yehor Zhyliaiev', url: 'https://www.linkedin.com/in/yzazileon' },
  { name: 'Leonid Tulin', url: 'https://www.linkedin.com/in/leonidtulin' },
  { name: 'Viktor Zhuk', url: 'https://www.linkedin.com/in/viktor-zhuk-fullstack' },
]

export default function Footer() {
  const t = useT()

  return (
    <footer className="fade-in bg-ink text-cream-2 rounded-card px-[clamp(28px,4.5vw,56px)] pt-[clamp(28px,4.5vw,56px)] pb-7">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-9 text-sm mb-14">
        <div className="flex flex-col gap-3.5">
          <Logo tone="dark" className="self-start" />
          <p className="leading-[1.6] max-w-[28ch] whitespace-pre-line">{t('footerTagline')}</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={headClass}>{t('footerSolutions')}</span>
          {solutions.map((s) => (
            <Link key={s.slug} to={`/solutions/${s.slug}`} className={linkClass}>
              {t(s.keys.title)}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={headClass}>{t('footerCompany')}</span>
          <Link to="/projects" className={linkClass}>{t('navProjects')}</Link>
          <Link to="/#team" className={linkClass}>{t('navTeam')}</Link>
          <Link to="/#contact" className={linkClass}>{t('navContact')}</Link>
          <a href={BATTERY_DISPATCHER_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t('footerDemo')} ↗
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={headClass}>{t('footerEmail')}</span>
          <a href="mailto:info@azileon.cz" className={linkClass}>info@azileon.cz</a>
          <a href="mailto:yz@azileon.cz" className={linkClass}>yz@azileon.cz</a>
          <a href="mailto:tulin@azileon.cz" className={linkClass}>tulin@azileon.cz</a>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={headClass}>{t('footerConnect')}</span>
          {PEOPLE.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {p.name} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-dark-rule pt-[22px] flex flex-wrap justify-between gap-3 text-[13px] text-ink-3">
        <span>© {new Date().getFullYear()} Azileon. {t('footerRights')}</span>
        <span>{t('footerLocation')}</span>
      </div>
    </footer>
  )
}
