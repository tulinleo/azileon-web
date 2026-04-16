export default function LockerGrid() {
  const cols = 4
  const rows = 3
  const cellW = 36
  const cellH = 44
  const gap = 4
  const startX = 0
  const startY = 0

  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cellW + gap)
      const y = startY + r * (cellH + gap)
      const delay = 0.4 + (r * cols + c) * 0.08
      cells.push(
        <g key={`${r}-${c}`}>
          <rect
            x={x} y={y} width={cellW} height={cellH} rx={4}
            className="kiosk-draw"
            style={{ strokeDasharray: (cellW + cellH) * 2, strokeDashoffset: (cellW + cellH) * 2, animationDelay: `${delay}s` }}
          />
          {/* Small handle dot */}
          <circle
            cx={x + cellW / 2} cy={y + cellH - 10} r={2}
            className="kiosk-dot"
            style={{ animationDelay: `${delay + 0.3}s` }}
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
      className="absolute right-6 top-8 w-[240px] opacity-35 pointer-events-none"
    >
      {cells}
    </svg>
  )
}
