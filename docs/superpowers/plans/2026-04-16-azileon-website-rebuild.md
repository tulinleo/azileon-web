# Azileon Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild azileon.cz as a modern light-themed marketing site with animation-ready architecture, replacing the fragile dark scroll-driven-video design.

**Architecture:** Single-page React 19 app with Tailwind CSS v4. Shared `Button`, `Card`, and `AnimatedSection` components provide consistent styling and scroll-triggered animations. All animations are CSS-only (no JS libraries), controlled via custom properties for easy global tuning. The `AnimatedSection` wrapper is designed so Framer Motion can replace the CSS approach later without touching section content.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Phosphor Icons, Google Fonts (Space Grotesk + Inter)

---

## File Structure

```
src/
  components/
    AnimatedSection.tsx   — IntersectionObserver wrapper, adds .visible class, supports stagger
    Button.tsx            — Pill button with arrow icon, primary/secondary variants
    Card.tsx              — White surface card with border, hover lift
    Navbar.tsx            — Sticky nav, scroll border, mobile hamburger
    Hero.tsx              — Typographic hero with CSS keyframe entrance
    Services.tsx          — 2x2 card grid with service data
    Projects.tsx          — 3 case study cards
    AccentBand.tsx        — Full-width accent-colored section
    Team.tsx              — 2 team member cards
    Contact.tsx           — Contact form + info sidebar
    Footer.tsx            — Minimal footer
  hooks/
    useScrollReveal.ts    — IntersectionObserver hook (simplified)
  App.tsx                 — Page shell, section composition
  main.tsx                — React root mount
  index.css               — Theme tokens, animation keyframes, base styles
index.html                — Font links, meta tags
```

---

## Task 1: Foundation — Theme, Fonts, Base Styles

**Files:**
- Modify: `index.html`
- Rewrite: `src/index.css`

- [ ] **Step 1: Update `index.html` font links and meta**

Replace the current Google Fonts link with Space Grotesk + Inter. Keep existing meta tags.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Azileon — Software for payment terminals, parcel lockers and self-service devices. Prague-based senior engineering team." />
    <meta property="og:title" content="Azileon — Software for terminals, lockers & self-service devices" />
    <meta property="og:description" content="We build and maintain the brains and business logic for your hardware." />
    <title>Azileon — Software for terminals, lockers & self-service devices</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Rewrite `src/index.css` with light theme tokens and animation utilities**

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', 'SF Pro Display', 'Helvetica Neue', sans-serif;
  --font-heading: 'Space Grotesk', 'Inter', sans-serif;

  /* ─── Light warm palette ─── */
  --color-bg: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-border: #E8E5E0;
  --color-border-hover: #D0CBC4;
  --color-text: #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-text-muted: #9A9A9A;
  --color-accent: #D4854A;
  --color-accent-hover: #C07038;

  /* Tag colors (light mode) */
  --color-tag-blue-bg: #EBF5FF;
  --color-tag-blue: #2B7CB3;
  --color-tag-green-bg: #EDFBEE;
  --color-tag-green: #2D8A3E;
  --color-tag-amber-bg: #FFF7EB;
  --color-tag-amber: #B8860B;

  /* Animation tokens */
  --animation-duration: 700ms;
  --animation-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --animation-stagger: 80ms;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-size: 16px;
  line-height: 1.6;
}

::selection {
  background: rgba(212, 133, 74, 0.25);
  color: #1A1A1A;
}

/* ─── Scroll-triggered fade-in ─── */
.fade-in {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--animation-duration) var(--animation-easing),
              transform var(--animation-duration) var(--animation-easing);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Stagger delays ─── */
.stagger-1 { transition-delay: calc(var(--animation-stagger) * 1); }
.stagger-2 { transition-delay: calc(var(--animation-stagger) * 2); }
.stagger-3 { transition-delay: calc(var(--animation-stagger) * 3); }
.stagger-4 { transition-delay: calc(var(--animation-stagger) * 4); }
.stagger-5 { transition-delay: calc(var(--animation-stagger) * 5); }
.stagger-6 { transition-delay: calc(var(--animation-stagger) * 6); }

/* ─── Hero entrance keyframes ─── */
@keyframes hero-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animate {
  opacity: 0;
  animation: hero-fade-up var(--animation-duration) var(--animation-easing) forwards;
}

.hero-delay-1 { animation-delay: 0ms; }
.hero-delay-2 { animation-delay: 100ms; }
.hero-delay-3 { animation-delay: 200ms; }
.hero-delay-4 { animation-delay: 300ms; }
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors (existing components will have broken styles since theme tokens changed, but TS compilation should pass).

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: replace dark theme with light warm palette and new typography"
```

---

## Task 2: Shared Components — Button, Card, AnimatedSection

**Files:**
- Create: `src/components/Button.tsx`
- Create: `src/components/Card.tsx`
- Create: `src/components/AnimatedSection.tsx`
- Rewrite: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Create `src/components/Button.tsx`**

```tsx
import { ArrowRight } from '@phosphor-icons/react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function Button({ children, variant = 'primary', href, type = 'button', onClick }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer group'

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white border-none hover:bg-[var(--color-accent-hover)] active:scale-[0.98]',
    secondary: 'bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] active:scale-[0.98]',
  }

  const className = `${base} ${variants[variant]}`

  if (href) {
    return (
      <a href={href} className={`${className} no-underline`}>
        {children}
        <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
      <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/Card.tsx`**

```tsx
type CardProps = {
  children: React.ReactNode
  className?: string
  href?: string
}

export default function Card({ children, className = '', href }: CardProps) {
  const base = 'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-lg'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} block no-underline ${className}`}>
        {children}
      </a>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}
```

- [ ] **Step 3: Rewrite `src/hooks/useScrollReveal.ts`**

Simplified IntersectionObserver hook — no scroll position math, no rAF.

```ts
import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.fade-in')
    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])
}
```

- [ ] **Step 4: Create `src/components/AnimatedSection.tsx`**

```tsx
type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
      {children}
    </section>
  )
}
```

This is intentionally thin — it provides consistent section spacing and an extension point. The actual fade-in behavior comes from `.fade-in` classes on children + the `useScrollReveal` hook. If we swap to Framer Motion later, this component is where the orchestration logic goes.

- [ ] **Step 5: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds. New components are not yet imported by App.tsx so no runtime effect.

- [ ] **Step 6: Commit**

```bash
git add src/components/Button.tsx src/components/Card.tsx src/components/AnimatedSection.tsx src/hooks/useScrollReveal.ts
git commit -m "feat: add shared Button, Card, AnimatedSection components"
```

---

## Task 3: Navbar

**Files:**
- Rewrite: `src/components/Navbar.tsx`

- [ ] **Step 1: Rewrite `src/components/Navbar.tsx`**

Light theme navbar with scroll-triggered border and mobile hamburger.

```tsx
import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import Button from './Button'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md transition-[border-color] duration-300 ${
        scrolled ? 'border-b border-[var(--color-border)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)] tracking-tight no-underline"
        >
          Azileon
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 no-underline after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[var(--color-text)] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact">Get in touch</Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--color-text)] bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-5 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--color-text-secondary)] no-underline py-3 border-b border-[var(--color-border)] last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3">
            <Button href="#contact">Get in touch</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: rebuild Navbar with light theme and scroll border"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Delete: `src/components/VideoHero.tsx`
- Delete: `src/components/Services.tsx` (services content moves to a new Services.tsx in Task 5)

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
import Button from './Button'

export default function Hero() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center px-6 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl">
          <p className="hero-animate hero-delay-1 text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4 font-medium">
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
```

- [ ] **Step 2: Delete `src/components/VideoHero.tsx`**

```bash
rm src/components/VideoHero.tsx
```

- [ ] **Step 3: Delete old `src/components/Services.tsx`**

The current Services.tsx is unused (services data lived inside VideoHero.tsx). Delete it to avoid confusion — we create a fresh one in Task 5.

```bash
rm src/components/Services.tsx
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build will fail because `App.tsx` still imports `VideoHero`. That's expected — we fix App.tsx in Task 9.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx
git rm src/components/VideoHero.tsx src/components/Services.tsx
git commit -m "feat: add typographic Hero, remove VideoHero and old Services"
```

---

## Task 5: Services Section

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create `src/components/Services.tsx`**

```tsx
import { Cpu, CloudArrowUp, Rocket, Wrench } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'

const services = [
  {
    icon: Cpu,
    title: 'Embedded & device software',
    desc: 'Business logic and control software for payment terminals, parcel lockers and custom self-service devices.',
  },
  {
    icon: CloudArrowUp,
    title: 'Backend & integrations',
    desc: 'APIs, payment gateway integrations, ERP/WMS connections and remote monitoring dashboards.',
  },
  {
    icon: Rocket,
    title: 'Prototyping & MVPs',
    desc: 'Rapid prototypes and pilot projects delivered in weeks, not months.',
  },
  {
    icon: Wrench,
    title: 'Long-term support',
    desc: 'Ongoing feature development, maintenance and SLA-based support.',
  },
]

export default function Services() {
  return (
    <AnimatedSection id="services">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          What we do
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          Focused expertise for<br />specialized hardware
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <Card key={s.title} className={`fade-in stagger-${i + 1} p-6 md:p-8`}>
              <s.icon size={24} className="text-[var(--color-accent)] mb-4" weight="bold" />
              <h3 className="font-[var(--font-heading)] text-base font-medium text-[var(--color-text)] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds (component not yet imported by App.tsx).

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: add Services section with card grid"
```

---

## Task 6: Projects Section

**Files:**
- Rewrite: `src/components/Projects.tsx`

- [ ] **Step 1: Rewrite `src/components/Projects.tsx`**

```tsx
import { ArrowUpRight } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'

const projects = [
  {
    title: 'Payment terminal & parcel locker platform',
    client: 'Payment4U a.s.',
    clientUrl: 'https://payment4u.eu',
    desc: 'Development of software for cash and cashless payment terminals and automated parcel locker systems. Full-stack platform handling device communication, payment processing and operator management.',
    tag: 'Fintech',
    tagBg: 'var(--color-tag-blue-bg)',
    tagColor: 'var(--color-tag-blue)',
  },
  {
    title: 'BLE asset tracking system',
    client: 'Alvla s.r.o.',
    clientUrl: 'https://alvla.eu',
    desc: 'Design and implementation of a Bluetooth Low Energy tracking system for indoor asset management. Real-time positioning, geofencing and analytics dashboard.',
    tag: 'IoT',
    tagBg: 'var(--color-tag-green-bg)',
    tagColor: 'var(--color-tag-green)',
  },
  {
    title: 'Self-service device software',
    client: 'Payment4U a.s.',
    clientUrl: 'https://payment4u.eu',
    desc: 'Continuous development and feature expansion for a range of self-service devices. Modular architecture enabling rapid deployment of new device types.',
    tag: 'Hardware',
    tagBg: 'var(--color-tag-amber-bg)',
    tagColor: 'var(--color-tag-amber)',
  },
]

export default function Projects() {
  return (
    <AnimatedSection id="projects">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          Selected work
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
          Projects that shipped
        </h2>

        <div className="flex flex-col border-t border-[var(--color-border)]">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`fade-in stagger-${i + 1} group py-8 md:py-10 border-b border-[var(--color-border)] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12`}
            >
              <div>
                <span
                  className="inline-block text-[11px] uppercase tracking-[0.05em] font-medium px-2.5 py-1 rounded-full mb-3"
                  style={{ background: p.tagBg, color: p.tagColor }}
                >
                  {p.tag}
                </span>
                <a
                  href={p.clientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 no-underline"
                >
                  {p.client}
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-xl font-medium text-[var(--color-text)] mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px] max-w-[55ch]">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: rebuild Projects section with light theme"
```

---

## Task 7: Accent Band

**Files:**
- Create: `src/components/AccentBand.tsx`

- [ ] **Step 1: Create `src/components/AccentBand.tsx`**

```tsx
export default function AccentBand() {
  return (
    <section className="bg-[var(--color-accent)] py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="fade-in font-[var(--font-heading)] text-2xl md:text-4xl font-medium text-white tracking-tight leading-snug max-w-[35ch] mx-auto">
          Three shipped products, two founders, one focus — making your hardware smarter.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AccentBand.tsx
git commit -m "feat: add AccentBand section"
```

---

## Task 8: Team, Contact, Footer

**Files:**
- Rewrite: `src/components/Team.tsx`
- Rewrite: `src/components/Contact.tsx`
- Rewrite: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite `src/components/Team.tsx`**

```tsx
import { LinkedinLogo, Envelope } from '@phosphor-icons/react'
import AnimatedSection from './AnimatedSection'
import Card from './Card'

const members = [
  {
    name: 'Yehor Zhyliaiev',
    role: 'Co-founder / Software Architect',
    initials: 'YZ',
    email: 'yz@azileon.cz',
    linkedin: 'https://www.linkedin.com/in/yzazileon',
  },
  {
    name: 'Leonid Tulin',
    role: 'Co-founder / Project Lead',
    initials: 'LT',
    email: 'tulin@azileon.cz',
    linkedin: 'https://www.linkedin.com/in/leonidtulin',
  },
]

export default function Team() {
  return (
    <AnimatedSection id="team">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          The team
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-6">
          Who we are
        </h2>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch] mb-12 text-[15px]">
          A small, senior team with hands-on experience in embedded software, IoT systems and custom hardware integration. We treat your product as our own.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <Card key={m.name} className={`fade-in stagger-${i + 1} p-8`}>
              <div className="w-14 h-14 rounded-xl bg-[var(--color-bg)] flex items-center justify-center mb-5">
                <span className="text-sm font-medium text-[var(--color-accent)]">
                  {m.initials}
                </span>
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-medium text-[var(--color-text)] mb-1">
                {m.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-5">
                {m.role}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <LinkedinLogo size={18} weight="bold" />
                </a>
                <a
                  href={`mailto:${m.email}`}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  aria-label={`Email ${m.name}`}
                >
                  <Envelope size={18} weight="bold" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Rewrite `src/components/Contact.tsx`**

```tsx
import { Envelope, MapPin } from '@phosphor-icons/react'
import { type FormEvent, useState } from 'react'
import AnimatedSection from './AnimatedSection'
import Button from './Button'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const company = data.get('company')
    const email = data.get('email')
    const message = data.get('message')

    window.location.href = `mailto:info@azileon.cz?subject=Inquiry from ${name}${company ? ` (${company})` : ''}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\n${message}`)}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass = 'border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm bg-[var(--color-surface)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors duration-200 placeholder:text-[var(--color-text-muted)]'

  return (
    <AnimatedSection id="contact">
      <div className="max-w-6xl mx-auto">
        <p className="fade-in text-xs tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
          Contact
        </p>
        <h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-4">
          Let's talk
        </h2>
        <p className="fade-in stagger-2 text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-12 text-[15px]">
          Tell us about your terminals, lockers or self-service devices and we will get back to you within one business day.
        </p>

        <div className="fade-in stagger-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center shrink-0">
                  <Envelope size={18} weight="bold" className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">Email</p>
                  <a
                    href="mailto:info@azileon.cz"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
                  >
                    info@azileon.cz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-bg)] flex items-center justify-center shrink-0">
                  <MapPin size={18} weight="bold" className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)] mb-0.5">Location</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Prague, Czech Republic</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">Name</label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-[var(--color-text)]">Company</label>
                  <input id="company" name="company" type="text" className={inputClass} placeholder="Your company" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">Email</label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-vertical font-[inherit]`}
                  placeholder="Tell us about your project"
                />
              </div>
              <div className="self-start">
                <Button type="submit">
                  {submitted ? 'Opening email client...' : 'Send message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 3: Rewrite `src/components/Footer.tsx`**

```tsx
import { LinkedinLogo } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <span className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-text)]">
            Azileon
          </span>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            Software for terminals, lockers<br />
            & self-service devices
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
            Email
          </p>
          <div className="flex flex-col gap-1.5">
            <a href="mailto:info@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              info@azileon.cz
            </a>
            <a href="mailto:yz@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              yz@azileon.cz
            </a>
            <a href="mailto:tulin@azileon.cz" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] no-underline transition-colors duration-200">
              tulin@azileon.cz
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-3 font-medium">
            Connect
          </p>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://www.linkedin.com/in/yzazileon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
            >
              <LinkedinLogo size={18} weight="bold" />
              Yehor Zhyliaiev
            </a>
            <a
              href="https://www.linkedin.com/in/leonidtulin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 no-underline"
            >
              <LinkedinLogo size={18} weight="bold" />
              Leonid Tulin
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; 2026 Azileon. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/Team.tsx src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: rebuild Team, Contact, Footer with light theme"
```

---

## Task 9: App Shell — Wire Everything Together

**Files:**
- Rewrite: `src/App.tsx`
- Delete: `src/components/Clients.tsx`
- Delete: `src/components/WhyUs.tsx`
- Delete: `src/components/Process.tsx`

- [ ] **Step 1: Delete dropped section components**

```bash
rm src/components/Clients.tsx src/components/WhyUs.tsx src/components/Process.tsx
```

- [ ] **Step 2: Rewrite `src/App.tsx`**

```tsx
import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import AccentBand from './components/AccentBand'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <AccentBand />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Build and run dev server**

Run: `npm run build`
Expected: Build succeeds with zero errors.

Run: `npm run dev`
Expected: Dev server starts. Open in browser — all sections render with light theme, scroll animations work, navbar border appears on scroll, hero text animates in on load.

- [ ] **Step 4: Commit**

```bash
git rm src/components/Clients.tsx src/components/WhyUs.tsx src/components/Process.tsx
git add src/App.tsx
git commit -m "feat: wire up all sections, remove dropped components"
```

---

## Task 10: Cleanup — Remove Unused Assets

**Files:**
- Delete: `public/az_video.mp4`
- Delete: `src/assets/hero.png`
- Delete: `public/icons.svg`

- [ ] **Step 1: Remove unused assets**

```bash
rm public/az_video.mp4 src/assets/hero.png public/icons.svg
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: Build succeeds. No component references these files.

- [ ] **Step 3: Commit**

```bash
git rm public/az_video.mp4 src/assets/hero.png public/icons.svg
git commit -m "chore: remove unused video, image, and icon assets"
```

---

## Task 11: Visual QA in Browser

This is a manual task — run the dev server and verify each section visually.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Check each section**

Verify in browser (desktop + mobile viewport):
- Navbar: logo left, links right, CTA pill button, border appears on scroll
- Hero: text animates in on load with stagger, CTA button has arrow that shifts on hover
- Services: 2x2 grid on desktop, stacked on mobile, cards have hover lift
- Projects: 3 rows with tags, client links open in new tab
- Accent Band: full-width orange, white text, centered
- Team: 2 cards side by side on desktop, initials badge, social links work
- Contact: form + info sidebar, submit opens email client
- Footer: 3-column layout, all links work

- [ ] **Step 3: Note any visual issues for tuning**

Color values, spacing, and typography sizes may need adjustment after seeing them in the browser. These are expected tweaks, not bugs.

- [ ] **Step 4: Commit any visual tweaks**

```bash
git add -A
git commit -m "fix: visual polish after browser QA"
```
