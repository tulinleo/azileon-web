import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import Button from './Button'
import { useT, useLang } from '../i18n'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useT()
  const { lang, setLang } = useLang()

  const links = [
    { href: '#services', label: t('navServices') },
    { href: '#projects', label: t('navProjects') },
    { href: '#team', label: t('navTeam') },
    { href: '#contact', label: t('navContact') },
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
        <a
          href="#"
          className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)] tracking-tight no-underline"
        >
          Azileon
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 no-underline after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[var(--color-text)] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
          <LangToggle />
          <Button href="#contact">{t('navCta')}</Button>
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
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--color-text-secondary)] no-underline py-3 border-b border-[var(--color-border)] last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-4">
            <LangToggle />
            <Button href="#contact">{t('navCta')}</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
