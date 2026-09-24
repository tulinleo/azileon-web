import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'cs'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('azileon-lang')
      if (saved === 'cs' || saved === 'en') return saved
    }
    return 'en'
  })

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('azileon-lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export type TKey = keyof typeof translations.en

export function useT() {
  const { lang } = useLang()
  return (key: keyof typeof translations.en) => translations[lang][key]
}

export const translations = {
  en: {
    // Navbar
    navServices: 'Services',
    navProjects: 'Projects',
    navTeam: 'Team',
    navContact: 'Contact',
    navCta: 'Get in touch',
    toggleMenu: 'Toggle menu',

    // Hero
    heroLabel: 'Prague-based engineering team',
    heroTitle: 'Software for terminals, lockers & self-service devices',
    heroBody: 'We build and maintain the embedded software and business logic for your hardware — so you can ship faster without growing a full in-house dev team.',
    heroCta: 'Get in touch',

    // Hero: labels on the 3D product showcase
    showcaseSolarTitle: 'Solar monitoring',
    showcaseSolarSub: 'Live output & panel alerts',
    showcasePayTitle: 'Payment terminals',
    showcasePaySub: 'ATMs, kiosks, card terminals',
    showcaseWebTitle: 'Custom websites',
    showcaseWebSub: 'Any site, made to order',
    showcaseVendTitle: 'Smart vending',
    showcaseVendSub: 'Cashless, remote stock',
    showcaseLockTitle: 'Parcel lockers',
    showcaseLockSub: 'Code pickup, live status',

    // Services
    servicesLabel: 'What we do',
    servicesTitle: 'Focused expertise for\nspecialized hardware',
    svcEmbeddedTitle: 'Embedded & device software',
    svcEmbeddedDesc: 'Business logic and control software for payment terminals, parcel lockers and custom self-service devices.',
    svcBackendTitle: 'Backend & integrations',
    svcBackendDesc: 'APIs, payment gateway integrations, ERP/WMS connections and remote monitoring dashboards.',
    svcPrototypingTitle: 'Prototyping & MVPs',
    svcPrototypingDesc: 'Rapid prototypes and pilot projects delivered in weeks, not months.',
    svcSupportTitle: 'Long-term support',
    svcSupportDesc: 'Ongoing feature development, maintenance and SLA-based support.',

    // Projects
    projectsLabel: 'Selected work',
    projectsTitle: 'Projects that shipped',

    // Page meta
    homePageTitle: 'Azileon — Software for terminals, lockers & self-service devices',
    homePageMeta: 'Azileon — Software for payment terminals, parcel lockers and self-service devices. Prague-based senior engineering team.',
    projectsPageTitle: 'Projects — Azileon',
    projectsPageMeta: 'Hardware and web projects delivered by Azileon: a handover box for Košík delivery drivers, a payment kiosk, and websites, stores and WordPress modules.',

    // Projects page
    projectsPageLabel: 'Our work',
    projectsPageHeading: 'Projects we have delivered',
    projectsPageIntro: 'A short look at what we have built: self-service devices with their software and back office, and the web work behind them.',
    hwSectionLabel: 'Hardware',
    hwSectionTitle: 'Self-service devices',
    webSectionLabel: 'Web',
    webSectionTitle: 'Websites & web apps',
    webSectionIntro: 'Websites, stores and custom WordPress modules we have built or taken over. Click a screenshot to enlarge it.',
    webBatteryTitle: 'AI battery dispatcher for solar plants',
    webBatteryDesc: 'Our own product and its page: a 3D model of a solar plant with a live day simulation — the AI charges the batteries in the cheapest hours and sells at the evening peak. Four languages, delivered turnkey to plant owners.',
    webLegalwawTitle: 'Turnkey site for a law practice',
    webLegalwawDesc: 'For Hroda Law in Warsaw we handled the whole project: designed the site, built it on WordPress, set up three languages, filled it with content and hosted it. The client edits everything without a developer.',
    webAlvibcoTitle: 'Multilingual version of an existing site',
    webAlvibcoDesc: 'Alvib Sistemas sells laser alignment and vibration analysis instruments. We took their finished English site and delivered Spanish, French and Portuguese versions, with language switching and per-language addresses for search engines.',
    webAlvlaTitle: 'Eight stores on a single theme',
    webAlvlaDesc: 'A WooCommerce store for a laundry-equipment manufacturer, with a domain per market. Products are configured along eleven axes, and the theme became a versioned product that updates on all eight sites from their own admin areas.',
    webAnandTitle: 'Site for an intellectual property law firm',
    webAnandDesc: 'An approved design built from scratch while two sites were merged into one: fifteen years of articles, a linked model of seven content types, field-level search and filters, attorney profiles exported to PDF.',
    webHaymarketTitle: 'Two publications on a shared platform',
    webHaymarketDesc: 'A redesign of MM+M and McKnight\u2019s inside Haymarket Media\u2019s site network: ad slots with targeting, one reader account, search across thirty-odd content types, and pages the newsroom assembles itself in Gutenberg.',
    webAdventTitle: 'Advent calendar plugin',
    webAdventDesc: 'A holiday campaign for an online store: each day opens only on its own date, closed days never reach the page source, and the marketer sets up gifts, promo codes and styling without a developer. 1,989 openings in seven days.',
    webAllensworthTitle: 'Corporate site for a law firm',
    webAllensworthDesc: 'A custom Roots/Sage theme instead of a page builder: a linked content model, a design system the editors cannot break, and page export to PDF on the fly.',
    taskLabel: 'The task',
    solutionLabel: 'What we built',
    photoDevice: 'The device',
    photoAdmin: 'Admin system',
    tagLocker: 'Handover box',
    tagKiosk: 'Payment kiosk',
    projKosikTitle: 'Handover box for Košík',
    projKosikTask: 'Košík uses the box internally to make the rotation of its delivery drivers smoother. Instead of handing things over in person, drivers collect and return what they need at a self-service box at the depot, at any hour and without waiting for warehouse staff.',
    projKosikSolution: 'We delivered the complete device software: the driver flow on the screen, compartment control and state reporting, plus a web admin where Košík dispatchers see every compartment live, assign them to drivers and get alerts, for example when a door stays open.',
    projKioskTitle: 'Payment kiosk',
    projKioskTask: 'Payment4U wanted a self-service kiosk that accepts cash and card payments, runs unattended and can be managed across many locations.',
    projKioskSolution: 'We built the kiosk application and its business logic: the payment flow for cash and cashless terminals, receipt handling, and an operator back office with monitoring, configuration and a transaction overview.',
    projectsCtaTitle: 'Have a device that needs software?',
    projectsCtaBody: 'Tell us what it should do and we will come back with a plan within one business day.',
    projectsCta: 'Get in touch',
    allProjects: 'All projects',
    carouselPrev: 'Previous projects',
    carouselNext: 'Next projects',
    lightboxOpen: 'Enlarge photo',
    lightboxClose: 'Close',

    // Team
    teamLabel: 'The team',
    teamTitle: 'Who we are',
    teamBody: 'A small, senior team with hands-on experience in embedded software, IoT systems and custom hardware integration. We treat your product as our own.',
    roleYehor: 'Co-founder / Software Architect',
    roleLeonid: 'Co-founder / Project Lead',
    onLinkedin: 'on LinkedIn',
    emailPerson: 'Email',

    // Contact
    contactLabel: 'Contact',
    contactTitle: "Let's talk",
    contactBody: 'Tell us about your terminals, lockers or self-service devices and we will get back to you within one business day.',
    contactEmail: 'Email',
    contactLocation: 'Location',
    contactLocationValue: 'Prague, Czech Republic',
    formName: 'Name',
    formNamePlaceholder: 'Your name',
    formCompany: 'Company',
    formCompanyPlaceholder: 'Your company',
    formEmail: 'Email',
    formEmailPlaceholder: 'you@company.com',
    formMessage: 'Message',
    formMessagePlaceholder: 'Tell us about your project',
    formSubmit: 'Send message',
    formSubmitted: 'Opening email client...',
    mailSubjectPrefix: 'Inquiry from',
    mailFrom: 'From',
    mailCompany: 'Company',
    mailNa: 'N/A',

    // Footer
    footerTagline: 'Software for terminals, lockers\n& self-service devices',
    footerEmail: 'Email',
    footerConnect: 'Connect',
    footerRights: 'All rights reserved.',
  },

  cs: {
    // Navbar
    navServices: 'Služby',
    navProjects: 'Projekty',
    navTeam: 'Tým',
    navContact: 'Kontakt',
    navCta: 'Kontaktujte nás',
    toggleMenu: 'Otevřít menu',

    // Hero
    heroLabel: 'Inženýrský tým z Prahy',
    heroTitle: 'Software pro terminály, lockery a samoobslužná zařízení',
    heroBody: 'Vyvíjíme a spravujeme embedded software a business logiku pro váš hardware — abyste mohli rychleji nasazovat nové funkce bez nutnosti budovat vlastní vývojový tým.',
    heroCta: 'Kontaktujte nás',

    // Hero: labels on the 3D product showcase
    showcaseSolarTitle: 'Solární monitoring',
    showcaseSolarSub: 'Výkon naživo a hlášení panelů',
    showcasePayTitle: 'Platební terminály',
    showcasePaySub: 'Bankomaty, kiosky, karetní terminály',
    showcaseWebTitle: 'Weby na míru',
    showcaseWebSub: 'Jakýkoli web na zakázku',
    showcaseVendTitle: 'Chytrý vending',
    showcaseVendSub: 'Bez hotovosti, vzdálený sklad',
    showcaseLockTitle: 'Výdejní boxy',
    showcaseLockSub: 'Výdej kódem, stav naživo',

    // Services
    servicesLabel: 'Co děláme',
    servicesTitle: 'Zaměřená expertíza pro\nspecializovaný hardware',
    svcEmbeddedTitle: 'Embedded & device software',
    svcEmbeddedDesc: 'Business logika a řídící software pro platební terminály, parcel lockery a samoobslužná zařízení na míru.',
    svcBackendTitle: 'Backend & integrace',
    svcBackendDesc: 'API, integrace platebních bran, napojení na ERP/WMS a dashboardy pro vzdálený monitoring.',
    svcPrototypingTitle: 'Prototypy & MVP',
    svcPrototypingDesc: 'Rychlé prototypy a pilotní projekty dodané v týdnech, ne měsících.',
    svcSupportTitle: 'Dlouhodobá podpora',
    svcSupportDesc: 'Průběžný vývoj funkcí, údržba a podpora na základě SLA.',

    // Projects
    projectsLabel: 'Vybrané práce',
    projectsTitle: 'Dodané projekty',

    // Page meta
    homePageTitle: 'Azileon — Software pro terminály, lockery a samoobslužná zařízení',
    homePageMeta: 'Azileon — Software pro platební terminály, parcel lockery a samoobslužná zařízení. Seniorní vývojářský tým z Prahy.',
    projectsPageTitle: 'Projekty — Azileon',
    projectsPageMeta: 'Hardwarové a webové projekty od Azileonu: výdejní box pro kurýry Košíku, platební kiosek a weby, e-shopy a moduly pro WordPress.',

    // Projects page
    projectsPageLabel: 'Naše práce',
    projectsPageHeading: 'Projekty, které jsme dodali',
    projectsPageIntro: 'Krátký přehled toho, co jsme postavili: samoobslužná zařízení včetně softwaru a administrace a webové práce kolem nich.',
    hwSectionLabel: 'Hardware',
    hwSectionTitle: 'Samoobslužná zařízení',
    webSectionLabel: 'Web',
    webSectionTitle: 'Weby a webové aplikace',
    webSectionIntro: 'Weby, e-shopy a vlastní moduly pro WordPress, které jsme postavili nebo převzali. Kliknutím na snímek ho zvětšíte.',
    webBatteryTitle: 'AI dispečer baterií pro solární elektrárny',
    webBatteryDesc: 'Náš vlastní produkt a jeho stránka: 3D model elektrárny se simulací dne naživo — AI nabíjí baterie v nejlevnějších hodinách a prodává ve večerní špičce. Čtyři jazyky, majitelům elektráren dodáváme na klíč.',
    webLegalwawTitle: 'Web pro právní praxi na klíč',
    webLegalwawDesc: 'Pro Hroda Law ve Varšavě jsme zajistili celý projekt: navrhli design, postavili web na WordPressu, nastavili tři jazyky, naplnili obsah a zajistili hosting. Klient dnes vše upravuje bez vývojáře.',
    webAlvibcoTitle: 'Vícejazyčná verze hotového webu',
    webAlvibcoDesc: 'Alvib Sistemas prodává přístroje pro laserové ustavování a analýzu vibrací. Hotový anglický web jsme rozšířili o španělskou, francouzskou a portugalskou verzi včetně přepínání jazyků a adres pro vyhledávače.',
    webAlvlaTitle: 'Osm obchodů na jednom tématu',
    webAlvlaDesc: 'Obchod na WooCommerce pro výrobce vybavení prádelen, každý trh na vlastní doméně. Výrobek se konfiguruje v jedenácti osách a téma se stalo samostatným produktem, který se na osmi webech aktualizuje z jejich administrace.',
    webAnandTitle: 'Web advokátní kanceláře pro duševní vlastnictví',
    webAnandDesc: 'Realizace schváleného návrhu od nuly a sloučení dvou webů do jednoho: patnáct let článků, provázaný model sedmi typů obsahu, filtry a vyhledávání podle polí, export profilů právníků do PDF.',
    webHaymarketTitle: 'Dva tituly na sdílené platformě',
    webHaymarketDesc: 'Redesign MM+M a McKnight\u2019s uvnitř sítě webů Haymarket Media: reklamní pozice s cílením, společný účet čtenáře, vyhledávání napříč více než třiceti typy obsahu a stránky, které si redakce skládá sama v Gutenbergu.',
    webAdventTitle: 'Plugin adventního kalendáře',
    webAdventDesc: 'Vánoční akce e-shopu: den se otevře jen ve svém termínu, obsah zavřených dní se do zdrojového kódu nedostane a dárky, slevové kódy i vzhled zadává marketér sám. 1 989 otevření za sedm dní.',
    webAllensworthTitle: 'Firemní web advokátní kanceláře',
    webAllensworthDesc: 'Vlastní téma na Roots/Sage místo stavebnice: provázaný model obsahu, designový systém, který redaktoři nerozbijí, a export stránek do PDF za běhu.',
    taskLabel: 'Zadání',
    solutionLabel: 'Co jsme vytvořili',
    photoDevice: 'Zařízení',
    photoAdmin: 'Administrace',
    tagLocker: 'Výdejní box',
    tagKiosk: 'Platební kiosek',
    projKosikTitle: 'Výdejní box pro Košík',
    projKosikTask: 'Košík box používá interně, aby zlepšil rotaci svých kurýrů. Místo osobního předávání si řidiči vyzvedávají a vracejí vše potřebné v samoobslužném boxu v depu, v kteroukoli hodinu a bez čekání na personál skladu.',
    projKosikSolution: 'Dodali jsme kompletní software zařízení: průchod pro řidiče na obrazovce, řízení schránek a hlášení jejich stavu a k tomu webovou administraci, ve které dispečeři Košíku vidí každou schránku naživo, přiřazují je řidičům a dostávají upozornění, například když zůstanou otevřená dvířka.',
    projKioskTitle: 'Platební kiosek',
    projKioskTask: 'Payment4U chtěl samoobslužný kiosek, který přijímá hotovostní i kartové platby, běží bez obsluhy a dá se spravovat napříč mnoha lokalitami.',
    projKioskSolution: 'Vytvořili jsme aplikaci kiosku a jeho obchodní logiku: platební průchod pro hotovostní i bezhotovostní terminály, práci s účtenkami a back office pro provozovatele s monitoringem, konfigurací a přehledem transakcí.',
    projectsCtaTitle: 'Máte zařízení, které potřebuje software?',
    projectsCtaBody: 'Řekněte nám, co má umět, a do jednoho pracovního dne se ozveme s plánem.',
    projectsCta: 'Ozvěte se nám',
    allProjects: 'Všechny projekty',
    carouselPrev: 'Předchozí projekty',
    carouselNext: 'Další projekty',
    lightboxOpen: 'Zvětšit fotografii',
    lightboxClose: 'Zavřít',

    // Team
    teamLabel: 'Tým',
    teamTitle: 'Kdo jsme',
    teamBody: 'Malý, seniorní tým s praktickými zkušenostmi v oblasti embedded softwaru, IoT systémů a integrace hardware na míru. Váš produkt bereme jako svůj.',
    roleYehor: 'Spoluzakladatel / Software Architekt',
    roleLeonid: 'Spoluzakladatel / Vedoucí projektů',
    onLinkedin: 'na LinkedIn',
    emailPerson: 'E-mail',

    // Contact
    contactLabel: 'Kontakt',
    contactTitle: 'Ozvěte se nám',
    contactBody: 'Řekněte nám o vašich terminálech, lockerech nebo samoobslužných zařízeních a ozveme se vám do jednoho pracovního dne.',
    contactEmail: 'E-mail',
    contactLocation: 'Sídlo',
    contactLocationValue: 'Praha, Česká republika',
    formName: 'Jméno',
    formNamePlaceholder: 'Vaše jméno',
    formCompany: 'Společnost',
    formCompanyPlaceholder: 'Vaše společnost',
    formEmail: 'E-mail',
    formEmailPlaceholder: 'vy@firma.cz',
    formMessage: 'Zpráva',
    formMessagePlaceholder: 'Řekněte nám o vašem projektu',
    formSubmit: 'Odeslat zprávu',
    formSubmitted: 'Otevírám e-mailového klienta...',
    mailSubjectPrefix: 'Poptávka od',
    mailFrom: 'Od',
    mailCompany: 'Společnost',
    mailNa: 'Neuvedeno',

    // Footer
    footerTagline: 'Software pro terminály, lockery\na samoobslužná zařízení',
    footerEmail: 'E-mail',
    footerConnect: 'Spojte se',
    footerRights: 'Všechna práva vyhrazena.',
  },
} as const
