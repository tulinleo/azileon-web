export default function TeamRobots() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-6 bottom-8 w-[240px] opacity-40 pointer-events-none"
    >
      {/* Robot 1 — left */}
      {/* Body */}
      <rect x="20" y="60" width="55" height="45" rx="8"
        className="kiosk-draw" style={{ strokeDasharray: 200, strokeDashoffset: 200, animationDelay: '0.3s' }} />
      {/* Head */}
      <rect x="28" y="35" width="38" height="28" rx="6"
        className="kiosk-draw" style={{ strokeDasharray: 132, strokeDashoffset: 132, animationDelay: '0.5s' }} />
      {/* Antenna */}
      <line x1="47" y1="35" x2="47" y2="23" className="kiosk-draw-thin" style={{ strokeDasharray: 12, strokeDashoffset: 12, animationDelay: '0.7s' }} />
      <circle cx="47" cy="20" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      {/* Eyes */}
      <circle cx="40" cy="47" r="3" className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="54" cy="47" r="3" className="kiosk-dot" style={{ animationDelay: '0.85s' }} />
      {/* Waving arm */}
      <path d="M75 70 L95 55 L100 40" className="kiosk-draw robot-wave-1" style={{ strokeDasharray: 40, strokeDashoffset: 40, animationDelay: '0.9s' }} />
      <circle cx="100" cy="37" r="3" className="kiosk-dot" style={{ animationDelay: '1.2s' }} />
      {/* Other arm */}
      <line x1="20" y1="80" x2="8" y2="90" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.7s' }} />
      {/* Legs */}
      <line x1="35" y1="105" x2="35" y2="125" className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.6s' }} />
      <line x1="60" y1="105" x2="60" y2="125" className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.65s' }} />
      {/* Feet */}
      <line x1="27" y1="125" x2="43" y2="125" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.8s' }} />
      <line x1="52" y1="125" x2="68" y2="125" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.85s' }} />

      {/* Robot 2 — right */}
      {/* Body */}
      <rect x="160" y="55" width="60" height="50" rx="8"
        className="kiosk-draw" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDelay: '0.4s' }} />
      {/* Head */}
      <rect x="170" y="28" width="42" height="30" rx="6"
        className="kiosk-draw" style={{ strokeDasharray: 144, strokeDashoffset: 144, animationDelay: '0.6s' }} />
      {/* Antenna */}
      <line x1="191" y1="28" x2="191" y2="15" className="kiosk-draw-thin" style={{ strokeDasharray: 13, strokeDashoffset: 13, animationDelay: '0.8s' }} />
      <circle cx="191" cy="12" r="3" className="kiosk-dot" style={{ animationDelay: '1.0s' }} />
      {/* Eyes */}
      <circle cx="183" cy="41" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      <circle cx="199" cy="41" r="3" className="kiosk-dot" style={{ animationDelay: '0.95s' }} />
      {/* Waving arm */}
      <path d="M160 65 L140 50 L132 35" className="kiosk-draw robot-wave-2" style={{ strokeDasharray: 40, strokeDashoffset: 40, animationDelay: '1.0s' }} />
      <circle cx="132" cy="32" r="3" className="kiosk-dot" style={{ animationDelay: '1.3s' }} />
      {/* Other arm */}
      <line x1="220" y1="75" x2="235" y2="85" className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.8s' }} />
      {/* Legs */}
      <line x1="178" y1="105" x2="178" y2="128" className="kiosk-draw" style={{ strokeDasharray: 23, strokeDashoffset: 23, animationDelay: '0.7s' }} />
      <line x1="204" y1="105" x2="204" y2="128" className="kiosk-draw" style={{ strokeDasharray: 23, strokeDashoffset: 23, animationDelay: '0.75s' }} />
      {/* Feet */}
      <line x1="170" y1="128" x2="186" y2="128" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.9s' }} />
      <line x1="196" y1="128" x2="212" y2="128" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.95s' }} />

      {/* Connection between robots — wifi/signal arcs */}
      <path d="M108 60 Q120 45 132 60" className="kiosk-draw-thin robot-signal" style={{ strokeDasharray: 30, strokeDashoffset: 30, animationDelay: '1.4s' }} />
      <path d="M104 55 Q120 35 136 55" className="kiosk-draw-thin robot-signal" style={{ strokeDasharray: 40, strokeDashoffset: 40, animationDelay: '1.6s' }} />
      <path d="M100 50 Q120 25 140 50" className="kiosk-draw-thin robot-signal" style={{ strokeDasharray: 50, strokeDashoffset: 50, animationDelay: '1.8s' }} />
    </svg>
  )
}
