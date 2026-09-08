import type { TKey } from '../i18n'
import { asset } from '../lib/asset'

export type HardwareProject = {
  key: string
  titleKey: TKey
  taskKey: TKey
  solutionKey: TKey
  tagKey: TKey
  tagBg: string
  tagColor: string
  client: string
  clientUrl: string
  /**
   * Paths under /public. Leave undefined until the real photo is added.
   * Convention: device photo is 4:3 landscape (1600x1200), admin screenshot is 16:10 (1600x1000).
   */
  photos: {
    device?: string
    admin?: string
  }
}

/**
 * Hardware projects shown on /projects (and later in the home-page carousel).
 * Text lives in i18n.tsx so both languages stay in one place.
 */
export const hardwareProjects: HardwareProject[] = [
  {
    key: 'kosik',
    titleKey: 'projKosikTitle',
    taskKey: 'projKosikTask',
    solutionKey: 'projKosikSolution',
    tagKey: 'tagLocker',
    tagBg: 'var(--color-tag-green-bg)',
    tagColor: 'var(--color-tag-green)',
    client: 'Košík.cz',
    clientUrl: 'https://www.kosik.cz',
    photos: {
      device: asset('/projects/kosik-box.webp'),
      admin: asset('/projects/kosik-admin.webp'),
    },
  },
  {
    key: 'kiosk',
    titleKey: 'projKioskTitle',
    taskKey: 'projKioskTask',
    solutionKey: 'projKioskSolution',
    tagKey: 'tagKiosk',
    tagBg: 'var(--color-tag-blue-bg)',
    tagColor: 'var(--color-tag-blue)',
    client: 'Payment4U a.s.',
    clientUrl: 'https://payment4u.eu',
    photos: {
      device: asset('/projects/kiosk-device.webp'),
      admin: asset('/projects/kiosk-admin.webp'),
    },
  },
]
