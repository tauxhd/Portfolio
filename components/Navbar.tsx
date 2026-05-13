'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Design', href: '#design' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`} style={scrolled ? { background: 'rgba(10,10,10,0.9)' } : {}}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-medium tracking-wider" style={{ color: '#D4A017' }}>
          tauedea.dev
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)', color: '#0A0A0A' }}
          >
            Hire me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-white/5 px-6 py-6 flex flex-col gap-4"
          style={{ background: 'rgba(26,26,26,0.95)', backdropFilter: 'blur(12px)' }}
        >
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-4 py-2 rounded-lg text-center"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)', color: '#0A0A0A' }}
          >
            Hire me
          </a>
        </div>
      )}
    </nav>
  )
}
