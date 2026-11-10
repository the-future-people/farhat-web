import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Printer, TrendingUp } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import ApplyForm from '../components/ApplyForm.jsx'
import { getVacancies, roleHref, TEAM_ORDER, TYPE_LABEL, formatDate } from '../api/careers.js'

// Vacancies come live from Octos HR. Rendered in the browser (they change daily);
// the prerendered page shows the frame and "Loading open positions…".

const steps = [
  ['Apply here', 'Your CV goes straight to HR'],
  ['Screening', 'HR reviews your application'],
  ['Interview', 'At our Westland branch'],
  ['Offer', 'Then onboarding and training'],
]

function VacancyCard({ v }) {
  return (
    <li>
      <Link
        to={roleHref(v)}
        className="group flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-5 hover:border-brand-600/40 hover:shadow-md"
      >
        <div className="min-w-0">
          <p className="font-display text-lg font-bold">{v.title}</p>
          <p className="mt-0.5 text-sm text-ink/60">
            {[v.branch_name || 'Any branch', TYPE_LABEL[v.employment_type] || v.employment_type,
              `${v.positions_available} position${v.positions_available === 1 ? '' : 's'}`].join(' · ')}
          </p>
          {v.closes_at && <p className="mt-1 text-xs text-ink/45">Apply by {formatDate(v.closes_at)}</p>}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600">
          View role <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </li>
  )
}

export default function Careers() {
  const [state, setState] = useState({ status: 'loading', vacancies: [] })
  const [general, setGeneral] = useState(false)

  useEffect(() => {
    getVacancies()
      .then((vacancies) => setState({ status: 'ready', vacancies }))
      .catch(() => setState({ status: 'error', vacancies: [] }))
  }, [])

  // group by team, in a fixed order
  const groups = TEAM_ORDER.map((team) => {
    const items = state.vacancies.filter((v) => (v.team || '') === team)
    const label = items[0]?.team_label || 'Other roles'
    return { team, label, items }
  }).filter((g) => g.items.length)

  return (
    <>
      <Seo
        title="Careers"
        description="Join the team at Farhat Printing Press, Westland, Accra. See open positions and apply online."
        path="/careers"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-14 lg:px-8 lg:pt-16 lg:pb-16">
          <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
            <span className="h-0.5 w-8 rounded-full bg-brand-600" />
            Careers at Farhat
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
            Build your career in print
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            Join the team at Westland, Accra. Learn on modern machines and grow with us as new branches open.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {[[GraduationCap, 'Training on the job'], [Printer, 'Modern machines'], [TrendingUp, 'Room to grow']].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
                <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Open positions</h2>

        {state.status === 'loading' && <p className="mt-6 text-ink/55">Loading open positions…</p>}
        {state.status === 'error' && (
          <p className="mt-6 text-ink/65">
            We couldn't load the open positions right now. Refresh the page, or try again later.
          </p>
        )}
        {state.status === 'ready' && groups.length === 0 && (
          <p className="mt-6 max-w-xl text-ink/65">
            There are no open positions right now. You can still send a general application below, and HR will keep it on file.
          </p>
        )}

        <div className="mt-8 grid gap-10">
          {groups.map((g) => (
            <div key={g.team || 'other'}>
              <h3 className="text-sm font-bold text-ink/50">{g.label}</h3>
              <ul className="mt-3 grid gap-3 lg:grid-cols-2">
                {g.items.map((v) => <VacancyCard key={v.id} v={v} />)}
              </ul>
            </div>
          ))}
        </div>

        {/* General application */}
        <div id="general" className="scroll-mt-28 mt-14">
          {general ? (
            <div className="max-w-2xl"><ApplyForm vacancy={null} /></div>
          ) : (
            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-black/20 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-bold">Don't see your role?</p>
                <p className="text-ink/60">Send a general application. HR keeps it on file for future openings.</p>
              </div>
              <button
                onClick={() => setGeneral(true)}
                className="shrink-0 rounded-xl border border-black/15 px-5 py-3 font-semibold hover:border-black/30"
              >
                Apply anyway
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl bg-paper p-7 sm:p-10">
          <h2 className="font-display text-2xl font-extrabold">How hiring works</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-ink/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
