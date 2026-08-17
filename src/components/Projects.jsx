import { BarChart3, Gamepad2, Navigation, BookOpen, Calendar, Mic, Video, PhoneOff, Sparkles, Download } from 'lucide-react'
import { trackEvent } from '../utils/analytics'

const projectsList = [
  {
    title: 'Subcidys',
    subtitle: 'MSME Financial SaaS Platform',
    desc: 'Financial Operating System for Indian MSMEs featuring GST billing, automated payment gateway integration, invoice management, and credit access workflows.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    badge: 'Internship Project',
    badgeType: 'live',
    link: 'https://subcidys.com',
    github: '#',
    icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Lootlo',
    subtitle: 'Gaming & Monetization Platform',
    desc: 'Full-stack entertainment platform featuring real-time multiplayer WebRTC video rooms, Socket.io gaming, and in-app coin wallets for room passes.',
    tags: ['React', 'Node.js', 'WebRTC', 'Socket.io', 'PostgreSQL'],
    badge: 'Full Stack App',
    badgeType: 'live',
    link: '#',
    github: 'https://github.com/krishna23810/lootlo-app',
    icon: <Gamepad2 className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Travel Planner',
    subtitle: 'Cross-Platform Destination & Weather App',
    desc: 'Cross-platform Flutter mobile application enabling users to search destinations, explore famous landmarks, view real-time live weather forecasts, and build customized trip itineraries.',
    tags: ['Flutter', 'Dart', 'Weather API', 'REST APIs', 'Android/iOS'],
    badge: 'Flutter Mobile App',
    badgeType: 'live',
    link: '/download',
    downloadUrl: '/TravelPlanner.apk',
    isDownloadable: true,
    github: 'https://github.com/krishna23810/Travel-planner',
    icon: <Navigation className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'KK Tech Solution',
    subtitle: 'Educational Video Portal',
    desc: 'Course management platform designed for instructors to upload recorded lecture videos, organize course modules, and manage student learning materials.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Video Management'],
    badge: 'Web App',
    badgeType: 'live',
    link: 'https://kktechsolution.vercel.app',
    github: 'https://github.com/krishna23810/KK-Tech_Solution',
    icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
  },
  {
    title: 'Timetable Maker',
    subtitle: 'Automated Scheduling & Real-Time Monitoring',
    desc: 'Full-stack scheduling application for colleges and schools to generate hassle-free automated timetables with conflict resolution, real-time class tracking, and schedule monitoring.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Real-Time Tracking'],
    badge: 'Full Stack App',
    badgeType: 'live',
    link: '#',
    github: 'https://github.com/krishna23810/time-table-maker_final',
    icon: <Calendar className="w-6 h-6 text-emerald-400" />,
  },
]

function GhostIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 19.5V10.2a6 6 0 0 1 12 0v9.3l-2.2-1.4-2.1 1.4-2.1-1.4-2.1 1.4-2.1-1.4-1.4.9Z"
        fill="currentColor"
      />
      <circle cx="9.4" cy="11.2" r="0.9" fill="white" />
      <circle cx="14.6" cy="11.2" r="0.9" fill="white" />
      <path
        d="M10 14.2c.8.7 1.6.7 2.4 0 .8.7 1.6.7 2.4 0"
        stroke="white"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Projects({ onNavigateToDownload }) {
  return (
    <section id="projects" className="py-24 relative bg-[#040904]/90 border-t border-emerald-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">03.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Featured Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        {/* Featured Hero Card: Ghost Call */}
        <div className="relative rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-[#081508] via-[#091b09] to-[#040c04] p-8 md:p-10 mb-12 overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.12)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-mono text-xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Featured Live Application</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Ghost Call <span className="text-emerald-400 font-mono text-xl font-normal">— Anonymous Video Calling</span>
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                A high-performance real-time video calling platform engineered with WebRTC and LiveKit. Allows users to establish instant, peer-to-peer audio and video communication channels with zero sign-up friction.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
                {['WebRTC', 'LiveKit', 'React', 'Node.js', 'Socket.io', 'Tailwind CSS'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/ghostcall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-400 text-black font-mono font-bold text-sm rounded-lg hover:bg-emerald-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center gap-2"
                >
                  <span>▶ Launch Ghost Call App</span>
                </a>
                <a
                  href="https://github.com/krishna23810/Ghost-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-emerald-500/40 text-gray-200 font-mono text-sm rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition-all"
                >
                  GitHub Repository &rarr;
                </a>
              </div>
            </div>

            {/* Right Graphic / Live UI Mockup (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-emerald-500/30 bg-[#0a140a] p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-500/20 font-mono text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="ml-2 text-emerald-400 font-bold">Ghost Call</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">LIVE ROOM</span>
                </div>

                <div className="bg-[#050c05] rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-center border border-emerald-500/10">
                  <div className="relative flex items-center justify-center">
                    <div className="bg-indigo-700 rounded-2xl p-1">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/40 text-white ring-1 ring-white/100">
                        <GhostIcon className="h-10 w-10 text-gray-700" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
                  </div>

                  <div className="font-mono text-xs text-emerald-300 font-medium">
                    Connected
                  </div>

                  {/* Equalizer Bar */}
                  <div className="flex items-end gap-1.5 h-8">
                    {[1, 2, 3, 4, 5, 6].map((bar) => (
                      <span
                        key={bar}
                        className="w-1.5 bg-emerald-400 rounded-sm animate-equalizer"
                        style={{ animationDelay: `${bar * 0.15}s` }}
                      />
                    ))}
                  </div>

                  {/* Lucide Room Control Buttons */}
                  <div className="flex items-center gap-2 pt-2 font-mono">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5 border border-emerald-500/30">
                      <Mic className="w-3.5 h-3.5" /> Mute
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5 border border-emerald-500/30">
                      <Video className="w-3.5 h-3.5" /> Video
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center gap-1.5 border border-red-500/30">
                      <PhoneOff className="w-3.5 h-3.5" /> Leave
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid (Other Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project) => (
            <div
              key={project.title}
              className={`p-6 rounded-xl bg-[#070e07] border transition-all duration-300 flex flex-col justify-between ${
                project.isDownloadable
                  ? 'border-emerald-400/40 shadow-[0_0_30px_rgba(0,255,65,0.06)] hover:border-emerald-400'
                  : 'border-emerald-500/15 hover:border-emerald-500/35 hover:shadow-[0_0_25px_rgba(0,255,65,0.08)]'
              } hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {project.icon}
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                    {project.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">{project.title}</h4>
                <p className="font-mono text-xs text-emerald-400 mb-3">{project.subtitle}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{project.desc}</p>
              </div>

              <div>
                {/* For Downloadable Mobile Apps: Highlight Download & Page CTAs */}
                {project.isDownloadable ? (
                  <>
                    <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px]">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-black border border-emerald-500/15 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 pt-3 border-t border-emerald-500/10 font-mono">
                      <div className="flex items-center justify-between">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('project_github_click', { project_title: project.title })}
                          className="text-xs text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                        >
                          <span>&lt;/&gt; GitHub</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            trackEvent('view_app_page_click', { project_title: project.title })
                            if (onNavigateToDownload) {
                              onNavigateToDownload()
                            } else {
                              window.location.href = '/download'
                            }
                          }}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          <span>View App Page &rarr;</span>
                        </button>
                      </div>

                      <a
                        href={project.downloadUrl}
                        download="TravelPlanner.apk"
                        onClick={() => trackEvent('project_apk_download_click', { project_title: project.title })}
                        className="w-full py-2.5 px-3 rounded-lg bg-emerald-400/15 hover:bg-emerald-400 text-emerald-300 hover:text-black border border-emerald-400/40 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,65,0.15)]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download APK (~55.4 MB)</span>
                      </a>
                    </div>
                  </>
                ) : project.badge === 'Internship Project' ? (
                  <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_live_demo_click', { project_title: project.title, link: project.link })}
                      className="font-mono text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                    >
                      <span>🌐 Visit Live Platform &rarr;</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px]">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-black border border-emerald-500/15 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('project_github_click', { project_title: project.title })}
                        className="font-mono text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <span>&lt;/&gt; GitHub</span>
                      </a>

                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('project_live_demo_click', { project_title: project.title, link: project.link })}
                          className="font-mono text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                        >
                          <span>Live Demo &rarr;</span>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
