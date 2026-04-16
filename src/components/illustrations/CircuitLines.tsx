export default function CircuitLines() {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-1/2 -translate-y-1/2 h-[70%] w-auto opacity-50 pointer-events-none"
    >
      {/* Vertical main line — flowing dashes */}
      <line x1="40" y1="0" x2="40" y2="400"
        className="circuit-line-flow"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Branch 1 */}
      <path d="M40 60 L80 60 L80 100"
        className="circuit-line-flow" style={{ animationDelay: '0.2s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="100" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0s' }} />

      {/* Branch 2 */}
      <path d="M40 140 L70 140"
        className="circuit-line-flow" style={{ animationDelay: '0.4s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="70" cy="140" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Branch 3 */}
      <path d="M40 200 L90 200 L90 240 L110 240"
        className="circuit-line-flow" style={{ animationDelay: '0.6s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="110" cy="240" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.0s' }} />

      {/* Branch 4 */}
      <path d="M40 300 L60 300 L60 330"
        className="circuit-line-flow" style={{ animationDelay: '0.8s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="330" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Branch 5 */}
      <path d="M40 360 L100 360"
        className="circuit-line-flow" style={{ animationDelay: '1.0s' }}
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="360" r="4" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.0s' }} />

      {/* Junction dots on main line */}
      <circle cx="40" cy="60" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.3s' }} />
      <circle cx="40" cy="140" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="40" cy="200" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.3s' }} />
      <circle cx="40" cy="300" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.8s' }} />
      <circle cx="40" cy="360" r="3" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '2.3s' }} />
    </svg>
  )
}
