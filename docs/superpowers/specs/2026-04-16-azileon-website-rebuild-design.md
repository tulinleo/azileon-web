# Azileon Website Rebuild — Design Spec

## Overview

Full rebuild of azileon.cz from a dark, scroll-driven-video site to a modern light-themed marketing site. Target audience: CTOs and tech leads at hardware companies evaluating Azileon as an outsourced embedded software partner.

**Goals:**
- Signal competence and trust within 5 seconds
- Reliable across all devices (no fragile scroll/video tricks)
- Lightweight, fast-loading
- Animation-ready architecture — easy to add motion later without refactoring

**Tech stack (unchanged):**
- React 19 + TypeScript
- Vite + Tailwind CSS v4
- No routing library (single-page, scroll-based nav)

**Reference:** hydra.so design language adapted to a light color scheme.

---

## Color Palette

| Token               | Value     | Usage                                  |
|----------------------|-----------|----------------------------------------|
| `--color-bg`         | `#FAFAF9` | Page background (warm off-white)       |
| `--color-surface`    | `#FFFFFF` | Cards, panels                          |
| `--color-border`     | `#E8E5E0` | Card borders, dividers                 |
| `--color-text`       | `#1A1A1A` | Primary text                           |
| `--color-text-secondary` | `#6B6B6B` | Supporting text                   |
| `--color-text-muted` | `#9A9A9A` | Labels, metadata                       |
| `--color-accent`     | `#D4854A` | CTAs, highlights, accent section       |
| `--color-accent-hover` | `#C07038` | Accent hover state                   |

**Note:** Exact values will be tuned visually in-browser. These are starting points.

---

## Typography

| Role     | Font           | Size (mobile / desktop)  | Weight | Letter-spacing |
|----------|----------------|--------------------------|--------|----------------|
| H1       | Space Grotesk  | 3.5rem / 5rem            | 600    | -0.03em        |
| H2       | Space Grotesk  | 2.25rem / 3rem           | 500    | -0.03em        |
| H3       | Space Grotesk  | 1.25rem / 1.5rem         | 500    | -0.02em        |
| Body     | Inter          | 1rem                     | 400    | normal         |
| Label    | Inter          | 0.75rem                  | 500    | 0.1em (uppercase) |

---

## Page Structure

### 1. Navigation (sticky)

- White background, subtle bottom border appears on scroll
- Left: Azileon logo
- Right: flat text links — Services, Projects, Team, Contact
- Far right: pill-shaped CTA button "Get in touch" (accent color)
- Mobile: hamburger menu with slide-down panel

### 2. Hero (~90vh)

- Left-aligned content within a max-width container
- Content stack:
  - Uppercase label: "Prague-based engineering team" (muted, mono-spaced or label style)
  - Large heading: bold statement about what Azileon does
  - Supporting paragraph (1-2 sentences)
  - Pill CTA button with right arrow icon
- Right side: empty or subtle geometric SVG accent (decided visually)
- Animated text reveal on load (lines stagger in with fade-up)

### 3. Services (4 cards in 2x2 grid)

- Section heading: "What we do"
- 2x2 grid on desktop, single column on mobile
- Each card: icon (Phosphor) + title + short description
- Card style: white surface, subtle border, generous padding
- Scroll-triggered fade-in with stagger

**Content (from current site):**
1. Embedded & device software
2. Backend & integrations
3. Prototyping & MVPs
4. Long-term support

### 4. Projects (3 case studies)

- Section heading: "Shipped projects"
- Large horizontal cards or tiles
- Each project: name, client context, tech tags, short description
- Typography-driven (no heavy imagery)
- Scroll-triggered fade-in with stagger

**Content (from current site):**
1. Payment4U — payment terminals & parcel lockers
2. Alvla — BLE tracking system
3. Self-service devices

### 5. Accent Band

- Full-width section with accent background color (`--color-accent`)
- White text
- One strong statement — could be a key stat, value proposition, or pull quote
- Breaks up the white sections, creates visual rhythm

### 6. Team (2 cards)

- Side-by-side cards on desktop, stacked on mobile
- Each card: name, role, LinkedIn link, email
- Clean and minimal

### 7. Contact

- Section heading + short intro text
- Form fields: name, email, message
- Pill submit button (accent)
- Optional: direct email address alongside the form

### 8. Footer

- Minimal: logo, nav links, copyright
- Light gray background or subtle top border to separate from content

---

## Components Architecture

```
src/
  components/
    AnimatedSection.tsx    # Wrapper: IntersectionObserver fade-in, accepts animation variants
    Navbar.tsx
    Hero.tsx
    Services.tsx
    Projects.tsx
    AccentBand.tsx
    Team.tsx
    Contact.tsx
    Footer.tsx
    Button.tsx             # Pill button with arrow, primary/secondary variants
    Card.tsx               # Shared card component (border, padding, hover)
  hooks/
    useScrollReveal.ts     # IntersectionObserver hook (simplified from current)
  App.tsx
  main.tsx
  index.css
```

### AnimatedSection component

- Wraps any section content
- Uses `IntersectionObserver` to add a `visible` class when in viewport
- Supports `stagger` prop to delay children
- Currently CSS-only transitions (fade + translateY)
- **Designed for replacement:** can swap the CSS transition for Framer Motion's `motion` components later without changing the section content or structure
- Animation timing controlled via CSS custom properties:
  - `--animation-duration: 700ms`
  - `--animation-easing: cubic-bezier(0.16, 1, 0.3, 1)`
  - `--animation-stagger: 80ms`

### Button component

- Variants: `primary` (accent bg, white text) and `secondary` (transparent, border)
- Pill-shaped (full border-radius)
- Right arrow icon that shifts on hover
- Accepts standard button/anchor props

### Card component

- White background, subtle border
- Hover: border darkens, slight lift + shadow increase
- Accepts children, optional `href` for clickable cards

---

## Animations

### On load (hero only)
- Heading lines: `opacity 0 → 1`, `translateY 20px → 0`
- Staggered with `animation-delay`: 0ms, 100ms, 200ms per line
- Subtitle + CTA: fade in after heading, ~300ms delay
- Implemented via CSS `@keyframes` + `animation-delay` — no JS

### On scroll (all sections)
- Elements: `opacity 0 → 1`, `translateY 16px → 0`
- Triggered by `IntersectionObserver` (threshold ~0.1)
- Children stagger at `--animation-stagger` intervals
- CSS transitions on the `.visible` class

### Hover
- Buttons: arrow `translateX(4px)`, background darken
- Cards: `translateY(-2px)`, `box-shadow` increase, border color shift
- Nav links: underline slides in from left via `scaleX(0 → 1)`

### What we avoid
- No scroll-driven video or scroll position math
- No parallax
- No 3D transforms
- No heavy libraries (no GSAP, no Lottie, no Three.js)
- No `requestAnimationFrame` scroll loops

### Extensibility
- Adding new animation types = adding a CSS class or a Framer Motion variant to `AnimatedSection`
- Swapping to Framer Motion later = replace the CSS transition approach inside `AnimatedSection`, section content stays untouched
- Animation tokens in CSS custom properties — global timing changes in one place

---

## Fonts Loading

- Google Fonts: Space Grotesk (500, 600) + Inter (400, 500)
- Loaded via `<link>` in `index.html` with `display=swap`
- Fallback stack: system sans-serif

---

## Responsive Breakpoints

- Mobile-first approach
- `md` (768px): 2-column grids, larger typography
- `lg` (1024px): max-width containers, final desktop layout
- No custom breakpoints beyond Tailwind defaults

---

## What's Dropped from Current Site

| Current section | Decision |
|-----------------|----------|
| VideoHero (scroll-driven video) | Replaced by clean typographic hero |
| Clients (logo strip) | Dropped — projects section demonstrates client work |
| WhyUs | Condensed into the Accent Band (one strong statement) |
| Process | Dropped — not critical for first impression; can add back later |

**Kept:** Navbar, Hero, Services, Projects, Team, Contact, Footer
**Added:** AccentBand (visual rhythm break), Button/Card shared components, AnimatedSection wrapper
