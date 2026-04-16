export default function TeamRobots() {
  return (
    <svg
      viewBox="0 0 240 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-6 top-6 w-[300px] opacity-100 pointer-events-none"
      aria-hidden="true"
    >
      {/* Robot 1 — left */}
      <rect x="15" y="50" width="50" height="42" rx="7"
        className="kiosk-draw" style={{ strokeDasharray: 184, strokeDashoffset: 184, animationDelay: '0.3s' }} />
      <rect x="22" y="28" width="36" height="25" rx="5"
        className="kiosk-draw" style={{ strokeDasharray: 122, strokeDashoffset: 122, animationDelay: '0.5s' }} />
      <line x1="40" y1="28" x2="40" y2="18" className="kiosk-draw-thin" style={{ strokeDasharray: 10, strokeDashoffset: 10, animationDelay: '0.7s' }} />
      <circle cx="40" cy="15" r="3" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      <circle cx="34" cy="39" r="2.5" className="kiosk-dot" style={{ animationDelay: '0.8s' }} />
      <circle cx="46" cy="39" r="2.5" className="kiosk-dot" style={{ animationDelay: '0.85s' }} />
      {/* Waving arm */}
      <g className="robot-wave-1">
        <line x1="65" y1="60" x2="80" y2="45" stroke="var(--color-border-hover)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="82" cy="42" r="3" fill="var(--color-border-hover)" />
      </g>
      {/* Other arm */}
      <line x1="15" y1="68" x2="5" y2="78" className="kiosk-draw" style={{ strokeDasharray: 14, strokeDashoffset: 14, animationDelay: '0.7s' }} />
      {/* Legs */}
      <line x1="30" y1="92" x2="30" y2="110" className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.6s' }} />
      <line x1="50" y1="92" x2="50" y2="110" className="kiosk-draw" style={{ strokeDasharray: 18, strokeDashoffset: 18, animationDelay: '0.65s' }} />
      <line x1="23" y1="110" x2="37" y2="110" className="kiosk-draw" style={{ strokeDasharray: 14, strokeDashoffset: 14, animationDelay: '0.8s' }} />
      <line x1="43" y1="110" x2="57" y2="110" className="kiosk-draw" style={{ strokeDasharray: 14, strokeDashoffset: 14, animationDelay: '0.85s' }} />

      {/* Robot 2 — right */}
      <rect x="140" y="45" width="55" height="46" rx="7"
        className="kiosk-draw" style={{ strokeDasharray: 202, strokeDashoffset: 202, animationDelay: '0.4s' }} />
      <rect x="148" y="22" width="40" height="26" rx="5"
        className="kiosk-draw" style={{ strokeDasharray: 132, strokeDashoffset: 132, animationDelay: '0.6s' }} />
      <line x1="168" y1="22" x2="168" y2="11" className="kiosk-draw-thin" style={{ strokeDasharray: 11, strokeDashoffset: 11, animationDelay: '0.8s' }} />
      <circle cx="168" cy="8" r="3" className="kiosk-dot" style={{ animationDelay: '1.0s' }} />
      <circle cx="161" cy="33" r="2.5" className="kiosk-dot" style={{ animationDelay: '0.9s' }} />
      <circle cx="175" cy="33" r="2.5" className="kiosk-dot" style={{ animationDelay: '0.95s' }} />
      {/* Waving arm */}
      <g className="robot-wave-2">
        <line x1="140" y1="55" x2="125" y2="40" stroke="var(--color-border-hover)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="123" cy="37" r="3" fill="var(--color-border-hover)" />
      </g>
      {/* Other arm */}
      <line x1="195" y1="65" x2="208" y2="75" className="kiosk-draw" style={{ strokeDasharray: 16, strokeDashoffset: 16, animationDelay: '0.8s' }} />
      {/* Legs */}
      <line x1="155" y1="91" x2="155" y2="112" className="kiosk-draw" style={{ strokeDasharray: 21, strokeDashoffset: 21, animationDelay: '0.7s' }} />
      <line x1="178" y1="91" x2="178" y2="112" className="kiosk-draw" style={{ strokeDasharray: 21, strokeDashoffset: 21, animationDelay: '0.75s' }} />
      <line x1="148" y1="112" x2="162" y2="112" className="kiosk-draw" style={{ strokeDasharray: 14, strokeDashoffset: 14, animationDelay: '0.9s' }} />
      <line x1="171" y1="112" x2="185" y2="112" className="kiosk-draw" style={{ strokeDasharray: 14, strokeDashoffset: 14, animationDelay: '0.95s' }} />
    </svg>
  )
}
