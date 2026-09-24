import { useEffect, useRef } from 'react'
import { Stage } from '../scene/Stage'
import { buildProducts, LABEL_IDS, type LabelId } from '../scene/buildProducts'
import { useT, type TKey } from '../i18n'

/* The "Our products" 3D showcase in the hero: the ported Claude Design scene (scene/buildProducts.ts) on a fixed
   camera — no orbit, no zoom — with a label pinned to each product: over the roof of the floating ones, under the
   front edge of the standing ones. The labels are DOM, so they stay crisp and follow the language. */

const LABEL_KEYS: Record<LabelId, { title: TKey; sub: TKey }> = {
  solar: { title: 'showcaseSolarTitle', sub: 'showcaseSolarSub' },
  pay: { title: 'showcasePayTitle', sub: 'showcasePaySub' },
  web: { title: 'showcaseWebTitle', sub: 'showcaseWebSub' },
  vend: { title: 'showcaseVendTitle', sub: 'showcaseVendSub' },
  lock: { title: 'showcaseLockTitle', sub: 'showcaseLockSub' },
}

export default function ProductShowcase() {
  const hostRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const t = useT()

  useEffect(() => {
    const host = hostRef.current, layer = layerRef.current
    if (!host || !layer) return
    let stage: Stage
    try {
      stage = new Stage(host)
    } catch (e) {
      console.error(e) // no WebGL: the hero simply goes without its illustration
      return
    }
    const show = buildProducts()
    // margin < 1 leaves room around the objects for the labels above the upper tier and below the lower one
    stage.setObject(show.root, { margin: 0.85, shadows: false })

    const nodes = LABEL_IDS.map((id) => {
      const el = layer.querySelector<HTMLDivElement>(`[data-id="${id}"]`)!
      const a = show.anchors[id]
      el.classList.add(a.above ? 'above' : 'below')
      el.style.setProperty('--rise', a.rise + 'px')
      return { el, a }
    })
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
  }, [])

  return (
    <div className="showcase w-full h-full">
      <div ref={hostRef} className="absolute inset-0" />
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
    </div>
  )
}
