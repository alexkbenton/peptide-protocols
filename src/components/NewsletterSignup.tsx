'use client'

import { useState } from 'react'

type Variant = 'light' | 'dark'

interface NewsletterSignupProps {
  /** Tag applied in Mailchimp so you can see where the signup came from. */
  source?: string
  /** 'light' for white/sand backgrounds, 'dark' for the sage-600 CTA bands. */
  variant?: Variant
  className?: string
}

export default function NewsletterSignup({
  source = 'newsletter',
  variant = 'light',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const isDark = variant === 'dark'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message || 'You are on the list.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={className}>
        <p
          className={`text-sm font-medium ${
            isDark ? 'text-white' : 'text-sage-700'
          }`}
        >
          {message} We&apos;ll email you when new protocols go live.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={
            isDark
              ? 'flex-1 rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white/60 focus:outline-none focus:ring-1 focus:ring-white/60'
              : 'flex-1 rounded-lg border border-warm-200 bg-white px-4 py-3 text-sm text-warm-900 placeholder-warm-800/40 focus:border-sage-600 focus:outline-none focus:ring-1 focus:ring-sage-600'
          }
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={
            isDark
              ? 'shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-sage-700 transition-opacity hover:opacity-90 disabled:opacity-50'
              : 'shrink-0 rounded-lg bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-700 disabled:opacity-50'
          }
        >
          {status === 'loading' ? 'Signing up…' : 'Notify me'}
        </button>
      </form>

      {status === 'error' && (
        <p className={`mt-2 text-xs ${isDark ? 'text-white/80' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <p className={`mt-2 text-xs ${isDark ? 'text-sage-100/70' : 'text-warm-800/40'}`}>
        New protocols and research breakdowns. No spam, unsubscribe anytime.
      </p>
    </div>
  )
}
