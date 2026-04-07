import type { SecurityPlusMapping } from '../types'

const DOMAIN_COLORS: Record<string, string> = {
  '1.0': '#4f9cf9',
  '2.0': '#f97316',
  '3.0': '#8b5cf6',
  '4.0': '#22c55e',
  '5.0': '#eab308',
}

function DomainCard({ domain }: { domain: SecurityPlusMapping }) {
  const color = DOMAIN_COLORS[domain.domain_number] || '#4f9cf9'

  return (
    <div
      style={{
        background: '#0c1220',
        border: '1px solid #1a2744',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: `${color}0a`,
          borderBottom: `1px solid ${color}20`,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              color: color,
              fontSize: 11,
              fontWeight: 700,
              marginRight: 8,
            }}
          >
            {domain.domain_number}
          </span>
          <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{domain.domain}</span>
        </div>
        <span
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color: color,
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
        >
          {domain.exam_weight}
        </span>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            Key Concept Today
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{domain.key_concept}</div>
        </div>

        {domain.items_covered?.length > 0 && (
          <div>
            <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              Topics Covered
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {domain.items_covered.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: '#64748b',
                    fontSize: 12,
                    paddingLeft: 12,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: color,
                    }}
                  >
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          style={{
            background: `${color}08`,
            border: `1px solid ${color}20`,
            borderRadius: 6,
            padding: '10px 12px',
          }}
        >
          <div style={{ fontSize: 10, color: color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            Study Tip
          </div>
          <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{domain.study_tip}</div>
        </div>
      </div>
    </div>
  )
}

export default function SecurityPlusMap({ mappings }: { mappings: SecurityPlusMapping[] }) {
  if (!mappings?.length) return null

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
            background: 'linear-gradient(to bottom, #4f9cf9, #8b5cf6)',
            borderRadius: 2,
          }}
        />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8' }}>
          Security+ Study Map
        </h2>
        <span
          style={{
            marginLeft: 4,
            background: '#ffffff08',
            border: '1px solid #1f2937',
            color: '#64748b',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
          }}
        >
          SY0-701
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {mappings.map((domain, i) => (
          <DomainCard key={i} domain={domain} />
        ))}
      </div>
    </section>
  )
}
