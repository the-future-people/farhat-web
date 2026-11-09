import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, Camera, CheckCircle2, Clock, FileCheck2, Handshake, Layers, MapPin,
  MessageCircle, Package, Presentation, Printer, ReceiptText, ShieldCheck, Shirt, Store,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import OpenNow from '../components/OpenNow.jsx'
import { waHref, stats, hours, fmtTime, mainBranch, mapsHref, collection } from '../site.js'

const strip = [
  [Printer, 'Printing', 'Colour & B/W', '/services#printing'],
  [Layers, 'Finishing', 'Binding, lamination, cutting', '/services#binding'],
  [Shirt, 'DTF & Embroidery', 'T-shirts, polos, caps', '/services#dtf-embroidery'],
  [Presentation, 'Banners & Signage', 'Flexy, roll-ups, backdrops', '/services#banners'],
  [Package, 'Packaging', 'Boxes, bags, labels', '/services#packaging'],
  [BookOpen, 'Books & Magazines', 'Small runs or bulk', '/services#books'],
  [Camera, 'Passport Photos', 'Ready while you wait', '/services#passport-photos'],
]

const steps = [
  [MessageCircle, 'Send it on WhatsApp', 'Your files, the size and how many. Photos of a sample work too.'],
  [ReceiptText, 'Get the price and time', 'We confirm the cost and exactly when it will be ready.'],
  [Printer, 'We print and finish', 'Printed, cut, bound or laminated to your order.'],
  [Store, 'Collect it', collection],
]

const trust = [
  [ShieldCheck, 'Quality print'],
  [Clock, 'Ready when promised'],
  [Handshake, 'Trusted by 30+ businesses'],
]

export default function Home() {
  return (
    <>
      <Seo description="Large-format printing, branding, packaging and everyday print in Accra. Send your print job on WhatsApp." />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#fefbfa]">
        {/* product photo: fills the right side on desktop, fades into the cream at its left edge */}
        <img
          src="/hero.webp"
          alt="Farhat-branded bag, polo shirt, mug, box, books and a roll-up banner"
          width="1032"
          height="708"
          fetchPriority="high"
          className="absolute top-0 right-0 bottom-0 hidden h-full w-[56%] object-cover object-[80%_50%] lg:block"
          style={{ maskImage: 'linear-gradient(to right, transparent 0, #000 12%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 12%)' }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pt-12 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pt-20 lg:pb-28">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-brand-600" />
              Accra's trusted printing partner
            </p>
            <h1 className="mt-5 font-display text-[3.4rem] leading-[0.95] font-extrabold tracking-tight sm:text-7xl lg:text-[5.5rem]">
              Large.
              <br />
              Bold.
              <br />
              <span className="relative inline-block text-brand-600">
                Printed.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 20"
                  className="absolute -bottom-3 left-[8%] h-4 w-[80%] sm:-bottom-4"
                  preserveAspectRatio="none"
                >
                  <path d="M4 14 C 80 4, 200 2, 296 9" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="mt-9 max-w-lg text-lg leading-relaxed text-ink/70">
              From large-format banners to tender packages, branded wear and packaging, Farhat Printing Press
              prints for people, businesses and organisations across Accra.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waHref()}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700"
              >
                <Printer className="h-5 w-5" aria-hidden="true" />
                Send your print job
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-6 py-3.5 font-semibold text-ink hover:border-black/30"
              >
                Explore services
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-4">
              {trust.map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
                  <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* phones and tablets: the same photo, in the flow under the text */}
          <img
            src="/hero.webp"
            alt=""
            width="1032"
            height="708"
            className="-mx-5 w-[calc(100%+2.5rem)] max-w-none lg:hidden"
            style={{ maskImage: 'linear-gradient(to bottom, transparent 0, #000 12%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 12%)' }}
          />
        </div>
      </section>

      {/* ── Service strip ──────────────────────────────── */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 lg:px-8" aria-label="What we print">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 shadow-xl shadow-black/5 sm:grid-cols-4 lg:grid-cols-7">
          {strip.map(([Icon, title, note, to]) => (
            // last tile spans the leftover space on 2- and 4-column grids
            <li key={title} className={`bg-white ${title === 'Passport Photos' ? 'col-span-2 lg:col-span-1' : ''}`}>
              <Link to={to} className="flex h-full items-start gap-3 p-4 hover:bg-brand-50 lg:flex-col lg:gap-2 lg:p-5">
                <Icon className="h-7 w-7 shrink-0 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block text-xs text-ink/55">{note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">From your phone to a finished print</h2>
          <p className="mt-3 text-lg text-ink/65">No forms, no waiting on hold. Most jobs start with one WhatsApp message.</p>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([Icon, title, text], i) => (
            <li key={title} className="relative rounded-2xl border border-black/10 p-6">
              <span className="absolute top-5 right-5 font-display text-4xl font-extrabold text-brand-100">{i + 1}</span>
              <Icon className="h-8 w-8 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Numbers + tender ───────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Printing for Accra since {stats[2].value}</h2>
            <p className="mt-3 max-w-md text-lg text-ink/65">
              Students, professionals, schools, churches and businesses bring their work to Westland.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                  <dt className="mt-1 text-sm text-ink/60">{s.label}</dt>
                  <dd className="font-display text-2xl font-extrabold text-brand-600 sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
            <FileCheck2 className="h-9 w-9 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Submitting a tender?</h2>
            <p className="mt-2 text-white/70">
              Bring the documents. We format, print, bind and package them ready for submission, same day when you need it.
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm">
              {['Formatting and page layout', 'Colour and black & white printing', 'Binding and labelled packaging'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/solutions#tender"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-white hover:text-brand-100"
            >
              How tender printing works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visit ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-8 rounded-3xl border border-black/10 p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl font-extrabold">Visit us at Westland</h2>
              <OpenNow />
            </div>
            <p className="mt-3 flex items-start gap-2.5 text-lg text-ink/75">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <span>
                {mainBranch.address}
                <span className="block text-base text-ink/50">GPS {mainBranch.gps}</span>
              </span>
            </p>
            <a
              href={mapsHref()}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
            >
              Get directions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <dl className="grid gap-3 rounded-2xl bg-paper p-6">
            {hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt className="text-ink/65">{h.days}</dt>
                <dd className="font-semibold">{h.open ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : 'Closed'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
