import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Dot } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import ApplyForm from '../components/ApplyForm.jsx'
import { getVacancy, idFromSlug, lines, formatDate, TYPE_LABEL } from '../api/careers.js'

// One vacancy. Rendered in the browser from the live API. The prerendered shell
// (/careers/role, served for every /careers/<slug> by vercel.json) shows the same
// "Loading…" frame this component starts with, so hydration matches.

function List({ items, icon: Icon }) {
  return (
    <ul className="mt-3 grid gap-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-ink/75">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={Icon === Check ? 2.5 : 3} aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

function Fact({ label, value }) {
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-xs text-ink/50">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}

export default function CareerRole() {
  const { slug } = useParams()
  const id = idFromSlug(slug)
  const [state, setState] = useState({ status: 'loading', v: null })

  useEffect(() => {
    if (!id) { setState({ status: 'missing', v: null }); return }
    getVacancy(id)
      .then((v) => setState(v ? { status: 'ready', v } : { status: 'missing', v: null }))
      .catch(() => setState({ status: 'error', v: null }))
  }, [id])

  const { status, v } = state
  const back = (
    <Link to="/careers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-ink">
      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All positions
    </Link>
  )

  if (status !== 'ready') {
    return (
      <>
        <Seo title="Careers" description="Open positions at Farhat Printing Press, Accra." path="/careers" noindex />
        <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
          {back}
          {status === 'loading' && <p className="mt-8 text-ink/55">Loading…</p>}
          {status === 'missing' && (
            <div className="mt-8">
              <h1 className="font-display text-3xl font-extrabold">This position is no longer open</h1>
              <p className="mt-2 text-ink/65">It may have been filled or closed. See the roles that are open now.</p>
            </div>
          )}
          {status === 'error' && <p className="mt-8 text-ink/65">We couldn't load this position. Refresh the page, or try again later.</p>}
        </section>
      </>
    )
  }

  const duties = lines(v.responsibilities)
  const reqs = lines(v.requirements)
  const perks = lines(v.benefits)

  return (
    <>
      <Seo
        title={`${v.title} · Careers`}
        description={v.description || `Apply for ${v.title} at Farhat Printing Press, ${v.branch_name || 'Accra'}.`}
        path={`/careers/${slug}`}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-10 lg:px-8">
          {back}
          {v.team_label && <p className="mt-6 text-sm font-bold text-brand-600">{v.team_label}</p>}
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{v.title}</h1>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Fact label="Branch" value={v.branch_name || 'Any branch'} />
            <Fact label="Type" value={TYPE_LABEL[v.employment_type] || v.employment_type} />
            <Fact label="Openings" value={`${v.positions_available} position${v.positions_available === 1 ? '' : 's'}`} />
            <Fact label="Apply by" value={formatDate(v.closes_at)} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-8">
        <div className="grid gap-8">
          {v.description && (
            <div>
              <h2 className="font-display text-xl font-bold">The role</h2>
              <p className="mt-2 leading-relaxed whitespace-pre-line text-ink/75">{v.description}</p>
            </div>
          )}
          {duties.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">What you'll do</h2>
              <List items={duties} icon={Check} />
            </div>
          )}
          {reqs.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">What we're looking for</h2>
              <List items={reqs} icon={Dot} />
            </div>
          )}
        </div>

        <aside className="grid content-start gap-5">
          <div className="rounded-2xl border border-black/10 p-5">
            <h2 className="font-display text-lg font-bold">Pay and hours</h2>
            <p className="mt-3 text-xs text-ink/50">Pay</p>
            <p className="font-semibold">{v.pay_text || 'Discussed at interview'}</p>
            {v.working_hours && (
              <>
                <p className="mt-3 text-xs text-ink/50">Hours</p>
                <p>{v.working_hours}</p>
              </>
            )}
            {perks.length > 0 && (
              <>
                <p className="mt-3 text-xs text-ink/50">Also</p>
                <p>{perks.join(', ')}</p>
              </>
            )}
          </div>
          <a href="#apply" className="rounded-xl bg-brand-600 px-6 py-3.5 text-center font-semibold text-white hover:bg-brand-700 lg:hidden">
            Apply for this role
          </a>
        </aside>
      </section>

      <section id="apply" className="scroll-mt-24 mx-auto max-w-3xl px-5 pb-20 lg:px-8">
        <ApplyForm vacancy={v} />
      </section>
    </>
  )
}
