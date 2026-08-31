import { useState, useEffect, useRef } from 'react'
import GameCanvas from './game/engine/GameCanvas'
import GameHUD from './game/ui/GameHUD'
import ModalViewer from './game/ui/ModalViewer'
import RecruiterView from './game/ui/RecruiterView'
import DownloadApp from './components/DownloadApp'
import LoadingScreen from './game/ui/LoadingScreen'
import { LEVELS } from './game/levels/levelData'
import { initGA, logPageView } from './utils/analytics'

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
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return isDownloadRoute(window.location.pathname, window.location.hash) ? 'download' : 'game'
    }
    return 'game'
  })

  // Game vs Recruiter view mode
  const [isGameMode, setIsGameMode] = useState(true)
  const [score, setScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(LEVELS[0])
  const [nearbyPortal, setNearbyPortal] = useState(null)
  const [activeModal, setActiveModal] = useState(null)

  const engineRef = useRef(null)

  useEffect(() => {
    initGA()
    logPageView(
      isDownloadRoute(window.location.pathname, window.location.hash) ? '/download' : window.location.pathname,
      document.title
    )

    const handleLocationChange = () => {
      if (isDownloadRoute(window.location.pathname, window.location.hash)) {
        setCurrentPage('download')
        logPageView('/download', 'Download Travel Planner APK | Krishnakant Agrawal')
      } else {
        setCurrentPage('game')
        logPageView('/', 'Krishnakant Agrawal | Interactive Resume Game')
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

  const handleWarpToLevel = (levelId) => {
    if (engineRef.current) {
      engineRef.current.jumpToLevel(levelId)
    }
  }

  if (currentPage === 'download') {
    return <DownloadApp onBack={() => navigateTo('game', '/')} />
  }

  return (
    <div id="content" className="relative w-screen h-screen overflow-hidden bg-[#00bff3] text-slate-100 font-sans select-none">
      {isGameMode ? (
        <div id="container" className="relative w-full h-full">
          {/* Main 60 FPS Game World Canvas */}
          <GameCanvas
            engineRef={engineRef}
            onScoreUpdate={(newScore) => setScore(newScore)}
            onLevelChange={(newLevel) => setCurrentLevel(newLevel)}
            onOpenModal={(modalInfo) => setActiveModal(modalInfo)}
            onNearbyPortal={(portal) => setNearbyPortal(portal)}
          />

          {/* Interactive Game HUD Overlay */}
          <GameHUD
            score={score}
            currentLevel={currentLevel}
            nearbyPortal={nearbyPortal}
            onWarpToLevel={handleWarpToLevel}
            onToggleViewMode={() => setIsGameMode(false)}
            isGameMode={isGameMode}
            engineRef={engineRef}
            onOpenHelp={() => setActiveModal({ type: 'help' })}
          />
        </div>
      ) : (
        /* Traditional Recruiter Grid Document View */
        <div className="w-full h-full overflow-y-auto">
          <RecruiterView onSwitchToGame={() => setIsGameMode(true)} />
        </div>
      )}

      {/* Interactive Modal Popup Viewer */}
      <ModalViewer
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}