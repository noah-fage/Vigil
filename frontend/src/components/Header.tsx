import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      style={{
        color: pathname === to ? '#00ff41' : '#1f4d1f',
        fontSize: '12px',
        fontWeight: pathname === to ? 700 : 400,
        letterSpacing: '0.12em',
        textDecoration: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        background: pathname === to ? '#00ff4110' : 'transparent',
        border: `1px solid ${pathname === to ? '#00ff4130' : 'transparent'}`,
        transition: 'all 0.15s',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase' as const,
      }}
    >
      {label}
    </Link>
  )

  return (
    <header
      style={{
        borderBottom: '1px solid #0d2410',
        background: '#020b02ee',
        backdropFilter: 'blur(8px)',
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
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  fontSize: 20,
                  letterSpacing: '0.3em',
                  color: '#00ff41',
                  textShadow: '0 0 20px #00ff4180',
                  lineHeight: 1,
                }}
              >
                VIGIL
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 18,
                  background: '#00ff41',
                  marginLeft: 3,
                  animation: 'blink 1s step-end infinite',
                  boxShadow: '0 0 8px #00ff41',
                  verticalAlign: 'middle',
                }}
              />
            </div>
            <div style={{ fontSize: 9, color: '#1f4d1f', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              // SECURITY INTELLIGENCE FEED
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {navLink('/', 'Today')}
          {navLink('/archive', 'Archive')}
          <a
            href="#subscribe"
            style={{
              marginLeft: 4,
              padding: '6px 14px',
              background: 'transparent',
              border: '1px solid #00ff4150',
              borderRadius: '4px',
              color: '#00ff41',
              fontSize: '11px',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.15s',
              textShadow: '0 0 8px #00ff4160',
            }}
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  )
}
