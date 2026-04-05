import { useScrollRevealAll } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import VideoHero from './components/VideoHero'
import Projects from './components/Projects'
import Clients from './components/Clients'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useScrollRevealAll()

  return (
    <main>
      <Navbar />
      <VideoHero />
      <Projects />
      <Clients />
      <WhyUs />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
