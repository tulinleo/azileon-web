import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import Button from './Button'
import { useT, useLang } from '../i18n'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useT()
  const { lang, setLang } = useLang()
  const { pathname } = useLocation()

  const links = [
    { to: '/#services', label: t('navServices') },
    { to: '/projects', label: t('navProjects'), active: pathname === '/projects' },
    { to: '/#team', label: t('navTeam') },
    { to: '/#contact', label: t('navContact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const LangToggle = () => (
    <div className="flex items-center gap-1 text-sm">
      <button onClick={() => setLang('en')} className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text-muted)]'} bg-transparent border-none cursor-pointer`}>EN</button>
      <span className="text-[var(--color-border)]">|</span>
      <button onClick={() => setLang('cs')} className={`px-1.5 py-0.5 rounded ${lang === 'cs' ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text-muted)]'} bg-transparent border-none cursor-pointer`}>CZ</button>
    </div>
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md transition-[border-color] duration-300 ${
        scrolled ? 'border-b border-[var(--color-border)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)] tracking-tight no-underline"
        >
          Azileon
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={link.active ? 'page' : undefined}
              className={`relative text-sm transition-colors duration-200 no-underline after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[var(--color-text)] after:origin-left after:transition-transform after:duration-200 hover:text-[var(--color-text)] hover:after:scale-x-100 ${
                link.active ? 'text-[var(--color-text)] after:scale-x-100' : 'text-[var(--color-text-secondary)] after:scale-x-0'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LangToggle />
          <Button href="/#contact">{t('navCta')}</Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--color-text)] bg-transparent border-none cursor-pointer"
          aria-label={t('toggleMenu')}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-5 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              aria-current={link.active ? 'page' : undefined}
              className={`text-sm no-underline py-3 border-b border-[var(--color-border)] last:border-b-0 ${
                link.active ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-4">
            <LangToggle />
            <Button href="/#contact" onClick={() => setOpen(false)}>{t('navCta')}</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
