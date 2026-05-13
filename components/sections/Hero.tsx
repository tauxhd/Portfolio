'use client'

import { useEffect, useState } from 'react'
import { GitFork, Link, PenTool, Mail, ArrowDown } from 'lucide-react'

const roles = [
  'Frontend Engineer',
  'UI/UX Designer',
  'Next.js Developer',
  'React Developer',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
  }, [displayed, deleting, roleIndex])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.04) 0%, transparent 70%)' }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-8"
          style={{ border: '1px solid rgba(212,160,23,0.3)', background: 'rgba(212,160,23,0.05)', color: '#D4A017' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#D4A017' }} />
          Available for opportunities
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="text-white">Tauedea </span>
          <span style={{ background: 'linear-gradient(135deg, #D4A017 0%, #F0C040 50%, #D4A017 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gabi
          </span>
        </h1>

        <div className="h-12 flex items-center justify-center mb-6">
          <span className="text-2xl md:text-3xl text-white/70 font-light">
            {displayed}
            <span className="animate-pulse" style={{ color: '#D4A017' }}>|</span>
          </span>
        </div>

        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Second year student at Asia Pacific University, crafting beautiful,
          intuitive web experiences from Kuala Lumpur 🇲🇾
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)', color: '#0A0A0A' }}
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300"
            style={{ border: '1px solid rgba(212,160,23,0.4)', color: '#D4A017' }}
          >
            Get in touch
          </a>
        </div>

        <div className="flex items-center justify-center gap-5">
          {[
            { icon: GitFork, href: 'https://github.com/tauxhd', label: 'GitHub' },
            { icon: Link, href: 'https://www.linkedin.com/in/tauxhd', label: 'LinkedIn' },
            { icon: PenTool, href: 'https://www.figma.com/@tauxhd', label: 'Figma' },
            { icon: Mail, href: 'mailto:hello@tauedea.dev', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs font-mono">scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  )
}
