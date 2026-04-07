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
        background: 'linear-gradient(135deg, #0c1220 0%, #0f1729 100%)',
        border: '1px solid #1a2744',
        borderRadius: 14,
        padding: '40px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#4f9cf910',
          border: '1px solid #4f9cf930',
          borderRadius: 20,
          padding: '4px 14px',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px #22c55e',
          }}
        />
        <span style={{ color: '#4f9cf9', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>
          FREE DAILY BRIEF
        </span>
      </div>

      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: '#e2e8f0',
          marginBottom: 10,
          letterSpacing: '-0.02em',
        }}
      >
        Stay ahead of the threat.
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
        Get today's CVEs, threat intel, and breach reports delivered to your inbox every morning at 8am ET - mapped to Security+ exam objectives.
      </p>

      {status === 'success' ? (
        <div
          style={{
            background: '#22c55e10',
            border: '1px solid #22c55e30',
            borderRadius: 8,
            padding: '14px 20px',
            color: '#22c55e',
            fontSize: 14,
            fontWeight: 500,
            maxWidth: 400,
            margin: '0 auto',
          }}
        >
          {message}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: 10,
            maxWidth: 420,
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              minWidth: 220,
              background: '#060810',
              border: `1px solid ${status === 'error' ? '#ef444460' : '#1a2744'}`,
              borderRadius: 8,
              padding: '11px 16px',
              color: '#e2e8f0',
              fontSize: 14,
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: status === 'loading' ? '#1a2744' : '#4f9cf9',
              color: status === 'loading' ? '#475569' : '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '11px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div style={{ color: '#ef4444', fontSize: 12, marginTop: 10 }}>{message}</div>
      )}

      <p style={{ color: '#2d3f5a', fontSize: 11, marginTop: 16 }}>
        No spam. Unsubscribe anytime.
      </p>
    </section>
  )
}
