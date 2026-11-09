import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ArrowUpRight, BookOpen, Camera, Clock, Layers, MessageCircle, Newspaper, Package,
  PanelsTopLeft, Plus, Presentation, Printer, ShieldCheck, Shirt, Sticker, Store,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { services, serviceCategories, alsoAvailable, waHref, collection } from '../site.js'

const icons = {
  printing: Printer,
  'flyers-cards': Newspaper,
  books: BookOpen,
  'passport-photos': Camera,
  banners: Presentation,
  stickers: Sticker,
  binding: Layers,
  lamination: PanelsTopLeft,
  'dtf-embroidery': Shirt,
  packaging: Package,
}

const categoryLabel = Object.fromEntries(serviceCategories.map((c) => [c.id, c.label]))

function ServiceCard({ s, highlighted }) {
  const Icon = icons[s.id] ?? Printer
  return (
    <li
      id={s.id}
      className={`scroll-mt-28 flex overflow-hidden sm:flex-col rounded-2xl border bg-white transition-shadow ${
        highlighted ? 'border-brand-600 shadow-lg shadow-brand-600/15 ring-2 ring-brand-600' : 'border-black/10'
      }`}
    >
      {/* icon panel stands in for a photo until real job photos exist; a side strip on phones */}
      <div className="relative flex w-20 shrink-0 items-center justify-center bg-paper sm:h-36 sm:w-auto">
        <Icon className="h-9 w-9 text-brand-600 sm:h-14 sm:w-14" strokeWidth={1.3} aria-hidden="true" />
        <span className="absolute top-3 left-3 hidden rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink/60 sm:inline">
          {categoryLabel[s.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{s.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/65">{s.summary}</p>
        {s.available ? (
          <a
            href={waHref(`Hi Farhat, I'd like a price for ${s.name.toLowerCase()}.`)}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Ask for a price <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="mt-4 text-sm font-medium text-ink/45">Coming soon</span>
        )}
      </div>
    </li>
  )
}

export default function Services() {
  const [filter, setFilter] = useState('all')
  const [highlight, setHighlight] = useState(null)
  const { hash } = useLocation()

  // /services#banners → show everything, scroll to the card, flash it.
  useEffect(() => {
    const id = hash.slice(1)
    if (!id || !services.some((s) => s.id === id)) return
    setFilter('all')
    setHighlight(id)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    const t = setTimeout(() => setHighlight(null), 2200)
    return () => clearTimeout(t)
  }, [hash])

  const shown = filter === 'all' ? services : services.filter((s) => s.category === filter)
  const chips = [{ id: 'all', label: 'All services' }, ...serviceCategories]

  return (
    <>
      <Seo
        title="Services"
        description="Printing, banners and signage, stickers, binding, lamination, DTF and embroidery, packaging and more at Farhat Printing Press, Accra."
        path="/services"
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-8 lg:pt-20 lg:pb-20">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-brand-600" />
              Our services
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
              Complete printing &amp; branding
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              From a single page to thousands of flyers, from a T-shirt to a full event backdrop. Everyday print and
              large-scale jobs, done properly.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {[
                [ShieldCheck, 'Checked before it leaves'],
                [Clock, 'Ready when promised'],
                [Store, 'Collect at Westland'],
              ].map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
                  <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-brand-600 p-8 text-white shadow-xl shadow-brand-600/20 sm:p-10">
            <MessageCircle className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">Not sure what to ask for?</h2>
            <p className="mt-2 text-white/85">
              Send a photo of something like it, or describe what it's for. We'll tell you what works, what it costs
              and when it'll be ready.
            </p>
            <a
              href={waHref("Hi Farhat, I'm not sure what I need. Here's what it's for:")}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink hover:bg-brand-50"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Catalogue ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">What we print</h2>
          {/* chips scroll sideways on phones instead of wrapping into a wall */}
          <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="group" aria-label="Filter services">
            <div className="flex gap-2 pb-1">
              {chips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    filter === c.id
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-black/15 bg-white text-ink/75 hover:border-black/30'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {shown.map((s) => (
            <ServiceCard key={s.id} s={s} highlighted={highlight === s.id} />
          ))}
        </ul>

        {/* ── Also available + good to know ───────────── */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 p-7">
            <h2 className="font-display text-xl font-bold">Also available</h2>
            <ul className="mt-4 grid gap-2.5">
              {alsoAvailable.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-ink/75">
                  <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-paper p-7">
            <h2 className="font-display text-xl font-bold">Good to know</h2>
            <ul className="mt-4 grid gap-3 text-ink/75">
              <li>Prices depend on size, quantity, material and finishing, so we confirm each job before printing.</li>
              <li>Big runs of 1,000 pieces or more can go to offset printing for a better unit price.</li>
              <li>{collection}</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner title="Have a custom request?" text="Tell us what you need and we'll get it printed for you." />
    </>
  )
}
