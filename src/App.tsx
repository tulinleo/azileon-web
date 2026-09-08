import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useLang } from './i18n'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'

function Layout() {
  const { lang } = useLang()
  const { pathname } = useLocation()
  // Re-observe fade-in elements whenever the language or the page changes.
  useScrollReveal(`${lang}:${pathname}`)

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
