import type { SecurityPlusMapping } from '../types'

const DOMAIN_COLORS: Record<string, string> = {
  '1.0': '#f59e0b',
  '2.0': '#fb923c',
  '3.0': '#ef4444',
  '4.0': '#22c55e',
  '5.0': '#a78bfa',
}

function DomainCard({ domain }: { domain: SecurityPlusMapping }) {
  const color = DOMAIN_COLORS[domain.domain_number] || '#f59e0b'

  return (
    <div style={{ background: '#151311', border: '1px solid #2a2520', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ background: `${color}08`, borderBottom: `1px solid ${color}20`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', color: color, fontSize: 11, fontWeight: 700, marginRight: 8 }}>{domain.domain_number}</span>
          <span style={{ color: '#f0ece6', fontSize: 13, fontWeight: 600 }}>{domain.domain}</span>
        </div>
        <span style={{ background: `${color}15`, border: `1px solid ${color}30`, color: color, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          {domain.exam_weight}
        </span>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Key Concept Today</div>
          <div style={{ color: '#a89880', fontSize: 13, lineHeight: 1.6 }}>{domain.key_concept}</div>
        </div>
        {domain.items_covered?.length > 0 && (
          <div>
            <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Topics Covered</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              {domain.items_covered.map((item, i) => (
                <li key={i} style={{ color: '#5c5248', fontSize: 12, paddingLeft: 12, position: 'relative' as const }}>
                  <span style={{ position: 'absolute' as const, left: 0, color: color }}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 6, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Study Tip</div>
          <div style={{ color: '#a89880', fontSize: 12, lineHeight: 1.6 }}>{domain.study_tip}</div>
        </div>
      </div>
    </div>
  )
}

export default function SecurityPlusMap({ mappings }: { mappings: SecurityPlusMapping[] }) {
  if (!mappings?.length) return null
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2520' }}>
        <div style={{ width: 3, height: 18, background: 'linear-gradient(to bottom, #f59e0b, #fb923c)', borderRadius: 2 }} />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#a89880' }}>Security+ Study Map</h2>
        <span style={{ marginLeft: 4, background: '#ffffff06', border: '1px solid #2a2520', color: '#5c5248', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'var(--font-mono)' }}>SY0-701</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {mappings.map((domain, i) => <DomainCard key={i} domain={domain} />)}
      </div>
    </section>
  )
}
