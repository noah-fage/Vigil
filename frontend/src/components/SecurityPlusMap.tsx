import type { SecurityPlusMapping } from '../types'

const DOMAIN_COLORS: Record<string, string> = {
  '1.0': '#00ff41',
  '2.0': '#ff8800',
  '3.0': '#ff4444',
  '4.0': '#00ccff',
  '5.0': '#cc00ff',
}

function DomainCard({ domain }: { domain: SecurityPlusMapping }) {
  const color = DOMAIN_COLORS[domain.domain_number] || '#00ff41'

  return (
    <div style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ background: `${color}08`, borderBottom: `1px solid ${color}25`, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: color, fontSize: 11, fontWeight: 700, textShadow: `0 0 6px ${color}60` }}>
            [{domain.domain_number}]
          </span>
          <span style={{ color: '#b3ffb3', fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{domain.domain}</span>
        </div>
        <span style={{ background: `${color}15`, border: `1px solid ${color}30`, color: color, padding: '1px 8px', borderRadius: 2, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          {domain.exam_weight}
        </span>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: '#1f4d1f', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>// KEY_CONCEPT</div>
          <div style={{ color: '#4d994d', fontSize: 13, lineHeight: 1.6 }}>{domain.key_concept}</div>
        </div>
        {domain.items_covered?.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: '#1f4d1f', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>// TOPICS_COVERED</div>
            {domain.items_covered.map((item, i) => (
              <div key={i} style={{ color: '#1f4d1f', fontSize: 12, fontFamily: 'var(--font-mono)', paddingLeft: 12, position: 'relative' as const, marginBottom: 3 }}>
                <span style={{ position: 'absolute' as const, left: 0, color: color }}>›</span>{item}
              </div>
            ))}
          </div>
        )}
        <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 4, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>// STUDY_TIP</div>
          <div style={{ color: '#4d994d', fontSize: 12, lineHeight: 1.6 }}>{domain.study_tip}</div>
        </div>
      </div>
    </div>
  )
}

export default function SecurityPlusMap({ mappings }: { mappings: SecurityPlusMapping[] }) {
  if (!mappings?.length) return null
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #0d2410' }}>
        <span style={{ color: '#00ff41', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textShadow: '0 0 8px #00ff4160' }}>
          &gt; SECURITY+_STUDY_MAP
        </span>
        <span style={{ marginLeft: 4, background: '#00ff4108', border: '1px solid #00ff4120', color: '#1f4d1f', padding: '1px 8px', borderRadius: 2, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          SY0-701
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {mappings.map((domain, i) => <DomainCard key={i} domain={domain} />)}
      </div>
    </section>
  )
}
