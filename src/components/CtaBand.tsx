import Button from './Button'

/* The closing call to action on the inner pages: an accent card with the white dot grid, title and body left,
   a white button right. */
export default function CtaBand({ title, body, cta, href = '/#contact' }: { title: string; body: string; cta: string; href?: string }) {
  return (
    <section className="fade-in bg-accent text-white rounded-card p-[clamp(28px,4vw,56px)] flex flex-col md:flex-row md:items-center justify-between gap-6 dot-grid-light">
      <div>
        <h2 className="font-heading text-[clamp(2rem,3.6vw,3rem)] font-semibold tracking-[-0.035em] leading-[1.06] mb-3 text-balance">{title}</h2>
        <p className="text-[17px] leading-[1.6] text-accent-pale-2 max-w-[48ch]">{body}</p>
      </div>
      <Button href={href} variant="white" className="shrink-0 self-start md:self-auto">
        {cta}
      </Button>
    </section>
  )
}
