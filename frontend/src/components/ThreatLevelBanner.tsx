import type { ThreatLevel } from '../types'

const LEVEL_CONFIG = {
  critical: { color: '#ff4444', bg: '#ff444410', label: 'CRITICAL', pulse: true },
  high:     { color: '#ff8800', bg: '#ff880010', label: 'HIGH',     pulse: true },
  medium:   { color: '#ffdd00', bg: '#ffdd0010', label: 'MEDIUM',   pulse: false },
  low:      { color: '#00ff41', bg: '#00ff4110', label: 'LOW',      pulse: false },
}

interface Props { level: ThreatLevel; reason: string; date: string }

export default function ThreatLevelBanner({ level, reason, date }: Props) {
  const cfg = LEVEL_CONFIG[level]

  const formatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.color}40`,
        borderRadius: 6,
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as const,
        gap: 16,
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative' as const, flexShrink: 0 }}>
          {cfg.pulse && (
            <div style={{ position: 'absolute' as const, inset: -4, borderRadius: '50%', border: `1.5px solid ${cfg.color}`, animation: 'pulse-ring 2s ease-out infinite' }} />
          )}
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 16px ${cfg.color}` }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#1f4d1f', letterSpacing: '0.15em' }}>THREAT_LEVEL=</span>
            <span style={{ color: cfg.color, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textShadow: `0 0 10px ${cfg.color}` }}>
              {cfg.label}
            </span>
          </div>
          <div style={{ color: '#4d994d', fontSize: 12 }}>{reason}</div>
        </div>
      </div>
      <div style={{ color: '#1f4d1f', fontSize: 11, letterSpacing: '0.05em', textAlign: 'right' as const }}>
        {formatted}
      </div>
    </div>
  )
}
