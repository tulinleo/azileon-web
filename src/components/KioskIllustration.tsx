export default function KioskIllustration() {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[320px] max-h-[400px]"
    >
      {/* Kiosk body */}
      <rect
        x="60" y="40" width="200" height="280" rx="12"
        className="kiosk-draw"
        style={{ strokeDasharray: 960, strokeDashoffset: 960, animationDelay: '0.3s' }}
      />

      {/* Screen */}
      <rect
        x="80" y="60" width="160" height="120" rx="6"
        className="kiosk-draw"
        style={{ strokeDasharray: 560, strokeDashoffset: 560, animationDelay: '0.6s' }}
      />

      {/* Screen content — horizontal lines (loading UI) */}
      <line x1="100" y1="95" x2="200" y2="95" className="kiosk-draw-thin" style={{ strokeDasharray: 100, strokeDashoffset: 100, animationDelay: '1.0s' }} />
      <line x1="100" y1="115" x2="180" y2="115" className="kiosk-draw-thin" style={{ strokeDasharray: 80, strokeDashoffset: 80, animationDelay: '1.1s' }} />
      <line x1="100" y1="135" x2="220" y2="135" className="kiosk-draw-thin" style={{ strokeDasharray: 120, strokeDashoffset: 120, animationDelay: '1.2s' }} />
      <line x1="100" y1="155" x2="160" y2="155" className="kiosk-draw-thin" style={{ strokeDasharray: 60, strokeDashoffset: 60, animationDelay: '1.3s' }} />

      {/* Keypad area */}
      <rect
        x="100" y="200" width="120" height="60" rx="6"
        className="kiosk-draw"
        style={{ strokeDasharray: 360, strokeDashoffset: 360, animationDelay: '0.8s' }}
      />

      {/* Keypad dots (buttons) */}
      <circle cx="120" cy="218" r="4" className="kiosk-dot" style={{ animationDelay: '1.4s' }} />
      <circle cx="160" cy="218" r="4" className="kiosk-dot" style={{ animationDelay: '1.5s' }} />
      <circle cx="200" cy="218" r="4" className="kiosk-dot" style={{ animationDelay: '1.6s' }} />
      <circle cx="120" cy="242" r="4" className="kiosk-dot" style={{ animationDelay: '1.7s' }} />
      <circle cx="160" cy="242" r="4" className="kiosk-dot" style={{ animationDelay: '1.8s' }} />
      <circle cx="200" cy="242" r="4" className="kiosk-dot" style={{ animationDelay: '1.9s' }} />

      {/* Card reader slot */}
      <rect
        x="130" y="275" width="60" height="8" rx="4"
        className="kiosk-draw"
        style={{ strokeDasharray: 136, strokeDashoffset: 136, animationDelay: '1.0s' }}
      />

      {/* Stand / base */}
      <line x1="160" y1="320" x2="160" y2="360" className="kiosk-draw" style={{ strokeDasharray: 40, strokeDashoffset: 40, animationDelay: '1.1s' }} />
      <line x1="110" y1="360" x2="210" y2="360" className="kiosk-draw" style={{ strokeDasharray: 100, strokeDashoffset: 100, animationDelay: '1.2s' }} />

      {/* Blinking cursor on screen */}
      <rect x="100" y="88" width="2" height="12" className="kiosk-cursor" />
    </svg>
  )
}
