import { useEffect, useState } from 'react'
import { getTodayBrief } from '../api'
import type { Brief } from '../types'
import ThreatLevelBanner from '../components/ThreatLevelBanner'
import CVESection from '../components/CVESection'
import ThreatIntelSection from '../components/ThreatIntelSection'
import BreachSection from '../components/BreachSection'
import SecurityPlusMap from '../components/SecurityPlusMap'
import EmailSignup from '../components/EmailSignup'

export default function Home() {
  const [brief, setBrief] = useState<Brief | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState('')

  useEffect(() => {
    getTodayBrief()
      .then(data => { setBrief(data.content); setDate(data.date) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const container = { maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }

  if (loading) {
    return (
      <div style={container}>
        <div style={{ fontFamily: 'var(--font-mono)', color: '#1f4d1f', fontSize: 12 }}>
          <div style={{ marginBottom: 8 }}>$ vigil --fetch-today</div>
          <div style={{ animation: 'blink 1s step-end infinite' }}>fetching intelligence feed...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={container}>
        <div style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 6, padding: '48px 32px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          <div style={{ color: '#1f4d1f', fontSize: 11, marginBottom: 16 }}>$ vigil --status</div>
          <div style={{ color: '#00ff41', fontSize: 16, fontWeight: 700, marginBottom: 8, textShadow: '0 0 10px #00ff4160' }}>NO_BRIEF_AVAILABLE</div>
          <div style={{ color: '#4d994d', fontSize: 13, marginBottom: 8 }}>Today's brief hasn't been generated yet.</div>
          <div style={{ color: '#1f4d1f', fontSize: 11 }}>SCHEDULED: 08:00 ET DAILY</div>
          <div style={{ marginTop: 40, borderTop: '1px solid #0d2410', paddingTop: 40 }}>
            <EmailSignup />
          </div>
        </div>
      </div>
    )
  }

  if (!brief) return null

  return (
    <div style={container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <ThreatLevelBanner level={brief.overall_threat_level} reason={brief.threat_level_reason} date={date} />

        <div style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 4, padding: '16px 20px' }}>
          <div style={{ fontSize: 10, color: '#1f4d1f', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>// OVERVIEW</div>
          <p style={{ color: '#4d994d', fontSize: 13, lineHeight: 1.8 }}>{brief.summary}</p>
        </div>

        <CVESection cves={brief.cves} />
        <ThreatIntelSection items={brief.threat_intel} />
        <BreachSection items={brief.breaches} />
        <SecurityPlusMap mappings={brief.security_plus_mappings} />
        <EmailSignup />
      </div>
    </div>
  )
}
