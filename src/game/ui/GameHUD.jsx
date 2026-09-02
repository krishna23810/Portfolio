import {
  FileText,
  Gamepad2,
} from 'lucide-react'

export default function GameHUD({
  score,
  onToggleViewMode,
  isGameMode,
  engineRef,
}) {

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none font-mono">
      {/* --- TOP CLEAN MINIMAL NAV BAR --- */}
      <header className="flex items-center justify-end gap-3 pointer-events-auto">
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
