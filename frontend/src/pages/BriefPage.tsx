import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBriefByDate } from '../api'
import type { Brief } from '../types'
import ThreatLevelBanner from '../components/ThreatLevelBanner'
import CVESection from '../components/CVESection'
import ThreatIntelSection from '../components/ThreatIntelSection'
import BreachSection from '../components/BreachSection'
import SecurityPlusMap from '../components/SecurityPlusMap'

export default function BriefPage() {
  const { date } = useParams<{ date: string }>()
  const [brief, setBrief] = useState<Brief | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!date) return
    getBriefByDate(date)
      .then(data => setBrief(data.content))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [date])

  const container = { maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }

  return (
    <div style={container}>
      <Link to="/archive" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1f4d1f', fontSize: 11, textDecoration: 'none', marginBottom: 28, fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')}
        onMouseLeave={e => (e.currentTarget.style.color = '#1f4d1f')}
      >
        ← BACK_TO_ARCHIVE
      </Link>

      {loading && (
        <div style={{ fontFamily: 'var(--font-mono)', color: '#1f4d1f', fontSize: 12 }}>
          <span style={{ animation: 'blink 1s step-end infinite' }}>loading brief...</span>
        </div>
      )}

      {error && (
        <div style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 4, padding: '40px 24px', textAlign: 'center', color: '#1f4d1f', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          ERROR: brief not found for {date}
        </div>
      )}

      {brief && date && (
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
        </div>
      )}
    </div>
  )
}
