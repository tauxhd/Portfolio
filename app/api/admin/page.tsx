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
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4A01722, #F0C04022)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            <Lock size={24} className="text-gold" style={{ color: '#D4A017' }} />
          </div>
          <h1 className="text-xl font-bold text-white">Admin access</h1>
          <p className="text-white/40 text-sm mt-1">Enter your password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder:text-white/20"
              style={{ '--tw-border-opacity': '1' } as React.CSSProperties}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-dark text-sm transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #D4A017, #F0C040)' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          <a href="/" className="hover:text-white/40 transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  )
}