import { useState } from 'react'
import type { BreachItem } from '../types'
import SeverityBadge from './SeverityBadge'

function BreachCard({ item }: { item: BreachItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ background: '#151311', border: '1px solid #2a2520', borderLeft: '3px solid #ef4444', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            <SeverityBadge severity={item.severity} />
            <span style={{ color: '#5c5248', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{item.organization}</span>
            {item.records_affected && (
              <span style={{ color: '#ef4444', fontSize: 11 }}>{item.records_affected} affected</span>
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
          <div>
            <div style={{ fontSize: 11, color: '#5c5248', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Attack Vector</div>
            <span style={{ background: '#ef444410', border: '1px solid #ef444430', color: '#ef4444', padding: '3px 10px', borderRadius: 4, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              {item.attack_vector}
            </span>
          </div>
          <div style={{ background: '#ef444408', border: '1px solid #ef444420', borderRadius: 6, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, marginBottom: 4 }}>Lesson Learned</div>
            <div style={{ color: '#a89880', fontSize: 13 }}>{item.lessons_learned}</div>
          </div>
          <div style={{ background: '#1a1815', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#5c5248' }}>
            <span style={{ fontWeight: 600 }}>Security+: </span>{item.security_plus_domain} - {item.security_plus_objective}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BreachSection({ items }: { items: BreachItem[] }) {
  if (!items?.length) return null
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2a2520' }}>
        <div style={{ width: 3, height: 18, background: '#ef4444', borderRadius: 2 }} />
        <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#a89880' }}>Breach Report</h2>
        <span style={{ marginLeft: 'auto', background: '#ef444415', border: '1px solid #ef444430', color: '#ef4444', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          {items.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {items.map((item, i) => <BreachCard key={i} item={item} />)}
      </div>
    </section>
  )
}
