export default function MailRobot() {
  return (
    <svg
      viewBox="0 0 300 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-24 top-4 w-[300px] opacity-100 pointer-events-none"
    >
      {/* === ROBOT (static, left side) === */}
      {/* Body */}
      <rect x="20" y="55" width="55" height="45" rx="8"
        className="kiosk-draw" style={{ strokeDasharray: 200, strokeDashoffset: 200, animationDelay: '0.3s' }} />
      {/* Head */}
      <rect x="28" y="32" width="40" height="26" rx="6"
        className="kiosk-draw" style={{ strokeDasharray: 132, strokeDashoffset: 132, animationDelay: '0.5s' }} />
      {/* Antenna */}
      <line x1="48" y1="32" x2="48" y2="20"
        className="kiosk-draw-thin" style={{ strokeDasharray: 12, strokeDashoffset: 12, animationDelay: '0.7s' }} />
      <circle cx="48" cy="17" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      {/* Eyes */}
      <circle cx="40" cy="43" r="3" className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="56" cy="43" r="3" className="kiosk-dot" style={{ animationDelay: '0.85s' }} />
      {/* Arm — reaches right, holds envelope position */}
      <line x1="75" y1="72" x2="95" y2="72"
        className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.9s' }} />
      {/* Other arm */}
      <line x1="20" y1="72" x2="8" y2="82"
        className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.7s' }} />
      {/* Legs */}
      <line x1="35" y1="100" x2="35" y2="118"
        className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.6s' }} />
      <line x1="60" y1="100" x2="60" y2="118"
        className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.65s' }} />
      {/* Feet */}
      <line x1="27" y1="118" x2="43" y2="118"
        className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.8s' }} />
      <line x1="52" y1="118" x2="68" y2="118"
        className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.85s' }} />

      {/* === WIRE PATH (static, from robot arm to right edge) === */}
      <path
        d="M95 72 L140 72 L140 40 L200 40 L200 60 L260 60 L260 40 L300 40"
        className="circuit-line-flow"
        stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      {/* Junction dots along wire */}
      <circle cx="140" cy="72" r="2.5" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.3s' }} />
      <circle cx="140" cy="40" r="2.5" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '0.8s' }} />
      <circle cx="200" cy="40" r="2.5" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.3s' }} />
      <circle cx="200" cy="60" r="2.5" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.0s' }} />
      <circle cx="260" cy="60" r="2.5" fill="var(--color-accent)" className="circuit-dot-pulse" style={{ animationDelay: '1.5s' }} />

      {/* === ENVELOPE (animated, travels along wire path) === */}
      <g className="mail-envelope">
        {/* Envelope body */}
        <rect x="-15" y="-10" width="30" height="20" rx="3"
          stroke="var(--color-accent)" strokeWidth="1.5" fill="var(--color-bg)" />
        {/* Envelope flap */}
        <path d="M-13 -8 L0 2 L13 -8"
          stroke="var(--color-accent)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}
