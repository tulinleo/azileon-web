import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Stage } from '../scene/Stage'
import { buildProducts, LABEL_IDS, type LabelId, type Showcase } from '../scene/buildProducts'
import ShowcaseSkeleton from './ShowcaseSkeleton'
import { useT, type TKey } from '../i18n'

/* The "Our products" 3D showcase: the ported Claude Design scene (scene/buildProducts.ts) on a fixed camera — no
   orbit, no zoom. On the home page all five products show, each with a label pinned to it: over the roof of the
   floating ones, under the front edge of the standing ones. With `focus`, a solution page shows that one product
   alone, framed close, without labels. The labels are DOM, so they stay crisp and follow the language.

   Loading is staged so nothing pops: the skeleton shows while this chunk loads, the scene is built once the
   browser is idle (the hero text has finished its entrance by then), and after the first rendered frame the canvas
   fades and settles in, followed by the labels one after another (index.css, .showcase-root). */

const LABEL_KEYS: Record<LabelId, { title: TKey; sub: TKey }> = {
  solar: { title: 'showcaseSolarTitle', sub: 'showcaseSolarSub' },
  pay: { title: 'showcasePayTitle', sub: 'showcasePaySub' },
  web: { title: 'showcaseWebTitle', sub: 'showcaseWebSub' },
  vend: { title: 'showcaseVendTitle', sub: 'showcaseVendSub' },
  lock: { title: 'showcaseLockTitle', sub: 'showcaseLockSub' },
}

export default function ProductShowcase({ focus }: { focus?: LabelId }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  // which view has drawn its first frame — a new `focus` starts hidden again without a reset in the effect
  const [readyFor, setReadyFor] = useState<string | null>(null)
  const view = focus ?? 'all'
  const ready = readyFor === view
  const t = useT()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let stage: Stage | undefined
    let show: Showcase | undefined
    let cancelled = false

    const start = () => {
      if (cancelled) return
      try {
        stage = new Stage(host)
      } catch (e) {
        console.error(e) // no WebGL: the page simply goes without its illustration
        return
      }
      const s = stage
      show = buildProducts()
      const sh = show
      if (focus) {
        for (const id of LABEL_IDS) sh.groups[id].visible = id === focus
        s.setObject(sh.root, { frame: new THREE.Box3().setFromObject(sh.groups[focus]), margin: 0.92, shadows: false })
      } else {
        // margin > 1: the scene's bounding box is mostly empty at the corners (two tiers, a deep floor), so the camera
        // may come closer than "box fits the frame" without any product touching the edge — a little less so in a
        // narrow box (lg widths), where the ground tier already spans the full width
        // in a panoramic box (the hero card, ~2.5:1) the height is the limit, so the frame stays near the bounds
        // `?showcase=fit` in the address frames the whole scene with a margin instead — for exporting a picture of it
        const fit = new URLSearchParams(location.search).get('showcase') === 'fit'
        const aspect = host.clientWidth / Math.max(1, host.clientHeight)
        s.setObject(sh.root, { margin: fit ? 0.9 : aspect > 2 ? 1.06 : aspect > 1.05 ? 1.18 : 1.08, shadows: false })
      }

      const layer = layerRef.current
      const nodes = layer
        ? LABEL_IDS.map((id) => {
            const el = layer.querySelector<HTMLDivElement>(`[data-id="${id}"]`)!
            const a = sh.anchors[id]
            el.classList.add(a.above ? 'above' : 'below')
            el.style.setProperty('--rise', a.rise + 'px')
            return { el, a }
          })
        : []
      const place = (w: number, h: number) => {
        for (const { el, a } of nodes) {
          const p = a.at.clone().project(s.camera)
          el.style.visibility = p.z < 1 ? 'visible' : 'hidden'
          el.style.transform = `translate(${((p.x + 1) / 2) * w}px, ${((1 - p.y) / 2) * h + (a.above ? -4 : 4)}px)`
        }
      }

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const t0 = performance.now()
      let frames = 0
      s.setAnimationLoop(() => {
        sh.update((performance.now() - t0) / 1000)
        place(host.clientWidth, host.clientHeight)
        if (++frames === 1) setReadyFor(view) // the first frame is on the canvas: fade it in
        if (still && frames > 2) s.setAnimationLoop(null) // reduced motion: one settled frame, then hold
      })
    }

    // build once the browser has a quiet moment (the page's entrance animations come first)
    let cancelStart: () => void
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 600 })
      cancelStart = () => window.cancelIdleCallback(id)
    } else {
      const id = window.setTimeout(start, 150) // Safari has no requestIdleCallback
      cancelStart = () => window.clearTimeout(id)
    }
    return () => {
      cancelled = true
      cancelStart()
      stage?.dispose()
      show?.dispose()
    }
  }, [focus, view])

  return (
    <div className={`showcase-root w-full h-full ${ready ? 'ready' : ''}`}>
      <ShowcaseSkeleton />
      <div className="showcase">
        <div ref={hostRef} className="absolute inset-0" />
        {!focus && (
          <div ref={layerRef} className="showcase-labels" aria-hidden="true">
            {LABEL_IDS.map((id) => (
              <div key={id} className="lbl" data-id={id}>
                <i className="line" />
                <i className="dot" />
                <div className="card">
                  <div className="ttl">{t(LABEL_KEYS[id].title)}</div>
                  <div className="sub">{t(LABEL_KEYS[id].sub)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
