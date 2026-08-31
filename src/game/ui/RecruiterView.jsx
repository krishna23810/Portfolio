import { useState } from 'react'
import {
  Gamepad2,
  ExternalLink,
  Download,
  Mail,
  Phone,
  Sparkles,
  Zap,
  GraduationCap,
  Briefcase,
  Layers,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { trackEvent } from '../../utils/analytics'

function GitHubIcon({ className = 'w-4 h-4 text-indigo-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-4 h-4 text-cyan-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export default function RecruiterView({ onSwitchToGame }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, success: false, error: false })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, success: false, error: false })

    try {
      const bodyData = new FormData(e.target)
      bodyData.append('access_key', '37d1497a-309f-46fd-9c50-498588a90952')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: bodyData,
      })
      const data = await response.json()

      if (data.success) {
        setStatus({ submitting: false, success: true, error: false })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ submitting: false, success: false, error: data.message || 'Failed' })
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Network error. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-[#050713] text-slate-100 font-sans p-6 sm:p-10 max-w-6xl mx-auto space-y-16 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header Bar with Switch to Game Mode */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold mb-2">
            <span>FULL STACK DEVELOPER &amp; REAL-TIME ARCHITECT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Krishnakant Agrawal
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            MCA Candidate at Medi-Caps University (8.18 GPA). Full Stack Developer Intern at TRISX Technologies specializing in WebRTC, event-driven SaaS systems, and cross-platform apps.
          </p>
        </div>

        <button
          onClick={onSwitchToGame}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-mono font-black text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all cursor-pointer shrink-0"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>PLAY INTERACTIVE GAME</span>
        </button>
      </header>

      {/* --- QUICK CONTACT BAR --- */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <a
          href="mailto:agrawall.krishna08@gmail.com"
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 flex items-center gap-3 transition-all"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
          <span className="truncate">Email Me</span>
        </a>
        <a
          href="tel:+919669070394"
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 flex items-center gap-3 transition-all"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>+91-9669070394</span>
        </a>
        <a
          href="https://linkedin.com/in/krishnakant-agrawal-811a4b289/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 flex items-center gap-3 transition-all"
        >
          <LinkedInIcon className="w-4 h-4 text-cyan-400" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/krishna23810"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 flex items-center gap-3 transition-all"
        >
          <GitHubIcon className="w-4 h-4 text-indigo-400" />
          <span>GitHub</span>
        </a>
      </section>

      {/* --- CORE SKILLS MATRIX --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 font-mono text-sm text-cyan-400 font-bold">
          <Layers className="w-4 h-4" />
          <h2>TECHNICAL PROFICIENCIES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="font-mono text-xs text-cyan-400 font-bold">FRONTEND</span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              React.js, Next.js, JavaScript (ES6+), HTML5 Canvas, Tailwind CSS v4, Responsive Architecture
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="font-mono text-xs text-emerald-400 font-bold">BACKEND &amp; REAL-TIME</span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Node.js, Express.js, WebRTC (P2P Audio/Video), Socket.io, REST APIs, Microservices
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="font-mono text-xs text-indigo-400 font-bold">DATABASES &amp; CLOUD</span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              PostgreSQL, MongoDB, Redis, Docker, Linux VPS, Nginx, Git, CI/CD
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="font-mono text-xs text-pink-400 font-bold">MOBILE &amp; LANGUAGES</span>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Flutter, Dart (Android APKs), Python, C++, DSA (Data Structures &amp; Algorithms)
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 font-mono text-sm text-cyan-400 font-bold">
          <Zap className="w-4 h-4" />
          <h2>FEATURED ENGINEERING PROJECTS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ghost Call */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                FLAGSHIP PROTOCOL
              </span>
              <a
                href="https://ghost-call-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 flex items-center gap-1 hover:underline"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <h3 className="text-xl font-black text-white">Ghost Call &mdash; WebRTC P2P Video Call</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero-server media relay video calling app built with pure WebRTC, Socket.io signaling, sub-40ms latency, and end-to-end encrypted mesh channels.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">WebRTC</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Socket.io</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Node.js</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">STUN/TURN</span>
            </div>
          </div>

          {/* Travel Planner */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-950/60 border border-sky-500/30 px-2.5 py-1 rounded-md">
                MOBILE APPLICATION
              </span>
              <a
                href="/TravelPlanner.apk"
                download="TravelPlanner.apk"
                className="text-xs font-mono text-sky-400 flex items-center gap-1 hover:underline"
              >
                <span>Download APK (55.4MB)</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
            <h3 className="text-xl font-black text-white">Travel Planner &mdash; Android App</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Smart destination guidance, offline itinerary synchronization, and real-time weather forecasting built with Flutter, Dart, and SQLite.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Flutter</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Dart</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">SQLite</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">OpenWeather</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE & EDUCATION --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Experience */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-sm text-cyan-400 font-bold">
            <Briefcase className="w-4 h-4" />
            <h2>EXPERIENCE</h2>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-400">TRISX TECHNOLOGIES</span>
              <span className="font-mono text-[10px] text-slate-400">Recent / Ongoing</span>
            </div>
            <h4 className="text-base font-bold text-white">Full Stack Developer Intern &mdash; Subcidys SaaS</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Contributed to Subcidys, an MSME financial platform providing automated GST invoicing, merchant subsidies, and payment webhook integrations.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-sm text-cyan-400 font-bold">
            <GraduationCap className="w-4 h-4" />
            <h2>EDUCATION &amp; HONORS</h2>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400">8.18 GPA</span>
              <span className="font-mono text-[10px] text-slate-400">2024 &ndash; 2026</span>
            </div>
            <h4 className="text-base font-bold text-white">Master of Computer Applications (MCA)</h4>
            <p className="text-xs text-slate-400">Medi-Caps University, Indore</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap gap-2">
              <span className="text-cyan-300">Certifications:</span>
              <span>HCL Cybersecurity Analyst (2026)</span>
              <span>•</span>
              <span>IBM Cloud Computing (2025)</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h3 className="text-xl font-bold text-white">Get in Touch</h3>
        <p className="text-xs text-slate-400">
          Interested in discussing a software engineering role or project? Send a transmission below:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name / Organization"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
          />
          <textarea
            name="message"
            required
            rows="4"
            placeholder="Your message or job opportunity..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none resize-none"
          />

          {status.success && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Message sent successfully!</span>
            </div>
          )}

          {status.error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400 text-rose-300 font-mono text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{status.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status.submitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-mono font-black text-xs shadow-lg cursor-pointer"
          >
            {status.submitting ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      </section>
    </div>
  )
}
