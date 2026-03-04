'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GatePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!confirmed) {
      setError('Please confirm you are 18 or older to continue.')
      return
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      // Set a cookie so the gate doesn't show again for 30 days
      document.cookie = 'gate_passed=true; path=/; max-age=2592000'
      router.push('/home')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-50 px-6">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage-600 animate-scale-in">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-warm-900">
            Peptide Protocols
          </h1>
          <p className="mt-3 text-sm text-warm-800/60">
            Evidence-based wellness education
          </p>
        </div>

        {/* Gate form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-warm-800">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3.5
                         text-warm-900 placeholder-warm-800/30
                         transition-all duration-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
              required
              disabled={loading}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-warm-300 text-sage-600 focus:ring-sage-500"
              disabled={loading}
            />
            <span className="text-sm leading-relaxed text-warm-800/70">
              I confirm that I am 18 years of age or older and consent to receiving
              educational emails from Peptide Protocols.
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 animate-fade-in">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                One moment...
              </span>
            ) : (
              'Enter Site'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-warm-800/40">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
