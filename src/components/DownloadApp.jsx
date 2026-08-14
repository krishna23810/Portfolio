import { useState, useEffect } from 'react'
import {
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Navigation,
  CloudSun,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  QrCode,
  Layers,
  Cpu,
  Share2,
  HardDrive
} from 'lucide-react'

function GitHubIcon({ className = 'w-4 h-4 text-emerald-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function DownloadApp({ onBack }) {
  const [downloading, setDownloading] = useState(false)
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)
  const [qrUrl, setQrUrl] = useState('')

  const apkUrl = '/TravelPlanner.apk'
  const apkSize = '55.37 MB'
  const apkVersion = 'v1.0.0'
  const releaseDate = 'August 2026'
  const minAndroid = 'Android 8.0 (Oreo) or higher'

  useEffect(() => {
    window.scrollTo(0, 0)
    // Generate absolute QR URL pointing directly to the download
    const currentOrigin = window.location.origin
    setQrUrl(`${currentOrigin}/TravelPlanner.apk`)
  }, [])

  const handleDownloadClick = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      setDownloadStarted(true)
    }, 1200)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Travel Planner APK Download',
        text: 'Download Travel Planner - Smart Destination Guide & Live Weather App for Android',
        url: window.location.href,
      }).catch(() => { })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-[#030703] text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Top Background Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-emerald-400/15 bg-black/85 backdrop-blur-xl py-3 px-6 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/5 hover:bg-emerald-400/15 text-xs font-mono text-emerald-300 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <a
              href="https://github.com/krishna23810/Travel-planner"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-emerald-400/40 text-xs font-mono text-gray-300 hover:text-emerald-300 hover:border-emerald-400 transition-all"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
        {/* Release Status Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-mono text-xs shadow-[0_0_25px_rgba(0,255,65,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-white">Official Android APK Release</span>
            <span className="text-emerald-400/60">•</span>
            <span className="text-emerald-400">{apkVersion}</span>
            <span className="hidden sm:inline text-emerald-400/60">•</span>
            <span className="hidden sm:inline text-gray-400">{releaseDate}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: App Info & Download CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              {/* App Icon */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#03300b] p-0.5 shadow-[0_0_35px_rgba(0,255,65,0.35)] flex items-center justify-center">
                <div className="w-full h-full bg-[#051407] rounded-2xl flex items-center justify-center">
                  <Navigation className="w-10 h-10 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-black border border-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 font-bold">
                  APK
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Travel Planner
                </h1>
                <p className="font-mono text-xs sm:text-sm text-emerald-400 mt-1">
                  Cross-Platform Travel Guide & Live Weather App
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              Search world-renowned destinations, check live real-time weather forecasts, explore famous monuments, and build customized day-by-day itineraries with a blazing-fast native mobile experience.
            </p>

            {/* App Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mb-8 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#081308] border border-emerald-500/20 flex flex-col">
                <span className="text-gray-500 text-[10px]">PACKAGE SIZE</span>
                <span className="text-emerald-400 font-bold text-sm mt-0.5 flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5" />
                  {apkSize}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#081308] border border-emerald-500/20 flex flex-col">
                <span className="text-gray-500 text-[10px]">VERSION</span>
                <span className="text-white font-bold text-sm mt-0.5 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  {apkVersion}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#081308] border border-emerald-500/20 flex flex-col">
                <span className="text-gray-500 text-[10px]">FRAMEWORK</span>
                <span className="text-cyan-400 font-bold text-sm mt-0.5 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  Flutter 3
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#081308] border border-emerald-500/20 flex flex-col">
                <span className="text-gray-500 text-[10px]">SECURITY</span>
                <span className="text-emerald-400 font-bold text-sm mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified
                </span>
              </div>
            </div>

            {/* Primary Download Button & Quick Action */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={apkUrl}
                download="TravelPlanner.apk"
                onClick={handleDownloadClick}
                className={`flex-1 group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono font-bold text-base transition-all duration-300 shadow-[0_0_35px_rgba(0,255,65,0.4)] ${downloading
                    ? 'bg-emerald-500 text-black'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-black hover:scale-[1.02]'
                  }`}
              >
                <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : 'group-hover:translate-y-0.5 transition-transform'}`} />
                <span>
                  {downloading ? 'Starting Download...' : `Download APK (${apkSize})`}
                </span>
              </a>

              <a
                href="https://github.com/krishna23810/Travel-planner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-emerald-400/40 hover:border-emerald-400 bg-emerald-400/5 hover:bg-emerald-400/10 text-white font-mono text-sm font-semibold transition-all hover:scale-[1.02]"
              >
                <GitHubIcon className="w-4 h-4 text-emerald-400" />
                <span>Source Code</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>

            {/* Post-Download Notice */}
            {downloadStarted && (
              <div className="w-full p-4 mb-6 rounded-xl bg-emerald-950/40 border border-emerald-400/40 text-xs font-mono text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm mb-0.5">Download has initiated!</div>
                  <p className="text-emerald-400/80">
                    If your download didn't start automatically,{' '}
                    <a href={apkUrl} download="TravelPlanner.apk" className="underline font-bold text-emerald-300 hover:text-white">
                      click here to retry direct download
                    </a>.
                  </p>
                </div>
              </div>
            )}

            {/* Compatibility & Sideloading Note */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                {minAndroid}
              </span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400/90">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Clean Release Build (No Ads / No Trackers)
              </span>
            </div>
          </div>

          {/* Right Column: Phone Mockup / Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[320px]">
              {/* Glow Behind Phone */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-[48px] blur-2xl pointer-events-none" />

              {/* Phone Outer Chassis */}
              <div className="relative rounded-[40px] border-4 border-emerald-400/30 bg-[#061207] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full flex items-center justify-center gap-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#112211] border border-emerald-400/30" />
                  <div className="w-8 h-1 rounded-full bg-[#112211]" />
                </div>

                {/* Phone Screen Display */}
                <div className="rounded-[30px] bg-gradient-to-b from-[#0a1b0a] via-[#050f06] to-[#020602] border border-emerald-500/20 overflow-hidden text-white font-sans pt-8 pb-4 px-3 flex flex-col gap-3 min-h-[520px]">

                  {/* In-App Header */}
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <div className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider">EXPLORE DESTINATIONS</div>
                      <div className="text-sm font-extrabold text-white">Travel Planner</div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-[10px] font-mono text-emerald-300">
                      KA
                    </div>
                  </div>

                  {/* Search Bar Preview */}
                  <div className="rounded-lg bg-[#0d220f] border border-emerald-500/30 px-3 py-2 flex items-center gap-2 text-xs text-gray-400">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Search landmarks, cities...</span>
                  </div>

                  {/* Weather Widget Preview Card */}
                  <div className="rounded-xl bg-gradient-to-br from-emerald-900/40 to-[#071808] border border-emerald-400/30 p-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-emerald-300">LIVE FORECAST</div>
                        <div className="text-base font-bold text-white">Paris, France</div>
                        <div className="text-2xl font-black text-emerald-400 mt-0.5">24°C</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <CloudSun className="w-9 h-9 text-amber-300 animate-pulse" />
                        <span className="text-[9px] font-mono text-emerald-300">Partly Sunny</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t border-emerald-400/20 text-[9px] font-mono text-gray-300">
                      <div>Wind: 14km/h</div>
                      <div>Humidity: 58%</div>
                      <div>UV: Low (2)</div>
                    </div>
                  </div>

                  {/* Popular Landmarks Section */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-300 mb-1.5 px-1">
                      <span>Featured Landmarks</span>
                      <span className="text-emerald-400 font-mono text-[9px]">View All</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[#0b1d0c] border border-emerald-500/20 p-2 flex flex-col">
                        <div className="h-14 rounded bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-bold mb-1.5">
                          🗼 Eiffel Tower
                        </div>
                        <span className="text-[11px] font-bold text-white">Eiffel Tower</span>
                        <span className="text-[9px] text-gray-400">4.8 ★ (12.4k reviews)</span>
                      </div>

                      <div className="rounded-lg bg-[#0b1d0c] border border-emerald-500/20 p-2 flex flex-col">
                        <div className="h-14 rounded bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-bold mb-1.5">
                          🏛️ Louvre
                        </div>
                        <span className="text-[11px] font-bold text-white">Louvre Museum</span>
                        <span className="text-[9px] text-gray-400">4.9 ★ (18.1k reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Itinerary Preview Card */}
                  <div className="rounded-xl bg-[#09180a] border border-emerald-500/20 p-2.5 mt-auto">
                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300 mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <CalendarDays className="w-3 h-3 text-emerald-400" />
                        Today's Itinerary
                      </span>
                      <span>Day 1 of 3</span>
                    </div>
                    <div className="text-[10px] text-gray-300 font-medium truncate">
                      • 10:00 AM — Morning Walk at Champ de Mars
                    </div>
                    <div className="text-[10px] text-gray-300 font-medium truncate">
                      • 02:30 PM — Seine River Cruise Tour
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Mobile Scan QR Pill */}
            <div className="mt-6 p-4 rounded-xl bg-[#081508] border border-emerald-500/20 flex items-center gap-4 max-w-[320px] w-full">
              <div className="p-2 rounded-lg bg-white shrink-0">
                {/* SVG Simulated QR Code */}
                <svg viewBox="0 0 100 100" className="w-12 h-12" fill="#000">
                  <rect width="100" height="100" fill="#ffffff" />
                  {/* Finder top left */}
                  <rect x="10" y="10" width="24" height="24" fill="#000" />
                  <rect x="14" y="14" width="16" height="16" fill="#fff" />
                  <rect x="18" y="18" width="8" height="8" fill="#000" />
                  {/* Finder top right */}
                  <rect x="66" y="10" width="24" height="24" fill="#000" />
                  <rect x="70" y="14" width="16" height="16" fill="#fff" />
                  <rect x="74" y="18" width="8" height="8" fill="#000" />
                  {/* Finder bottom left */}
                  <rect x="10" y="66" width="24" height="24" fill="#000" />
                  <rect x="14" y="70" width="16" height="16" fill="#fff" />
                  <rect x="18" y="74" width="8" height="8" fill="#000" />
                  {/* QR Data Dots */}
                  <rect x="42" y="14" width="6" height="6" />
                  <rect x="52" y="18" width="6" height="6" />
                  <rect x="42" y="30" width="6" height="6" />
                  <rect x="52" y="34" width="6" height="6" />
                  <rect x="14" y="42" width="6" height="6" />
                  <rect x="24" y="46" width="6" height="6" />
                  <rect x="42" y="46" width="16" height="16" />
                  <rect x="66" y="42" width="6" height="6" />
                  <rect x="78" y="46" width="6" height="6" />
                  <rect x="42" y="70" width="6" height="6" />
                  <rect x="52" y="78" width="6" height="6" />
                  <rect x="66" y="66" width="10" height="10" />
                  <rect x="80" y="76" width="8" height="8" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-mono font-bold text-xs text-emerald-300 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> Scan on Mobile
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                  Scan with your phone's camera to download directly onto your device.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bento Grid */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-emerald-400 text-sm font-semibold">01.</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Key Capabilities & Features</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live Weather Intelligence</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Check real-time ambient temperatures, humidity, wind velocities, and 5-day forecasts for thousands of destinations across the globe before packing your bags.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Landmark Discovery Engine</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Discover famous attractions, historical monuments, scenic spots, and local cultural landmarks with ratings, high-res photos, and distance estimates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Custom Day-by-Day Itineraries</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Build tailored vacation plans with timeline scheduling, activity notes, and flexible time slots to keep your journeys organized and stress-free.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">60 FPS Native Performance</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Built with Flutter and compiled into native ARM64 machine code, ensuring fluid touch response, instant page switches, and minimal battery consumption.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clean Cyber & Dark Aesthetic</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Designed with an eye-friendly dark color palette, emerald accents, and clear typography tailored for outdoor readability and low light environments.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-[#061107] border border-emerald-500/20 hover:border-emerald-400/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Privacy & Zero Bloatware</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                No third-party analytics trackers, no intrusive full-screen popups, and no account requirements. Your travel itineraries remain confidential on your device.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Steps Guide */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-emerald-400 text-sm font-semibold">02.</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">How to Install APK on Android</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-[#081409] border border-emerald-500/20 flex flex-col relative overflow-hidden">
              <span className="font-mono text-3xl font-black text-emerald-500/20 mb-2">01</span>
              <h4 className="font-bold text-white text-base mb-1.5">Download the APK</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Tap the <strong>Download APK</strong> button above or scan the QR code using your Android smartphone.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-[#081409] border border-emerald-500/20 flex flex-col relative overflow-hidden">
              <span className="font-mono text-3xl font-black text-emerald-500/20 mb-2">02</span>
              <h4 className="font-bold text-white text-base mb-1.5">Open Downloaded File</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Tap the completed download alert in your notification shade or navigate to your <strong>Downloads</strong> folder.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-[#081409] border border-emerald-500/20 flex flex-col relative overflow-hidden">
              <span className="font-mono text-3xl font-black text-emerald-500/20 mb-2">03</span>
              <h4 className="font-bold text-white text-base mb-1.5">Allow Unknown Sources</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                If prompted by Android security, tap <em>Settings</em> and enable <em>"Allow from this source"</em> for your browser or file manager.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-[#081409] border border-emerald-500/20 flex flex-col relative overflow-hidden">
              <span className="font-mono text-3xl font-black text-emerald-500/20 mb-2">04</span>
              <h4 className="font-bold text-white text-base mb-1.5">Complete Install & Launch</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Press <strong>Install</strong> when the package installer appears, then tap <strong>Open</strong> to start exploring!
              </p>
            </div>
          </div>

          {/* Sideloading FAQ Alert */}
          <div className="mt-6 p-5 rounded-xl bg-[#081609] border border-emerald-500/30 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed font-mono">
              <span className="font-bold text-white">Why does Android show "File might be harmful"?</span>{' '}
              Android displays this standard informational prompt for all applications installed directly via APK outside the Google Play Store. Travel Planner is a safe, self-contained Flutter release build authored by Krishnakant Agrawal.
            </div>
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="rounded-3xl border border-emerald-400/40 bg-gradient-to-r from-[#061808] via-[#0b240e] to-[#041205] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(0,255,65,0.15)]">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 mb-6 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
              <Download className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to start planning your next journey?
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Download the release APK now and experience fast destination discovery and real-time live weather tracking in the palm of your hand.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={apkUrl}
                download="TravelPlanner.apk"
                onClick={handleDownloadClick}
                className="px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-sm sm:text-base rounded-xl transition-all shadow-[0_0_30px_rgba(0,255,65,0.4)] flex items-center gap-2.5 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download Travel Planner APK ({apkSize})</span>
              </a>

              <button
                type="button"
                onClick={onBack}
                className="px-6 py-4 border border-emerald-400/40 hover:border-emerald-400 text-white font-mono text-sm rounded-xl transition-all hover:bg-emerald-400/10"
              >
                ← Return to Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/10 py-8 px-6 text-center text-xs font-mono text-gray-500">
        <p>Travel Planner App © 2026 Krishnakant Agrawal. Built with Flutter & Dart.</p>
      </footer>
    </div>
  )
}
