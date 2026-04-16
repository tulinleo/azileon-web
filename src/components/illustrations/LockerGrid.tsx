export default function LockerGrid() {
  const cols = 4
  const rows = 3
  const cellW = 36
  const cellH = 44
  const gap = 4

  // Staggered start delays — first door at 1s, then every 2s apart
  const doorDelays = [1, 7, 3, 11, 5, 15, 9, 19, 13, 23, 17, 21]

  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (cellW + gap)
      const y = r * (cellH + gap)
      const idx = r * cols + c
      const drawDelay = 0.4 + idx * 0.08
      const doorDelay = doorDelays[idx]

      // Door's right edge x position (for transform-origin)
      const doorX = x + 2
      const doorRightEdge = doorX + (cellW - 4)

      cells.push(
        <g key={`${r}-${c}`}>
          {/* Locker frame */}
          <rect
            x={x} y={y} width={cellW} height={cellH} rx={4}
            className="kiosk-draw"
            style={{ strokeDasharray: (cellW + cellH) * 2, strokeDashoffset: (cellW + cellH) * 2, animationDelay: `${drawDelay}s` }}
          />
          {/* Handle dot — left center */}
          <circle
            cx={x + 6} cy={y + cellH / 2} r={1.5}
            fill="var(--color-border-hover)"
            className="kiosk-dot"
            style={{ animationDelay: `${drawDelay + 0.3}s` }}
          />
          {/* Door — opens right to left, origin at THIS locker's right edge */}
          <rect
            x={doorX} y={y + 2} width={cellW - 4} height={cellH - 4} rx={3}
            fill="var(--color-border-hover)"
            className="locker-door"
            style={{
              animationDelay: `${doorDelay}s`,
              transformOrigin: `${doorRightEdge}px ${y + cellH / 2}px`,
            }}
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
      className="absolute right-6 top-8 w-[260px] opacity-75 pointer-events-none"
    >
      {cells}
    </svg>
  )
}
