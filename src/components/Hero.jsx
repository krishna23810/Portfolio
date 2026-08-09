import { useEffect, useRef, useState } from 'react'

const terminalCommands = [
  {
    cmd: 'whoami',
    type: 'text',
    text: 'Krishnakant Agrawal — Full Stack Developer MCA @ Medi-Caps',
  },
  {
    cmd: 'cat current_role.json',
    type: 'json',
    json: {
      role: 'Full Stack Developer Intern',
      company: 'TRISX Technologies',
      product: 'Subcidys (MSME Financial SaaS)',
      // focus: ['MERN Stack', 'Event-Driven Flows', 'WebRTC', 'Flutter'],
    },
  },
  {
    cmd: 'git log --oneline -3',
    type: 'git',
    commits: [
      { hash: 'a1b2c3d', msg: 'feat(ghost-call): WebRTC P2P video' },
      { hash: 'b2c3d4e', msg: 'feat(subcidys): MSME GST billing' },
      { hash: 'c3d4e5f', msg: 'feat(lootlo): Socket.io gaming' },
    ],
  },
]

export default function Hero() {
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0)
  const [typedCmd, setTypedCmd] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const canvasRef = useRef(null)

  // Matrix Rain Background Effect inside Hero
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    const chars = 'アイウエオカキ01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]=+'
    const fontSize = 16
    let columns = 0
    let drops = []

    const handleResize = () => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    let lastTime = 0
    const fps = 15
    const interval = 1500 / fps

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render)

      const delta = currentTime - lastTime
      if (delta < interval) return
      lastTime = currentTime - (delta % interval)

      ctx.fillStyle = 'rgba(3, 7, 3, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Terminal Typing animation effect
  useEffect(() => {
    let cancelled = false
    let charIndex = 0
    const target = terminalCommands[currentCmdIndex]

    setTypedCmd('')
    setShowOutput(false)
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (cancelled) return
      if (charIndex < target.cmd.length) {
        setTypedCmd(target.cmd.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)

        setTimeout(() => {
          if (cancelled) return
          setShowOutput(true)

          setTimeout(() => {
            if (cancelled) return
            setCurrentCmdIndex((prev) => (prev + 1) % terminalCommands.length)
          }, 3800)
        }, 1000)
      }
    }, 70)

    return () => {
      cancelled = true
      clearInterval(typeInterval)
    }
  }, [currentCmdIndex])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentItem = terminalCommands[currentCmdIndex]

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Matrix Canvas background inside Hero */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle radial background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column: Hero Intro (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-emerald-300 tracking-wide font-medium">
              Available for Internships &amp; Full-Time Roles
            </span>
          </div>

          {/* Greeting */}
          <p className="font-mono text-sm text-emerald-400/90 mb-2 font-medium">
            &gt; Hello, World! I am
          </p>

          {/* Full Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-4 leading-none">
            Krishnakant <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200">
              Agrawal
            </span>
            <span className="text-emerald-400 animate-blink">_</span>
          </h1>

          {/* Role Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Full Stack Developer', 'MERN Specialist', 'Event-Driven Systems', 'WebRTC & Flutter'].map((role, idx) => (
              <span
                key={role}
                className={`font-mono text-xs px-3 py-1 rounded border transition-all duration-200 ${idx === 0
                  ? 'border-emerald-400/80 text-emerald-300 bg-emerald-500/15 shadow-[0_0_12px_rgba(0,255,65,0.2)] font-semibold'
                  : 'border-emerald-500/20 text-gray-400 bg-black/40 hover:border-emerald-500/40 hover:text-emerald-300'
                  }`}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Bio Summary */}
          <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-normal">
            Building <strong className="text-emerald-400 font-semibold">event-driven architectures</strong>,{' '}
            <strong className="text-emerald-400 font-semibold">real-time systems</strong>, and{' '}
            <strong className="text-emerald-400 font-semibold">scalable MERN backends</strong>. Currently interning at{' '}
            <span className="text-emerald-300 font-medium underline decoration-emerald-500/40 underline-offset-4">
              TRISX Technologies
            </span>{' '}
            building financial SaaS solutions for Indian MSMEs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-emerald-400 text-black font-mono font-bold text-sm rounded-lg hover:bg-emerald-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              View Projects &rarr;
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border border-emerald-500/40 text-gray-200 font-mono text-sm rounded-lg hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 cursor-pointer"
            >
              Get In Touch
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://github.com/krishna23810"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg border border-emerald-500/20 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.465-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .319.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/krishnakant-agrawal-811a4b289/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg border border-emerald-500/20 text-gray-400 hover:text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Enhanced Terminal Window (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-emerald-400/40 bg-[#050d05]/95 shadow-[0_0_40px_rgba(0,255,65,0.15)] overflow-hidden font-mono text-xs backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/60 hover:shadow-[0_0_50px_rgba(0,255,65,0.2)]">
            {/* Terminal Window Header */}
            <div className="bg-[#091609] px-3 py-3 border-b border-emerald-400/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
              </div>
              <span className="text-gray-300 font-medium text-[11px] tracking-wide">~/krishnakant — zsh</span>
              <span className="text-emerald-400/60 text-[10px]">UTF-8</span>
            </div>

            {/* Terminal Body */}
            <div className="p-5 min-h-[250px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <span className="text-emerald-400 font-bold text-sm">$</span>
                  <span className="text-white font-semibold text-sm">{typedCmd}</span>
                  {isTyping && <span className="w-2 h-4 bg-emerald-400 animate-blink inline-block shadow-[0_0_8px_rgba(0,255,65,0.8)]" />}
                </div>

                {/* Syntax-Highlighted Output with Enhanced Glowing Vertical Line */}
                {showOutput && (
                  <div className="my-3 pl-4 border-l-2 border-emerald-400 shadow-[0_0_12px_rgba(0,255,65,0.4)] transition-all duration-300">
                    {currentItem.type === 'text' && (
                      <p className="text-emerald-300 font-mono leading-relaxed py-2 text-[13px]">
                        {currentItem.text}
                      </p>
                    )}

                    {currentItem.type === 'json' && (
                      <pre className="font-mono text-[13px] leading-relaxed py-2">
                        <span className="text-emerald-400">{'{'}</span>{'\n'}
                        {'  '}<span className="text-purple-300">&quot;role&quot;</span><span className="text-gray-400">: </span><span className="text-green-300">&quot;Full Stack Developer Intern&quot;</span>,<span className="text-gray-400"></span>{'\n'}
                        {'  '}<span className="text-purple-300">&quot;company&quot;</span><span className="text-gray-400">: </span><span className="text-green-300">&quot;TRISX Technologies&quot;</span>,<span className="text-gray-400"></span>{'\n'}
                        {'  '}<span className="text-purple-300">&quot;product&quot;</span><span className="text-gray-400">: </span><span className="text-green-300">&quot;Subcidys (MSME Financial SaaS)&quot;</span>,<span className="text-gray-400"></span>{'\n'}
                        {/* {'  '}<span className="text-purple-300">&quot;focus&quot;</span><span className="text-gray-400">: [</span><span className="text-green-300">&quot;MERN Stack&quot;</span>, <span className="text-green-300">&quot;Event-Driven Flows&quot;</span>, <span className="text-green-300">&quot;WebRTC&quot;</span><span className="text-gray-400">]</span>{'\n'} */}
                        <span className="text-emerald-400">{'}'}</span>
                      </pre>
                    )}

                    {currentItem.type === 'git' && (
                      <div className="space-y-1 font-mono text-[13px] py-2">
                        {currentItem.commits.map((c) => (
                          <div key={c.hash} className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
                            <span className="text-amber-400 font-bold shrink-0">{c.hash}</span>
                            <span className="text-emerald-300 truncate">{c.msg}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Enhanced Footer Divider & Metadata */}
              <div className="mt-4 pt-3 border-t border-emerald-400/20 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    READY
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator Button */}
      <button
        type="button"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-emerald-400/60 transition-colors hover:text-emerald-300 cursor-pointer border-none bg-transparent"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-8 w-5 rounded-full border border-current">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 animate-bounce rounded-full bg-current" />
        </span>
      </button>
    </section>
  )
}