import { Award, Check, ClipboardList, Eye, Gem, Layers, Target, Zap, Handshake } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { company, stats } from '../site.js'

const values = [
  'Quality in every print',
  'Ready when we say it will be',
  'Clear prices, confirmed before we print',
  'Honest advice, even when it means a smaller job',
  'Respect for every customer, one page or ten thousand',
]

const reasons = [
  [Award, 'Professional quality'],
  [Zap, 'Fast turnaround'],
  [Layers, 'Wide range of services'],
  [ClipboardList, 'Every job tracked'],
  [Handshake, 'A reliable print partner'],
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={`${company.name} is a Ghanaian printing and branding company at Westland, Accra, serving people, businesses and organisations since ${company.founded}.`}
        path="/about"
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-12 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-8 lg:pt-20 lg:pb-20">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-brand-600" />
              About Farhat
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              More than printing.
              <span className="block text-brand-600">A print partner.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              {company.name} is a Ghanaian printing and branding company. We print for students, professionals,
              schools, churches and businesses, from a single document to a full brand rollout.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:flex-row-reverse lg:items-center lg:justify-end lg:gap-5">
                <dt className="mt-1 text-sm text-ink/60 lg:mt-0">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold text-brand-600 sm:text-4xl lg:w-32">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Our story</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/75">
            <p>
              Farhat opened at Westland in {company.founded} with a simple aim: make good printing easy to get in Accra.
              No guessing at prices, no chasing a job that isn't ready, no settling for a print that's nearly right.
            </p>
            <p>
              Since then we've completed more than 5,000 jobs and work with over 30 businesses. Every job is recorded
              and tracked from the counter to collection, so we know where your work is, and so do you.
            </p>
            <p>More branches across Accra are on the way.</p>
          </div>
        </div>
      </section>

      {/* ── Mission / vision / values ──────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-3 lg:px-8">
        <div className="rounded-3xl bg-brand-50 p-8">
          <Target className="h-10 w-10 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl font-extrabold">Our mission</h2>
          <p className="mt-3 leading-relaxed text-ink/75">
            To deliver printing and branding that helps our customers communicate, promote and grow.
          </p>
        </div>
        <div className="rounded-3xl bg-paper p-8">
          <Eye className="h-10 w-10 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl font-extrabold">Our vision</h2>
          <p className="mt-3 leading-relaxed text-ink/75">
            To be Ghana's most trusted printing partner, known for quality, reliability and customer success.
          </p>
        </div>
        <div className="rounded-3xl border border-black/10 p-8">
          <Gem className="h-10 w-10 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="mt-5 font-display text-2xl font-extrabold">Our values</h2>
          <ul className="mt-3 space-y-2">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-ink/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why choose us ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-800 p-8 text-white sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:w-56">Why choose us?</h2>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:border-l lg:border-white/20 lg:pl-12">
            {reasons.map(([Icon, label]) => (
              <li key={label} className="flex flex-col items-start gap-3 lg:items-center lg:text-center">
                <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-semibold leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
