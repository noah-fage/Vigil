import type { Severity } from '../types'

const COLORS: Record<Severity, { bg: string; text: string; border: string }> = {
  critical: { bg: '#ef444415', text: '#ef4444', border: '#ef444430' },
  high: { bg: '#f9731615', text: '#f97316', border: '#f9731630' },
  medium: { bg: '#eab30815', text: '#eab308', border: '#eab30830' },
  low: { bg: '#22c55e15', text: '#22c55e', border: '#22c55e30' },
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
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {severity}
    </span>
  )
}
