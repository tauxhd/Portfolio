'use client'

import { useEffect, useRef } from 'react'
import { PenTool, ExternalLink } from 'lucide-react'

const designs = [
  {
    title: 'PennyPilot UI',
    description: 'Full fintech app UI — dark theme design system across 5 pages including dashboard, expenses, budgets, AI insights and profile.',
    link: 'https://shorturl.at/5yK4m',
    tags: ['Fintech', 'Dark theme', 'Design system'],
  },
]

export default function Design() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = ref.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="design"
      className="px-6 md:px-12 lg:px-24 py-24"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)' }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-16">
          <p className="font-mono text-sm mb-3" style={{ color: '#D4A017' }}>03. design work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Design before code</h2>
          <p className="text-white/40 max-w-xl leading-relaxed">
            Every project starts in Figma. I design the full interface and establish a design system before writing a single line of code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <a href="https://www.figma.com/@tauxhd" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="rounded-2xl transition-all duration-300 p-6" style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#1A1A1A' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(242,78,30,0.13), rgba(162,89,255,0.13))' }}
                  >
                    <PenTool size={24} style={{ color: '#F24E1E' }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Figma Community</p>
                    <p className="text-white/40 text-sm">@tauxhd</p>
                  </div>
                  <ExternalLink size={16} className="ml-auto text-white/20 group-hover:text-white transition-colors" />
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Browse my published Figma files — UI kits, design systems, and full app designs available to the community.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#D4A017' }}>
                  View Figma profile
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          </div>

          <div className="space-y-4">
            {designs.map((design, i) => (
              <div
                key={design.title}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <a href={design.link} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="rounded-2xl transition-all duration-300 p-5" style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#1A1A1A' }}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-medium group-hover:text-white/80 transition-colors">{design.title}</h3>
                      <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5" />
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{design.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md text-white/40" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
