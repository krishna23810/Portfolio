import { useState } from 'react'
import {
  Volume2,
  VolumeX,
  FileText,
  Gamepad2,
  HelpCircle,
} from 'lucide-react'
import { soundManager } from '../audio/SoundManager'
import { BIOMES } from '../levels/levelData'

export default function GameHUD({
  score,
  currentLevel,
  onWarpToLevel,
  onToggleViewMode,
  isGameMode,
  engineRef,
  onOpenHelp,
}) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted)

  const handleSoundToggle = () => {
    const muted = soundManager.toggleMute()
    setIsMuted(muted)
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none font-mono">
      {/* --- TOP CLEAN MINIMAL NAV BAR --- */}
      <header className="flex items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Stage Warper (Clean Compact Pill Bar) */}
        <nav className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 p-1 rounded-xl shadow-lg">
          {BIOMES.map((b) => {
            const isActive = currentLevel?.id === b.id
            return (
              <button
                key={b.id}
                onClick={() => onWarpToLevel(b.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${isActive
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                <span>{b.id === 2 ? '🌊 DIVE' : `LVL ${b.id}`}</span>
              </button>
            )
          })}
        </nav>

        {/* Right: Recruiter View & Audio controls */}
        <div className="flex items-center gap-2">
          {/* Recruiter Quick View Switch */}
          <button
            onClick={onToggleViewMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs shadow-md transition-all cursor-pointer"
            title="Switch to Traditional Recruiter Resume Grid"
          >
            {isGameMode ? (
              <>
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">RECRUITER VIEW</span>
              </>
            ) : (
              <>
                <Gamepad2 className="w-4 h-4" />
                <span className="hidden sm:inline">INTERACTIVE VIEW</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
          </button>
        </div>
      </header>

      {/* --- RIGHT-SIDE ROBBY LEONARDI VERTICAL SCROLLBAR SCRUBBER --- */}
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const clickY = e.clientY - rect.top
          const pct = Math.max(0, Math.min(1, clickY / rect.height))
          if (engineRef.current) {
            engineRef.current.setProgress(pct)
          }
        }}
        className="absolute right-3 top-1/4 bottom-1/4 w-3.5 bg-black/30 backdrop-blur-sm rounded-full border border-white/30 pointer-events-auto flex flex-col justify-start p-0.5 cursor-pointer shadow-lg hidden md:flex"
      >
        <div
          className="w-full bg-yellow-400 rounded-full transition-all duration-75 shadow-md"
          style={{
            height: '28px',
            transform: `translateY(${(score / 10000) * 220}px)`,
          }}
        />
      </div>
    </div>
  )
}
