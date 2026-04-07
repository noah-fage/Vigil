import { useState } from 'react'
import type { BreachItem } from '../types'
import SeverityBadge from './SeverityBadge'

function BreachCard({ item }: { item: BreachItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ background: '#060f06', border: '1px solid #0d2410', borderLeft: '2px solid #ff4444', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            <SeverityBadge severity={item.severity} />
            <span style={{ color: '#1f4d1f', fontSize: 10, fontFamily: 'var(--font-mono)' }}>[{item.organization}]</span>
            {item.records_affected && (
              <span style={{ color: '#ff4444', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{item.records_affected}</span>
            )}
          </div>
          <button onClick={() => setExpanded(!expanded)} style={{ background: 'transparent', border: 'none', color: '#1f4d1f', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-mono)', padding: '0 4px' }}>
            {expanded ? '[-]' : '[+]'}
          </button>
        </div>
        <div style={{ fontWeight: 600, color: '#b3ffb3', fontSize: 13, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{item.title}</div>
        <div style={{ color: '#4d994d', fontSize: 13, lineHeight: 1.7 }}>{item.plain_english}</div>
      </div>
      {expanded && (
        <div style={{ borderTop: '1px solid #0d2410', padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: '#1f4d1f', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>// ATTACK_VECTOR</div>
            <span style={{ background: '#ff444410', border: '1px solid #ff444430', color: '#ff4444', padding: '2px 10px', borderRadius: 2, fontSize: 11, fontFamily: 'var(--font-mono)' }}>{item.attack_vector}</span>
          </div>
          <div style={{ background: '#ff444408', border: '1px solid #ff444420', borderRadius: 4, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: '#ff4444', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>// LESSON_LEARNED</div>
            <div style={{ color: '#4d994d', fontSize: 13 }}>{item.lessons_learned}</div>
          </div>
          <div style={{ background: '#020b02', borderRadius: 2, padding: '8px 12px', fontSize: 11, color: '#1f4d1f', fontFamily: 'var(--font-mono)', borderLeft: '2px solid #0d2410' }}>
            SEC+: {item.security_plus_domain} — {item.security_plus_objective}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #0d2410' }}>
        <span style={{ color: '#ff4444', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textShadow: '0 0 8px #ff444460' }}>
          &gt; BREACH_REPORT
        </span>
        <span style={{ marginLeft: 'auto', background: '#ff444410', border: '1px solid #ff444430', color: '#ff4444', padding: '1px 8px', borderRadius: 2, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          [{items.length}]
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {items.map((item, i) => <BreachCard key={i} item={item} />)}
      </div>
    </section>
  )
}
