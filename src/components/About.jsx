import { Zap, Rocket } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-[#040904]/80 border-t border-emerald-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">01.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio Story & Stats Grid (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a passionate <strong className="text-white font-semibold">Full Stack Developer</strong> with an{' '}
              <strong className="text-white font-semibold">MCA from Medi-Caps University, Indore</strong>, specializing in architecting scalable web applications, event-driven systems, and cross-platform mobile apps.
            </p>

            <p>
              As a <strong className="text-emerald-400 font-medium">Full Stack Developer Intern at TRISX Technologies</strong>, I drive key full-stack features for <strong className="text-white font-semibold">Subcidys</strong> — a financial operating SaaS empowering Indian MSMEs. My engineering work focuses on designing RESTful APIs, event-driven billing &amp; notification workflows, GST-compliant invoice pipelines, and secure JWT authentication systems.
            </p>

            <p>
              I specialize in <strong className="text-emerald-400 font-medium">event-driven architectures</strong> and real-time communication systems using{' '}
              <strong className="text-white font-semibold">WebRTC &amp; Socket.io</strong> — demonstrated in my projects like{' '}
              <a
                href="https://kktechsolution.app/ghostcall"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-500/40 hover:text-emerald-400"
              >
                Ghost Call
              </a>{' '}
              (an anonymous P2P video calling app live) and{' '}
              <strong className="text-white font-semibold">Lootlo</strong> (a real-time event-streamed gaming platform). I am also proficient in <strong className="text-emerald-400 font-medium">Flutter</strong>.
            </p>

            {/* Stats Grid Below Description */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-emerald-500/10">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center">
                <span className="block text-2xl font-extrabold text-emerald-400 font-mono">1+</span>
                <span className="text-[11px] font-mono text-gray-400">Years Exp</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center">
                <span className="block text-2xl font-extrabold text-emerald-400 font-mono">8+</span>
                <span className="text-[11px] font-mono text-gray-400">Projects</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center">
                <span className="block text-2xl font-extrabold text-emerald-400 font-mono">8.18</span>
                <span className="text-[11px] font-mono text-gray-400">MCA GPA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Current Learning & Future Goals Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-emerald-400/30 bg-[#070e07] p-6 shadow-[0_0_25px_rgba(0,255,65,0.06)] space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/15 pb-3">
                <h3 className="font-mono text-xs font-semibold text-emerald-400">
                  // Current Learning &amp; Future Goals
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Current Learning */}
              <div>
                <span className="block font-mono text-[11px] font-bold text-gray-200 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" /> Currently Mastering
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-gray-400 pl-4 list-disc marker:text-emerald-400">
                  <li>Blockchain &amp; Web3 Tech (Solidity, Smart Contracts, Ethers.js)</li>
                  <li>Microservices &amp; Event-Driven Systems (Kafka / RabbitMQ)</li>
                  <li>Docker &amp; Container Orchestration for CI/CD</li>
                  <li>Advanced Web Security &amp; Penetration Testing</li>
                </ul>
              </div>

              {/* Future Goals */}
              <div className="pt-2 border-t border-emerald-500/10">
                <span className="block font-mono text-[11px] font-bold text-gray-200 mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-emerald-400" /> Future Roadmap
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-gray-400 pl-4 list-disc marker:text-emerald-400">
                  <li>AWS &amp; Azure Cloud Architecture (DevOps Certification)</li>
                  <li>AI Agent Integration into Financial SaaS Platforms</li>
                  <li>Production Mobile App Publishing on App Store &amp; Play Store</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
