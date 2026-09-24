import { Link } from 'react-router-dom'

type CardProps = {
  children: React.ReactNode
  className?: string
  /** External link: the card becomes an <a> opening in a new tab. */
  href?: string
  /** Internal route: the card becomes a client-side <Link>. */
  to?: string
}

export default function Card({ children, className = '', href, to }: CardProps) {
  const base = 'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-lg'

  if (to) {
    return (
      <Link to={to} className={`${base} block no-underline focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none ${className}`}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} block no-underline ${className}`}>
        {children}
      </a>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}
