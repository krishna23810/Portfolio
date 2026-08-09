const experiences = [
  {
    role: 'Full Stack Developer Intern',
    company: 'TRISX Technologies Pvt. Ltd.',
    location: 'Bangalore / Remote',
    period: 'Jan 2026 – Present',
    description: [
      'Contributing to Subcidys — a financial operating SaaS platform designed for Indian MSMEs.',
      'Building full-stack features using MERN Stack, implementing REST APIs for billing, invoicing, and accounting workflows.',
      'Integrated payment gateways with automated webhook handlers for MSME subscription billing & invoice payments.',
      'Addressing key challenges around digital onboarding, credit access, and GST compliance.',
    ],
    tech: ['React', 'Node.js', 'Express', 'Webhooks', 'PostgreSQL'],
  },
  {
    role: 'HCL Cyber Analyst Intern',
    company: 'HCL Certification Program',
    location: 'Remote',
    period: '2026',
    description: [
      'Completed comprehensive cybersecurity internship program covering threat landscape analysis and vulnerability assessment.',
      'Studied security protocols, authentication mechanics (JWT, OAuth), network security, and risk mitigation strategies.',
    ],
    tech: ['Cybersecurity', 'Threat Analysis', 'JWT', 'Security Compliance'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[#030703]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-emerald-400 text-sm font-semibold">04.</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Work Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-emerald-500/20 space-y-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-400 bg-black group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(0,255,65,0.8)] transition-all duration-300" />

              <div className="p-6 rounded-xl bg-[#070e07] border border-emerald-500/15 hover:border-emerald-500/35 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {exp.role} <span className="text-emerald-400 font-normal">@ {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-emerald-400/90 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                    {exp.period}
                  </span>
                </div>

                <p className="font-mono text-xs text-gray-400 mb-4">{exp.location}</p>

                <ul className="space-y-2 mb-5 text-sm text-gray-300">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono text-xs mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-black border border-emerald-500/20 text-emerald-300">
                      {t}
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
