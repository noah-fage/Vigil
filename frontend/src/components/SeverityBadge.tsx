import type { Severity } from '../types'

const COLORS: Record<Severity, { bg: string; text: string; border: string }> = {
  critical: { bg: '#ff444415', text: '#ff4444', border: '#ff444430' },
  high:     { bg: '#ff880015', text: '#ff8800', border: '#ff880030' },
  medium:   { bg: '#ffdd0015', text: '#ffdd00', border: '#ffdd0030' },
  low:      { bg: '#00ff4115', text: '#00ff41', border: '#00ff4130' },
}

export default function SeverityBadge({ severity }: { severity: Severity }) {
  const c = COLORS[severity] ?? COLORS.low
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        padding: '2px 8px',
        borderRadius: 2,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        fontFamily: 'var(--font-mono)',
        textShadow: `0 0 6px ${c.text}80`,
      }}
    >
      {severity}
    </span>
  )
}
