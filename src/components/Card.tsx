import { Link } from 'react-router-dom'

/* A tile inside a panel: paper surface, hairline border, lifts on hover. Renders as a link when given `to` / `href`. */
type CardProps = {
  children: React.ReactNode
  className?: string
  /** External link: the card becomes an <a> opening in a new tab. */
  href?: string
  /** Internal route: the card becomes a client-side <Link>. */
  to?: string
  /** Turn the hover lift off (for tiles that are not clickable). */
  still?: boolean
}

export const LIFT = 'transition-[transform,box-shadow,border-color] duration-[350ms] ease-soft hover:-translate-y-1 hover:shadow-lift hover:border-line-2'

export default function Card({ children, className = '', href, to, still }: CardProps) {
  const base = `bg-paper border border-line rounded-tile text-ink ${still ? '' : LIFT}`

  if (to) {
    return (
      <Link to={to} className={`${base} block no-underline hover:text-ink ${className}`}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} block no-underline hover:text-ink ${className}`}>
        {children}
      </a>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}
