const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We review your hardware, existing software and business goals.',
  },
  {
    num: '02',
    title: 'Proposal',
    desc: 'You get a clear scope, team, timeline and budget.',
  },
  {
    num: '03',
    title: 'Build & iterate',
    desc: 'We deliver in short iterations with frequent demos.',
  },
  {
    num: '04',
    title: 'Support & grow',
    desc: 'We stay as your outsourced dev team for new features and maintenance.',
  },
]

export default function Process() {
  return (
    <section className="glass-section py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-faint)] mb-3 font-medium font-mono">
          How it works
        </p>
        <h2 className="fade-in stagger-1 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1] text-[var(--color-text)] mb-16">
          How collaboration works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`fade-in stagger-${i + 1} glass-card p-6`}
            >
              <span className="font-mono text-xs text-[var(--color-accent)] mb-3 block tracking-wider">
                {s.num}
              </span>
              <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                {s.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-[14px] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
