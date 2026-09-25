import type { Icon } from '@phosphor-icons/react'
import { Package, CreditCard, Storefront, Browser, SunHorizon } from '@phosphor-icons/react'
import type { TKey } from '../i18n'
import type { LabelId } from '../scene/buildProducts'
import { asset } from '../lib/asset'

/** The battery dispatcher landing — Azileon's own product page; update when it moves to a subdomain. */
export const BATTERY_DISPATCHER_URL = 'https://zazplay.github.io/battery-dispatcher/'

export type Solution = {
  slug: string
  /** Which product of the 3D showcase this is (the solution page focuses the camera on it). */
  labelId: LabelId
  icon: Icon
  tag: 'blue' | 'green' | 'amber'
  keys: { family: TKey; title: TKey; heading: TKey; lead: TKey; card: TKey; ai: TKey }
  /** Three blocks: device software / back office / integrations (worded per solution). */
  deliver: { title: TKey; text: TKey }[]
  /** Six one-line features. */
  features: TKey[]
  /** Protocols, hardware and services — the same in every language. */
  chips: string[]
  caseStudy?: { title: TKey; text: TKey; to: string; external?: boolean; image?: string }
}

/**
 * The five product lines, in the reading order of the 3D showcase. Texts live in i18n.tsx (sol* keys).
 */
export const solutions: Solution[] = [
  {
    slug: 'parcel-lockers',
    labelId: 'lock',
    icon: Package,
    tag: 'green',
    keys: { family: 'solLockersFamily', title: 'solLockersTitle', heading: 'solLockersHeading', lead: 'solLockersLead', card: 'solLockersCard', ai: 'solLockersAi' },
    deliver: [
      { title: 'solLockersD1Title', text: 'solLockersD1Text' },
      { title: 'solLockersD2Title', text: 'solLockersD2Text' },
      { title: 'solLockersD3Title', text: 'solLockersD3Text' },
    ],
    features: ['solLockersF1', 'solLockersF2', 'solLockersF3', 'solLockersF4', 'solLockersF5', 'solLockersF6'],
    chips: ['RS-485 / CAN lock controllers', 'Modbus', 'MQTT', 'REST & webhooks', 'Linux / Android', 'LTE routers'],
    caseStudy: { title: 'solLockersCase', text: 'projKosikTask', to: '/projects#hardware', image: asset('/projects/kosik-box.webp') },
  },
  {
    slug: 'payment-terminals',
    labelId: 'pay',
    icon: CreditCard,
    tag: 'blue',
    keys: { family: 'solPaymentsFamily', title: 'solPaymentsTitle', heading: 'solPaymentsHeading', lead: 'solPaymentsLead', card: 'solPaymentsCard', ai: 'solPaymentsAi' },
    deliver: [
      { title: 'solPaymentsD1Title', text: 'solPaymentsD1Text' },
      { title: 'solPaymentsD2Title', text: 'solPaymentsD2Text' },
      { title: 'solPaymentsD3Title', text: 'solPaymentsD3Text' },
    ],
    features: ['solPaymentsF1', 'solPaymentsF2', 'solPaymentsF3', 'solPaymentsF4', 'solPaymentsF5', 'solPaymentsF6'],
    chips: ['EMV terminals', 'MDB / ccTalk cash modules', 'ESC/POS & fiscal printers', 'PSP APIs', 'Android / Windows / Linux kiosks'],
    caseStudy: { title: 'solPaymentsCase', text: 'projKioskTask', to: '/projects#hardware', image: asset('/projects/kiosk-device.webp') },
  },
  {
    slug: 'smart-vending',
    labelId: 'vend',
    icon: Storefront,
    tag: 'amber',
    keys: { family: 'solVendingFamily', title: 'solVendingTitle', heading: 'solVendingHeading', lead: 'solVendingLead', card: 'solVendingCard', ai: 'solVendingAi' },
    deliver: [
      { title: 'solVendingD1Title', text: 'solVendingD1Text' },
      { title: 'solVendingD2Title', text: 'solVendingD2Text' },
      { title: 'solVendingD3Title', text: 'solVendingD3Text' },
    ],
    features: ['solVendingF1', 'solVendingF2', 'solVendingF3', 'solVendingF4', 'solVendingF5', 'solVendingF6'],
    chips: ['MDB / EXE', 'EVA-DTS', 'MQTT', 'LTE', 'Cashless readers'],
  },
  {
    slug: 'websites',
    labelId: 'web',
    icon: Browser,
    tag: 'blue',
    keys: { family: 'solWebFamily', title: 'solWebTitle', heading: 'solWebHeading', lead: 'solWebLead', card: 'solWebCard', ai: 'solWebAi' },
    deliver: [
      { title: 'solWebD1Title', text: 'solWebD1Text' },
      { title: 'solWebD2Title', text: 'solWebD2Text' },
      { title: 'solWebD3Title', text: 'solWebD3Text' },
    ],
    features: ['solWebF1', 'solWebF2', 'solWebF3', 'solWebF4', 'solWebF5', 'solWebF6'],
    chips: ['WordPress · Sage', 'WooCommerce', 'React', 'Node.js', 'Vite', 'Vercel'],
    caseStudy: { title: 'solWebCase', text: 'webSectionIntro', to: '/projects#web', image: asset('/projects/web/legalwaw.webp') },
  },
  {
    slug: 'solar',
    labelId: 'solar',
    icon: SunHorizon,
    tag: 'amber',
    keys: { family: 'solSolarFamily', title: 'solSolarTitle', heading: 'solSolarHeading', lead: 'solSolarLead', card: 'solSolarCard', ai: 'solSolarAi' },
    deliver: [
      { title: 'solSolarD1Title', text: 'solSolarD1Text' },
      { title: 'solSolarD2Title', text: 'solSolarD2Text' },
      { title: 'solSolarD3Title', text: 'solSolarD3Text' },
    ],
    features: ['solSolarF1', 'solSolarF2', 'solSolarF3', 'solSolarF4', 'solSolarF5', 'solSolarF6'],
    chips: ['Modbus TCP / RTU', 'SunSpec', 'MQTT', 'Huawei · SMA · Fronius · SolarEdge · Sungrow · GoodWe', 'FusionSolar / SolarEdge / SEMS APIs'],
    caseStudy: { title: 'solSolarCase', text: 'webBatteryDesc', to: BATTERY_DISPATCHER_URL, external: true, image: asset('/projects/web/battery-dispatcher.webp') },
  },
]

export const findSolution = (slug: string | undefined) => solutions.find((s) => s.slug === slug)

/** Tag chip colours per family, from the palette tokens. */
export const TAG_STYLE: Record<Solution['tag'], { background: string; color: string }> = {
  blue: { background: 'var(--color-tag-blue-bg)', color: 'var(--color-tag-blue)' },
  green: { background: 'var(--color-tag-green-bg)', color: 'var(--color-tag-green)' },
  amber: { background: 'var(--color-tag-amber-bg)', color: 'var(--color-tag-amber)' },
}
