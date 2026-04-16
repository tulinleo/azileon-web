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
    projPaymentTitle: 'Payment terminal & parcel locker platform',
    projPaymentDesc: 'Development of software for cash and cashless payment terminals and automated parcel locker systems. Full-stack platform handling device communication, payment processing and operator management.',
    projBleTitle: 'BLE asset tracking system',
    projBleDesc: 'Design and implementation of a Bluetooth Low Energy tracking system for indoor asset management. Real-time positioning, geofencing and analytics dashboard.',
    projSelfServiceTitle: 'Self-service device software',
    projSelfServiceDesc: 'Continuous development and feature expansion for a range of self-service devices. Modular architecture enabling rapid deployment of new device types.',
    tagFintech: 'Fintech',
    tagIot: 'IoT',
    tagHardware: 'Hardware',

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
    projPaymentTitle: 'Platforma pro platební terminály a parcel lockery',
    projPaymentDesc: 'Vývoj softwaru pro hotovostní i bezhotovostní platební terminály a automatizované systémy parcel lockerů. Full-stack platforma zajišťující komunikaci se zařízeními, zpracování plateb a správu operátorů.',
    projBleTitle: 'BLE systém sledování aktiv',
    projBleDesc: 'Návrh a implementace Bluetooth Low Energy sledovacího systému pro správu aktiv v interiéru. Real-time pozicování, geofencing a analytický dashboard.',
    projSelfServiceTitle: 'Software pro samoobslužná zařízení',
    projSelfServiceDesc: 'Průběžný vývoj a rozšiřování funkcí pro řadu samoobslužných zařízení. Modulární architektura umožňující rychlé nasazení nových typů zařízení.',
    tagFintech: 'Fintech',
    tagIot: 'IoT',
    tagHardware: 'Hardware',

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
