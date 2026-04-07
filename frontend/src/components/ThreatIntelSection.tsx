import { useState } from 'react'
import type { ThreatIntelItem } from '../types'
import SeverityBadge from './SeverityBadge'

function ThreatCard({ item }: { item: ThreatIntelItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: '#0c1220',
        border: '1px solid #1a2744',
        borderLeft: '3px solid #8b5cf6',
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <SeverityBadge severity={item.severity} />
            <span style={{ color: '#475569', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{item.source}</span>
            {item.threat_actor && (
              <span
                style={{
                  background: '#8b5cf610',
                  border: '1px solid #8b5cf630',
                  color: '#8b5cf6',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {item.threat_actor}
              </span>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#475569',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              flexShrink: 0,
              padding: '0 4px',
            }}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>

        <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{item.title}</div>
        <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{item.plain_english}</div>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #1a2744', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {item.mitre_tactics?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                MITRE Tactics
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.mitre_tactics.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#8b5cf610',
                      border: '1px solid #8b5cf630',
                      color: '#8b5cf6',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div style={{ background: '#111827', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#64748b' }}>
            <span style={{ color: '#475569', fontWeight: 600 }}>Security+: </span>
            {item.security_plus_domain} - {item.security_plus_objective}
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid #1a2744',
        }}
      >
        <div style={{ width: 3, height: 18, background: '#8b5cf6', borderRadius: 2 }} />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8' }}>
          Threat Intelligence
        </h2>
        <span
          style={{
            marginLeft: 'auto',
            background: '#8b5cf615',
            border: '1px solid #8b5cf630',
            color: '#8b5cf6',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {items.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <ThreatCard key={i} item={item} />
        ))}
      </div>
    </section>
  )
}
