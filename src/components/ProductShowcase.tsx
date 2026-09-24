import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Stage } from '../scene/Stage'
import { buildProducts, LABEL_IDS, type LabelId } from '../scene/buildProducts'
import { useT, type TKey } from '../i18n'

/* The "Our products" 3D showcase: the ported Claude Design scene (scene/buildProducts.ts) on a fixed camera — no
   orbit, no zoom. On the home page all five products show, each with a label pinned to it: over the roof of the
   floating ones, under the front edge of the standing ones. With `focus`, a solution page shows that one product
   alone, framed close, without labels. The labels are DOM, so they stay crisp and follow the language. */

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
  const t = useT()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let stage: Stage
    try {
      stage = new Stage(host)
    } catch (e) {
      console.error(e) // no WebGL: the page simply goes without its illustration
      return
    }
    const show = buildProducts()
    if (focus) {
      for (const id of LABEL_IDS) show.groups[id].visible = id === focus
      stage.setObject(show.root, { frame: new THREE.Box3().setFromObject(show.groups[focus]), margin: 0.92, shadows: false })
    } else {
      // margin > 1: the scene's bounding box is mostly empty at the corners (two tiers, a deep floor), so the camera
      // may come closer than "box fits the frame" without any product touching the edge — a little less so in a
      // narrow box (lg widths), where the ground tier already spans the full width
      const wide = host.clientWidth / Math.max(1, host.clientHeight) > 1.05
      stage.setObject(show.root, { margin: wide ? 1.18 : 1.08, shadows: false })
    }

    const layer = layerRef.current
    const nodes = layer
      ? LABEL_IDS.map((id) => {
          const el = layer.querySelector<HTMLDivElement>(`[data-id="${id}"]`)!
          const a = show.anchors[id]
          el.classList.add(a.above ? 'above' : 'below')
          el.style.setProperty('--rise', a.rise + 'px')
          return { el, a }
        })
      : []
    const place = (w: number, h: number) => {
      for (const { el, a } of nodes) {
        const p = a.at.clone().project(stage.camera)
        el.style.visibility = p.z < 1 ? 'visible' : 'hidden'
        el.style.transform = `translate(${((p.x + 1) / 2) * w}px, ${((1 - p.y) / 2) * h + (a.above ? -4 : 4)}px)`
      }
    }

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let frames = 0
    stage.setAnimationLoop(() => {
      show.update((performance.now() - t0) / 1000)
      place(host.clientWidth, host.clientHeight)
      if (still && ++frames > 2) stage.setAnimationLoop(null) // reduced motion: one settled frame, then hold
    })
    return () => {
      stage.dispose()
      show.dispose()
    }
  }, [focus])

  return (
    <div className="showcase w-full h-full">
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
  )
}
