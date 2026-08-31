import { useState, useEffect } from 'react'

export default function LoadingScreen({ onLoaded }) {
  const [dots, setDots] = useState(0)
  const [preloaderBottom, setPreloaderBottom] = useState('0%')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // 5 pulsing dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 5)
    }, 240)

    // After preloading (1.6s), slide preloader to bottom: 100% (scrolls up on the same page)
    const timer = setTimeout(() => {
      setPreloaderBottom('100%')
    }, 1600)

    // Once the 1.25s CSS transition ends, set displaynone/hide
    const hideTimer = setTimeout(() => {
      setIsDone(true)
      if (onLoaded) onLoaded()
    }, 2850)

    return () => {
      clearInterval(dotInterval)
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [onLoaded])

  if (isDone) return null

  return (
    <div
      id="preloader"
      className="absolute left-0 w-full h-full z-50 overflow-hidden bg-[#00bff3] select-none"
      style={{
        bottom: preloaderBottom,
        transition: 'bottom 1.25s cubic-bezier(0.4, 0.0, 0.2, 1)',
        pointerEvents: preloaderBottom === '100%' ? 'none' : 'auto',
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Floating Clouds in Sky */}
        <div className="absolute top-14 left-10 opacity-80 pointer-events-none">
          <div className="w-28 h-10 bg-white rounded-full relative">
            <div className="w-14 h-14 bg-white rounded-full absolute -top-6 left-4" />
            <div className="w-10 h-10 bg-white rounded-full absolute -top-4 left-14" />
          </div>
        </div>
        <div className="absolute top-16 right-14 opacity-80 pointer-events-none">
          <div className="w-32 h-10 bg-white rounded-full relative">
            <div className="w-16 h-16 bg-white rounded-full absolute -top-7 left-5" />
            <div className="w-12 h-12 bg-white rounded-full absolute -top-5 left-16" />
          </div>
        </div>

        {/* Robby Leonardi Preloader Banner Structure */}
        <div id="preloader-banner-container" className="relative flex flex-col items-center justify-center">
          <div id="preloader-banner" className="relative flex items-center justify-center">
            {/* Left Tail */}
            <div
              id="preloader-banner-left"
              className="absolute -left-8 top-3 w-10 h-28 bg-[#b91c1c] -z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 35% 50%)',
              }}
            />

            {/* Middle Body */}
            <div
              id="preloader-banner-middle"
              className="relative px-16 sm:px-24 py-8 bg-[#f26d7d] shadow-2xl flex flex-col items-center justify-center min-w-[320px] sm:min-w-[440px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f87171]" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#d32f2f]" />

              {/* Left Serrated Edge */}
              <div
                className="absolute -left-3 top-0 bottom-0 w-3 bg-[#f26d7d]"
                style={{
                  clipPath:
                    'polygon(100% 0, 0 10%, 100% 20%, 0 30%, 100% 40%, 0 50%, 100% 60%, 0 70%, 100% 80%, 0 90%, 100% 100%)',
                }}
              />

              {/* Right Serrated Edge */}
              <div
                className="absolute -right-3 top-0 bottom-0 w-3 bg-[#f26d7d]"
                style={{
                  clipPath:
                    'polygon(0 0, 100% 10%, 0 20%, 100% 30%, 0 40%, 100% 50%, 0 60%, 100% 70%, 0 80%, 100% 90%, 0 100%)',
                }}
              />

              {/* LOADING Text */}
              <div
                id="preloader-banner-text-a"
                className="text-4xl sm:text-5xl font-black tracking-widest text-white uppercase text-center"
                style={{
                  fontFamily: '"Impact", "Arial Black", "Rubik", sans-serif',
                  textShadow: '0 3px 6px rgba(0,0,0,0.15)',
                  letterSpacing: '0.18em',
                }}
              >
                LOADING
              </div>

              {/* 5 Animated Pulsing Dots */}
              <div id="preloader-dots" className="flex items-center gap-2.5 mt-4">
                {[0, 1, 2, 3, 4].map((index) => {
                  const isActive = index === dots
                  return (
                    <span
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-white scale-125 opacity-100 shadow-md'
                          : 'bg-[#ffccd5] opacity-50 scale-95'
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Right Tail */}
            <div
              id="preloader-banner-right"
              className="absolute -right-8 top-3 w-10 h-28 bg-[#b91c1c] -z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 65% 50%, 100% 100%, 0 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
