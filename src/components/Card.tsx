type CardProps = {
  children: React.ReactNode
  className?: string
  href?: string
}

export default function Card({ children, className = '', href }: CardProps) {
  const base = 'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-lg'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} block no-underline ${className}`}>
        {children}
      </a>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}
