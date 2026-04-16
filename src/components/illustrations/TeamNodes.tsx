export default function TeamNodes() {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-6 bottom-8 w-[140px] opacity-35 pointer-events-none"
    >
      {/* Connection line */}
      <line x1="40" y1="60" x2="120" y2="60"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 80, strokeDashoffset: 80, animationDelay: '0.5s' }}
      />

      {/* Branch lines */}
      <line x1="40" y1="60" x2="20" y2="30"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 36, strokeDashoffset: 36, animationDelay: '0.7s' }}
      />
      <line x1="40" y1="60" x2="20" y2="90"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 36, strokeDashoffset: 36, animationDelay: '0.8s' }}
      />
      <line x1="120" y1="60" x2="140" y2="30"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 36, strokeDashoffset: 36, animationDelay: '0.9s' }}
      />
      <line x1="120" y1="60" x2="140" y2="90"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 36, strokeDashoffset: 36, animationDelay: '1.0s' }}
      />

      {/* Main nodes — larger */}
      <circle cx="40" cy="60" r="8"
        className="kiosk-draw"
        style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.3s' }}
      />
      <circle cx="120" cy="60" r="8"
        className="kiosk-draw"
        style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '0.4s' }}
      />

      {/* Leaf nodes */}
      <circle cx="20" cy="30" r="4" className="kiosk-dot" style={{ animationDelay: '1.0s' }} />
      <circle cx="20" cy="90" r="4" className="kiosk-dot" style={{ animationDelay: '1.1s' }} />
      <circle cx="140" cy="30" r="4" className="kiosk-dot" style={{ animationDelay: '1.2s' }} />
      <circle cx="140" cy="90" r="4" className="kiosk-dot" style={{ animationDelay: '1.3s' }} />

      {/* Center dots in main nodes */}
      <circle cx="40" cy="60" r="3" className="kiosk-dot" style={{ animationDelay: '0.6s' }} />
      <circle cx="120" cy="60" r="3" className="kiosk-dot" style={{ animationDelay: '0.7s' }} />
    </svg>
  )
}
