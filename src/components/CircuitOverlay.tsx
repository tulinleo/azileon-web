export default function CircuitOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.12]">
      {/* Left vertical trunk — full height */}
      <div className="absolute left-12 top-0 bottom-0 w-px circuit-line-bg" />

      {/* Right vertical trunk — partial */}
      <div className="absolute right-12 top-[15%] bottom-[15%] w-px circuit-line-bg" />

      {/* Horizontal branches — left to right, touching edges */}
      <div className="absolute left-0 top-[12%] h-px w-full circuit-line-bg" />
      <div className="absolute left-0 top-[28%] h-px w-[35%] circuit-line-bg" />
      <div className="absolute left-0 top-[42%] h-px w-full circuit-line-bg" />
      <div className="absolute left-0 top-[55%] h-px w-[20%] circuit-line-bg" />
      <div className="absolute right-0 top-[65%] h-px w-[40%] circuit-line-bg" />
      <div className="absolute left-0 top-[78%] h-px w-full circuit-line-bg" />
      <div className="absolute right-0 top-[88%] h-px w-[15%] circuit-line-bg" />

      {/* Junction dots — pulsing at intersections */}
      <div className="absolute left-12 top-[12%] circuit-junction" />
      <div className="absolute left-12 top-[28%] circuit-junction" style={{ animationDelay: '0.5s' }} />
      <div className="absolute left-12 top-[42%] circuit-junction" style={{ animationDelay: '1.0s' }} />
      <div className="absolute left-12 top-[55%] circuit-junction" style={{ animationDelay: '1.5s' }} />
      <div className="absolute left-12 top-[78%] circuit-junction" style={{ animationDelay: '2.0s' }} />

      <div className="absolute right-12 top-[12%] circuit-junction" style={{ animationDelay: '0.3s' }} />
      <div className="absolute right-12 top-[42%] circuit-junction" style={{ animationDelay: '0.8s' }} />
      <div className="absolute right-12 top-[65%] circuit-junction" style={{ animationDelay: '1.3s' }} />
      <div className="absolute right-12 top-[88%] circuit-junction" style={{ animationDelay: '1.8s' }} />
    </div>
  )
}
