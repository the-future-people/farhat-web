import { useState } from 'react'
import { Camera, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { work, serviceCategories, waHref } from '../site.js'

// Hidden from the menu (site.js → nav) until `work` has real jobs in it.
function Empty() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-black/15 p-10 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
        <Camera className="h-7 w-7 text-brand-600" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-extrabold">Our gallery is on its way</h2>
      <p className="mt-2 text-ink/65">
        We're photographing recent jobs now. Want to see samples of something specific? Ask on WhatsApp and we'll
        send photos.
      </p>
      <a
        href={waHref("Hi Farhat, could you send me some samples of your work? I'm interested in:")}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Ask for samples
      </a>
    </div>
  )
}

function Gallery() {
  const [filter, setFilter] = useState('all')
  const count = (id) => work.filter((w) => w.category === id).length
  const chips = [
    { id: 'all', label: 'All work', n: work.length },
    ...serviceCategories.map((c) => ({ ...c, n: count(c.id) })).filter((c) => c.n > 0),
  ]
  const shown = filter === 'all' ? work : work.filter((w) => w.category === filter)
  const label = Object.fromEntries(serviceCategories.map((c) => [c.id, c.label]))

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="group" aria-label="Filter work">
        <div className="flex gap-2 pb-1">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${
                filter === c.id ? 'border-brand-600 bg-brand-600 text-white' : 'border-black/15 bg-white text-ink/75 hover:border-black/30'
              }`}
            >
              {c.label} ({c.n})
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w) => (
          <li key={w.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="relative aspect-[4/3] bg-paper">
              <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-medium">{label[w.category]}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold">{w.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{w.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function OurWork() {
  return (
    <>
      <Seo
        title="Our Work"
        description="Print and branding projects delivered by Farhat Printing Press in Accra."
        path="/our-work"
        noindex={work.length === 0}
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
          <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
            <span className="h-0.5 w-8 rounded-full bg-brand-600" />
            Our work
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
            Print projects we've delivered
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            Recent print and branding jobs for businesses, schools, organisations and individuals across Accra.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">{work.length ? <Gallery /> : <Empty />}</section>
      <CtaBanner title="Have a project in mind?" text="Tell us what you need and we'll bring it to life with quality print." />
    </>
  )
}
