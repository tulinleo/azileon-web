# Azileon Website — Solutions Redesign (Design Spec)

## Overview

A rebuild of azileon.cz around what the company actually sells today, as shown by the "Our products" 3D
showcase in the hero: **parcel lockers, payment terminals (ATMs, kiosks, card terminals), smart vending,
custom websites and solar monitoring with the AI battery dispatcher** — plus the AI layer that runs across
them (optimisation, diagnostics, an operator assistant). The current palette, typography, motion language and
component base stay; the information architecture, the copy and most sections are new.

**Audience.** Owners and operations/IT leads of businesses that run self-service devices (logistics, retail,
payments) and of solar plants; agencies and companies that need a web product. They evaluate a partner on
three questions: *do they know my hardware, will I own what they build, and will they answer when it breaks?*

**Goals.**
- Read as a specialised engineering company with a product line, not a generic dev shop.
- Make every product line findable in one click (nav → section → own page).
- Present AI as a concrete, deployed capability (the dispatcher exists and can be opened live), never as a badge.
- Keep the site fast: the only heavy asset (three.js) stays lazy and desktop-only.

**Non-goals.** No CMS, no backend, no new colours or fonts, no dark mode, no blog.

**Tech stack (unchanged).** React 19, TypeScript, Vite, Tailwind v4, react-router 7, Phosphor icons, three.js
for the showcase. Vercel with the SPA rewrite. Two languages (EN, CS) in the flat dictionary of `src/i18n.tsx`.

---

## Palette, type, motion — kept as they are

Tokens in `src/index.css` stay: warm off-white ground `#FAFAF9`, white surfaces, borders `#E8E5E0`, ink
`#1A1A1A`, accent `#B86E2F`, tag colours (blue / green / amber). Headings in Space Grotesk, body in Inter.
Scroll reveal via `.fade-in` + stagger classes, hero entrance via `.hero-animate`, section decoration via
`CircuitLines`, dividers via `SectionDivider`. `Button` (primary / secondary pill), `Card` (white surface, hover
lift) and `AnimatedSection` remain the building blocks.

New shared piece: **`SectionHeader`** — eyebrow + title + optional sub, one implementation instead of five
copies of the same three lines. Sizes: eyebrow 12–14 px uppercase tracked, title `clamp(2rem, 3.5vw, 3rem)`
Space Grotesk 500, sub 16–18 px secondary colour, max 55–60 ch.

---

## Site map

```
/                       Home
/solutions/parcel-lockers
/solutions/payment-terminals
/solutions/smart-vending
/solutions/websites
/solutions/solar        Solar monitoring + AI battery dispatcher
/projects               (unchanged page; the battery landing is the first web entry)
*                       → /
```

**Navbar.** Solutions (`/#solutions`), AI (`/#ai`), Projects (`/projects`), Team (`/#team`), Contact
(`/#contact`), CTA "Get in touch". On a solution page the "Solutions" link is marked current. Mobile: same list
in the slide-down panel.

**Footer.** Four columns: brand + tagline; *Solutions* (the five pages); *Company* (Projects, Team, Contact,
"AI battery dispatcher — live demo" external); *Contact* (three e-mails, two LinkedIn profiles). Bottom row:
© year, "Prague, Czech Republic".

---

## Home page, section by section

### 1. Hero (existing, new copy)
- Eyebrow: "Prague-based engineering team" / "Inženýrský tým z Prahy".
- H1: "Software and AI for self-service devices, payments and solar" /
  "Software a AI pro samoobslužná zařízení, platby a solár".
- Body: "We build the device software, the back office and the integrations — and the AI that keeps a fleet or
  a solar plant earning. Delivered with the source code, supported after handover." / CS equivalent.
- Buttons: primary "Get in touch" (#contact), secondary "See the solutions" (#solutions).
- Right: the 3D showcase (as built on `feature/battery-dispatcher`).

### 2. Trust strip (new, `TrustStrip`)
One quiet row right under the hero, inside the container: label "Trusted by" and the client marks as text
(Košík.cz · Payment4U · Haymarket Media · Anand and Anand · Alvib Sistemas · Hroda Law), then three short facts
on the right on wide screens / below on narrow: "Device + back office + integrations", "Source code included,
no lock-in", "Answer within one business day". Everything true today; no invented numbers.

### 3. Solutions (new, `Solutions`, id `solutions`)
Header: eyebrow "Solutions", title "One team for the device, the back office and the AI on top.",
sub "Five product lines, the same way of working: we take over the hardware you have, build the software
around it and stay for support."

Grid of five cards (`lg`: 3 + 2, `md`: 2 columns, phone: 1). Each card: Phosphor icon in an accent tile, tag
chip (family), title, two-line description, three feature bullets, "Learn more →" linking to the solution page.
Order = the 3D scene reading order: Parcel lockers, Payment terminals, Smart vending, Custom websites, Solar
monitoring. Card data comes from `src/data/solutions.ts`; texts from i18n.

### 4. AI (new, `AiSection`, id `ai`)
Header: eyebrow "AI that earns its keep", title "AI where it pays back — not for the badge.",
sub "The same engine runs our battery dispatcher and can watch a fleet of lockers, kiosks or vending machines."

Three cards:
1. **Optimisation & dispatch** — "Every 15 minutes the dispatcher re-plans charging, holding and selling from
   the real state of charge and the latest prices — within the reserve, cycle and export limits you set."
2. **Diagnostics & alerts** — "Telemetry from inverters, doors, cash modules and sensors is checked for what
   costs money quietly: a string 12 % below its neighbours, a door left open, a jammed validator. The alert
   names the device and the likely cause."
3. **Operator assistant** — "Ask why in plain words. Every decision is logged with its reason; a change is
   simulated before anything touches the equipment."

Under the cards a band: "See it live" → the battery dispatcher landing (external), plus two facts:
"Runs on your servers or ours — your data stays with you" and "Leading AI models for the assistant, our own
optimisation for the dispatch".

### 5. Process (new, `Process`, id `process`)
Header: eyebrow "How we work", title "From the site visit to the handover."
Four numbered steps in a row (stack on phones): **Discovery on site** (we come, inspect the equipment, agree the
scope), **Prototype in weeks** (a working pilot on your hardware, not a slide deck), **Delivery with the code**
(source, documentation, your servers or ours), **Support & SLA** (monitoring, updates, a person who answers).

### 6. Projects carousel (existing) · 7. Team (existing) · 8. Contact (existing)

The `Services` section and its `svc*` keys are removed: its four cards are absorbed by Solutions (device
software, back office/integrations) and Process (prototyping, support).

---

## Solution pages (`/solutions/:slug`, `SolutionPage`)

All five share one template driven by `src/data/solutions.ts`:

1. **Hero** (dot-grid like the home hero, smaller): eyebrow = family, H1, lead, buttons "Get in touch" +
   secondary "All solutions" (`/#solutions`). Right: the 3D showcase **focused on this product** — the camera
   frames only that product's group, the other groups are hidden, labels off (desktop only, lazy).
2. **What we deliver** — three cards (device software / back office / integrations, worded per solution).
3. **Features** — six items, icon + one line each, two columns.
4. **Works with** — chips of protocols, hardware and services (same text in both languages).
5. **AI in this solution** — one card with an accent tile: how the AI layer applies here.
6. **Case** — when a project exists: a card with the photo and a link (`/projects#hardware`, `/projects#web`,
   or the battery landing for solar).
7. **CTA band** — "Have a <product> that needs software?" + button.

Page meta: title "<Solution> — Azileon", description = lead.

### Per-solution content

**Parcel lockers** (`parcel-lockers`, 3D `lock`, icon `Package`, family "Self-service logistics")
- H1: "Parcel lockers that run themselves." Lead: "Code pickup, live compartment status and an admin your
  dispatchers actually use — the software for the box, from the door lock to the dashboard."
- Deliver: *Device software* — the screen flow, lock and sensor control, offline mode with sync;
  *Back office* — every compartment live, assignment to users or couriers, alerts, reports;
  *Integrations* — courier, ERP and WMS APIs, codes by SMS or e-mail, payment for paid storage.
- Features: pickup by code or QR; live door and sensor status; alerts when a door stays open or a box goes
  offline; all sites in one portfolio; roles and an audit log; keeps working offline.
- Works with: RS-485 / CAN lock controllers, Modbus, MQTT, REST & webhooks, Linux / Android, LTE routers.
- AI: door sensors and usage patterns watched for anomalies — a compartment that jams or a site that goes
  quiet raises an alert before a customer calls.
- Case: Košík.cz handover box → `/projects#hardware`.

**Payment terminals** (`payment-terminals`, 3D `pay`, icon `CreditCard`, family "Payments & self-service")
- H1: "Kiosks, ATMs and card terminals — the whole payment flow." Lead: "Cash and cashless payments, receipts,
  unattended operation and a back office that manages every location."
- Deliver: *Device software* — the payment flow for cash and card, receipts, the kiosk UI;
  *Back office* — monitoring, configuration, transaction overview per location; *Integrations* — payment
  gateways and PSPs, cash validators and recyclers, fiscal and receipt printers.
- Features: EMV and contactless plus cash; unattended 24/7; remote configuration and updates; transaction
  reconciliation; alerts on faults and low cash; multi-tenant back office.
- Works with: EMV terminals, MDB / ccTalk cash modules, ESC/POS and fiscal printers, PSP APIs,
  Android / Windows / Linux kiosks.
- AI: transaction and device telemetry watched for jams, drift and unusual patterns; cash levels forecast so
  pickups are planned, not guessed.
- Case: Payment4U kiosk → `/projects#hardware`.

**Smart vending** (`smart-vending`, 3D `vend`, icon `Storefront`, family "Retail automation")
- H1: "Vending that sells cashless and reports its stock." Lead: "Cashless payments, remote stock and prices,
  telemetry from every machine — one back office for the whole fleet."
- Deliver: *Device software* — selection and payment flow, MDB / EXE control, the telemetry agent;
  *Back office* — stock, prices and sales per machine, refill planning; *Integrations* — payment terminals,
  ERP, loyalty and receipts.
- Features: cashless and QR payments; stock and prices set remotely; refill routes from real stock; sales
  analytics; fault alerts; any number of machines and operators.
- Works with: MDB / EXE, EVA-DTS, MQTT, LTE, cashless readers.
- AI: demand forecast per machine and product — refill routes and planograms follow what actually sells.
- Case: none yet (no card).

**Custom websites** (`websites`, 3D `web`, icon `Browser`, family "Web")
- H1: "Websites and web apps, made to order." Lead: "From a company site to a multi-market store or a custom
  web app: design, build, languages, hosting — and an admin your team edits without a developer."
- Deliver: *Design & build* — a custom design built as a theme editors cannot break; *Languages & SEO* —
  localisation, per-language addresses, performance; *Web apps & portals* — custom back offices, dashboards,
  exports to PDF.
- Features: custom design; a CMS the client edits; multilingual; fast and indexable; e-commerce
  (WooCommerce); hosting and care.
- Works with: WordPress · Sage, WooCommerce, React, Node.js, Vite, Vercel.
- AI: assistants and search over your own content where they help — never a chatbot for its own sake.
- Case: the web portfolio → `/projects#web`.

**Solar monitoring** (`solar`, 3D `solar`, icon `SunHorizon`, family "Energy")
- H1: "Solar monitoring and the AI battery dispatcher." Lead: "Live output of every string, panel alerts, and an
  AI that charges the batteries in the cheapest hours and sells at the evening peak."
- Deliver: *Monitoring* — inverters, strings and meters over Modbus, SunSpec or the vendor cloud;
  *AI dispatcher* — a plan every 15 minutes within your reserve, cycle and export limits; *Alerts & reports*
  — Telegram or e-mail, a daily report, a monthly PDF for clients.
- Features: string-level diagnostics; day-ahead and intraday prices; battery care and cycle budget; export cap
  and reserve rules; portfolio view; keeps working offline.
- Works with: Modbus TCP / RTU, SunSpec, MQTT, Huawei · SMA · Fronius · SolarEdge · Sungrow · GoodWe,
  FusionSolar / SolarEdge / SEMS APIs.
- AI: the dispatcher and the diagnostics are the AI core; the assistant explains every decision.
- Case: the AI battery dispatcher page (external, "See the live demo").

Czech versions of every string are written alongside the English ones in `src/i18n.tsx` (natural Czech, not
literal; product names and protocol chips stay as they are).

---

## The 3D showcase on solution pages

`ProductShowcase` gets a `focus?: LabelId` prop:
- `buildProducts()` also returns `groups: Record<LabelId, THREE.Group>`.
- With `focus`, the other groups are set `visible = false`, the labels layer is not rendered, and the camera
  frames the focused group's bounding box (`Stage.setObject(..., { frame: box, margin: 0.9 })` — a new `frame`
  option that overrides the box used for framing). The animation keeps running.
- Without `focus`, behaviour is unchanged (home hero).

---

## Files

```
src/
  data/solutions.ts            five solutions: slug, labelId, icon, i18n keys, chips, case link
  components/
    SectionHeader.tsx          eyebrow + title + sub
    TrustStrip.tsx             client marks + three facts
    Solutions.tsx              home grid of five cards
    AiSection.tsx              three AI cards + "see it live" band
    Process.tsx                four steps
    Hero.tsx                   new copy, second button
    Navbar.tsx / Footer.tsx    new links and columns
    ProductShowcase.tsx        focus prop
    Services.tsx               removed
  pages/
    Home.tsx                   Hero, TrustStrip, Solutions, AI, Process, Projects, Team, Contact
    SolutionPage.tsx           /solutions/:slug
  scene/
    Stage.ts                   frame option
    buildProducts.ts           groups in the result
  i18n.tsx                     new keys (nav*, hero*, trust*, sol*, ai*, process*, footer*), svc* removed
  App.tsx                      route solutions/:slug
```
