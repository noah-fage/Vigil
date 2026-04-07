import type { ThreatLevel } from '../types'

const LEVEL_CONFIG = {
  critical: { color: '#ef4444', bg: '#ef444412', label: 'CRITICAL', pulse: true },
  high: { color: '#f97316', bg: '#f9731612', label: 'HIGH', pulse: true },
  medium: { color: '#eab308', bg: '#eab30812', label: 'MEDIUM', pulse: false },
  low: { color: '#22c55e', bg: '#22c55e12', label: 'LOW', pulse: false },
}

interface Props {
  level: ThreatLevel
  reason: string
  date: string
}

export default function ThreatLevelBanner({ level, reason, date }: Props) {
  const cfg = LEVEL_CONFIG[level]

  const formatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.color}30`,
        borderRadius: 12,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {cfg.pulse && (
            <div
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                border: `1.5px solid ${cfg.color}`,
                animation: 'pulse-ring 2s ease-out infinite',
              }}
            />
          )}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: cfg.color,
              boxShadow: `0 0 12px ${cfg.color}`,
            }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: cfg.color,
                textTransform: 'uppercase',
              }}
            >
              Threat Level
            </span>
            <span
              style={{
                background: cfg.color,
                color: '#fff',
                padding: '2px 10px',
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              {cfg.label}
            </span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{reason}</div>
        </div>
      </div>
      <div
        style={{
          color: '#475569',
          fontSize: 12,
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-mono)',
          textAlign: 'right',
        }}
      >
        {formatted}
      </div>
    </div>
  )
}
