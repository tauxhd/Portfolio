'use client'

import { useEffect, useState, useRef } from 'react'
import { GitFork, ExternalLink, PenTool, Plus, Trash2 } from 'lucide-react'
import { Project } from '@/lib/db'
import toast from 'react-hot-toast'

interface ProjectsProps {
  isAdmin: boolean
}

export default function Projects({ isAdmin }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

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
  }, [projects])

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this project?')) return
    try {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      toast.success('Project deleted')
      fetchProjects()
    } catch {
      toast.error('Failed to delete project')
    }
  }

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto" ref={ref}>
      <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex items-end justify-between mb-16">
        <div>
          <p className="font-mono text-sm mb-3" style={{ color: '#D4A017' }}>02. projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">What I&apos;ve built</h2>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.05)' }} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 group relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="h-full rounded-2xl transition-all duration-300 p-6 flex flex-col"
                style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {project.featured && (
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full mb-2 inline-block"
                        style={{ border: '1px solid rgba(212,160,23,0.3)', color: '#D4A017', background: 'rgba(212,160,23,0.05)' }}
                      >
                        featured
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                {project.long_description && (
                  <p className="text-white/30 text-xs leading-relaxed mb-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {project.long_description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md text-white/40" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                      <GitFork size={14} />
                      Code
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                      <ExternalLink size={14} />
                      Live demo
                    </a>
                  )}
                  {project.figma_url && (
                    <a href={project.figma_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                      <PenTool size={14} />
                      Figma
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 z-40"
          style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)' }}
        >
          <Plus size={24} style={{ color: '#0A0A0A' }} />
        </button>
      )}

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); fetchProjects() }}
        />
      )}
    </section>
  )
}

function AddProjectModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', long_description: '',
    tech: '', github_url: '', live_url: '', figma_url: '', featured: false,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) throw new Error()
      toast.success('Project added!')
      onSuccess()
    } catch {
      toast.error('Failed to add project')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#242424',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '10px 16px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 className="text-xl font-bold text-white mb-6">Add new project</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 font-mono mb-1.5 block">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="My awesome project" />
          </div>
          <div>
            <label className="text-xs text-white/40 font-mono mb-1.5 block">Short description *</label>
            <textarea required rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} placeholder="One or two sentences about the project" />
          </div>
          <div>
            <label className="text-xs text-white/40 font-mono mb-1.5 block">Long description</label>
            <textarea rows={3} value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} placeholder="More detail about what you built and how" />
          </div>
          <div>
            <label className="text-xs text-white/40 font-mono mb-1.5 block">Tech stack * (comma separated)</label>
            <input type="text" required value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} style={inputStyle} placeholder="Next.js, TypeScript, Tailwind CSS" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 font-mono mb-1.5 block">GitHub URL</label>
              <input type="url" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} style={inputStyle} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-xs text-white/40 font-mono mb-1.5 block">Live URL</label>
              <input type="url" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} style={inputStyle} placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 font-mono mb-1.5 block">Figma URL</label>
            <input type="url" value={form.figma_url} onChange={(e) => setForm({ ...form, figma_url: e.target.value })} style={inputStyle} placeholder="https://figma.com/..." />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="featured" className="text-sm text-white/60">Mark as featured</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-white/60 text-sm hover:bg-white/5 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)', color: '#0A0A0A' }}>
              {loading ? 'Adding...' : 'Add project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
