import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#clients', label: 'Clients' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-14">
        <a
          href="#"
          className="font-serif text-xl text-white tracking-tight no-underline"
        >
          Azileon
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 no-underline tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:info@azileon.cz"
            className="text-[13px] bg-white/12 text-white px-4 py-1.5 rounded-lg no-underline hover:bg-white/20 transition-colors duration-200 active:scale-[0.98] border border-white/10"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/8 bg-black/40 backdrop-blur-xl px-6 py-5 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-white/70 no-underline py-2 border-b border-white/8 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:info@azileon.cz"
            className="text-sm bg-white/12 text-white px-4 py-2.5 rounded-lg no-underline text-center mt-2 border border-white/10"
          >
            Get in touch
          </a>
        </div>
      )}
    </nav>
  )
}
