import { Link } from 'react-router-dom'
import type { ArchiveEntry, ThreatLevel } from '../types'

const LEVEL_COLORS: Record<ThreatLevel, string> = {
  critical: '#ff4444',
  high: '#ff8800',
  medium: '#ffdd00',
  low: '#00ff41',
}

export default function ArchiveList({ entries }: { entries: ArchiveEntry[] }) {
  if (!entries.length) {
    return <div style={{ textAlign: 'center', color: '#1f4d1f', padding: '60px 0', fontSize: 13, fontFamily: 'var(--font-mono)' }}>// NO_RECORDS_FOUND</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {entries.map(entry => {
        const color = LEVEL_COLORS[entry.overall_threat_level] || '#00ff41'
        const formatted = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        })

        return (
          <Link key={entry.date} to={`/brief/${entry.date}`} style={{ textDecoration: 'none' }}>
            <div
              style={{ background: '#060f06', border: '1px solid #0d2410', borderRadius: 4, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color 0.15s', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#00ff4130')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#0d2410')}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
              <span style={{ color: '#1f4d1f', fontSize: 11, flexShrink: 0, minWidth: 160 }}>{formatted}</span>
              <span style={{ background: `${color}15`, border: `1px solid ${color}30`, color: color, padding: '1px 6px', borderRadius: 2, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, flexShrink: 0 }}>
                {entry.overall_threat_level}
              </span>
              <span style={{ color: '#4d994d', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, flex: 1 }}>{entry.summary}</span>
              <span style={{ color: '#1f4d1f', fontSize: 14, flexShrink: 0 }}>›</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
