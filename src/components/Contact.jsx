import { useState } from 'react'
import { Mail, Phone, Send, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

function InstagramIcon({ className = 'w-5 h-5 text-emerald-400' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-5 h-5 text-emerald-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function GitHubIcon({ className = 'w-5 h-5 text-emerald-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, success: false, error: false })

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus({ submitting: true, success: false, error: false })

    try {
      const bodyData = new FormData(event.target)
      bodyData.append("access_key", "37d1497a-309f-46fd-9c50-498588a90952")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: bodyData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus({ submitting: false, success: true, error: false })
        setFormData({ name: '', email: '', message: '' })

        setTimeout(() => {
          setStatus({ submitting: false, success: false, error: false })
        }, 6000)
      } else {
        setStatus({ submitting: false, success: false, error: data.message || "Failed to send message" })
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: "Network error. Please try again." })
    }
  }

  const contactLinks = [
    {
      label: 'EMAIL',
      value: 'agrawall.krishna08@gmail.com',
      href: 'mailto:agrawall.krishna08@gmail.com',
      icon: <Mail className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'PHONE',
      value: '+91-9669070394',
      href: 'tel:+919669070394',
      icon: <Phone className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'LINKEDIN',
      value: 'krishnakant-agrawal811a4b289',
      href: 'https://linkedin.com/in/krishnakant-agrawal811a4b289',
      icon: <LinkedInIcon />,
    },
    {
      label: 'GITHUB',
      value: 'github.com/krishna23810',
      href: 'https://github.com/krishna23810',
      icon: <GitHubIcon />,
    },
    {
      label: 'INSTAGRAM',
      value: 'krishna_._23',
      href: 'https://instagram.com/krishna_._23',
      icon: <InstagramIcon />,
    },
  ]

  return (
    <section id="contact" className="py-24 relative bg-[#030703]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">06.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Get In Touch</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-3">Let's Build Something Amazing</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Whether you have an opportunity, a project idea, or just want to connect — feel free to send a message. I am actively seeking full-time software engineering roles &amp; developer opportunities!
              </p>
            </div>

            {/* Clickable Direct Contact Info Cards */}
            <div className="space-y-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#070e07] border border-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(0,255,65,0.08)] transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="block font-mono text-[9px] text-emerald-400 tracking-wider font-semibold mb-0.5">
                      {item.label}
                    </span>
                    <span className="block text-xs font-mono text-gray-200 truncate group-hover:text-emerald-300 transition-colors">
                      {item.value}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Web3Forms Contact Form (7 cols) */}
          <div className="lg:col-span-7 md:py-12">
            <div className="p-8 rounded-2xl bg-[#070e07]/90 border border-emerald-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,65,0.05)]">
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-emerald-400 mb-2 font-semibold">
                    // YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-emerald-500/20 text-gray-100 font-mono text-xs focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(0,255,65,0.2)] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-emerald-400 mb-2 font-semibold">
                    // YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-emerald-500/20 text-gray-100 font-mono text-xs focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(0,255,65,0.2)] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-emerald-400 mb-2 font-semibold">
                    // MESSAGE
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Hi Krishnakant, I'd like to talk about..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-emerald-500/20 text-gray-100 font-mono text-xs focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(0,255,65,0.2)] focus:outline-none transition-all placeholder:text-gray-600 resize-none"
                  />
                </div>

                {status.success && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 font-mono text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {status.error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/40 text-red-300 font-mono text-xs text-center flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>{status.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 text-black font-mono font-bold text-sm hover:from-emerald-400 hover:to-green-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,65,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{status.submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
