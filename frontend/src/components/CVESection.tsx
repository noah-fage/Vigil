import { useState } from 'react'
import type { CVEItem } from '../types'
import SeverityBadge from './SeverityBadge'

function CVECard({ cve }: { cve: CVEItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: '#151311',
        border: '1px solid #2a2520',
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#3a3028')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2520')}
    >
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700, fontSize: 13 }}>
              {cve.id}
            </span>
            <SeverityBadge severity={cve.severity} />
            {cve.cvss_score && (
              <span style={{ fontFamily: 'var(--font-mono)', color: '#5c5248', fontSize: 11 }}>
                CVSS {cve.cvss_score}
              </span>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent', border: 'none', color: '#5c5248',
              cursor: 'pointer', fontSize: 18, lineHeight: 1, flexShrink: 0,
              padding: '0 4px', transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a89880')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5c5248')}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
        <div style={{ fontWeight: 600, color: '#f0ece6', fontSize: 14, marginBottom: 8 }}>{cve.title}</div>
        <div style={{ color: '#a89880', fontSize: 13, lineHeight: 1.6 }}>{cve.plain_english}</div>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #2a2520', padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          {cve.affected_systems?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Affected Systems</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                {cve.affected_systems.map((s, i) => (
                  <span key={i} style={{ background: '#1a1815', border: '1px solid #2a2520', color: '#a89880', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {cve.mitre_technique && (
            <div>
              <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>MITRE ATT&CK</div>
              <span style={{ background: '#fb923c10', border: '1px solid #fb923c30', color: '#fb923c', padding: '3px 10px', borderRadius: 4, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                {cve.mitre_technique}
              </span>
            </div>
          )}
          {cve.recommendation && (
            <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b20', borderRadius: 6, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>Recommended Action</div>
              <div style={{ color: '#a89880', fontSize: 13 }}>{cve.recommendation}</div>
            </div>
          )}
          <div style={{ background: '#1a1815', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#5c5248' }}>
            <span style={{ color: '#5c5248', fontWeight: 600 }}>Security+: </span>
            {cve.security_plus_domain} - {cve.security_plus_objective}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CVESection({ cves }: { cves: CVEItem[] }) {
  if (!cves?.length) return null
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2520' }}>
        <div style={{ width: 3, height: 18, background: '#f59e0b', borderRadius: 2 }} />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#a89880' }}>CVE Alerts</h2>
        <span style={{ marginLeft: 'auto', background: '#f59e0b15', border: '1px solid #f59e0b30', color: '#f59e0b', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          {cves.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {cves.map(cve => <CVECard key={cve.id} cve={cve} />)}
      </div>
    </section>
  )
}
