/** Eyebrow + title + optional sub-line, the way every panel opens. `split` puts the sub-line to the right of the
    title, both bottom-aligned (the Solutions and Projects headers in the mockup). */
type Props = {
  label: string
  title: string
  sub?: string
  tone?: 'light' | 'dark'
  layout?: 'stack' | 'split'
  /** Bottom margin under the header. */
  className?: string
  /** The heading level: h2 in a section, h1 at the top of a page. */
  as?: 'h1' | 'h2'
}

export default function SectionHeader({ label, title, sub, tone = 'light', layout = 'stack', className = 'mb-11', as: Heading = 'h2' }: Props) {
  const dark = tone === 'dark'
  const eyebrow = (
    <p className={`text-xs tracking-[0.15em] uppercase font-semibold mb-4 ${dark ? 'text-accent-2' : 'text-accent'}`}>{label}</p>
  )
  const heading = (
    <Heading className="font-heading text-[clamp(2rem,3.6vw,3rem)] font-medium tracking-[-0.035em] leading-[1.06] text-balance">
      {title}
    </Heading>
  )
  const subClass = `text-base leading-[1.6] ${dark ? 'text-cream-2' : 'text-ink-2'}`

  if (layout === 'split') {
    return (
      <div className={`flex flex-wrap justify-between items-end gap-x-12 gap-y-6 ${className}`}>
        <div className="max-w-[720px]">
          {eyebrow}
          {heading}
        </div>
        {sub && <p className={`${subClass} max-w-[40ch]`}>{sub}</p>}
      </div>
    )
  }

  return (
    <div className={className}>
      {eyebrow}
      {heading}
      {sub && <p className={`${subClass} mt-4 max-w-[58ch]`}>{sub}</p>}
    </div>
  )
}
