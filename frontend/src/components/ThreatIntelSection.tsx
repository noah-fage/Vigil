import { useState } from 'react'
import type { ThreatIntelItem } from '../types'
import SeverityBadge from './SeverityBadge'

function ThreatCard({ item }: { item: ThreatIntelItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ background: '#151311', border: '1px solid #2a2520', borderLeft: '3px solid #fb923c', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            <SeverityBadge severity={item.severity} />
            <span style={{ color: '#5c5248', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{item.source}</span>
            {item.threat_actor && (
              <span style={{ background: '#fb923c10', border: '1px solid #fb923c30', color: '#fb923c', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>
                {item.threat_actor}
              </span>
            )}
          </div>
          <button onClick={() => setExpanded(!expanded)} style={{ background: 'transparent', border: 'none', color: '#5c5248', cursor: 'pointer', fontSize: 18, lineHeight: 1, flexShrink: 0, padding: '0 4px' }}>
            {expanded ? '−' : '+'}
          </button>
        </div>
        <div style={{ fontWeight: 600, color: '#f0ece6', fontSize: 14, marginBottom: 8 }}>{item.title}</div>
        <div style={{ color: '#a89880', fontSize: 13, lineHeight: 1.6 }}>{item.plain_english}</div>
      </div>
      {expanded && (
        <div style={{ borderTop: '1px solid #2a2520', padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {item.mitre_tactics?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>MITRE Tactics</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                {item.mitre_tactics.map((t, i) => (
                  <span key={i} style={{ background: '#fb923c10', border: '1px solid #fb923c30', color: '#fb923c', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div style={{ background: '#1a1815', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#5c5248' }}>
            <span style={{ fontWeight: 600 }}>Security+: </span>{item.security_plus_domain} - {item.security_plus_objective}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ThreatIntelSection({ items }: { items: ThreatIntelItem[] }) {
  if (!items?.length) return null
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2520' }}>
        <div style={{ width: 3, height: 18, background: '#fb923c', borderRadius: 2 }} />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#a89880' }}>Threat Intelligence</h2>
        <span style={{ marginLeft: 'auto', background: '#fb923c15', border: '1px solid #fb923c30', color: '#fb923c', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          {items.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {items.map((item, i) => <ThreatCard key={i} item={item} />)}
      </div>
    </section>
  )
}
