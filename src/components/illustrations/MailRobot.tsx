const robotStroke = '#8A7D72'

export default function MailRobot() {
  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full pointer-events-none"
    >
      {/* Body */}
      <rect x="20" y="45" width="60" height="50" rx="8"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 220, strokeDashoffset: 220, animationDelay: '0.3s' }} />
      {/* Head */}
      <rect x="28" y="20" width="44" height="28" rx="6"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 144, strokeDashoffset: 144, animationDelay: '0.5s' }} />
      {/* Antenna */}
      <line x1="50" y1="20" x2="50" y2="8"
        stroke={robotStroke} strokeWidth="1.5" className="kiosk-draw" style={{ strokeDasharray: 12, strokeDashoffset: 12, animationDelay: '0.7s' }} />
      <circle cx="50" cy="5" r="3" fill={robotStroke} className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      {/* Eyes */}
      <circle cx="42" cy="32" r="3" fill={robotStroke} className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="58" cy="32" r="3" fill={robotStroke} className="kiosk-dot" style={{ animationDelay: '0.85s' }} />
      {/* Arm right */}
      <line x1="80" y1="65" x2="98" y2="58"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.9s' }} />
      {/* Arm left */}
      <line x1="20" y1="65" x2="6" y2="75"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.7s' }} />
      {/* Legs */}
      <line x1="38" y1="95" x2="38" y2="115"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.6s' }} />
      <line x1="62" y1="95" x2="62" y2="115"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20, animationDelay: '0.65s' }} />
      {/* Feet */}
      <line x1="30" y1="115" x2="46" y2="115"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.8s' }} />
      <line x1="54" y1="115" x2="70" y2="115"
        stroke={robotStroke} strokeWidth="2" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.85s' }} />
    </svg>
  )
}

export function MailEnvelope() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mail-envelope absolute w-[28px]"
      >
        <rect x="1" y="1" width="28" height="18" rx="3"
          stroke="#8A7D72" strokeWidth="1.5" fill="var(--color-bg)" />
        <path d="M3 3 L15 12 L27 3"
          stroke="#8A7D72" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}
