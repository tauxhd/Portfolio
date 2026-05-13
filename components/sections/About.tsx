'use client'

import { useEffect, useRef } from 'react'

const stack = [
  { name: 'Next.js', color: '#ffffff' },
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind CSS', color: '#38BDF8' },
  { name: 'Node.js', color: '#6DA55F' },
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#1572B6' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'Git', color: '#F05032' },
]

export default function About() {
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
    <section id="about" className="px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto" ref={ref}>
      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
        <p className="text-gold font-mono text-sm mb-3">01. about me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Who I am
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Bio */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Hey! I'm <span className="text-gold font-medium">Tauedea Arehui Gabi</span>, a second year
              student at Asia Pacific University of Innovation and Technology in Kuala Lumpur, Malaysia.
            </p>
            <p>
              I specialise in <span className="text-white">frontend engineering</span> and{' '}
              <span className="text-white">UI/UX design</span> — I love the intersection where
              great design meets clean, performant code.
            </p>
            <p>
              My process always starts in Figma. I design the full interface before writing
              a single line of code, which means what gets built is intentional, consistent,
              and polished.
            </p>
            <p>
              When I'm not coding, I'm contributing designs to the Figma community and
              exploring new tools to sharpen my craft.
            </p>
          </div>

          {/* University badge */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/20 bg-gold/5">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
              APU
            </div>
            <div>
              <p className="text-white text-sm font-medium">Asia Pacific University</p>
              <p className="text-white/40 text-xs">BSc Software Engineering · 2nd Year</p>
            </div>
          </div>
        </div>

        {/* Right: Stack */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <p className="text-white/40 text-sm font-mono mb-6">// tech stack</p>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5 bg-dark-200 hover:border-gold/20 transition-all duration-200 group"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}