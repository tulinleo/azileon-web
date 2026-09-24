import * as THREE from 'three'

/* "Our products" — the 3D showcase from the Claude Design mockup (product-showcase.html in the battery-dispatcher
   repo), ported to TypeScript. Solar panels with a monitoring display, an ATM, a self-service kiosk and a card
   terminal, a website on a display and a phone, a smart vending machine and a parcel locker — in two tiers, every
   product facing the camera. The look follows the site's line illustrations: paper-coloured bodies with drawn
   edges, accent tints where the mockup had colour, and duotone screens in ink, paper and the accent. Every screen
   is a canvas that keeps playing a small scene; `update(t)` advances them all. */

// the site's palette (index.css): paper, ink, accent and the illustration greys
const PAPER = 0xfbfaf8
const PAPER_ACC = 0xf3e6d8
const LINE = 0x9e968c
const LINE_ACC = 0xb8702f
const DUO = { ink: [43, 40, 37], paper: [251, 250, 248], acc: [184, 112, 47] }

type Mat = THREE.MeshStandardMaterial
const M = (name: string, color: number, rough = 0.7, metal = 0, extra: THREE.MeshStandardMaterialParameters = {}): Mat =>
  Object.assign(new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra }), { name })
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const F = (w: number, s: number) => `${w} ${s}px -apple-system, "SF Pro Display", "Helvetica Neue", Helvetica, sans-serif`
/** Smoothstep on [0, 1]. */
const sm = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x))
const rr = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}

interface Screen { c: HTMLCanvasElement; g: CanvasRenderingContext2D; tex: THREE.CanvasTexture; m: THREE.MeshBasicMaterial }
function screen(w: number, h: number, name: string): Screen {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return { c, g: c.getContext('2d')!, tex, m: new THREE.MeshBasicMaterial({ map: tex, name, toneMapped: false }) }
}
/** Recolour a drawn screen to the site's duotone (saturated pixels → accent, the rest → ink-to-paper by lightness) and upload it. */
function flush(s: Screen) {
  const im = s.g.getImageData(0, 0, s.c.width, s.c.height), d = im.data
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2]
    const L = (0.3 * r + 0.59 * g + 0.11 * b) / 255, ch = (Math.max(r, g, b) - Math.min(r, g, b)) / 255
    if (ch > 0.22) {
      const k = Math.min(1, ch * 1.6)
      for (let j = 0; j < 3; j++) d[i + j] = DUO.acc[j] * k + DUO.paper[j] * (1 - k)
    } else {
      for (let j = 0; j < 3; j++) d[i + j] = DUO.ink[j] + (DUO.paper[j] - DUO.ink[j]) * L
    }
  }
  s.g.putImageData(im, 0, 0)
  s.tex.needsUpdate = true
}

export const LABEL_IDS = ['solar', 'pay', 'web', 'vend', 'lock'] as const
export type LabelId = (typeof LABEL_IDS)[number]

export interface Showcase {
  root: THREE.Group
  /** The five products, so a page can show one of them alone. */
  groups: Record<LabelId, THREE.Group>
  /** Where each label's dot sits: above the object for the floating tier (`above`), under its front edge for the
   *  ground tier; `rise` is the length of the line between the dot and the card, in px. */
  anchors: Record<LabelId, { at: THREE.Vector3; above: boolean; rise: number }>
  /** Advance the screens and the moving parts to time `t` (seconds). */
  update(t: number): void
  dispose(): void
}

export function buildProducts(): Showcase {
  const root = new THREE.Group()
  root.name = 'product_showcase'

  // the mockup's materials; after building, everything without a screen is restyled to paper + lines (see below),
  // and the names decide which parts get the accent tint
  const mat = {
    pad: M('pad', 0xe7e9ec, 0.9),
    dark: M('housing_dark', 0x2b2f36, 0.45, 0.4),
    white: M('housing_white', 0xf5f6f7, 0.45, 0.05),
    steel: M('steel', 0x9aa0a8, 0.35, 0.6),
    black: M('black', 0x16181c, 0.6),
    blue: M('brand_blue', 0x3b6cff, 0.4),
    green: M('led_green', 0x22c55e, 0.4),
    panel: M('pv_cell', 0x24324a, 0.25, 0.35),
    frame: M('aluminium', 0xc3c7cc, 0.35, 0.5),
    glass: M('glass', 0xdbeafe, 0.05, 0, { transparent: true, opacity: 0.22 }),
    interior: M('interior_light', 0xffffff, 0.8),
    parcel: M('parcel', 0xc8955c, 0.8),
  }
  const screens: Screen[] = []
  const scr = (w: number, h: number, name: string) => {
    const s = screen(w, h, name)
    screens.push(s)
    return s
  }
  const add = (p: THREE.Object3D, name: string, geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(geo, m)
    o.name = name
    o.position.set(x, y, z)
    p.add(o)
    return o
  }
  const box = (p: THREE.Object3D, n: string, w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number) =>
    add(p, n, new THREE.BoxGeometry(w, h, d), m, x, y, z)
  const plane = (p: THREE.Object3D, n: string, w: number, h: number, m: THREE.Material, x: number, y: number, z: number) =>
    add(p, n, new THREE.PlaneGeometry(w, h), m, x, y, z)
  const YAW = Math.PI / 4 // every product turned to face the camera's three-quarter view
  const group = (name: string, x: number, z: number, y = 0) => {
    const g = new THREE.Group()
    g.name = name
    g.position.set(x, y, z)
    g.rotation.y = YAW
    root.add(g)
    return g
  }
  /** Header strip with white text, e.g. "ATM" (accent-coloured after the duotone). */
  function header(text: string, w = 512, h = 96) {
    const s = scr(w, h, 'header_' + text.toLowerCase().replace(/\s/g, '_'))
    s.g.fillStyle = '#3b6cff'
    s.g.fillRect(0, 0, w, h)
    s.g.fillStyle = '#fff'
    s.g.font = F(700, h * 0.42)
    s.g.textAlign = 'center'
    s.g.textBaseline = 'middle'
    s.g.fillText(text, w / 2, h / 2 + 2)
    flush(s)
    return s
  }

  // ---------- Solar panels (ground tier, left) ----------
  const solar = group('solar_panels', -4.37, 3.47)
  box(solar, 'pad', 5.8, 0.06, 3.6, mat.pad, 0.6, 0.03, 0)
  {
    const cols = 4, rows = 2, pw = 1.0, ph = 1.6, gap = 0.03, tilt = THREE.MathUtils.degToRad(25)
    const W = cols * (pw + gap), D = rows * (ph + gap)
    const table = new THREE.Group()
    table.name = 'table'
    table.position.set(0, 1.05, -0.1)
    table.rotation.x = tilt
    solar.add(table)
    box(table, 'table_frame', W + 0.08, 0.05, D + 0.08, mat.frame, 0, -0.04, 0)
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++)
        box(table, `module_${c}_${r}`, pw, 0.035, ph, mat.panel, -W / 2 + (c + 0.5) * (pw + gap), 0.0, -D / 2 + (r + 0.5) * (ph + gap))
    const s = Math.sin(tilt), c = Math.cos(tilt)
    for (const x of [-1.6, 0, 1.6])
      for (const u of [0.35 * D, -0.35 * D]) {
        const hgt = 1.05 - s * u - 0.075 / c
        box(solar, u > 0 ? 'post_front' : 'post_back', 0.07, hgt, 0.07, mat.frame, x, hgt / 2, -0.1 + c * u)
      }
  }
  const monScr = scr(640, 420, 'monitoring_screen')
  const mon = new THREE.Group()
  mon.name = 'monitoring_display'
  mon.position.set(2.85, 0, 0.6)
  mon.rotation.y = -0.35
  solar.add(mon)
  box(mon, 'base', 0.5, 0.05, 0.35, mat.steel, 0, 0.085, 0)
  box(mon, 'pole', 0.08, 1.1, 0.08, mat.steel, 0, 0.66, 0)
  {
    const s = new THREE.Group()
    s.name = 'screen_head'
    s.position.set(0, 1.45, 0.05)
    s.rotation.x = -0.2
    mon.add(s)
    box(s, 'bezel', 1.02, 0.7, 0.05, mat.black, 0, 0, 0)
    plane(s, 'screen', 0.96, 0.63, monScr.m, 0, 0, 0.026)
  }

  // ---------- Payment terminals & ATM (ground tier, right) ----------
  const park = group('payment_terminals', 3.9, -3.1)
  box(park, 'pad', 4.2, 0.06, 1.6, mat.pad, 0, 0.03, 0)
  const parkScr = scr(256, 192, 'terminal_screen')
  const atmScr = scr(320, 240, 'atm_screen')
  const kioskScr = scr(270, 480, 'kiosk_screen')
  {
    // ATM
    const t = new THREE.Group()
    t.name = 'atm'
    t.position.set(-1.3, 0.06, 0)
    park.add(t)
    box(t, 'body', 0.9, 1.75, 0.7, mat.white, 0, 0.875, 0)
    box(t, 'front_panel', 0.8, 1.1, 0.02, mat.dark, 0, 1.05, 0.36)
    plane(t, 'header', 0.86, 0.16, header('ATM', 256, 48).m, 0, 1.65, 0.351)
    box(t, 'hood', 0.9, 0.06, 0.2, mat.white, 0, 1.54, 0.45)
    plane(t, 'screen', 0.44, 0.33, atmScr.m, 0, 1.3, 0.371)
    box(t, 'keypad_shelf', 0.6, 0.03, 0.18, mat.dark, 0, 0.96, 0.44)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) box(t, `key_${r}_${c}`, 0.05, 0.015, 0.035, mat.steel, -0.07 + c * 0.07, 0.985, 0.38 + r * 0.035)
    box(t, 'card_slot', 0.12, 0.025, 0.02, mat.black, 0.26, 1.1, 0.375)
    box(t, 'card_led', 0.12, 0.008, 0.01, mat.green, 0.26, 1.12, 0.38)
    box(t, 'cash_slot', 0.34, 0.035, 0.02, mat.black, 0, 0.78, 0.375)
  }
  {
    // self-service kiosk
    const t = new THREE.Group()
    t.name = 'kiosk'
    t.position.set(0.1, 0.06, 0.1)
    park.add(t)
    box(t, 'base', 0.6, 0.06, 0.45, mat.dark, 0, 0.03, 0)
    box(t, 'body', 0.56, 1.9, 0.14, mat.dark, 0, 1.0, -0.05)
    box(t, 'accent', 0.565, 0.05, 0.145, mat.blue, 0, 1.92, -0.05)
    plane(t, 'screen', 0.46, 0.82, kioskScr.m, 0, 1.4, 0.021)
    box(t, 'card_reader', 0.16, 0.12, 0.04, mat.black, 0, 0.82, 0.04)
    box(t, 'reader_led', 0.06, 0.012, 0.01, mat.green, 0, 0.865, 0.062)
    box(t, 'receipt_slot', 0.2, 0.02, 0.02, mat.black, 0, 0.66, 0.03)
  }
  {
    // card terminal on a post
    const t = new THREE.Group()
    t.name = 'terminal'
    t.position.set(1.4, 0.06, 0.1)
    park.add(t)
    box(t, 'base', 0.62, 0.08, 0.5, mat.dark, 0, 0.04, 0)
    box(t, 'body', 0.48, 1.5, 0.36, mat.dark, 0, 0.83, 0)
    box(t, 'hood', 0.58, 0.07, 0.48, mat.dark, 0, 1.62, 0.03)
    box(t, 'accent', 0.485, 0.05, 0.365, mat.blue, 0, 1.52, 0)
    box(t, 'bezel', 0.38, 0.3, 0.01, mat.black, 0, 1.3, 0.182)
    plane(t, 'screen', 0.34, 0.255, parkScr.m, 0, 1.3, 0.188)
    box(t, 'card_reader', 0.16, 0.12, 0.03, mat.black, 0, 1.02, 0.19)
    box(t, 'reader_led', 0.06, 0.012, 0.01, mat.green, 0, 1.065, 0.206)
  }

  // ---------- Websites (ground tier, middle) ----------
  const web = group('websites', 0, 0)
  box(web, 'pad', 3.4, 0.06, 1.4, mat.pad, 0, 0.03, 0.1)
  box(web, 'stand_base', 0.9, 0.05, 0.5, mat.steel, 0, 0.085, 0)
  box(web, 'stand_pole', 0.1, 1.0, 0.1, mat.steel, 0, 0.6, -0.05)
  const webScr = scr(1280, 720, 'website_screen')
  {
    const s = new THREE.Group()
    s.name = 'display'
    s.position.set(0, 1.85, 0)
    s.rotation.x = -0.06
    web.add(s)
    box(s, 'bezel', 2.9, 1.66, 0.08, mat.black, 0, 0, 0)
    plane(s, 'screen', 2.8, 1.575, webScr.m, 0, 0, 0.041)
  }
  const phoneScr = scr(390, 820, 'phone_screen')
  const phone = new THREE.Group()
  phone.name = 'phone'
  phone.position.set(1.0, 1.0, 0.5)
  phone.rotation.y = -0.2
  web.add(phone)
  add(phone, 'body', new THREE.BoxGeometry(0.6, 1.24, 0.05), mat.black)
  plane(phone, 'screen', 0.55, 1.16, phoneScr.m, 0, 0, 0.026)
  box(phone, 'side_button', 0.012, 0.14, 0.02, mat.steel, 0.305, 0.25, 0)

  // ---------- Vending machine (upper tier, right) ----------
  const vend = group('vending_machine', 2.26, -1.8, 3.6)
  box(vend, 'pad', 1.6, 0.06, 1.3, mat.pad, 0, 0.03, 0)
  const vendScr = scr(128, 160, 'vending_screen')
  const products: THREE.Mesh[] = []
  {
    const Y = 0.06
    box(vend, 'body', 1.0, 1.9, 0.8, mat.white, 0, Y + 0.95, 0)
    plane(vend, 'header', 0.96, 0.18, header('SMART VENDING').m, 0, Y + 1.8, 0.402)
    plane(vend, 'interior', 0.62, 1.2, mat.interior, -0.14, Y + 1.08, 0.402)
    for (let r = 0; r < 5; r++) {
      const y = Y + 0.58 + r * 0.23
      box(vend, `shelf_${r}`, 0.62, 0.015, 0.1, mat.steel, -0.14, y - 0.075, 0.45)
      for (let c = 0; c < 5; c++) products.push(box(vend, `product_${r}_${c}`, 0.09, 0.14, 0.07, M(`product_${r}_${c}`, 0xe5484d, 0.5), -0.39 + c * 0.125, y, 0.45))
    }
    box(vend, 'window_frame_top', 0.68, 0.03, 0.14, mat.dark, -0.14, Y + 1.7, 0.47)
    box(vend, 'window_frame_bottom', 0.68, 0.03, 0.14, mat.dark, -0.14, Y + 0.46, 0.47)
    box(vend, 'window_frame_left', 0.03, 1.27, 0.14, mat.dark, -0.47, Y + 1.08, 0.47)
    box(vend, 'window_frame_right', 0.03, 1.27, 0.14, mat.dark, 0.19, Y + 1.08, 0.47)
    plane(vend, 'glass', 0.64, 1.22, mat.glass, -0.14, Y + 1.08, 0.535)
    plane(vend, 'screen', 0.16, 0.2, vendScr.m, 0.32, Y + 1.45, 0.402)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) box(vend, `key_${r}_${c}`, 0.04, 0.04, 0.015, mat.dark, 0.27 + c * 0.05, Y + 1.25 - r * 0.055, 0.405)
    box(vend, 'card_reader', 0.12, 0.08, 0.02, mat.black, 0.32, Y + 0.95, 0.405)
    box(vend, 'pickup_slot', 0.55, 0.18, 0.02, mat.black, -0.14, Y + 0.28, 0.405)
  }
  const pick = products[7], pickY = pick.position.y

  // ---------- Parcel lockers (upper tier, left) ----------
  const lock = group('parcel_lockers', -2.26, 1.8, 3.6)
  box(lock, 'pad', 3.4, 0.06, 1.2, mat.pad, 0, 0.03, 0)
  const lockScr = scr(256, 320, 'locker_screen')
  const lockDoor = new THREE.Group()
  lockDoor.name = 'door_open'
  {
    const Y = 0.06, cw = 0.42, rh = 0.44, cols = 7, W = cols * cw + 0.1
    box(lock, 'body', W, 2.02, 0.6, mat.dark, 0, Y + 1.01, 0)
    plane(lock, 'header', W - 0.1, 0.18, header('PARCEL LOCKER', 768, 64).m, 0, Y + 1.9, 0.301)
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < 4; r++) {
        const x = -W / 2 + 0.05 + (c + 0.5) * cw, y = Y + 0.37 + r * rh
        if (c === 3) continue
        if (c === 5 && r === 1) {
          plane(lock, 'open_recess', 0.39, 0.41, mat.black, x, y, 0.3005)
          box(lock, 'parcel', 0.26, 0.2, 0.016, mat.parcel, x, y - 0.08, 0.309)
          lockDoor.position.set(x - 0.195, y, 0.3125)
          lock.add(lockDoor)
          box(lockDoor, 'door', 0.39, 0.41, 0.025, mat.white, 0.195, 0, 0)
          box(lockDoor, 'handle', 0.02, 0.08, 0.02, mat.steel, 0.34, 0, 0.02)
          continue
        }
        box(lock, `door_${c}_${r}`, 0.39, 0.41, 0.025, mat.white, x, y, 0.3125)
        box(lock, `handle_${c}_${r}`, 0.02, 0.08, 0.02, mat.steel, x + 0.145, y, 0.335)
      }
    const cx = -W / 2 + 0.05 + 3.5 * cw
    box(lock, 'kiosk_panel', 0.39, 1.29, 0.025, mat.white, cx, Y + 1.03, 0.3125)
    plane(lock, 'kiosk_screen', 0.3, 0.375, lockScr.m, cx, Y + 1.3, 0.326)
    box(lock, 'scanner', 0.16, 0.1, 0.03, mat.black, cx, Y + 0.95, 0.33)
    box(lock, 'scanner_led', 0.08, 0.012, 0.01, mat.green, cx, Y + 0.99, 0.346)
    box(lock, 'base_row', W - 0.1, 0.4, 0.025, mat.white, 0, Y + 0.02 + 0.13, 0.3125).scale.y = 0.6
  }

  // ---------- Restyle: paper bodies with drawn edges, accent tint on the coloured parts, screens untouched ----------
  const offset = { polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }
  const fill = new THREE.MeshBasicMaterial({ color: PAPER, toneMapped: false, ...offset })
  const fillAcc = new THREE.MeshBasicMaterial({ color: PAPER_ACC, toneMapped: false, ...offset })
  const hidden = new THREE.MeshBasicMaterial({ visible: false })
  const line = new THREE.LineBasicMaterial({ color: LINE, toneMapped: false })
  const lineAcc = new THREE.LineBasicMaterial({ color: LINE_ACC, toneMapped: false })
  const ACCENT = new Set(['brand_blue', 'led_green', 'parcel'])
  const meshes: THREE.Mesh[] = []
  root.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh)
  })
  const originals = new Set<THREE.Material>()
  for (const o of meshes) {
    const m = o.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial
    if ((m as THREE.MeshBasicMaterial).map) continue // a screen keeps its texture
    originals.add(m)
    const name = m.name || '', acc = ACCENT.has(name) || name.startsWith('product_')
    o.material = name === 'glass' ? hidden : acc ? fillAcc : fill
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, 25), acc ? lineAcc : line)
    edges.name = o.name + '_outline'
    o.add(edges)
  }
  originals.forEach((m) => m.dispose())

  // ---------- Screen content ----------
  function drawPark(state: string) {
    const { g } = parkScr
    g.textAlign = 'left'
    g.fillStyle = '#0f172a'
    g.fillRect(0, 0, 256, 192)
    g.fillStyle = '#94a3b8'
    g.font = F(600, 18)
    g.fillText('PAYMENT', 18, 34)
    if (state === 'pay') {
      g.fillStyle = '#fff'
      g.font = F(700, 54)
      g.fillText('€2.50', 18, 104)
      g.fillStyle = '#94a3b8'
      g.font = F(500, 17)
      g.fillText('Tap, insert or scan', 18, 150)
      g.strokeStyle = '#3b82f6'
      g.lineWidth = 5
      g.lineCap = 'round'
      for (let i = 0; i < 3; i++) {
        g.beginPath()
        g.arc(196, 84, 10 + i * 12, -0.8, 0.8)
        g.stroke()
      }
    } else if (state === 'proc') {
      g.fillStyle = '#fff'
      g.font = F(600, 30)
      g.fillText('Processing…', 18, 108)
    } else {
      g.fillStyle = '#22c55e'
      g.font = F(700, 44)
      g.fillText('✓ Paid', 18, 104)
      g.fillStyle = '#94a3b8'
      g.font = F(500, 17)
      g.fillText('Thank you!', 18, 150)
    }
    flush(parkScr)
  }
  function drawAtm(state: string) {
    const { g } = atmScr
    g.textAlign = 'center'
    g.fillStyle = '#0f172a'
    g.fillRect(0, 0, 320, 240)
    g.fillStyle = '#3b6cff'
    g.fillRect(0, 0, 320, 40)
    g.fillStyle = '#fff'
    g.font = F(600, 18)
    g.fillText('Welcome', 160, 27)
    if (state === 'card') {
      g.fillStyle = '#fff'
      g.font = F(600, 26)
      g.fillText('Insert your card', 160, 120)
      g.fillStyle = '#94a3b8'
      g.font = F(500, 16)
      g.fillText('or tap your phone', 160, 155)
    } else if (state === 'amount') {
      g.fillStyle = '#94a3b8'
      g.font = F(500, 16)
      g.fillText('Withdraw', 160, 80)
      ;['€20', '€50', '€100', '€200'].forEach((v, i) => {
        rr(g, 30 + (i % 2) * 135, 95 + Math.floor(i / 2) * 60, 125, 48, 10)
        g.fillStyle = i === 2 ? '#3b6cff' : '#1e293b'
        g.fill()
        g.fillStyle = '#fff'
        g.font = F(600, 20)
        g.fillText(v, 92 + (i % 2) * 135, 126 + Math.floor(i / 2) * 60)
      })
    } else {
      g.fillStyle = '#22c55e'
      g.font = F(700, 30)
      g.fillText('Take your cash', 160, 125)
      g.fillStyle = '#94a3b8'
      g.font = F(500, 16)
      g.fillText('€100', 160, 160)
    }
    flush(atmScr)
  }
  function drawKiosk(k: number) {
    const { g } = kioskScr
    g.textAlign = 'left'
    g.fillStyle = '#f8fafc'
    g.fillRect(0, 0, 270, 480)
    g.fillStyle = '#3b6cff'
    g.fillRect(0, 0, 270, 70)
    g.fillStyle = '#fff'
    g.font = F(700, 22)
    g.fillText('Self-service', 20, 44)
    const items: [string, string][] = [['Pay bills', '#3b6cff'], ['Top up phone', '#22c55e'], ['Parking', '#f5a524'], ['Tickets', '#8b5cf6']]
    items.forEach(([t, c], i) => {
      const y = 90 + i * 82
      rr(g, 16, y, 238, 68, 14)
      g.fillStyle = i === k ? c : '#fff'
      g.fill()
      rr(g, 30, y + 18, 32, 32, 8)
      g.fillStyle = i === k ? 'rgba(255,255,255,.35)' : c
      g.fill()
      g.fillStyle = i === k ? '#fff' : '#0f172a'
      g.font = F(600, 19)
      g.fillText(t, 76, y + 41)
    })
    g.fillStyle = '#64748b'
    g.font = F(500, 15)
    g.fillText('Tap to choose', 20, 450)
    flush(kioskScr)
  }
  function drawVend(state: string) {
    const { g } = vendScr
    g.fillStyle = '#0f172a'
    g.fillRect(0, 0, 128, 160)
    g.textAlign = 'center'
    if (state === 'select') {
      g.fillStyle = '#94a3b8'
      g.font = F(600, 18)
      g.fillText('Select', 64, 72)
      g.fillStyle = '#fff'
      g.font = F(700, 30)
      g.fillText('— —', 64, 112)
    } else if (state === 'pay') {
      g.fillStyle = '#fff'
      g.font = F(700, 40)
      g.fillText('B3', 64, 74)
      g.fillStyle = '#3b82f6'
      g.font = F(600, 22)
      g.fillText('€1.80', 64, 112)
    } else {
      g.fillStyle = '#22c55e'
      g.font = F(700, 28)
      g.fillText('Enjoy!', 64, 92)
    }
    flush(vendScr)
  }
  function drawLock(digits: string, open: boolean) {
    const { g } = lockScr
    g.fillStyle = '#0f172a'
    g.fillRect(0, 0, 256, 320)
    g.textAlign = 'center'
    if (!open) {
      g.fillStyle = '#94a3b8'
      g.font = F(600, 20)
      g.fillText('Enter pickup code', 128, 80)
      for (let i = 0; i < 4; i++) {
        rr(g, 28 + i * 52, 120, 44, 60, 10)
        g.fillStyle = i < digits.length ? '#1e3a8a' : '#1e293b'
        g.fill()
        if (i < digits.length) {
          g.fillStyle = '#fff'
          g.font = F(700, 34)
          g.fillText(digits[i], 50 + i * 52, 163)
        }
      }
    } else {
      g.fillStyle = '#22c55e'
      g.font = F(700, 64)
      g.fillText('14', 128, 150)
      g.fillStyle = '#fff'
      g.font = F(600, 22)
      g.fillText('Door is open', 128, 200)
      g.fillStyle = '#94a3b8'
      g.font = F(500, 16)
      g.fillText('Take your parcel →', 128, 236)
    }
    flush(lockScr)
  }
  const TILES = ['#3b6cff', '#f5a524', '#22c55e', '#e5484d', '#8b5cf6', '#14b8a6']
  const SITES: [string, string][] = [['Coffee shop', 'Order online'], ['Law firm', 'Book a consult'], ['Fitness club', 'Join today'], ['Online store', 'Shop now']]
  function drawWeb(k: number) {
    const { g } = webScr
    g.textAlign = 'left'
    g.textBaseline = 'alphabetic'
    const [name, cta] = SITES[k], col = TILES[k]
    g.fillStyle = '#f8fafc'
    g.fillRect(0, 0, 1280, 720)
    g.fillStyle = '#fff'
    g.fillRect(0, 0, 1280, 76)
    g.fillStyle = '#e2e8f0'
    g.fillRect(0, 76, 1280, 1)
    g.fillStyle = col
    g.beginPath()
    g.arc(64, 38, 14, 0, 7)
    g.fill()
    g.fillStyle = '#0f172a'
    g.font = F(700, 26)
    g.fillText(name, 88, 47)
    g.fillStyle = '#64748b'
    g.font = F(500, 19)
    ;['About', 'Services', 'Contact'].forEach((t, i) => g.fillText(t, 760 + i * 120, 45))
    rr(g, 1100, 20, 140, 38, 19)
    g.fillStyle = col
    g.fill()
    g.fillStyle = '#fff'
    g.font = F(600, 17)
    g.fillText(cta, 1118, 45)
    rr(g, 70, 150, 230, 38, 19)
    g.fillStyle = col + '22'
    g.fill()
    g.fillStyle = col
    g.font = F(600, 17)
    g.fillText('Custom website', 90, 175)
    g.fillStyle = '#0f172a'
    g.font = F(700, 64)
    g.fillText('Built for your', 70, 270)
    g.fillText('business.', 70, 345)
    g.fillStyle = '#64748b'
    g.font = F(400, 22)
    g.fillText('Design, development and support —', 70, 405)
    g.fillText('any website, made to order.', 70, 437)
    rr(g, 70, 480, 200, 56, 28)
    g.fillStyle = col
    g.fill()
    g.fillStyle = '#fff'
    g.font = F(600, 20)
    g.fillText(cta, 100, 515)
    for (let i = 0; i < 4; i++) {
      const x = 700 + (i % 2) * 260, y = 120 + Math.floor(i / 2) * 270
      g.save()
      g.shadowColor = 'rgba(30,50,90,.12)'
      g.shadowBlur = 30
      g.shadowOffsetY = 10
      rr(g, x, y, 240, 250, 20)
      g.fillStyle = '#fff'
      g.fill()
      g.restore()
      rr(g, x + 14, y + 14, 212, 150, 12)
      g.fillStyle = TILES[(k + i) % TILES.length]
      g.globalAlpha = i === 0 ? 1 : 0.35
      g.fill()
      g.globalAlpha = 1
      rr(g, x + 14, y + 184, 150, 16, 8)
      g.fillStyle = '#0f172a'
      g.fill()
      rr(g, x + 14, y + 212, 100, 12, 6)
      g.fillStyle = '#cbd5e1'
      g.fill()
    }
    flush(webScr)
  }
  function drawPhone(k: number) {
    const { g } = phoneScr
    g.textAlign = 'left'
    const [name, cta] = SITES[k], col = TILES[k]
    g.fillStyle = '#f8fafc'
    g.fillRect(0, 0, 390, 820)
    rr(g, 145, 16, 100, 26, 13)
    g.fillStyle = '#000'
    g.fill()
    g.fillStyle = col
    g.beginPath()
    g.arc(40, 90, 12, 0, 7)
    g.fill()
    g.fillStyle = '#0f172a'
    g.font = F(700, 22)
    g.fillText(name, 62, 98)
    for (let i = 0; i < 3; i++) {
      g.fillStyle = '#0f172a'
      g.fillRect(330, 82 + i * 8, 24, 3)
    }
    g.font = F(700, 40)
    g.fillText('Built for your', 28, 190)
    g.fillText('business.', 28, 238)
    g.fillStyle = '#64748b'
    g.font = F(400, 18)
    g.fillText('Any website, made to order.', 28, 280)
    rr(g, 28, 310, 334, 56, 28)
    g.fillStyle = col
    g.fill()
    g.fillStyle = '#fff'
    g.font = F(600, 20)
    g.textAlign = 'center'
    g.fillText(cta, 195, 345)
    g.textAlign = 'left'
    for (let i = 0; i < 2; i++) {
      const y = 400 + i * 200
      rr(g, 28, y, 334, 180, 18)
      g.fillStyle = '#fff'
      g.fill()
      rr(g, 42, y + 14, 306, 110, 12)
      g.fillStyle = TILES[(k + i) % TILES.length]
      g.globalAlpha = i ? 0.35 : 1
      g.fill()
      g.globalAlpha = 1
      rr(g, 42, y + 138, 160, 14, 7)
      g.fillStyle = '#0f172a'
      g.fill()
    }
    flush(phoneScr)
  }
  const monHist = Array.from({ length: 60 }, (_, i) => 2.6 + Math.sin(i / 6) * 0.5)
  function drawMon(warn: boolean) {
    const { g } = monScr
    g.textAlign = 'left'
    g.fillStyle = '#0f172a'
    g.fillRect(0, 0, 640, 420)
    g.fillStyle = '#94a3b8'
    g.font = F(600, 22)
    g.fillText('SOLAR MONITORING', 32, 50)
    const kw = monHist[monHist.length - 1]
    g.fillStyle = '#fff'
    g.font = F(700, 64)
    g.fillText(kw.toFixed(1) + ' kW', 32, 128)
    g.fillStyle = '#94a3b8'
    g.font = F(500, 20)
    g.fillText('Today 18.4 kWh', 380, 120)
    const x0 = 32, y0 = 170, w = 576, hh = 120
    g.strokeStyle = '#1e293b'
    g.lineWidth = 1
    for (let i = 0; i <= 3; i++) {
      g.beginPath()
      g.moveTo(x0, y0 + i * 40)
      g.lineTo(x0 + w, y0 + i * 40)
      g.stroke()
    }
    g.beginPath()
    monHist.forEach((v, i) => {
      const x = x0 + (i / (monHist.length - 1)) * w, y = y0 + hh - ((v - 1.5) / 2.5) * hh
      if (i) g.lineTo(x, y)
      else g.moveTo(x, y)
    })
    g.strokeStyle = '#facc15'
    g.lineWidth = 4
    g.lineJoin = 'round'
    g.stroke()
    g.lineTo(x0 + w, y0 + hh)
    g.lineTo(x0, y0 + hh)
    g.closePath()
    g.fillStyle = 'rgba(250,204,21,.12)'
    g.fill()
    for (let i = 0; i < 8; i++) {
      rr(g, 32 + i * 40, 330, 30, 30, 6)
      g.fillStyle = warn && i === 5 ? '#f59e0b' : '#22c55e'
      g.fill()
    }
    g.fillStyle = warn ? '#f59e0b' : '#22c55e'
    g.font = F(600, 20)
    g.fillText(warn ? 'Panel 6: low output' : 'All 8 panels OK', 372, 353)
    flush(monScr)
  }

  // ---------- Labels: over the roof of a floating product, under the front edge of a standing one ----------
  const anchor = (g: THREE.Group, rise = 28) => {
    const bb = new THREE.Box3().setFromObject(g), c = bb.getCenter(V(0, 0, 0))
    const above = g.position.y > 1
    return { at: above ? V(c.x, bb.max.y, c.z) : V(c.x, bb.min.y, (bb.max.z + c.z) / 2), above, rise }
  }
  // the three ground labels sit close together: the middle one hangs lower so the cards never meet
  const anchors: Showcase['anchors'] = { solar: anchor(solar), pay: anchor(park), web: anchor(web, 76), vend: anchor(vend), lock: anchor(lock) }

  // ---------- Animation ----------
  const last: Record<string, string | number> = {}
  const once = (k: string, v: string | number, fn: () => void) => {
    if (last[k] !== v) {
      last[k] = v
      fn()
    }
  }
  const update = (t: number) => {
    // payment: 8 s cycle on the terminal, 9 s on the ATM, the kiosk highlights a menu item every 1.8 s
    const pp = t % 8
    once('park', pp < 3.5 ? 'pay' : pp < 4.2 ? 'proc' : 'paid', () => drawPark(last.park as string))
    const pa = (t + 2) % 9
    once('atm', pa < 3 ? 'card' : pa < 6 ? 'amount' : 'cash', () => drawAtm(last.atm as string))
    once('kiosk', Math.floor(t / 1.8) % 4, () => drawKiosk(last.kiosk as number))
    // vending: 7 s cycle, a product drops to the pickup slot
    const pv = (t + 1.5) % 7
    once('vend', pv < 2 ? 'select' : pv < 4.5 ? 'pay' : 'enjoy', () => drawVend(last.vend as string))
    pick.position.y = pickY - sm((pv - 4.6) / 0.5) * (pickY - 0.4)
    pick.visible = pv < 6.3
    // lockers: 10 s cycle, a code is typed and a door swings open
    const pl = (t + 3) % 10, code = '4821'
    const open = pl >= 3.2 && pl < 8.8
    once('lock', open ? 'open' : code.slice(0, Math.min(4, Math.floor(pl / 0.6))), () => drawLock(open ? '' : (last.lock as string), open))
    lockDoor.rotation.y = -1.7 * sm((pl - 3.4) / 0.6) * (1 - sm((pl - 8) / 0.7))
    // websites: another client site every 3 s, the phone floats
    const site = Math.floor(t / 3) % SITES.length
    once('web', site, () => {
      drawWeb(site)
      drawPhone(site)
    })
    phone.position.y = 1.0 + Math.sin(t * 1.4) * 0.05
    phone.rotation.y = -0.2 + Math.sin(t * 0.7) * 0.06
    // solar monitoring: the chart scrolls four times a second, panel 6 complains now and then
    const tick4 = Math.floor(t * 4)
    if (last.mon !== tick4) {
      last.mon = tick4
      monHist.shift()
      monHist.push(2.8 + Math.sin(t * 0.6) * 0.5 + Math.random() * 0.15)
      drawMon(t % 14 > 9)
    }
  }

  const dispose = () => {
    root.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh || (o as THREE.LineSegments).isLineSegments) m.geometry.dispose()
    })
    for (const m of [fill, fillAcc, hidden, line, lineAcc]) m.dispose()
    for (const s of screens) {
      s.m.dispose()
      s.tex.dispose()
    }
  }

  return { root, groups: { solar, pay: park, web, vend, lock }, anchors, update, dispose }
}
