# Responsive Positioning, i18n Reactivity & Czech Text Overflow Fixes

**Date:** 2026-04-20
**Status:** Approved

## Overview

Three related issues affecting the azileon-web site across different screen sizes and languages:

1. Mail envelope animation uses hardcoded pixel positions, breaking on non-standard screen widths
2. Language switching doesn't update all visible sections — requires page reload
3. Czech translations are longer than English, causing text to overlap illustration areas

## Issue 1: Mail Envelope Responsive Animation

### Root Cause

The `@keyframes mail-travel` in `src/index.css` (line 239) hardcodes `left: 470px` as the envelope start position. This matches the robot's position on one specific screen width. On wider or narrower screens, the envelope appears disconnected from the robot.

### Current Code

```css
@keyframes mail-travel {
  0%   { left: 470px; top: 160px; opacity: 0; }
  3%   { left: 470px; top: 160px; opacity: 1; }
  18%  { left: 470px; top: 160px; opacity: 1; }
  50%  { left: calc(100% - 50px); top: 160px; opacity: 1; }
  /* ... continues with hardcoded values */
}
```

### Design

Replace hardcoded pixel values with relative units anchored to the Contact section container:

1. **Start position:** Replace `left: 470px` with a CSS `calc()` expression relative to the `max-w-6xl` container. The robot sits inline with the heading via `flex items-center gap-4`, so approximate with `calc(50% - 12rem)` or similar — tuned to where the robot actually sits.

2. **Vertical position:** Replace `top: 160px` with `rem`-based value (e.g., `8rem`) that scales with section padding.

3. **Travel path** uses relative units throughout:
   - Start: `left: var(--envelope-start-x); top: 8rem`
   - Mid: `left: calc(100% - 3rem); top: 8rem`
   - End: `left: calc(100% - 3rem); top: 0` (fade out)

4. **Fallback:** If CSS calc doesn't achieve pixel-perfect anchoring to the robot's hand, add a `ref` to the robot container in `Contact.tsx`, measure `offsetLeft` on mount + resize, and set `--envelope-start-x` as an inline CSS custom property on the envelope wrapper.

### Files Changed

- `src/index.css` — rewrite `@keyframes mail-travel` with relative units
- `src/components/Contact.tsx` — potentially add ref-based measurement if needed

## Issue 2: Language Switch Reactivity

### Root Cause

Two compounding problems:

**Problem A:** `useScrollReveal()` in `src/hooks/useScrollReveal.ts` runs once on mount (`[]` dependency array). It finds all `.fade-in` elements, observes them with IntersectionObserver, adds `.visible` class when they enter the viewport, then **unobserves** them. It never re-runs.

**Problem B:** Components use translated text as React `key` props:
- `Services.tsx:59` — `key={s.title}` where `s.title` comes from `t()`
- `Projects.tsx:55` — `key={p.title}` where `p.title` comes from `t()`

When language changes, these keys change, causing React to destroy and recreate DOM nodes. New nodes have `.fade-in` but no `.visible` class, and the observer isn't watching them. Result: sections become invisible.

### Design

**Change A: Stable React keys**

Replace translated keys with stable identifiers:
- `Services.tsx`: `key={s.title}` → stable slug like `"embedded"`, `"backend"`, etc.
- `Projects.tsx`: `key={p.title}` → stable slug like `"payment"`, `"ble"`, `"selfservice"`

This prevents DOM node destruction on language switch.

**Change B: Make `useScrollReveal` resilient**

- Accept `lang` as a dependency (via `useLang()` hook) in the `useEffect`
- When `lang` changes, the effect re-runs: find all `.fade-in` elements that lack `.visible`, and if they're already in the viewport, immediately add `.visible`
- Elements that already have `.visible` are left alone — no re-animation flicker

### Files Changed

- `src/hooks/useScrollReveal.ts` — add `lang` dependency, handle late-appearing elements
- `src/components/Services.tsx` — stable keys
- `src/components/Projects.tsx` — stable keys

## Issue 3: Czech Text Overflow & Font Scaling

### Root Cause

Czech translations are significantly longer than English (e.g., hero title: EN ~55 chars, CS ~65 chars). Fixed font sizes (`text-[5.5rem]`) and constrained containers (`max-w-[55ch]`) cause text to overflow into illustration areas on certain screen widths.

### Audit Results

| Section | Risk | Illustration | Issue |
|---------|------|-------------|-------|
| Hero | HIGH | Kiosk (flex right) | `text-[5.5rem]` too large for CS title |
| Services | MEDIUM | Circuit lines (decorative) | CS title lines longer with `\n` split |
| Team | MEDIUM | TeamRobots (`right-6 top-6 w-[300px]`) | Body text flows under robots |
| Contact | MEDIUM | MailRobot (inline 120px) | Heading + robot flex row can wrap badly |
| Projects | LOW | LockerGrid (corner) | Moderate title lengths, likely fine |

### Design

**Hero headline:**
Replace fixed `lg:text-[5.5rem]` with `clamp(2.5rem, 5vw + 1rem, 5.5rem)` so the font scales down on narrower viewports or when accommodating longer Czech text.

**Services title:**
Apply `clamp()` to heading size. Keep the `\n` break but ensure the container has enough room. The lines will wrap naturally if they exceed the container.

**Team section:**
Add right padding on the text wrapper (`pr-0 md:pr-[320px]` or `max-w-[calc(100%-320px)]`) so text doesn't flow under the absolutely-positioned TeamRobots illustration.

**Contact heading:**
The heading + robot are in a flex row with `flex items-center gap-4`. Add `min-w-0` on the heading so it can shrink, and `flex-wrap` on the container so the robot drops to its own line gracefully if the Czech heading is too long.

**General safety net:**
Add `overflow-wrap: break-word` to heading base styles to prevent any edge-case overflow.

### Files Changed

- `src/index.css` — `clamp()` heading tokens
- `src/components/Hero.tsx` — replace fixed font size with clamp
- `src/components/Services.tsx` — heading size adjustment
- `src/components/Team.tsx` — right padding for robot clearance
- `src/components/Contact.tsx` — flex-wrap + min-w-0 on heading row

## Review Process

Each implementation piece will be reviewed via Codex review before proceeding to the next piece.

## Out of Scope

- Other SVG illustration positioning (kiosk, circuit lines, locker grid, team robots) — these use SVG viewBox coordinates which scale naturally, and are positioned via Tailwind classes that already work responsively
- Adding new translations or changing existing translation text
- Mobile-specific layout changes (illustrations already hidden on mobile via `hidden md:block`)
