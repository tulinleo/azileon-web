import Button from './Button'

export default function Hero() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center px-6 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="hero-animate hero-delay-1 text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4 font-medium">
            Prague-based engineering team
          </p>
          <h1 className="hero-animate hero-delay-2 font-[var(--font-heading)] text-4xl md:text-6xl lg:text-[5rem] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6">
            Software for terminals, lockers & self-service devices
          </h1>
          <p className="hero-animate hero-delay-3 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-8">
            We build and maintain the embedded software and business logic for
            your hardware — so you can ship faster without growing a full
            in-house dev team.
          </p>
          <div className="hero-animate hero-delay-4">
            <Button href="#contact">Get in touch</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
