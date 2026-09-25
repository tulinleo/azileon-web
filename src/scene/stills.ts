import * as THREE from 'three'
import { Stage } from './Stage'
import { buildProducts, LABEL_IDS, type LabelId } from './buildProducts'

/* One picture of each product for the solution cards: the scene is built once, in a box parked off-screen, and the
   camera is framed on one product at a time — five frames from a single WebGL context, then everything is freed.
   Results are data URLs, cached per size, so a return to the page costs nothing. */

const cache = new Map<string, Promise<Record<LabelId, string>>>()

export function productStills(width: number, height: number): Promise<Record<LabelId, string>> {
  const key = `${width}x${height}`
  let p = cache.get(key)
  if (!p) {
    p = render(width, height)
    p.catch(() => cache.delete(key)) // a failed attempt (no WebGL) is not remembered
    cache.set(key, p)
  }
  return p
}

async function render(width: number, height: number): Promise<Record<LabelId, string>> {
  const host = document.createElement('div')
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;pointer-events:none;`
  document.body.appendChild(host)
  let stage: Stage | undefined
  let show: ReturnType<typeof buildProducts> | undefined
  try {
    stage = new Stage(host)
    show = buildProducts()
    show.update(0) // draw the screens once
    const out = {} as Record<LabelId, string>
    for (const id of LABEL_IDS) {
      for (const other of LABEL_IDS) show.groups[other].visible = other === id
      stage.setObject(show.root, { frame: new THREE.Box3().setFromObject(show.groups[id]), margin: 0.96, shadows: false })
      out[id] = stage.renderOnce()
    }
    return out
  } finally {
    stage?.dispose()
    show?.dispose()
    host.remove()
  }
}
