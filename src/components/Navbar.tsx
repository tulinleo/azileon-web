import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, List, X } from '@phosphor-icons/react'
import Logo from './Logo'
import { useT, useLang } from '../i18n'

/* The floating glass header (styles: index.css, "Header"): a translucent bar that sticks 12px under the top edge,
   with a thin accent reading-progress line along its bottom. The nav collapses into a round burger below 960px,
   where the menu drops down as its own glass card. */

const SECTIONS = ['solutions', 'ai', 'process', 'projects', 'team', 'contact'] as const

export default function Navbar() {
  // the drop-down remembers which location it was opened at, so it closes by itself on navigation
  const [openAt, setOpenAt] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [seen, setSeen] = useState('')
  const t = useT()
  const { lang, setLang } = useLang()
  const { pathname, key: locationKey } = useLocation()
  const open = openAt === locationKey
  const setOpen = (o: boolean) => setOpenAt(o ? locationKey : null)

  const links = [
    { id: 'solutions', to: '/#solutions', label: t('navSolutions') },
    { id: 'ai', to: '/#ai', label: t('navAi') },
    { id: 'process', to: '/#process', label: t('navProcess') },
    { id: 'projects', to: '/#projects', label: t('navProjects') },
    { id: 'team', to: '/#team', label: t('navTeam') },
  ]
  const home = pathname === '/'
  const active = home ? seen : pathname.startsWith('/solutions/') ? 'solutions' : pathname === '/projects' ? 'projects' : ''

  // shadow, progress and the section in view — one rAF-throttled scroll listener
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(y > 8)
        setProgress(max > 0 ? Math.min(1, y / max) : 0)
        let current = ''
        for (const id of SECTIONS) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
        }
        setSeen(current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  // Escape closes the drop-down
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenAt(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`az-header sticky top-3 z-50 ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="az-bar">
        <span className="az-sheen" aria-hidden="true" />
        <span className="az-edge" aria-hidden="true" />
        <span className="az-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />

        <Logo className="relative" />

        <nav className="az-nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.id} to={l.to} aria-current={active === l.id ? 'true' : undefined} className={active === l.id ? 'is-active' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="az-right">
          <div className="az-lang" data-lang={lang === 'en' ? 'EN' : 'CZ'} role="group" aria-label="Language">
            <span className="az-lang-thumb" aria-hidden="true" />
            <button type="button" onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
              EN
            </button>
            <button type="button" onClick={() => setLang('cs')} aria-pressed={lang === 'cs'}>
              CZ
            </button>
          </div>

          <Link to="/#contact" className="az-cta btn-primary">
            {t('navCta')}
            <ArrowRight size={14} weight="bold" />
          </Link>

          <button type="button" className="az-burger" onClick={() => setOpen(!open)} aria-label={t('toggleMenu')} aria-expanded={open} aria-controls="az-menu">
            <span>{open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="az-menu" className="az-menu" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.id} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/#contact" className="az-menu-cta btn-primary" onClick={() => setOpen(false)}>
            {t('navCta')} →
          </Link>
        </nav>
      )}
    </header>
  )
}
