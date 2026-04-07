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
        background: '#060f06',
        border: '1px solid #0d2410',
        borderRadius: 6,
        padding: '40px 32px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div style={{ color: '#1f4d1f', fontSize: 11, letterSpacing: '0.15em', marginBottom: 16 }}>
        // FREE DAILY INTELLIGENCE FEED
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 900, color: '#00ff41', marginBottom: 10, letterSpacing: '0.1em', textShadow: '0 0 20px #00ff4160' }}>
        STAY AHEAD OF THE THREAT
      </h2>
      <p style={{ color: '#4d994d', fontSize: 13, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7 }}>
        CVEs, threat intel, and breach reports — delivered 08:00 ET daily.<br />
        Mapped to Security+ SY0-701 exam objectives.
      </p>

      {status === 'success' ? (
        <div style={{ background: '#00ff4110', border: '1px solid #00ff4130', borderRadius: 4, padding: '14px 20px', color: '#00ff41', fontSize: 13, maxWidth: 400, margin: '0 auto' }}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="user@domain.com"
            required
            style={{
              flex: 1, minWidth: 220,
              background: '#020b02',
              border: `1px solid ${status === 'error' ? '#ff444460' : '#0d2410'}`,
              borderRadius: 4, padding: '10px 14px',
              color: '#00ff41', fontSize: 13, outline: 'none',
              fontFamily: 'var(--font-mono)',
              caretColor: '#00ff41',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: status === 'loading' ? '#0a160a' : '#00ff4120',
              color: status === 'loading' ? '#1f4d1f' : '#00ff41',
              border: `1px solid ${status === 'loading' ? '#0d2410' : '#00ff4150'}`,
              borderRadius: 4, padding: '10px 20px',
              fontSize: 12, fontWeight: 700,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              transition: 'all 0.15s',
              textShadow: status === 'loading' ? 'none' : '0 0 8px #00ff4160',
              whiteSpace: 'nowrap' as const,
            }}
          >
            {status === 'loading' ? 'PROCESSING...' : 'SUBSCRIBE'}
          </button>
        </form>
      )}

      {status === 'error' && <div style={{ color: '#ff4444', fontSize: 11, marginTop: 10, fontFamily: 'var(--font-mono)' }}>ERROR: {message}</div>}
      <div style={{ color: '#0d2410', fontSize: 10, marginTop: 16, letterSpacing: '0.1em' }}>// NO_SPAM. UNSUBSCRIBE_ANYTIME.</div>
    </section>
  )
}
