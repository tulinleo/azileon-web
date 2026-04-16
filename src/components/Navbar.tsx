import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import Button from './Button'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <Button href="#contact">Get in touch</Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--color-text)] bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
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
          <div className="mt-3">
            <Button href="#contact">Get in touch</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
