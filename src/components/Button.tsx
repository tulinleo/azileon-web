import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  /** "#id" scrolls on the current page; "/path" or "/#id" navigates client-side; anything else is a plain link. */
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'primary', href, type = 'button', onClick, className: extraClass = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer group focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:outline-none'

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white border-none hover:bg-[var(--color-accent-hover)] active:scale-[0.98]',
    secondary: 'bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] active:scale-[0.98]',
  }

  const className = `${base} ${variants[variant]} ${extraClass}`
  const arrow = <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />

  if (href?.startsWith('/')) {
    return (
      <Link to={href} onClick={onClick} className={`${className} no-underline`}>
        {children}
        {arrow}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href) // another site opens in a new tab
    return (
      <a href={href} onClick={onClick} className={`${className} no-underline`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {children}
        {arrow}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
      {arrow}
    </button>
  )
}
