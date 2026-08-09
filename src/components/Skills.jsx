import { Layout, Globe, Smartphone, Database } from 'lucide-react'

const skillCategories = [
  {
    category: '// FRONTEND',
    icon: <Layout className="w-5 h-5 text-emerald-400" />,
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Redux Toolkit',
      'HTML5 / CSS3',
    ],
  },
  {
    category: '// BACKEND & REAL-TIME',
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    skills: [
      'Node.js',
      'Express.js',
      'Authentication & Authorization (JWT)',
      'RESTful APIs',
      'Payment Gateways',
      'Event-Driven Systems',
      'Socket.io',
      'WebRTC',
    ],
  },
  {
    category: '// MOBILE & WEB3',
    icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
    skills: [
      'Flutter',
      'Dart',
      'Solidity',
      'Web3.js',
      'C++',
      'DSA',
    ],
  },
  {
    category: '// DATABASE & DEVOPS',
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    skills: [
      'MongoDB',
      'PostgreSQL',
      'Prisma ORM',
      'Redis',
      'Cloud Services (Azure, Cloudflare)',
      'Docker',
      'Git',
      'Nginx',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-[#030703]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">02.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Technical Stack</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl bg-[#061006]/90 border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.12)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-emerald-500/15">
                  <span className="font-mono text-emerald-400 text-xs font-bold tracking-wider">
                    {cat.category}
                  </span>
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">{cat.icon}</span>
                </div>

                {/* Skill Pill Badges */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white hover:shadow-[0_0_12px_rgba(0,255,65,0.2)] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
