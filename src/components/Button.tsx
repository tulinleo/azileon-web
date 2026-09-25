import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: React.ReactNode
  /** primary — accent; secondary — beige; white — on accent cards; dark — ink. */
  variant?: 'primary' | 'secondary' | 'white' | 'dark'
  /** sm — header; md — the usual; lg — the form's full-width submit. */
  size?: 'sm' | 'md' | 'lg'
  /** Trailing arrow: true for →, 'external' for ↗, false for none (secondary buttons in the mockup have none). */
  arrow?: boolean | 'external'
  /** "#id" scrolls on the current page; "/path" or "/#id" navigates client-side; anything else is a plain link. */
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const SIZE = {
  sm: 'px-5 py-3 text-sm rounded-xl',
  md: 'px-[26px] py-4 text-[15px] rounded-btn',
  lg: 'px-7 py-[18px] text-base font-semibold rounded-btn',
}

/* The finishes live in index.css ("Buttons"): accent, white and ink, all with the header button's gradient,
   highlight and shadow. `secondary` is the white one on light cards, `white` the same on accent cards. */
const VARIANT = {
  primary: 'btn-primary',
  secondary: 'btn-white',
  white: 'btn-white',
  dark: 'btn-dark',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = variant === 'primary' || variant === 'white' || variant === 'dark',
  href,
  type = 'button',
  onClick,
  disabled,
  className: extraClass = '',
}: ButtonProps) {
  const className = `group inline-flex items-center justify-center gap-2.5 font-medium whitespace-nowrap border-0 cursor-pointer no-underline ${SIZE[size]} ${VARIANT[variant]} ${extraClass}`
  const Icon = arrow === 'external' ? ArrowUpRight : ArrowRight
  const tail = arrow ? <Icon size={size === 'sm' ? 14 : 16} weight="bold" className="transition-transform duration-300 ease-soft group-hover:translate-x-[3px]" /> : null

  if (href?.startsWith('/')) {
    return (
      <Link to={href} onClick={onClick} className={className}>
        {children}
        {tail}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href) // another site opens in a new tab
    return (
      <a href={href} onClick={onClick} className={className} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {children}
        {tail}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
      {tail}
    </button>
  )
}
