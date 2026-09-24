import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Solutions from '../components/Solutions'
import AiSection from '../components/AiSection'
import Process from '../components/Process'
import SectionDivider from '../components/SectionDivider'
import Projects from '../components/Projects'
import Team from '../components/Team'
import Contact from '../components/Contact'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

export default function Home() {
  const t = useT()
  usePageMeta(t('homePageTitle'), t('homePageMeta'))

  return (
    <>
      <Hero />
      <TrustStrip />
      <Solutions />
      <SectionDivider />
      <AiSection />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Team />
      <SectionDivider />
      <Contact />
    </>
  )
}
