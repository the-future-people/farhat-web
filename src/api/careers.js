// src/api/careers.js
// The careers page talks to Octos's public HR endpoints directly.
// Applications go to HR's recruitment pipeline — never to WhatsApp.

const API = (import.meta.env.VITE_API_URL || 'https://octos-production.up.railway.app').replace(/\/$/, '')

export const TEAM_ORDER = ['FRONT_OF_HOUSE', 'PRODUCTION', 'OPERATIONS', 'FINISHING', '']

export const TYPE_LABEL = { FULL_TIME: 'Full-time', PART_TIME: 'Part-time', CONTRACT: 'Contract' }

export const slugify = (text) =>
  String(text || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// /careers/12-attendant → 12
export const roleHref = (v) => `/careers/${v.id}-${slugify(v.title)}`
export const idFromSlug = (slug) => {
  const n = parseInt(String(slug || '').split('-')[0], 10)
  return Number.isFinite(n) ? n : null
}

// "one per line" fields → list items
export const lines = (text) => String(text || '').split('\n').map(s => s.trim()).filter(Boolean)

export const formatDate = (iso) =>
  iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

// The API groups by branch; the page groups by team, so flatten
export async function getVacancies() {
  const res = await fetch(`${API}/api/v1/careers/vacancies/`)
  if (!res.ok) throw new Error('vacancies')
  const groups = await res.json()
  return groups.flatMap(g => g.vacancies || [])
}

// null when the vacancy is closed or doesn't exist (the API answers 404)
export async function getVacancy(id) {
  const res = await fetch(`${API}/api/v1/careers/vacancies/${id}/`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('vacancy')
  return res.json()
}

// Returns { ok: true } or { ok: false, errors: { field: message } }
export async function submitApplication(formData) {
  let res
  try {
    res = await fetch(`${API}/api/v1/careers/apply/`, { method: 'POST', body: formData })
  } catch {
    return { ok: false, errors: { form: "Couldn't reach us. Check your connection and try again." } }
  }
  if (res.ok) return { ok: true }
  if (res.status === 429) {
    return { ok: false, errors: { form: 'Too many applications from this connection. Try again in an hour.' } }
  }
  let data = {}
  try { data = await res.json() } catch { /* not JSON */ }
  const errors = {}
  Object.entries(data).forEach(([field, msgs]) => {
    const msg = Array.isArray(msgs) ? msgs[0] : String(msgs)
    errors[field === 'non_field_errors' || field === 'detail' ? 'form' : field] = msg
  })
  if (!Object.keys(errors).length) errors.form = 'Something went wrong. Try again.'
  return { ok: false, errors }
}
