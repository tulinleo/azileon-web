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
- [ ] `src/i18n.tsx`: add EN + CS keys for hero (new title/body/second button), trust strip, solutions section
      and the five solutions (eyebrow, family, title, lead, card description, 3 deliverables × title + text,
      6 features, AI note, case title), AI section, process, footer columns, solution page chrome
      (deliverLabel, featuresLabel, worksWithLabel, aiLabel, caseLabel, ctaTitle/Body, allSolutions).
- [ ] Remove `servicesLabel`, `servicesTitle`, `svc*` keys.
- [ ] `src/data/solutions.ts`: `Solution` type + array of five, in scene order.

## Task 2: Home sections
- [ ] `SectionHeader.tsx`.
- [ ] `TrustStrip.tsx`, `Solutions.tsx`, `AiSection.tsx`, `Process.tsx`.
- [ ] `Hero.tsx`: new copy, second button.
- [ ] `Home.tsx`: new composition; delete `Services.tsx`.

## Task 3: Solution pages and navigation
- [ ] `pages/SolutionPage.tsx` with the seven blocks from the spec; unknown slug → home.
- [ ] `App.tsx`: route `solutions/:slug` (eager import; the page itself is light, the 3D stays lazy).
- [ ] `Navbar.tsx`: Solutions / AI / Projects / Team / Contact; "Solutions" current on solution pages.
- [ ] `Footer.tsx`: four columns.
- [ ] `usePageMeta` per solution page.

## Task 4: 3D focus
- [ ] `buildProducts.ts`: return `groups`.
- [ ] `Stage.ts`: `frame?: THREE.Box3` option in `setObject`.
- [ ] `ProductShowcase.tsx`: `focus` prop — hide other groups, no labels, frame the focused box.

## Task 5: Verification and docs
- [ ] `npm run build`, `npm run lint` (only the five pre-existing errors remain).
- [ ] Screenshots: home at 1440 / 1024 / 390, a solution page at 1440 / 390, CS language.
- [ ] README: pages and data files.
