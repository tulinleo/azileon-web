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
    <>
      <div className="grain-overlay" />
      <div className="ambient-blobs">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>

      <main>
        <Navbar />
        <VideoHero />
        <Projects />
        <div className="section-divider" />
        <Clients />
        <div className="section-divider" />
        <WhyUs />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Team />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
