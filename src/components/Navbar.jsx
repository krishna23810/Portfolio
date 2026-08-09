import { useEffect, useState } from 'react'

const navItems = [
  { href: '#about', label: 'About', num: '01.' },
  { href: '#skills', label: 'Skills', num: '02.' },
  { href: '#projects', label: 'Projects', num: '03.' },
  { href: '#experience', label: 'Experience', num: '04.' },
  { href: '#education', label: 'Education', num: '05.' },
  { href: '#contact', label: 'Contact', num: '06.' },
]

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14" aria-hidden="true">
      <path d="M4 12 12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Navbar border/blur state
      setScrolled(window.scrollY > 20)

      // Section tracking logic
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 200 // Offset for fixed navbar header height

      // Check if reached bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact')
        return
      }

      let current = ''
      sections.forEach((sec) => {
        const top = sec.offsetTop
        const height = sec.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          current = sec.id
        }
      })

      if (current) {
        setActiveSection(current)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(href.replace('#', ''))
      window.history.replaceState(null, '', href)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? 'border-b border-emerald-400/15 bg-black/85 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent opacity-70" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Go to homepage"
          className="group flex items-center gap-1 font-mono text-lg font-bold tracking-tight text-white transition-transform duration-200 hover:scale-[1.03]"
        >
          <span className="text-emerald-400 transition-transform duration-200 group-hover:-translate-x-0.5">[</span>
          <span>KA</span>
          <span className="text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5">]</span>
          {/* <span className="ml-2 hidden text-[10px] font-normal tracking-wider text-gray-500 sm:inline">/ DEV_MODE</span> */}
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative flex items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[11px] transition-all duration-200 ${isActive
                    ? 'bg-emerald-400/15 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(0,255,65,0.15)] border border-emerald-400/30'
                    : 'text-gray-400 hover:bg-emerald-400/5 hover:text-gray-200'
                  }`}
              >
                <span className={`transition-colors ${isActive ? 'text-emerald-400 font-bold' : 'text-emerald-400/60 group-hover:text-emerald-400'}`}>
                  {item.num}
                </span>
                <span>{item.label}</span>
                <span className={`absolute inset-x-3 -bottom-[1px] h-px origin-left bg-emerald-400 transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:agrawall.krishna08@gmail.com"
            className="group hidden items-center gap-1.5 rounded-md border border-emerald-400/70 px-4 py-2 font-mono text-[11px] font-semibold text-emerald-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_22px_rgba(0,255,65,0.3)] sm:inline-flex"
          >
            Hire Me
            <ArrowUpRight />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/5 text-emerald-300 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
          >
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-px w-5 bg-current transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 -z-10 h-screen w-full cursor-default bg-black/50 backdrop-blur-[2px] md:hidden"
          />
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mx-4 mt-4 rounded-xl border border-emerald-400/20 bg-[#061006]/95 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden"
          >
            <div className="mb-2 flex items-center justify-between border-b border-emerald-400/10 px-3 pb-3">
              <span className="font-mono text-[10px] tracking-widest text-gray-500">NAVIGATION_MENU</span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            </div>
            <div className="grid gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm transition-colors ${isActive ? 'bg-emerald-400/10 text-emerald-300 font-semibold' : 'text-gray-400 hover:bg-emerald-400/5 hover:text-emerald-300'
                      }`}
                  >
                    <span className="text-xs text-emerald-400">{item.num}</span>
                    {item.label}
                    {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  </a>
                )
              })}
            </div>
            <a
              href="mailto:agrawall.krishna08@gmail.com"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-emerald-400 bg-emerald-400/10 px-4 py-3 font-mono text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400 hover:text-black"
            >
              Hire Me <ArrowUpRight />
            </a>
          </nav>
        </>
      )}
    </header>
  )
}