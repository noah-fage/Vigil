import { useState } from 'react'
import { subscribe } from '../api'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await subscribe(email)
      setStatus('success')
      setMessage(res.message)
      setEmail('')
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section
      id="subscribe"
      style={{
        background: 'linear-gradient(135deg, #151311 0%, #1a1714 100%)',
        border: '1px solid #2a2520',
        borderRadius: 14,
        padding: '40px 32px',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f59e0b10', border: '1px solid #f59e0b30', borderRadius: 20, padding: '4px 14px', marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
        <span style={{ color: '#f59e0b', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>FREE DAILY BRIEF</span>
      </div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f0ece6', marginBottom: 10, letterSpacing: '-0.02em' }}>
        Stay ahead of the threat.
      </h2>
      <p style={{ color: '#5c5248', fontSize: 14, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
        CVEs, threat intel, and breach reports delivered every morning at 8am ET - mapped to Security+ exam objectives.
      </p>

      {status === 'success' ? (
        <div style={{ background: '#22c55e10', border: '1px solid #22c55e30', borderRadius: 8, padding: '14px 20px', color: '#22c55e', fontSize: 14, fontWeight: 500, maxWidth: 400, margin: '0 auto' }}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1, minWidth: 220,
              background: '#0d0c0b',
              border: `1px solid ${status === 'error' ? '#ef444460' : '#2a2520'}`,
              borderRadius: 8, padding: '11px 16px',
              color: '#f0ece6', fontSize: 14, outline: 'none', fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: status === 'loading' ? '#2a2520' : '#f59e0b',
              color: status === 'loading' ? '#5c5248' : '#0d0c0b',
              border: 'none', borderRadius: 8, padding: '11px 24px',
              fontSize: 14, fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 10 }}>{message}</div>}
      <p style={{ color: '#2a2520', fontSize: 11, marginTop: 16 }}>No spam. Unsubscribe anytime.</p>
    </section>
  )
}
