import { useEffect, useRef } from 'react'
import { ScrollEngine } from './ScrollEngine'

export default function GameCanvas({
  engineRef,
  onScoreUpdate,
  onLevelChange,
  onOpenModal,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const parent = canvas.parentElement
      if (parent) {
        const cssWidth = parent.clientWidth
        const cssHeight = parent.clientHeight || window.innerHeight
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5)

        canvas.width = Math.round(cssWidth * dpr)
        canvas.height = Math.round(cssHeight * dpr)
        canvas.style.width = `${cssWidth}px`
        canvas.style.height = `${cssHeight}px`

        if (engineRef.current) {
          engineRef.current.resize(cssWidth, cssHeight, dpr)
        }
      }
    }

    updateSize()

    // Initialize Scroll Engine
    const engine = new ScrollEngine(canvas, {
      onScoreUpdate,
      onLevelChange,
      onOpenModal,
    })

    engineRef.current = engine
    engine.start()

    // Click handler on canvas to trigger interactive cards
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      const worldClickX = engine.cameraX + clickX

      // Check Ghost Call area (3200 - 3600)
      if (worldClickX >= 3180 && worldClickX <= 3600 && clickY >= 140 && clickY <= 420) {
        if (onOpenModal) {
          onOpenModal({
            type: 'project',
            data: {
              title: 'GHOST CALL',
              category: 'WebRTC P2P Video Call App',
              badge: 'WEBRTC LIVE',
              desc: 'Sub-40ms P2P encrypted audio/video calling app with zero intermediate server streaming.',
              stats: { latency: '< 40ms', encryption: 'AES-128', topology: 'Mesh' },
              techStack: ['WebRTC', 'Socket.io', 'Node.js', 'STUN/TURN'],
              liveUrl: 'https://ghost-call-ten.vercel.app/',
              githubUrl: 'https://github.com/krishna23810/ghost-call',
            },
          })
        }
      }

      // Check Subcidys area (5580 - 6000)
      if (worldClickX >= 5580 && worldClickX <= 6000 && clickY >= 140 && clickY <= 420) {
        if (onOpenModal) {
          onOpenModal({
            type: 'experience',
            data: {
              title: 'SUBCIDYS SAAS',
              role: 'Full Stack Developer Intern @ TRISX',
              badge: 'FINTECH PRODUCTION SAAS',
              desc: 'Enterprise MSME financial technology platform handling automated GST billing and webhooks.',
              stats: { impact: 'Automated GST Invoicing', uptime: '99.9%' },
            },
          })
        }
      }

      // Check Travel Planner APK area (7980 - 8400)
      if (worldClickX >= 7980 && worldClickX <= 8400 && clickY >= 140 && clickY <= 420) {
        if (onOpenModal) {
          onOpenModal({
            type: 'download',
            data: {
              title: 'TRAVEL PLANNER APK',
              category: 'Flutter Cross-Platform Mobile App',
              apkSize: '55.37 MB',
              apkUrl: '/TravelPlanner.apk',
              desc: 'Smart itinerary planner and weather forecasting mobile application for Android.',
            },
          })
        }
      }

      // Check Victory Castle / Contact area (9980 - 10450)
      if (worldClickX >= 9980 && worldClickX <= 10450 && clickY >= 130 && clickY <= 430) {
        if (onOpenModal) {
          onOpenModal({
            type: 'contact',
            data: {
              email: 'agrawall.krishna08@gmail.com',
              phone: '+91-9669070394',
              linkedin: 'https://linkedin.com/in/krishnakant-agrawal-811a4b289/',
              github: 'https://github.com/krishna23810',
            },
          })
        }
      }
    }

    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', updateSize)

    return () => {
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', updateSize)
      engine.stop()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full cursor-pointer select-none"
    />
  )
}
