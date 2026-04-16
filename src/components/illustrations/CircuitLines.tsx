export default function CircuitLines() {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-auto opacity-40 pointer-events-none"
    >
      {/* Vertical main line */}
      <line x1="40" y1="0" x2="40" y2="400"
        className="kiosk-draw-thin" style={{ strokeDasharray: 400, strokeDashoffset: 400, animationDelay: '0.3s' }} />

      {/* Branch 1 — right */}
      <path d="M40 60 L40 60 L80 60 L80 100"
        className="kiosk-draw-thin" style={{ strokeDasharray: 80, strokeDashoffset: 80, animationDelay: '0.6s' }} />
      <circle cx="80" cy="100" r="4" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />

      {/* Branch 2 — right short */}
      <path d="M40 140 L70 140"
        className="kiosk-draw-thin" style={{ strokeDasharray: 30, strokeDashoffset: 30, animationDelay: '0.8s' }} />
      <circle cx="70" cy="140" r="3" className="kiosk-dot" style={{ animationDelay: '1.1s' }} />

      {/* Branch 3 — right long */}
      <path d="M40 200 L90 200 L90 240 L110 240"
        className="kiosk-draw-thin" style={{ strokeDasharray: 90, strokeDashoffset: 90, animationDelay: '0.7s' }} />
      <circle cx="110" cy="240" r="4" className="kiosk-dot" style={{ animationDelay: '1.2s' }} />

      {/* Branch 4 — right */}
      <path d="M40 300 L60 300 L60 330"
        className="kiosk-draw-thin" style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.9s' }} />
      <circle cx="60" cy="330" r="3" className="kiosk-dot" style={{ animationDelay: '1.3s' }} />

      {/* Branch 5 — right */}
      <path d="M40 360 L100 360"
        className="kiosk-draw-thin" style={{ strokeDasharray: 60, strokeDashoffset: 60, animationDelay: '1.0s' }} />
      <circle cx="100" cy="360" r="4" className="kiosk-dot" style={{ animationDelay: '1.4s' }} />

      {/* Junction dots on main line */}
      <circle cx="40" cy="60" r="3" className="kiosk-dot" style={{ animationDelay: '0.5s' }} />
      <circle cx="40" cy="140" r="3" className="kiosk-dot" style={{ animationDelay: '0.7s' }} />
      <circle cx="40" cy="200" r="3" className="kiosk-dot" style={{ animationDelay: '0.6s' }} />
      <circle cx="40" cy="300" r="3" className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="40" cy="360" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
    </svg>
  )
}
