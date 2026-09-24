import { BrowserRouter, MemoryRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useLang } from './i18n'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import SolutionPage from './pages/SolutionPage'

/* The bento frame: one centred column; the header, every section of the page and the footer are cards in it,
   separated by the same gap. <main> is display: contents so a page's sections join the column directly. */
function Layout() {
  const { lang } = useLang()
  const { pathname } = useLocation()
  // Re-observe fade-in elements whenever the language or the page changes.
  useScrollReveal(`${lang}:${pathname}`)

  return (
    <>
      <ScrollManager />
      <div className="mx-auto max-w-[1320px] px-[clamp(10px,1.4vw,16px)] pt-3 pb-4 flex flex-col gap-bento">
        <Navbar />
        <main className="contents">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </>
  )
}

// Single-file review builds (VITE_MEMORY_ROUTER=1) run at an arbitrary URL, so they keep
// routing in memory instead of the address bar. Production always uses the real URL.
const Router = import.meta.env.VITE_MEMORY_ROUTER === '1' ? MemoryRouter : BrowserRouter
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="solutions/:slug" element={<SolutionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}
