import Hero from '../components/Hero'
import Services from '../components/Services'
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
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Team />
      <SectionDivider />
      <Contact />
    </>
  )
}
