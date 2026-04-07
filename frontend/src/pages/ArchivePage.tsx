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
      <div style={{ marginBottom: 28, fontFamily: 'var(--font-mono)' }}>
        <div style={{ color: '#1f4d1f', fontSize: 11, marginBottom: 8 }}>$ vigil --list-archive</div>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#00ff41', letterSpacing: '0.1em', marginBottom: 4, textShadow: '0 0 12px #00ff4160' }}>
          BRIEF_ARCHIVE
        </h1>
        <p style={{ color: '#4d994d', fontSize: 12 }}>// every daily brief, permanent record</p>
      </div>

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', color: '#1f4d1f', fontSize: 12 }}>
          <span style={{ animation: 'blink 1s step-end infinite' }}>loading records...</span>
        </div>
      ) : (
        <ArchiveList entries={entries} />
      )}
    </div>
  )
}
