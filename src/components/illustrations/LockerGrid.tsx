export default function LockerGrid() {
  const cols = 4
  const rows = 3
  const cellW = 36
  const cellH = 44
  const gap = 4

  // Each locker gets a random delay for its door open/close cycle
  const doorDelays = [3, 14, 1, 19, 8, 22, 11, 17, 5, 24, 9, 16]

  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (cellW + gap)
      const y = r * (cellH + gap)
      const idx = r * cols + c
      const drawDelay = 0.4 + idx * 0.08
      const doorDelay = doorDelays[idx]

      cells.push(
        <g key={`${r}-${c}`}>
          {/* Locker frame */}
          <rect
            x={x} y={y} width={cellW} height={cellH} rx={4}
            className="kiosk-draw"
            style={{ strokeDasharray: (cellW + cellH) * 2, strokeDashoffset: (cellW + cellH) * 2, animationDelay: `${drawDelay}s` }}
          />
          {/* Small handle dot */}
          <circle
            cx={x + cellW / 2} cy={y + cellH - 10} r={1.5}
            fill="var(--color-border-hover)"
            className="kiosk-dot"
            style={{ animationDelay: `${drawDelay + 0.3}s` }}
          />
          {/* Door opening — a rect that scales from bottom, simulating door swing */}
          <rect
            x={x + 2} y={y + 2} width={cellW - 4} height={cellH - 4} rx={3}
            fill="var(--color-accent)"
            className="locker-door"
            style={{ animationDelay: `${doorDelay}s` }}
          />
        </g>
      )
    }
  }

  const totalW = cols * cellW + (cols - 1) * gap
  const totalH = rows * cellH + (rows - 1) * gap

  return (
    <svg
      viewBox={`-4 -4 ${totalW + 8} ${totalH + 8}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-6 top-8 w-[260px] opacity-50 pointer-events-none"
    >
      {cells}
    </svg>
  )
}
