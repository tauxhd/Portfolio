'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Lock } from 'lucide-react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        toast.error('Wrong password')
        return
      }

      toast.success('Welcome back!')
      router.push('/')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0A0A0A' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            <Lock size={24} style={{ color: '#D4A017' }} />
          </div>
          <h1 className="text-xl font-bold text-white">Admin access</h1>
          <p className="text-white/40 text-sm mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)', color: '#0A0A0A' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          <a href="/" className="hover:text-white/40 transition-colors">← Back to portfolio</a>
        </p>
      </div>
    </div>
  )
}