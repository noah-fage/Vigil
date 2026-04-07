import { useState } from 'react'
import type { CVEItem } from '../types'
import SeverityBadge from './SeverityBadge'

function CVECard({ cve }: { cve: CVEItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        background: '#0c1220',
        border: '1px solid #1a2744',
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#1f3460')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a2744')}
    >
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#4f9cf9',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {cve.id}
            </span>
            <SeverityBadge severity={cve.severity} />
            {cve.cvss_score && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#475569',
                  fontSize: 11,
                }}
              >
                CVSS {cve.cvss_score}
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
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>

        <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{cve.title}</div>
        <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{cve.plain_english}</div>
      </div>

      {expanded && (
        <div
          style={{
            borderTop: '1px solid #1a2744',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {cve.affected_systems?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                Affected Systems
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cve.affected_systems.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#111827',
                      border: '1px solid #1f2937',
                      color: '#94a3b8',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cve.mitre_technique && (
            <div>
              <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                MITRE ATT&CK
              </div>
              <span
                style={{
                  background: '#8b5cf610',
                  border: '1px solid #8b5cf630',
                  color: '#8b5cf6',
                  padding: '3px 10px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {cve.mitre_technique}
              </span>
            </div>
          )}

          {cve.recommendation && (
            <div
              style={{
                background: '#4f9cf908',
                border: '1px solid #4f9cf920',
                borderRadius: 6,
                padding: '10px 14px',
              }}
            >
              <div style={{ fontSize: 11, color: '#4f9cf9', fontWeight: 600, marginBottom: 4 }}>Recommended Action</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{cve.recommendation}</div>
            </div>
          )}

          <div
            style={{
              background: '#111827',
              borderRadius: 6,
              padding: '10px 14px',
              fontSize: 12,
              color: '#64748b',
            }}
          >
            <span style={{ color: '#475569', fontWeight: 600 }}>Security+: </span>
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
        <div
          style={{
            width: 3,
            height: 18,
            background: '#4f9cf9',
            borderRadius: 2,
          }}
        />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8' }}>
          CVE Alerts
        </h2>
        <span
          style={{
            marginLeft: 'auto',
            background: '#4f9cf915',
            border: '1px solid #4f9cf930',
            color: '#4f9cf9',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {cves.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cves.map(cve => (
          <CVECard key={cve.id} cve={cve} />
        ))}
      </div>
    </section>
  )
}
