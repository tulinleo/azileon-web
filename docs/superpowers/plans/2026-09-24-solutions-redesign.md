# Azileon Website — Solutions Redesign (Implementation Plan)

**Spec:** `docs/superpowers/specs/2026-09-24-solutions-redesign-design.md`
**Branch:** `redesign/solutions` (from `feature/battery-dispatcher`)

**Goal:** Rebuild the site's information architecture around the five product lines of the 3D showcase and the
AI layer, keeping the palette, type and component base. One home page with new sections, five data-driven
solution pages, a richer footer, the showcase focusable per product.

**Order of work:** content first (dictionary + data), then home sections, then solution pages and navigation,
then the 3D focus, then verification. Each task ends in a passing `npm run build`.

---

## Task 1: Dictionary and data
- [x] `src/i18n.tsx`: add EN + CS keys for hero (new title/body/second button), trust strip, solutions section
      and the five solutions (eyebrow, family, title, lead, card description, 3 deliverables × title + text,
      6 features, AI note, case title), AI section, process, footer columns, solution page chrome
      (deliverLabel, featuresLabel, worksWithLabel, aiLabel, caseLabel, ctaTitle/Body, allSolutions).
- [x] Remove `servicesLabel`, `servicesTitle`, `svc*` keys.
- [x] `src/data/solutions.ts`: `Solution` type + array of five, in scene order.

## Task 2: Home sections
- [x] `SectionHeader.tsx`.
- [x] `TrustStrip.tsx`, `Solutions.tsx`, `AiSection.tsx`, `Process.tsx`.
- [x] `Hero.tsx`: new copy, second button.
- [x] `Home.tsx`: new composition; delete `Services.tsx`.

## Task 3: Solution pages and navigation
- [x] `pages/SolutionPage.tsx` with the seven blocks from the spec; unknown slug → home.
- [x] `App.tsx`: route `solutions/:slug` (eager import; the page itself is light, the 3D stays lazy).
- [x] `Navbar.tsx`: Solutions / AI / Projects / Team / Contact; "Solutions" current on solution pages.
- [x] `Footer.tsx`: four columns.
- [x] `usePageMeta` per solution page.

## Task 4: 3D focus
- [x] `buildProducts.ts`: return `groups`.
- [x] `Stage.ts`: `frame?: THREE.Box3` option in `setObject`.
- [x] `ProductShowcase.tsx`: `focus` prop — hide other groups, no labels, frame the focused box.

## Task 5: Verification and docs
- [x] `npm run build`, `npm run lint` (only the five pre-existing errors remain).
- [x] Screenshots: home at 1440 / 1024 / 390, a solution page at 1440 / 390, CS language.
- [x] README: pages and data files.
