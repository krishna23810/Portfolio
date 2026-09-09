import { useState } from 'react'
import {
  X,
  ExternalLink,
  Download,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Mail,
  Radio,
} from 'lucide-react'
import { trackEvent } from '../../utils/analytics'

function GitHubIcon({ className = 'w-4 h-4 text-slate-700' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-4 h-4 text-blue-600' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export default function ModalViewer({ activeModal, onClose }) {
  if (!activeModal) return null

  const { type, data } = activeModal

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white/95 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] text-slate-800 font-mono backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- 1. SKILL POPUP MODAL --- */}
        {type === 'skill' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
              <Sparkles className="w-4 h-4" />
              <span>SKILL BLOCK UNLOCKED (+{data.xp} XP)</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">{data.tech}</h3>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              {data.category}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">{data.desc}</p>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer transition-all"
              >
                CONTINUE QUEST
              </button>
            </div>
          </div>
        )}

        {/* --- 2. PROJECT PORTAL (GHOST CALL / LOOTLO) --- */}
        {type === 'project' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
              <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>{data.badge}</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{data.title}</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">{data.category}</p>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">{data.desc}</p>

            {/* Architecture Metrics */}
            {data.stats && (
              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center shadow-inner">
                {Object.entries(data.stats).map(([k, v]) => (
                  <div key={k} className="p-2">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">{k}</span>
                    <span className="block text-xs font-bold text-blue-600 mt-0.5">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {data.techStack?.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-700 text-[11px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-sm"
                >
                  <GitHubIcon className="w-4 h-4 text-slate-700" />
                  <span>SOURCE CODE</span>
                </a>
              )}
              {data.liveUrl && (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-lg shadow-blue-500/25"
                >
                  <span>LAUNCH APP</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* --- 3. EXPERIENCE PORTAL (TRISX SUBCIDYS) --- */}
        {type === 'experience' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>{data.badge}</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{data.title}</h3>
              <p className="text-xs text-indigo-600 mt-1 font-bold">{data.role}</p>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">{data.desc}</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600 font-sans shadow-inner">
              <div className="font-mono text-[10px] text-indigo-600 font-bold">// KEY ACHIEVEMENTS:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Engineered core modules for automated MSME GST invoice creation.</li>
                <li>Built secure REST endpoints with JWT authorization &amp; webhook processing.</li>
                <li>Integrated payment gateways and real-time transaction state caching with Redis.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer transition-all"
              >
                RETURN TO STAGE
              </button>
            </div>
          </div>
        )}

        {/* --- 4. DOWNLOAD PORTAL (TRAVEL PLANNER APK) --- */}
        {type === 'download' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
              <Download className="w-4 h-4 text-blue-600" />
              <span>ANDROID APK CRATE UNLOCKED</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{data.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{data.category}</p>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">{data.desc}</p>

            <div className="grid grid-cols-2 gap-3 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs shadow-inner">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">FILE SIZE:</span>
                <span className="block font-bold text-blue-600 mt-0.5">{data.apkSize}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">COMPATIBILITY:</span>
                <span className="block font-bold text-emerald-600 mt-0.5">Android 8.0+</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {data.githubUrl ? (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-sm"
                >
                  <GitHubIcon className="w-4 h-4 text-slate-700" />
                  <span>SOURCE CODE</span>
                </a>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  CLOSE
                </button>
              )}
              <a
                href={data.apkUrl}
                download="TravelPlanner.apk"
                onClick={() => trackEvent('apk_download_game', { app: 'TravelPlanner' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-500/25 transition-all"
              >
                <Download className="w-4 h-4 text-white" />
                <span>DOWNLOAD APK ({data.apkSize})</span>
              </a>
            </div>
          </div>
        )}

        {/* --- 5. CONTACT & HIRE PORTAL --- */}
        {type === 'contact' && <ContactFormInsideModal data={data} onClose={onClose} />}

        {/* --- 6. HELP MODAL --- */}
        {type === 'help' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>QUEST MANUAL &amp; CONTROLS</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">How to Play KA's Resume Quest</h3>

            <div className="space-y-3 text-xs text-slate-600 font-sans">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-mono text-blue-600 font-bold">DESKTOP CONTROLS:</span>
                <p className="mt-1 text-slate-600">
                  Use <b>[A] / [D]</b> or <b>Arrow Keys</b> to run, <b>[SPACE]</b> or <b>[W]</b> to jump, and <b>[E]</b> to enter portals. You can also simply <b>Scroll with your mouse wheel</b> to walk through the world!
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-mono text-blue-600 font-bold">MOBILE CONTROLS:</span>
                <p className="mt-1 text-slate-600">
                  Use the left on-screen D-Pad arrows to run, and the right [A] button to jump and [B] button to interact with stations.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="font-mono text-blue-600 font-bold">RECRUITER VIEW:</span>
                <p className="mt-1 text-slate-600">
                  Click the <b>[📄 RECRUITER VIEW]</b> button in the top-right header anytime to view a classic high-speed portfolio grid.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer transition-all"
              >
                GOT IT, LET'S PLAY!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// In-Modal Web3Forms Contact Form
function ContactFormInsideModal({ data, onClose }) {
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
      const resData = await response.json()

      if (resData.success) {
        setStatus({ submitting: false, success: true, error: false })
        setFormData({ name: '', email: '', message: '' })
        trackEvent('contact_form_success', { channel: 'game_modal' })
      } else {
        setStatus({ submitting: false, success: false, error: resData.message || 'Failed' })
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Network error. Please try again.' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
        <Send className="w-4 h-4 text-blue-600" />
        <span>TRANSMISSION SATELLITE</span>
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-900">Hire Krishnakant Agrawal</h3>
        <p className="text-xs text-slate-500 mt-0.5">Send a message directly to my personal inbox</p>
      </div>

      {/* Direct contact info chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 text-xs">
        <a
          href={`mailto:${data.email}`}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 flex items-center gap-2 transition-all shadow-sm"
        >
          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate text-[10px] font-semibold">Email</span>
        </a>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 flex items-center gap-2 transition-all shadow-sm"
        >
          <LinkedInIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate text-[10px] font-semibold">LinkedIn</span>
        </a>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 flex items-center gap-2 transition-all shadow-sm"
        >
          <GitHubIcon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
          <span className="truncate text-[10px] font-semibold">GitHub</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 pt-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name / Organization"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
        />
        <textarea
          name="message"
          required
          rows="3"
          placeholder="Opportunity details or message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none resize-none transition-all"
        />

        {status.success && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Transmission sent! I will respond promptly.</span>
          </div>
        )}

        {status.error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-400 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{status.error}</span>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            CLOSE
          </button>
          <button
            type="submit"
            disabled={status.submitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{status.submitting ? 'SENDING...' : 'TRANSMIT MESSAGE'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
