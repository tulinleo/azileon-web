export default function MailRobot() {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-6 bottom-12 w-[220px] opacity-40 pointer-events-none kiosk-float"
    >
      {/* Robot body */}
      <rect x="20" y="60" width="60" height="50" rx="8"
        className="kiosk-draw"
        style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDelay: '0.3s' }}
      />

      {/* Robot head */}
      <rect x="30" y="35" width="40" height="30" rx="6"
        className="kiosk-draw"
        style={{ strokeDasharray: 140, strokeDashoffset: 140, animationDelay: '0.5s' }}
      />

      {/* Antenna */}
      <line x1="50" y1="35" x2="50" y2="22"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 13, strokeDashoffset: 13, animationDelay: '0.7s' }}
      />
      <circle cx="50" cy="19" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />

      {/* Eyes */}
      <circle cx="42" cy="48" r="3" className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="58" cy="48" r="3" className="kiosk-dot" style={{ animationDelay: '0.85s' }} />

      {/* Robot arm pushing envelope */}
      <line x1="80" y1="80" x2="110" y2="80"
        className="kiosk-draw"
        style={{ strokeDasharray: 30, strokeDashoffset: 30, animationDelay: '0.9s' }}
      />

      {/* Envelope body */}
      <rect x="110" y="65" width="55" height="35" rx="4"
        className="kiosk-draw"
        style={{ strokeDasharray: 180, strokeDashoffset: 180, animationDelay: '1.0s' }}
      />

      {/* Envelope flap (V shape) */}
      <path d="M112 67 L137.5 85 L163 67"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 60, strokeDashoffset: 60, animationDelay: '1.2s' }}
      />

      {/* Motion lines (envelope moving) */}
      <line x1="170" y1="75" x2="185" y2="75"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 15, strokeDashoffset: 15, animationDelay: '1.4s' }}
      />
      <line x1="172" y1="82" x2="190" y2="82"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '1.5s' }}
      />
      <line x1="170" y1="89" x2="183" y2="89"
        className="kiosk-draw-thin"
        style={{ strokeDasharray: 13, strokeDashoffset: 13, animationDelay: '1.6s' }}
      />

      {/* Robot legs */}
      <line x1="38" y1="110" x2="38" y2="130"
        className="kiosk-draw"
        style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.6s' }}
      />
      <line x1="62" y1="110" x2="62" y2="130"
        className="kiosk-draw"
        style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.65s' }}
      />

      {/* Feet */}
      <line x1="30" y1="130" x2="46" y2="130"
        className="kiosk-draw"
        style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.8s' }}
      />
      <line x1="54" y1="130" x2="70" y2="130"
        className="kiosk-draw"
        style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.85s' }}
      />
    </svg>
  )
}
