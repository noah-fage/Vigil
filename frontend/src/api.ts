import type { Brief, ArchiveEntry } from './types'

const BASE = import.meta.env.VITE_API_URL || '/api'

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export async function getTodayBrief(): Promise<{ date: string; content: Brief }> {
  return request('/brief/today')
}

export async function getBriefByDate(date: string): Promise<{ date: string; content: Brief }> {
  return request(`/brief/${date}`)
}

export async function getArchive(): Promise<{ briefs: ArchiveEntry[] }> {
  return request('/brief/archive')
}

export async function subscribe(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Subscription failed')
  }
  return res.json()
}
