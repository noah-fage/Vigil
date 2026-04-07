import { useState } from 'react'
import type { CVEItem } from '../types'
import SeverityBadge from './SeverityBadge'

function CVECard({ cve }: { cve: CVEItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 4, overflow: 'hidden', transition: 'border-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#00ff4130')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#0d2410')}
    >
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#00ff41', fontWeight: 700, fontSize: 12, textShadow: '0 0 8px #00ff4160' }}>
              {cve.id}
            </span>
            <SeverityBadge severity={cve.severity} />
            {cve.cvss_score && (
              <span style={{ fontFamily: 'var(--font-mono)', color: '#1f4d1f', fontSize: 11 }}>CVSS:{cve.cvss_score}</span>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: 'transparent', border: 'none', color: '#1f4d1f', cursor: 'pointer', fontSize: 16, lineHeight: 1, flexShrink: 0, padding: '0 4px', fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1f4d1f')}
          >
            {expanded ? '[-]' : '[+]'}
          </button>
        </div>
        <div style={{ fontWeight: 600, color: '#b3ffb3', fontSize: 13, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{cve.title}</div>
        <div style={{ color: '#4d994d', fontSize: 13, lineHeight: 1.7, fontFamily: 'inherit' }}>{cve.plain_english}</div>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #0d2410', padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
          {cve.affected_systems?.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: '#1f4d1f', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>// Affected Systems</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                {cve.affected_systems.map((s, i) => (
                  <span key={i} style={{ background: '#0a160a', border: '1px solid #0d2410', color: '#4d994d', padding: '2px 8px', borderRadius: 2, fontSize: 11, fontFamily: 'var(--font-mono)' }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {cve.mitre_technique && (
            <div>
              <div style={{ fontSize: 10, color: '#1f4d1f', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>// MITRE ATT&CK</div>
              <span style={{ background: '#ff880010', border: '1px solid #ff880030', color: '#ff8800', padding: '3px 10px', borderRadius: 2, fontSize: 11, fontFamily: 'var(--font-mono)' }}>{cve.mitre_technique}</span>
            </div>
          )}
          {cve.recommendation && (
            <div style={{ background: '#00ff4108', border: '1px solid #00ff4120', borderRadius: 4, padding: '10px 14px' }}>
              <div style={{ fontSize: 10, color: '#00ff41', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>// RECOMMENDED ACTION</div>
              <div style={{ color: '#4d994d', fontSize: 13 }}>{cve.recommendation}</div>
            </div>
          )}
          <div style={{ background: '#020b02', borderRadius: 2, padding: '8px 12px', fontSize: 11, color: '#1f4d1f', fontFamily: 'var(--font-mono)', borderLeft: '2px solid #0d2410' }}>
            SEC+: {cve.security_plus_domain} — {cve.security_plus_objective}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #0d2410' }}>
        <span style={{ color: '#00ff41', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textShadow: '0 0 8px #00ff4160' }}>
          &gt; CVE_ALERTS
        </span>
        <span style={{ marginLeft: 'auto', background: '#00ff4110', border: '1px solid #00ff4130', color: '#00ff41', padding: '1px 8px', borderRadius: 2, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          [{cves.length}]
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {cves.map(cve => <CVECard key={cve.id} cve={cve} />)}
      </div>
    </section>
  )
}
