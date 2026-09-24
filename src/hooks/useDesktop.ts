import { useSyncExternalStore } from 'react'

const DESKTOP = '(min-width: 768px)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** True from Tailwind's `md` breakpoint up — where the 3D showcase is shown (and three.js loaded). */
export const useDesktop = () => useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)
