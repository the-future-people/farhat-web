import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Banknote, Briefcase, Building2, ClipboardList, GraduationCap, Layers,
  MonitorSmartphone, Printer, Shirt, Store, TrendingUp, Users, Zap,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import ApplyForm from '../components/ApplyForm.jsx'
import { company, stats } from '../site.js'
import { getVacancies, roleHref, TEAM_ORDER, TYPE_LABEL } from '../api/careers.js'

// Vacancies come live from Octos HR and render in the browser (they change daily).
// The prerendered page shows the frame with "Loading…" in place of the cards.

const TEAM_LABEL = {
  FRONT_OF_HOUSE: 'Front of house',
  PRODUCTION: 'Production',
  OPERATIONS: 'Operations',
  FINISHING: 'Finishing',
  '': 'Other roles',
}

// An icon per role, matched on the title so new vacancies pick one up on their own
function roleIcon(title = '') {
  const t = title.toLowerCase()
  if (t.includes('cashier')) return Banknote
  if (t.includes('attendant')) return Store
  if (t.includes('embroider')) return Shirt
  if (t.includes('laser')) return Zap
  if (t.includes('coordinator') || t.includes('manager')) return ClipboardList
  if (t.includes('finish')) return Layers
  if (t.includes('operator') || t.includes('print')) return Printer
  return Briefcase
}

const firstSentence = (text = '') => {
  const s = text.trim().split(/(?<=[.!?])\s/)[0] || ''
  return s.length > 110 ? s.slice(0, 107).trimEnd() + '…' : s
}

function daysLeft(iso) {
  if (!iso) return null
  return Math.ceil((new Date(iso + 'T23:59:59') - new Date()) / 86400000)
}

const perks = [
  [GraduationCap, 'Learn on the job', 'Paid training on every machine and system you use.'],
  [MonitorSmartphone, 'Modern tools', 'Octos tracks every job from counter to collection.'],
  [Users, 'A real team', `${stats[0].value} jobs delivered for people and businesses.`],
  [Building2, 'Room to grow', 'New branches across Accra mean new roles.'],
]

const steps = [
  ['Apply online', 'Your CV goes straight to HR'],
  ['Screening', 'HR reviews your application'],
  ['Interview', `At our Westland branch`],
  ['Offer', 'Then onboarding and training'],
]

function RoleCard({ v }) {
  const Icon = roleIcon(v.title)
  const d = daysLeft(v.closes_at)
  const closingSoon = d !== null && d >= 0 && d <= 5
  return (
    <li>
      <Link
        to={roleHref(v)}
        className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 transition-shadow hover:border-brand-600/30 hover:shadow-lg hover:shadow-black/5"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
            <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
          </span>
          <span className="text-xs text-ink/45">{v.team_label || TEAM_LABEL[v.team || '']}</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
        {v.description && <p className="mt-1 text-sm leading-relaxed text-ink/60">{firstSentence(v.description)}</p>}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/65">{TYPE_LABEL[v.employment_type] || v.employment_type}</span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/65">
            {v.positions_available} position{v.positions_available === 1 ? '' : 's'}
          </span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/65">{(v.branch_name || 'Any branch').replace(/ Branch$/, '')}</span>
          {closingSoon && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
              {d === 0 ? 'Closes today' : `Closes in ${d} day${d === 1 ? '' : 's'}`}
            </span>
          )}
        </div>
        <div className="min-h-4 flex-1" />
        <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-4 text-sm">
          <span className={v.pay_text ? 'font-medium text-ink/75' : 'text-ink/45'}>{v.pay_text || 'Pay at interview'}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-600">
            Apply <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  )
}

export default function Careers() {
  const [state, setState] = useState({ status: 'loading', vacancies: [] })
  const [team, setTeam] = useState('ALL')
  const [general, setGeneral] = useState(false)

  useEffect(() => {
    getVacancies()
      .then((vacancies) => setState({ status: 'ready', vacancies }))
      .catch(() => setState({ status: 'error', vacancies: [] }))
  }, [])

  const all = [...state.vacancies].sort(
    (a, b) => TEAM_ORDER.indexOf(a.team || '') - TEAM_ORDER.indexOf(b.team || '') || a.title.localeCompare(b.title),
  )
  const teams = TEAM_ORDER.filter((t) => all.some((v) => (v.team || '') === t))
  const shown = team === 'ALL' ? all : all.filter((v) => (v.team || '') === team)
  const positions = all.reduce((n, v) => n + (v.positions_available || 0), 0)
  const ready = state.status === 'ready'

  return (
    <>
      <Seo
        title="Careers"
        description={`Join the team at ${company.name}, Westland, Accra. See open roles and apply online.`}
        path="/careers"
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-12 pb-14 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:pt-14 lg:pb-16">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-brand-600" />
              Careers at Farhat
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
              Build your career <span className="text-brand-600">in print.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/70">
              Join the team at Westland, Accra. Learn on modern machines and grow with us as new branches open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#roles" className="rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700">
                See open roles
              </a>
              <a href="#hiring" className="rounded-xl border border-black/15 bg-white px-6 py-3.5 font-semibold hover:border-black/30">
                How hiring works
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-600 p-7 text-white sm:p-8">
            <p className="font-display text-6xl font-extrabold leading-none">{ready ? all.length : '–'}</p>
            <p className="mt-2 text-white/85">
              {ready
                ? `open role${all.length === 1 ? '' : 's'} · ${positions} position${positions === 1 ? '' : 's'}`
                : 'open roles'}
            </p>
            <ul className="mt-6 grid gap-3 border-t border-white/20 pt-5">
              {[[GraduationCap, 'Paid on-the-job training'], [Shirt, 'Staff uniform'], [TrendingUp, 'Grow as new branches open']].map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-3 font-medium">
                  <Icon className="h-5 w-5 text-white/85" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Roles ──────────────────────────────────────── */}
      <section id="roles" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Open roles</h2>
          {teams.length > 1 && (
            <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="group" aria-label="Filter by team">
              <div className="flex gap-2 pb-1">
                {['ALL', ...teams].map((t) => {
                  const count = t === 'ALL' ? all.length : all.filter((v) => (v.team || '') === t).length
                  return (
                    <button
                      key={t || 'other'} type="button" aria-pressed={team === t} onClick={() => setTeam(t)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${
                        team === t ? 'border-brand-600 bg-brand-600 text-white' : 'border-black/15 bg-white text-ink/75 hover:border-black/30'
                      }`}
                    >
                      {t === 'ALL' ? 'All' : TEAM_LABEL[t]} {count}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {state.status === 'loading' && <p className="mt-8 text-ink/55">Loading open roles…</p>}
        {state.status === 'error' && (
          <p className="mt-8 text-ink/65">We couldn't load the open roles right now. Refresh the page, or try again later.</p>
        )}
        {ready && all.length === 0 && (
          <p className="mt-8 max-w-xl text-ink/65">
            There are no open roles right now. You can still send a general application below, and HR will keep it on file.
          </p>
        )}

        {shown.length > 0 && (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((v) => <RoleCard key={v.id} v={v} />)}
          </ul>
        )}
      </section>

      {/* ── Why Farhat ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="rounded-3xl border border-black/10 p-7 sm:p-10">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Why work at Farhat</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(([Icon, title, text]) => (
              <li key={title}>
                <Icon className="h-8 w-8 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-3 font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How hiring works ───────────────────────────── */}
      <section id="hiring" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">How hiring works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, text], i) => (
            <li key={title} className={`border-t-2 pt-4 ${i === 0 ? 'border-brand-600' : 'border-black/10'}`}>
              <p className="font-display text-sm font-extrabold text-brand-600">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-1 font-semibold">{title}</p>
              <p className="text-sm text-ink/60">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── General application ────────────────────────── */}
      <section id="general" className="scroll-mt-24 mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        {general ? (
          <div className="mx-auto max-w-2xl"><ApplyForm vacancy={null} /></div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-7 py-10 text-white sm:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 sm:block">
              <div className="absolute inset-y-0 right-[-10%] w-full skew-x-[-18deg] bg-brand-700" />
              <div className="absolute inset-y-0 right-[-26%] w-full skew-x-[-18deg] bg-brand-800" />
            </div>
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-extrabold">Don't see your role?</h2>
                <p className="mt-2 text-lg text-white/85">Send a general application. HR keeps it on file for future openings.</p>
              </div>
              <button
                type="button" onClick={() => setGeneral(true)}
                className="shrink-0 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink shadow-lg shadow-black/10 hover:bg-brand-50"
              >
                Apply anyway
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
