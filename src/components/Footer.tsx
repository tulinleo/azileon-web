import { LinkedinLogo } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <span className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)]">
            Azileon
          </span>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            Software for terminals, lockers<br />
            & self-service devices
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
            Email
          </p>
          <div className="flex flex-col gap-1.5">
            <a href="mailto:info@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              info@azileon.cz
            </a>
            <a href="mailto:yz@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              yz@azileon.cz
            </a>
            <a href="mailto:tulin@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              tulin@azileon.cz
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
            Connect
          </p>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://www.linkedin.com/in/yzazileon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
            >
              <LinkedinLogo size={18} weight="bold" />
              Yehor Zhyliaiev
            </a>
            <a
              href="https://www.linkedin.com/in/leonidtulin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
            >
              <LinkedinLogo size={18} weight="bold" />
              Leonid Tulin
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; 2026 Azileon. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
