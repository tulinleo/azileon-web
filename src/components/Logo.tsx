import { Link } from 'react-router-dom'

/* The mark: a dark rounded tile with an abstract "A" — a chevron for the apex and an accent dot for the base, so it
   reads as the letter and as an arrow up. Drawn as strokes, so the favicon and the header match without a web font.
   The wordmark is in Space Grotesk. `tone="dark"` is the footer's version on ink — the same mark, light text. */
export function Mark({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="30" fill="#1a1a1a" />
      <path d="M27 70 L50 28 L73 70" fill="none" stroke="#fafaf9" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="74" r="7" fill="#b86e2f" />
    </svg>
  )
}

export default function Logo({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 no-underline ${dark ? 'text-paper hover:text-paper' : 'text-ink hover:text-ink'} ${className}`} aria-label="Azileon — home">
      <Mark size={dark ? 24 : 26} className="shrink-0 rounded-lg" />
      <span className={`font-heading font-semibold tracking-[-0.02em] ${dark ? 'text-[19px]' : 'text-xl'}`}>Azileon</span>
    </Link>
  )
}
