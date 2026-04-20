# Responsive Positioning, i18n Reactivity & Czech Text Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three issues — mail envelope animation breaks on different screen widths, language switching leaves sections invisible, and Czech text overflows into illustration areas.

**Architecture:** Pure CSS fixes for positioning and font scaling (clamp, calc, relative units). React key stabilization and scroll-reveal hook fix for i18n reactivity. No new dependencies.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vite 8, CSS keyframes

**Review process:** After each task, run a codex review on the changed files before proceeding.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/index.css` | Modify | Rewrite `mail-travel` keyframes with relative units; add `clamp()` heading sizes |
| `src/hooks/useScrollReveal.ts` | Modify | Accept `lang` param, re-observe on language change |
| `src/components/Services.tsx` | Modify | Stable React keys, heading font size |
| `src/components/Projects.tsx` | Modify | Stable React keys |
| `src/components/Hero.tsx` | Modify | `clamp()` on headline font size |
| `src/components/Team.tsx` | Modify | Right padding to clear TeamRobots |
| `src/components/Contact.tsx` | Modify | flex-wrap + min-w-0 on heading row; pass ref for envelope start if needed |
| `src/App.tsx` | Modify | Pass `lang` to `useScrollReveal` |

---

### Task 1: Fix mail envelope animation with relative positioning

**Files:**
- Modify: `src/index.css:239-252` — rewrite `@keyframes mail-travel`
- Modify: `src/components/illustrations/MailRobot.tsx:38-55` — update envelope wrapper if needed

- [ ] **Step 1: Rewrite `@keyframes mail-travel` in `src/index.css`**

Replace the hardcoded keyframes (lines 239-252) with relative units. The envelope starts roughly where the robot sits — about 35% from the left of the section, ~6rem from top. It travels right to the edge, then up and fades.

```css
/* Mail envelope: robot → float right → hit right wire → travel up → fade */
@keyframes mail-travel {
  0%   { left: 35%; top: 6rem; opacity: 0; }
  3%   { left: 35%; top: 6rem; opacity: 1; }
  18%  { left: 35%; top: 6rem; opacity: 1; }
  50%  { left: calc(100% - 3rem); top: 6rem; opacity: 1; }
  58%  { left: calc(100% - 3rem); top: 4rem; opacity: 1; }
  75%  { left: calc(100% - 3rem); top: 1.5rem; opacity: 0.5; }
  88%  { left: calc(100% - 3rem); top: 0; opacity: 0; }
  100% { left: 35%; top: 6rem; opacity: 0; }
}
```

- [ ] **Step 2: Start dev server and verify in browser**

Run: `npm run dev`

Open the Contact section. Verify:
- Envelope starts near the robot's hand area
- Travels rightward to the edge of the section
- Moves upward and fades out
- Resize the browser window to different widths — envelope should stay anchored relative to the section, not jump to wrong positions

- [ ] **Step 3: Tune values if needed**

If the `35%` start doesn't align well with the robot, adjust. The robot container is a `120px` box positioned after the heading text in a flex row. The exact percentage depends on how much space the heading takes. Test at `1280px` (max-w-6xl) and `768px` (md breakpoint).

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "fix: use relative units for mail envelope animation path"
```

- [ ] **Step 5: Codex review**

Run codex review on the changed file to verify code quality.

---

### Task 2: Fix language switching reactivity — stable React keys

**Files:**
- Modify: `src/components/Services.tsx:59` — change `key={s.title}` to stable key
- Modify: `src/components/Projects.tsx:55` — change `key={p.title}` to stable key

- [ ] **Step 1: Add stable keys to Services.tsx**

In `src/components/Services.tsx`, add a `key` field to each item in the `rest` array and use it as the React key:

```tsx
const rest = [
  {
    key: 'backend',
    icon: CloudArrowUp,
    title: t('svcBackendTitle'),
    desc: t('svcBackendDesc'),
  },
  {
    key: 'prototyping',
    icon: Rocket,
    title: t('svcPrototypingTitle'),
    desc: t('svcPrototypingDesc'),
  },
  {
    key: 'support',
    icon: Wrench,
    title: t('svcSupportTitle'),
    desc: t('svcSupportDesc'),
  },
]
```

Then on line 59, change:
```tsx
// Before:
<Card key={s.title} className={`fade-in stagger-${i + 3} p-6 md:p-8`}>
// After:
<Card key={s.key} className={`fade-in stagger-${i + 3} p-6 md:p-8`}>
```

- [ ] **Step 2: Add stable keys to Projects.tsx**

In `src/components/Projects.tsx`, add a `key` field to each project object:

```tsx
const projects = [
  {
    key: 'payment',
    title: t('projPaymentTitle'),
    client: 'Payment4U a.s.',
    // ... rest unchanged
  },
  {
    key: 'ble',
    title: t('projBleTitle'),
    client: 'Alvla s.r.o.',
    // ... rest unchanged
  },
  {
    key: 'selfservice',
    title: t('projSelfServiceTitle'),
    client: 'Payment4U a.s.',
    // ... rest unchanged
  },
]
```

Then on line 55, change:
```tsx
// Before:
key={p.title}
// After:
key={p.key}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.tsx src/components/Projects.tsx
git commit -m "fix: use stable React keys instead of translated text to prevent DOM churn"
```

- [ ] **Step 4: Codex review**

Run codex review on both changed files.

---

### Task 3: Fix language switching reactivity — useScrollReveal resilience

**Files:**
- Modify: `src/hooks/useScrollReveal.ts` — accept `lang` param, re-observe new elements
- Modify: `src/App.tsx` — pass `lang` to `useScrollReveal`

- [ ] **Step 1: Update `useScrollReveal` to accept `lang` parameter**

Replace the contents of `src/hooks/useScrollReveal.ts`:

```ts
import { useEffect } from 'react'

export function useScrollReveal(lang?: string) {
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

    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.fade-in')
      for (const el of elements) {
        if (el.classList.contains('visible')) continue
        observer.observe(el)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [lang])
}
```

Key changes:
- Accepts optional `lang` parameter, used as `useEffect` dependency
- When `lang` changes, effect re-runs and re-observes any `.fade-in` elements that don't already have `.visible`
- Elements that were already revealed (have `.visible`) are skipped — no re-animation

- [ ] **Step 2: Pass `lang` from App.tsx**

In `src/App.tsx`, import `useLang` and pass `lang` to the hook:

```tsx
import { useScrollReveal } from './hooks/useScrollReveal'
import { useLang } from './i18n'
// ... other imports

export default function App() {
  const { lang } = useLang()
  useScrollReveal(lang)

  return (
    // ... unchanged
  )
}
```

- [ ] **Step 3: Test in browser**

1. Open the site, scroll down so all sections are visible
2. Switch language EN → CZ
3. Verify ALL sections remain visible — no sections disappear
4. Switch CZ → EN — same check
5. Reload page in CZ — verify scroll reveal animations still work normally on fresh load

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/App.tsx
git commit -m "fix: re-observe fade-in elements on language change to prevent invisible sections"
```

- [ ] **Step 5: Codex review**

Run codex review on both changed files.

---

### Task 4: Czech text overflow — Hero headline

**Files:**
- Modify: `src/components/Hero.tsx:15` — replace fixed font size with `clamp()`

- [ ] **Step 1: Replace fixed hero headline font size**

In `src/components/Hero.tsx` line 15, change the `h1` className:

```tsx
// Before:
className="hero-animate hero-delay-2 font-[var(--font-heading)] text-5xl md:text-6xl lg:text-[5.5rem] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6"

// After:
className="hero-animate hero-delay-2 font-[var(--font-heading)] text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-semibold text-[var(--color-text)] tracking-tight leading-[1.05] mb-6"
```

This replaces three breakpoint-based sizes (`text-5xl md:text-6xl lg:text-[5.5rem]`) with a single `clamp()` that fluidly scales from `2.5rem` (40px) to `5.5rem` (88px) based on viewport width.

- [ ] **Step 2: Test in browser**

1. Switch to CZ language
2. Check hero headline at various widths: 768px, 1024px, 1280px, 1440px
3. Verify the Czech title "Software pro terminály, lockery a samoobslužná zařízení" doesn't overflow or overlap the kiosk illustration
4. Switch to EN and verify it still looks good

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "fix: use clamp() for hero headline to handle longer Czech text"
```

- [ ] **Step 4: Codex review**

Run codex review on the changed file.

---

### Task 5: Czech text overflow — Team section robot clearance

**Files:**
- Modify: `src/components/Team.tsx:32-40` — add right padding to clear TeamRobots illustration

- [ ] **Step 1: Add right padding to Team text area**

The TeamRobots illustration is absolutely positioned at `right-6 top-6 w-[300px]` (in `TeamRobots.tsx`). The heading and body text in `Team.tsx` has no right margin to avoid it.

In `src/components/Team.tsx`, modify the text wrapper div (line 32):

```tsx
// Before:
<div className="max-w-6xl mx-auto relative">

// After:
<div className="max-w-6xl mx-auto relative md:pr-[280px]">
```

This adds `280px` right padding on `md+` screens (where the robots are visible) so the heading, subheading, and body text won't flow under the robots.

- [ ] **Step 2: Test in browser**

1. Switch to CZ language
2. Check Team section — verify "Kdo jsme" heading and body text stay clear of the robot illustrations
3. Resize browser to various widths
4. Switch to EN — verify it still looks good with shorter text
5. Check mobile — robots are hidden, padding should not apply (it's `md:` prefixed)

- [ ] **Step 3: Commit**

```bash
git add src/components/Team.tsx
git commit -m "fix: add right padding to Team section to clear robot illustrations"
```

- [ ] **Step 4: Codex review**

Run codex review on the changed file.

---

### Task 6: Czech text overflow — Contact heading + Services title

**Files:**
- Modify: `src/components/Contact.tsx:44` — add `flex-wrap` and `min-w-0` to heading row
- Modify: `src/components/Services.tsx:41` — adjust heading size

- [ ] **Step 1: Fix Contact heading flex row**

In `src/components/Contact.tsx` line 44, the heading and robot share a flex row:

```tsx
// Before:
<div className="flex items-center gap-4 mb-4">

// After:
<div className="flex items-center gap-4 mb-4 flex-wrap">
```

And on line 45, add `min-w-0` to the heading so it can shrink:

```tsx
// Before:
<h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1]">

// After:
<h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] min-w-0">
```

- [ ] **Step 2: Fix Services heading size**

In `src/components/Services.tsx` line 41:

```tsx
// Before:
<h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[3rem] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">

// After:
<h2 className="fade-in stagger-1 font-[var(--font-heading)] text-3xl md:text-[clamp(2rem,3.5vw,3rem)] font-medium text-[var(--color-text)] tracking-tight leading-[1.1] mb-12">
```

- [ ] **Step 3: Test in browser**

1. Switch to CZ
2. Check Contact section: "Ozvěte se nám" heading should sit alongside the robot without overlap. If the heading is too long, it wraps and the robot drops below gracefully.
3. Check Services section: "Zaměřená expertíza pro specializovaný hardware" heading should fit without overflow
4. Test at 768px, 1024px, 1280px widths
5. Switch to EN — verify both sections still look good

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Services.tsx
git commit -m "fix: clamp heading sizes and add flex-wrap for Czech text overflow"
```

- [ ] **Step 5: Codex review**

Run codex review on both changed files.

---

### Task 7: Add overflow-wrap safety net

**Files:**
- Modify: `src/index.css` — add `overflow-wrap: break-word` to heading base styles

- [ ] **Step 1: Add overflow-wrap to body and headings**

In `src/index.css`, after the `body` block (line 68), add:

```css
h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

- [ ] **Step 2: Final full-page test**

1. Start in EN — scroll through entire page, verify all sections look correct
2. Switch to CZ — verify all sections update instantly, no invisible sections, no text overflow
3. Switch back to EN — verify everything reverts cleanly
4. Resize window from 768px to 1440px — verify mail envelope animation tracks correctly at all widths
5. Reload page in CZ — verify scroll reveal animations work on fresh load

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "fix: add overflow-wrap safety net for headings"
```

- [ ] **Step 4: Codex review**

Run codex review on the changed file.
