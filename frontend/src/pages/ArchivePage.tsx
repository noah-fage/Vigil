import { useEffect, useState } from 'react'
import { getArchive } from '../api'
import type { ArchiveEntry } from '../types'
import ArchiveList from '../components/ArchiveList'

export default function ArchivePage() {
  const [entries, setEntries] = useState<ArchiveEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArchive()
      .then(data => setEntries(data.briefs))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#f0ece6',
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}
        >
          Brief Archive
        </h1>
        <p style={{ color: '#5c5248', fontSize: 13 }}>
          Every daily brief, searchable and permanent.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              style={{
                height: 52,
                background: '#151311',
                borderRadius: 10,
                border: '1px solid #2a2520',
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      ) : (
        <ArchiveList entries={entries} />
      )}
    </div>
  )
}
