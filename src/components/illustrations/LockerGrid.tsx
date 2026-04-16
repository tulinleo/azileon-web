import { useEffect, useRef } from 'react'

export default function LockerGrid() {
  const doorsRef = useRef<(SVGRectElement | null)[]>([])
  const cols = 4
  const rows = 3
  const cellW = 36
  const cellH = 44
  const gap = 4
  const total = cols * rows

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let lastIdx = -1

    const openRandom = () => {
      // Pick a random locker that isn't the same as last
      let idx = Math.floor(Math.random() * total)
      while (idx === lastIdx) {
        idx = Math.floor(Math.random() * total)
      }
      lastIdx = idx

      const door = doorsRef.current[idx]
      if (door) {
        // Open
        door.style.transform = 'scaleX(0.15)'
        // Close after 1.5s
        setTimeout(() => {
          door.style.transform = 'scaleX(1)'
        }, 1500)
      }

      // Next door in 2s
      timeout = setTimeout(openRandom, 2000)
    }

    // Start after 1s
    timeout = setTimeout(openRandom, 1000)

    return () => clearTimeout(timeout)
  }, [total])

  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (cellW + gap)
      const y = r * (cellH + gap)
      const idx = r * cols + c
      const drawDelay = 0.4 + idx * 0.08
      const doorX = x + 2
      const doorRightEdge = doorX + (cellW - 4)

      cells.push(
        <g key={`${r}-${c}`}>
          <rect
            x={x} y={y} width={cellW} height={cellH} rx={4}
            className="kiosk-draw"
            style={{ strokeDasharray: (cellW + cellH) * 2, strokeDashoffset: (cellW + cellH) * 2, animationDelay: `${drawDelay}s` }}
          />
          <circle
            cx={x + 6} cy={y + cellH / 2} r={1.5}
            fill="var(--color-border-hover)"
            className="kiosk-dot"
            style={{ animationDelay: `${drawDelay + 0.3}s` }}
          />
          <rect
            ref={(el) => { doorsRef.current[idx] = el }}
            x={doorX} y={y + 2} width={cellW - 4} height={cellH - 4} rx={3}
            fill="var(--color-border-hover)"
            opacity={0.6}
            style={{
              transformOrigin: `${doorRightEdge}px ${y + cellH / 2}px`,
              transition: 'transform 0.4s ease-in-out',
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
