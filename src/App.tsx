import { useScrollReveal } from './hooks/useScrollReveal'
import { useLang } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import SectionDivider from './components/SectionDivider'
import Projects from './components/Projects'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { lang } = useLang()
  useScrollReveal(lang)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Team />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
