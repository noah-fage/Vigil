import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      style={{
        color: pathname === to ? '#4f9cf9' : '#94a3b8',
        fontSize: '13px',
        fontWeight: pathname === to ? 600 : 400,
        letterSpacing: '0.05em',
        textDecoration: 'none',
        padding: '6px 12px',
        borderRadius: '6px',
        background: pathname === to ? '#4f9cf910' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </Link>
  )

  return (
    <header
      style={{
        borderBottom: '1px solid #1a2744',
        background: '#06081099',
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
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', width: 28, height: 28 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #4f9cf940 0%, transparent 70%)',
                border: '1.5px solid #4f9cf9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4f9cf9',
                  boxShadow: '0 0 8px #4f9cf9',
                }}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: '0.2em',
                color: '#e2e8f0',
                lineHeight: 1,
              }}
            >
              VIGIL
            </div>
            <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
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
              background: '#4f9cf915',
              border: '1px solid #4f9cf940',
              borderRadius: '6px',
              color: '#4f9cf9',
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
