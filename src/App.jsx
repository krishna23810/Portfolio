import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DownloadApp from './components/DownloadApp'

function isDownloadRoute(path, hash) {
  return (
    path === '/download' ||
    path === '/download/' ||
    path === '/travel-planner' ||
    path === '/travel-planner/' ||
    path === '/app' ||
    path === '/app/' ||
    hash === '#download' ||
    hash === '#/download'
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return isDownloadRoute(window.location.pathname, window.location.hash) ? 'download' : 'home'
    }
    return 'home'
  })

  useEffect(() => {
    const handleLocationChange = () => {
      if (isDownloadRoute(window.location.pathname, window.location.hash)) {
        setCurrentPage('download')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])

  const navigateTo = (page, path = '/') => {
    setCurrentPage(page)
    window.history.pushState({}, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentPage === 'download') {
    return <DownloadApp onBack={() => navigateTo('home', '/')} />
  }

  return (
    <div className="relative min-h-screen bg-[#030703] text-gray-200 overflow-x-hidden">
      <Navbar onNavigateToDownload={() => navigateTo('download', '/download')} />
      <main>
        <Hero onNavigateToDownload={() => navigateTo('download', '/download')} />
        <About />
        <Skills />
        <Projects onNavigateToDownload={() => navigateTo('download', '/download')} />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer onNavigateToDownload={() => navigateTo('download', '/download')} />
    </div>
  )
}