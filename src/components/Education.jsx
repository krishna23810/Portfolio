import { ShieldCheck, Cloud, Lightbulb, Trophy, Zap, Award } from 'lucide-react'

const certifications = [
  { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: 'HCL Cybersecurity / Cyber Analyst', year: '2026', org: 'HCL Internship Program' },
  { icon: <Cloud className="w-5 h-5 text-emerald-400" />, title: 'Cloud Computing Fundamentals', year: '2025', org: 'IBM SkillsBuild' },
  { icon: <Lightbulb className="w-5 h-5 text-emerald-400" />, title: 'Innovators Techxhibit 2025', year: '2025', org: 'Medi-Caps University' },
  { icon: <Trophy className="w-5 h-5 text-emerald-400" />, title: 'VERTEX 25 Technical Competition', year: '2025', org: 'JUET University Guna' },
  { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: 'DSA Certification (Love Babbar)', year: '2024', org: 'CodeHelp' },
  { icon: <Award className="w-5 h-5 text-emerald-400" />, title: 'Community Engagement Award', year: '2024', org: 'Medi-Caps University' },
]

export default function Education() {
  return (
    <section id="education" className="py-24 relative bg-[#040904]/90 border-t border-emerald-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">05.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Education &amp; Certifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        {/* Formal Education Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* MCA Degree Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#081508] via-[#091b09] to-[#040c04] border border-emerald-400/40 shadow-[0_0_35px_rgba(0,255,65,0.1)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded">
                POST GRADUATION
              </span>
              <span className="font-mono text-xs text-gray-400">2024 – 2026</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Master of Computer Applications (MCA)</h3>
            <p className="font-mono text-xs text-emerald-400 mb-4">Medi-Caps University, Indore, Madhya Pradesh</p>

            <div className="flex items-baseline gap-2 pt-2 border-t border-emerald-500/15">
              <span className="text-3xl font-black text-emerald-400 font-mono">8.18</span>
              <span className="text-xs text-gray-400 font-mono">/ 10 Cumulative GPA</span>
            </div>
          </div>

          {/* B.Com Degree Card */}
          <div className="p-8 rounded-2xl bg-[#070e07] border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-gray-400 bg-black border border-emerald-500/15 px-3 py-1 rounded">
                UNDER GRADUATION
              </span>
              <span className="font-mono text-xs text-gray-400">2021 – 2024</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Bachelor of Commerce (B.Com)</h3>
            <p className="font-mono text-xs text-gray-400 mb-4">Govt. College Multai, Madhya Pradesh</p>

            <div className="flex items-baseline gap-2 pt-2 border-t border-emerald-500/15">
              <span className="text-3xl font-black text-emerald-400 font-mono">6.58</span>
              <span className="text-xs text-gray-400 font-mono">/ 10 GPA</span>
            </div>
          </div>
        </div>

        {/* Certifications Sub-heading */}
        <h3 className="font-mono text-xs font-semibold text-emerald-400 mb-6">// Certifications &amp; Achievements</h3>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="p-5 rounded-xl bg-[#070e07] border border-emerald-500/15 hover:border-emerald-500/35 hover:shadow-[0_0_20px_rgba(0,255,65,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                {cert.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white mb-1 truncate">{cert.title}</h4>
                <p className="font-mono text-xs text-gray-400 mb-1">{cert.org}</p>
                <span className="font-mono text-[10px] text-emerald-400">{cert.year}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
