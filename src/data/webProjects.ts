import type { TKey } from '../i18n'

export type WebProject = {
  key: string
  titleKey: TKey
  descKey: TKey
  client: string
  clientUrl: string
  /** Short technology line shown as a tag, e.g. "WordPress · Polylang". Same in every language. */
  tech: string
  /** 16:10 screenshot under /public (1600x1000). */
  image: string
}

/**
 * Web projects shown on /projects. Order matters: the first entries are the ones
 * Azileon delivered end-to-end, the rest come from the team's WordPress portfolio.
 */
export const webProjects: WebProject[] = [
  {
    key: 'legalwaw',
    titleKey: 'webLegalwawTitle',
    descKey: 'webLegalwawDesc',
    client: 'Hroda Law',
    clientUrl: 'https://legalwaw.com/',
    tech: 'WordPress · Polylang · Google Places',
    image: '/projects/web/legalwaw.webp',
  },
  {
    key: 'alvibco',
    titleKey: 'webAlvibcoTitle',
    descKey: 'webAlvibcoDesc',
    client: 'Alvib Sistemas',
    clientUrl: 'https://alvibco.com/',
    tech: 'WordPress · Localization · hreflang',
    image: '/projects/web/alvibco.webp',
  },
  {
    key: 'alvla',
    titleKey: 'webAlvlaTitle',
    descKey: 'webAlvlaDesc',
    client: 'Alvla',
    clientUrl: 'https://alvla.eu/',
    tech: 'WooCommerce · ACF · GitLab CI',
    image: '/projects/web/alvla.webp',
  },
  {
    key: 'anand',
    titleKey: 'webAnandTitle',
    descKey: 'webAnandDesc',
    client: 'Anand and Anand',
    clientUrl: 'https://www.anandandanand.com/',
    tech: 'WordPress · Sage · Migration',
    image: '/projects/web/anand.webp',
  },
  {
    key: 'haymarket',
    titleKey: 'webHaymarketTitle',
    descKey: 'webHaymarketDesc',
    client: 'Haymarket Media',
    clientUrl: 'https://www.mmm-online.com/',
    tech: 'WordPress · Multisite · Gutenberg',
    image: '/projects/web/haymarket.webp',
  },
  {
    key: 'advent',
    titleKey: 'webAdventTitle',
    descKey: 'webAdventDesc',
    client: 'Teri',
    clientUrl: 'https://teri.ua/',
    tech: 'WordPress · Plugin · AJAX',
    image: '/projects/web/advent.webp',
  },
  {
    key: 'allensworth',
    titleKey: 'webAllensworthTitle',
    descKey: 'webAllensworthDesc',
    client: 'Allensworth and Porter',
    clientUrl: 'https://allensworthlaw.com/',
    tech: 'WordPress · ACF · Dompdf',
    image: '/projects/web/allensworth.webp',
  },
]
