import { ArrowRight } from '@phosphor-icons/react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'primary', href, type = 'button', onClick, className: extraClass = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer group'

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white border-none hover:bg-[var(--color-accent-hover)] active:scale-[0.98]',
    secondary: 'bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] active:scale-[0.98]',
  }

  const className = `${base} ${variants[variant]} ${extraClass}`

  if (href) {
    return (
      <a href={href} className={`${className} no-underline`}>
        {children}
        <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
      <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  )
}
