import { Link } from 'react-router-dom'
import type { ArchiveEntry, ThreatLevel } from '../types'

const LEVEL_COLORS: Record<ThreatLevel, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
}

export default function ArchiveList({ entries }: { entries: ArchiveEntry[] }) {
  if (!entries.length) {
    return (
      <div style={{ textAlign: 'center', color: '#475569', padding: '60px 0', fontSize: 14 }}>
        No past briefs yet.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {entries.map(entry => {
        const color = LEVEL_COLORS[entry.overall_threat_level] || '#94a3b8'
        const formatted = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

        return (
          <Link
            key={entry.date}
            to={`/brief/${entry.date}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                background: '#0c1220',
                border: '1px solid #1a2744',
                borderRadius: 10,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transition: 'border-color 0.15s, background 0.15s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#1f3460'
                e.currentTarget.style.background = '#0f1729'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1a2744'
                e.currentTarget.style.background = '#0c1220'
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${color}80`,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#475569',
                  fontSize: 12,
                  flexShrink: 0,
                  minWidth: 160,
                }}
              >
                {formatted}
              </span>
              <span
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  color: color,
                  padding: '1px 7px',
                  borderRadius: 4,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                {entry.overall_threat_level}
              </span>
              <span
                style={{
                  color: '#64748b',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {entry.summary}
              </span>
              <span style={{ color: '#1f3460', fontSize: 16, flexShrink: 0 }}>›</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
