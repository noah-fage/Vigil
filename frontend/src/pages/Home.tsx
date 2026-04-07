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
      .then(data => {
        setBrief(data.content)
        setDate(data.date)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const containerStyle = {
    maxWidth: 820,
    margin: '0 auto',
    padding: '40px 24px 80px',
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          {[200, 400, 300, 350].map((w, i) => (
            <div
              key={i}
              style={{
                height: i === 0 ? 80 : 120,
                background: '#151311',
                borderRadius: 10,
                border: '1px solid #2a2520',
                animation: 'fadeIn 0.3s ease',
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            background: '#151311',
            border: '1px solid #2a2520',
            borderRadius: 12,
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 16 }}>🛰️</div>
          <div style={{ color: '#f0ece6', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            No Brief Yet Today
          </div>
          <div style={{ color: '#5c5248', fontSize: 14, marginBottom: 24 }}>
            {error.includes('8am') ? error : "Today's brief hasn't been generated yet. Come back after 8am ET."}
          </div>
          <div style={{ color: '#2d3f5a', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            Vigil generates daily at 08:00 ET
          </div>
          <div style={{ marginTop: 40, borderTop: '1px solid #2a2520', paddingTop: 40 }}>
            <EmailSignup />
          </div>
        </div>
      </div>
    )
  }

  if (!brief) return null

  return (
    <div style={containerStyle}>
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
          <div
            style={{
              fontSize: 10,
              color: '#5c5248',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Overview
          </div>
          <p style={{ color: '#a89880', fontSize: 14, lineHeight: 1.8 }}>{brief.summary}</p>
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
