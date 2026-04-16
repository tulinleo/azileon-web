import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import CircuitOverlay from './components/CircuitOverlay'
import Hero from './components/Hero'
import Services from './components/Services'
import SectionDivider from './components/SectionDivider'
import Projects from './components/Projects'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useScrollReveal()

  return (
    <>
      <CircuitOverlay />
      <Navbar />
      <main className="relative z-10">
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
