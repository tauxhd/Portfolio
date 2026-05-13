'use client'

import { useEffect, useRef } from 'react'
import { GitFork, Link, PenTool, Mail, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'GitHub', handle: '@tauxhd', href: 'https://github.com/tauxhd', icon: GitFork, color: '#ffffff' },
  { label: 'LinkedIn', handle: 'Tauedea Gabi', href: 'https://www.linkedin.com/in/tauxhd', icon: Link, color: '#0A66C2' },
  { label: 'Figma', handle: '@tauxhd', href: 'https://www.figma.com/@tauxhd', icon: PenTool, color: '#F24E1E' },
  { label: 'Email', handle: 'gabitautau@gmail.com', href: 'mailto:hello@tauedea.dev', icon: Mail, color: '#D4A017' },
]

export default function Contact() {
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
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto" ref={ref}>
      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
        <p className="font-mono text-sm mb-3" style={{ color: '#D4A017' }}>04. contact</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s work together</h2>
        <p className="text-white/40 max-w-md mx-auto leading-relaxed">
          I&apos;m always open to new opportunities, collaborations, or just a good conversation about design and code.
        </p>
      </div>

      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-16 overflow-hidden">
        <a href="mailto:hello@tauedea.dev" className="group block text-center">
          <p className="text-3xl md:text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-300 break-all">
            hello@tauedea.dev
          </p>
        </a>
      </div>

      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map(({ label, handle, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl transition-all duration-300 p-5"
              style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#1A1A1A' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <ArrowUpRight size={16} className="text-white/10 group-hover:text-white/40 transition-colors" />
              </div>
              <p className="text-white font-medium text-sm mb-1">{label}</p>
              <p className="text-white/30 text-xs">{handle}</p>
            </a>
          ))}
        </div>
      </div>

      <div
        className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="font-mono text-sm" style={{ color: '#D4A017' }}>tauedea.dev</p>
        <p className="text-white/20 text-xs">Built with Next.js, Tailwind CSS &amp; Neon DB</p>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Tauedea Arehui Gabi</p>
      </div>
    </section>
  )
}
