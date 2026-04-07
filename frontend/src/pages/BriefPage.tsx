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

  const containerStyle = { maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }

  return (
    <div style={containerStyle}>
      <Link
        to="/archive"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#5c5248',
          fontSize: 13,
          textDecoration: 'none',
          marginBottom: 28,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#a89880')}
        onMouseLeave={e => (e.currentTarget.style.color = '#5c5248')}
      >
        ← Archive
      </Link>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[80, 120, 300, 350].map((h, i) => (
            <div
              key={i}
              style={{ height: h, background: '#151311', borderRadius: 10, border: '1px solid #2a2520', opacity: 0.5 }}
            />
          ))}
        </div>
      )}

      {error && (
        <div
          style={{
            background: '#151311',
            border: '1px solid #2a2520',
            borderRadius: 12,
            padding: '40px 24px',
            textAlign: 'center',
            color: '#5c5248',
          }}
        >
          Brief not found for {date}.
        </div>
      )}

      {brief && date && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <ThreatLevelBanner
            level={brief.overall_threat_level}
            reason={brief.threat_level_reason}
            date={date}
          />
          <div
            style={{
              background: '#151311',
              border: '1px solid #2a2520',
              borderRadius: 10,
              padding: '20px 24px',
            }}
          >
            <div style={{ fontSize: 10, color: '#5c5248', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
              Overview
            </div>
            <p style={{ color: '#a89880', fontSize: 14, lineHeight: 1.8 }}>{brief.summary}</p>
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
