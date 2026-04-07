import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      style={{
        color: pathname === to ? '#f59e0b' : '#a89880',
        fontSize: '13px',
        fontWeight: pathname === to ? 600 : 400,
        letterSpacing: '0.05em',
        textDecoration: 'none',
        padding: '6px 12px',
        borderRadius: '6px',
        background: pathname === to ? '#f59e0b10' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </Link>
  )

  return (
    <header
      style={{
        borderBottom: '1px solid #2a2520',
        background: '#0d0c0bcc',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <polygon
                points="13,2 24,20 2,20"
                stroke="#f59e0b"
                strokeWidth="1.5"
                fill="#f59e0b10"
              />
              <circle cx="13" cy="14" r="2.5" fill="#f59e0b" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 17,
                letterSpacing: '0.25em',
                color: '#f0ece6',
                lineHeight: 1,
              }}
            >
              VIGIL
            </div>
            <div style={{ fontSize: 9, color: '#5c5248', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Daily Security Brief
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLink('/', 'Today')}
          {navLink('/archive', 'Archive')}
          <a
            href="#subscribe"
            style={{
              marginLeft: 8,
              padding: '6px 14px',
              background: '#f59e0b15',
              border: '1px solid #f59e0b40',
              borderRadius: '6px',
              color: '#f59e0b',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  )
}
