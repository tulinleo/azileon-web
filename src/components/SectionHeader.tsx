/** Eyebrow + title + optional sub-line, the way every section on the site opens. */
type Props = {
  label: string
  title: string
  sub?: string
  align?: 'left' | 'center'
  /** Bottom margin under the header; sections with a dense grid want less. */
  className?: string
}

export default function SectionHeader({ label, title, sub, align = 'left', className = 'mb-10 md:mb-12' }: Props) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'text-center mx-auto' : ''} ${className}`}>
      <p className="fade-in text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">{label}</p>
      <h2
        className={`fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] text-balance ${centered ? 'max-w-[24ch] mx-auto' : 'max-w-[26ch]'}`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg mt-4 max-w-[58ch] ${centered ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </div>
  )
}
