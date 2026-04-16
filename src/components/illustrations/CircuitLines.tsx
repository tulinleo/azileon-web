export default function CircuitLines() {
  return (
    <svg
      viewBox="0 0 200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -left-6 top-0 h-full w-auto opacity-30 pointer-events-none"
      preserveAspectRatio="none"
    >
      {/* Main vertical trunk — starts from top edge, ends at bottom edge */}
      <line x1="30" y1="0" x2="30" y2="500"
        className="circuit-line-flow"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Branch 1 — goes right, starts from left edge */}
      <path d="M0 80 L30 80 L80 80 L80 130"
        className="circuit-line-flow" style={{ animationDelay: '0.2s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="130" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0s' }} />

      {/* Branch 2 — starts from left edge */}
      <path d="M0 180 L30 180 L60 180"
        className="circuit-line-flow" style={{ animationDelay: '0.4s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="180" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Branch 3 — longer, starts from left edge */}
      <path d="M0 260 L30 260 L100 260 L100 300 L140 300"
        className="circuit-line-flow" style={{ animationDelay: '0.6s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="140" cy="300" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.0s' }} />

      {/* Branch 4 — starts from left edge */}
      <path d="M0 370 L30 370 L55 370 L55 400"
        className="circuit-line-flow" style={{ animationDelay: '0.8s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="400" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Branch 5 — starts from left edge */}
      <path d="M0 450 L30 450 L120 450"
        className="circuit-line-flow" style={{ animationDelay: '1.0s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="120" cy="450" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.0s' }} />

      {/* Junction dots on main trunk */}
      <circle cx="30" cy="80" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.3s' }} />
      <circle cx="30" cy="180" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="30" cy="260" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.3s' }} />
      <circle cx="30" cy="370" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.8s' }} />
      <circle cx="30" cy="450" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.3s' }} />
    </svg>
  )
}
