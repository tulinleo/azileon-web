export default function CircuitLines({ side = 'left' }: { side?: 'left' | 'right' }) {
  if (side === 'right') {
    return (
      <svg
        viewBox="0 0 200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block absolute -right-6 top-0 h-full w-auto opacity-30 pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Main vertical trunk — edge to edge vertically */}
        <line x1="170" y1="0" x2="170" y2="500"
          className="circuit-line-flow"
          stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Branches — all end at right edge (x=200) */}
        <path d="M200 90 L170 90 L120 90 L120 140"
          className="circuit-line-flow" style={{ animationDelay: '0.2s' }}
          stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="120" cy="140" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0s' }} />

        <path d="M200 220 L170 220 L130 220"
          className="circuit-line-flow" style={{ animationDelay: '0.5s' }}
          stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="130" cy="220" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.7s' }} />

        <path d="M200 330 L170 330 L100 330 L100 370 L60 370"
          className="circuit-line-flow" style={{ animationDelay: '0.8s' }}
          stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="370" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.2s' }} />

        <path d="M200 430 L170 430 L140 430"
          className="circuit-line-flow" style={{ animationDelay: '1.0s' }}
          stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="140" cy="430" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.5s' }} />

        {/* Junction dots */}
        <circle cx="170" cy="90" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="170" cy="220" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.8s' }} />
        <circle cx="170" cy="330" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.3s' }} />
        <circle cx="170" cy="430" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.8s' }} />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden md:block absolute -left-6 top-0 h-full w-auto opacity-30 pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Main vertical trunk — edge to edge vertically */}
      <line x1="30" y1="0" x2="30" y2="500"
        className="circuit-line-flow"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Branches — all start from left edge (x=0) */}
      <path d="M0 80 L30 80 L80 80 L80 130"
        className="circuit-line-flow" style={{ animationDelay: '0.2s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="130" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0s' }} />

      <path d="M0 180 L30 180 L60 180"
        className="circuit-line-flow" style={{ animationDelay: '0.4s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="180" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.5s' }} />

      <path d="M0 260 L30 260 L100 260 L100 300 L140 300"
        className="circuit-line-flow" style={{ animationDelay: '0.6s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="140" cy="300" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.0s' }} />

      <path d="M0 370 L30 370 L55 370 L55 400"
        className="circuit-line-flow" style={{ animationDelay: '0.8s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="400" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.5s' }} />

      <path d="M0 450 L30 450 L120 450"
        className="circuit-line-flow" style={{ animationDelay: '1.0s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="120" cy="450" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.0s' }} />

      {/* Junction dots */}
      <circle cx="30" cy="80" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.3s' }} />
      <circle cx="30" cy="180" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="30" cy="260" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.3s' }} />
      <circle cx="30" cy="370" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.8s' }} />
      <circle cx="30" cy="450" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.3s' }} />
    </svg>
  )
}
