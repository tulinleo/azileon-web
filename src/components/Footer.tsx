import { Link } from 'react-router-dom'
import { LinkedinLogo, ArrowUpRight } from '@phosphor-icons/react'
import { solutions, BATTERY_DISPATCHER_URL } from '../data/solutions'
import { useT } from '../i18n'

const linkClass = 'text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200'
const headClass = 'text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium'

export default function Footer() {
  const t = useT()

  return (
    <footer className="border-t border-[var(--color-border)] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12">
        <div>
          <span className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)]">Azileon</span>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed whitespace-pre-line max-w-[32ch]">{t('footerTagline')}</p>
        </div>

        <div>
          <p className={headClass}>{t('footerSolutions')}</p>
          <div className="flex flex-col gap-1.5">
            {solutions.map((s) => (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className={linkClass}>
                {t(s.keys.title)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className={headClass}>{t('footerCompany')}</p>
          <div className="flex flex-col gap-1.5">
            <Link to="/projects" className={linkClass}>{t('navProjects')}</Link>
            <Link to="/#team" className={linkClass}>{t('navTeam')}</Link>
            <Link to="/#contact" className={linkClass}>{t('navContact')}</Link>
            <a href={BATTERY_DISPATCHER_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
              {t('footerDemo')}
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>

        <div>
          <p className={headClass}>{t('footerEmail')}</p>
          <div className="flex flex-col gap-1.5 mb-5">
            <a href="mailto:info@azileon.cz" className={linkClass}>info@azileon.cz</a>
            <a href="mailto:yz@azileon.cz" className={linkClass}>yz@azileon.cz</a>
            <a href="mailto:tulin@azileon.cz" className={linkClass}>tulin@azileon.cz</a>
          </div>
          <p className={headClass}>{t('footerConnect')}</p>
          <div className="flex flex-col gap-2">
            <a href="https://www.linkedin.com/in/yzazileon" target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-center gap-2`}>
              <LinkedinLogo size={16} weight="bold" />
              Yehor Zhyliaiev
            </a>
            <a href="https://www.linkedin.com/in/leonidtulin" target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-center gap-2`}>
              <LinkedinLogo size={16} weight="bold" />
              Leonid Tulin
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Azileon. {t('footerRights')}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">{t('footerLocation')}</p>
      </div>
    </footer>
  )
}
