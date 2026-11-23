// src/api/sandbox.js
// "Not sure what to ask for?" (23 Nov 2026): the visitor shows Octos a photo,
// short video or GIF; Octos says what it is and whether Farhat can make it.

const API = (import.meta.env.VITE_API_URL || 'https://octos-production.up.railway.app').replace(/\/$/, '')

// { ok: true, code } or { ok: false, error }
export async function startLook(files, note) {
  const body = new FormData()
  files.forEach((f) => body.append('files', f))
  if (note) body.append('note', note)
  let res
  try {
    res = await fetch(`${API}/api/v1/sandbox/`, { method: 'POST', body })
  } catch {
    return { ok: false, error: "Couldn't reach us. Check your connection and try again." }
  }
  let data = {}
  try { data = await res.json() } catch { /* not JSON */ }
  if (res.ok) return { ok: true, code: data.code }
  return { ok: false, error: data.detail || 'Something went wrong. Try again.', limited: res.status === 429 }
}

// { status, stage, steps, findings, result } or null
export async function getLook(code) {
  try {
    const res = await fetch(`${API}/api/v1/sandbox/${encodeURIComponent(code)}/`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
