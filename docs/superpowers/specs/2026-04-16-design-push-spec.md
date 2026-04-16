# Azileon Website Design Push — Spec

## Overview

Visual refinement pass on the working light-themed site to make it feel bolder and more distinctive. No structural changes to content — purely layout, spacing, and visual texture.

## Changes

### 1. Hero — Bigger, More Breathing Room

**Current:** `min-h-[90vh]`, heading constrained to `max-w-2xl`, `text-4xl md:text-6xl lg:text-[5rem]`

**New:**
- `min-h-screen` for full viewport height
- Heading: `text-6xl md:text-7xl lg:text-[7rem]`, `max-w-4xl` (wider, not constrained to 2xl)
- Body text stays at `max-w-[50ch]`
- Faint CSS dot grid background pattern on the hero section, ~5% opacity, using a radial-gradient repeating pattern

**Dot grid CSS (in index.css):**
```css
.dot-grid {
  background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
  background-size: 24px 24px;
}
```
Applied to the hero `<section>` element.

### 2. Services — Asymmetric Layout

**Current:** Uniform 2x2 grid of equal cards.

**New:**
- First card (Embedded & device software) spans full width on desktop — 2 columns
- Uses larger icon (32px), larger title (`text-lg`), more padding (`p-8 md:p-10`)
- Remaining 3 cards in a single row: `grid-cols-1 md:grid-cols-3`
- Grid structure: one row of 1 wide card, then one row of 3 equal cards
- All cards still use the shared `Card` component

### 3. Projects — Warm Background

**Current:** White/default background, same as all other sections.

**New:**
- Section wrapped in `bg-[#F0EDE8]` with `rounded-3xl` on a container inside the section padding
- Creates a visible warm panel that breaks the white monotony
- Content layout unchanged

### 4. Section Spacing

**Current:** `py-24 md:py-32` on all sections.

**New:** `py-32 md:py-40` on AnimatedSection.

### 5. Accent Line Divider

**New component:** `SectionDivider.tsx`
- Thin horizontal line in accent color with a small diamond shape at center
- Used between sections in App.tsx
- CSS-only, no JS

**Implementation:**
```tsx
export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8 md:py-12 px-6">
      <div className="flex-1 h-px bg-[var(--color-border)]" />
      <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)] mx-4" />
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  )
}
```

### Files Changed

- `src/index.css` — add `.dot-grid` class
- `src/components/Hero.tsx` — bigger heading, min-h-screen, dot-grid bg
- `src/components/Services.tsx` — asymmetric layout
- `src/components/Projects.tsx` — warm background wrapper
- `src/components/AnimatedSection.tsx` — increase padding
- `src/components/SectionDivider.tsx` — new, accent line with diamond
- `src/App.tsx` — add SectionDivider between sections
