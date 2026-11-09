import { useState } from 'react'
import {
  ArrowUpRight, Clock, Handshake, Mail, MapPin, MessageCircle, Phone, Send, Zap, CircleCheck,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import OpenNow from '../components/OpenNow.jsx'
import {
  company, phone, telHref, waHref, hours, fmtTime, branches, mainBranch, mapsHref, mapEmbedSrc, services, collection,
} from '../site.js'

const mapSrc = mapEmbedSrc()

const inputClass =
  'mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 ' +
  'focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 focus:outline-none'

// No backend yet: the form writes the message out and opens WhatsApp with it.
// At integration, this becomes a lead in Octos instead.
function ContactForm() {
  const [f, setF] = useState({ name: '', phone: '', email: '', need: '', details: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  function submit(e) {
    e.preventDefault()
    const lines = [
      `Hi Farhat, I'm ${f.name.trim()}.`,
      `I need: ${f.need}`,
      '',
      f.details.trim(),
      '',
      `Phone: +233 ${f.phone.trim().replace(/^0/, '')}`,
      f.email.trim() ? `Email: ${f.email.trim()}` : null,
      '(Sent from the website)',
    ].filter((l) => l !== null)
    window.open(waHref(lines.join('\n')), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
      <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Send us a message</h2>
      <p className="mt-1.5 text-sm text-ink/60">It opens in WhatsApp with everything written out. Just press send.</p>

      <div className="mt-6 grid gap-5">
        <label className="block">
          <span className="text-sm font-semibold">Full name <span className="text-brand-600">*</span></span>
          <input required autoComplete="name" value={f.name} onChange={set('name')} className={inputClass} placeholder="Your name" />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Phone number <span className="text-brand-600">*</span></span>
          <div className="mt-1.5 flex rounded-xl border border-black/15 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
            <span className="flex items-center border-r border-black/10 px-3.5 whitespace-nowrap text-ink/70">+233</span>
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              pattern="0?[0-9]{9}"
              title="9 digits, e.g. 55 196 9777"
              value={f.phone}
              onChange={set('phone')}
              className="w-full rounded-r-xl px-4 py-3 placeholder:text-ink/40 focus:outline-none"
              placeholder="e.g. 55 196 9777"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Email <span className="font-normal text-ink/50">(optional)</span></span>
          <input type="email" autoComplete="email" value={f.email} onChange={set('email')} className={inputClass} placeholder="you@example.com" />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">What do you need? <span className="text-brand-600">*</span></span>
          <select required value={f.need} onChange={set('need')} className={inputClass}>
            <option value="" disabled>Choose a service</option>
            {services.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
            <option>Tender documents</option>
            <option>Something else</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Job details <span className="text-brand-600">*</span></span>
          <textarea
            required
            rows={4}
            value={f.details}
            onChange={set('details')}
            className={inputClass}
            placeholder="Size, quantity, material, finishing and when you need it"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-700"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          Continue in WhatsApp
        </button>

        {sent && (
          <p className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            WhatsApp opened with your message. Press send there and we'll reply. Attach your files in the same chat.
          </p>
        )}
      </div>
    </form>
  )
}

function Way({ icon: Icon, title, children, action }) {
  return (
    <li className="flex items-start gap-4 py-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
        <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <div className="text-ink/70">{children}</div>
      </div>
      {action}
    </li>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Visit Farhat Printing Press at 63 Westlands Ave, Accra, call +233 55 196 9777, or send your print job on WhatsApp."
        path="/contact"
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
          <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
            <span className="h-0.5 w-8 rounded-full bg-brand-600" />
            Contact us
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
            Let's print your next project
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            A print job, a question or a price. WhatsApp is fastest, and you can send your files in the same chat.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {[
              [Zap, 'Quick replies on WhatsApp'],
              [CircleCheck, 'Price confirmed before printing'],
              [Clock, 'Open six days a week'],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
                <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Form + ways to reach ───────────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-8 lg:py-20">
        <ContactForm />

        <div>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Get in touch</h2>
          <ul className="mt-2 divide-y divide-black/10">
            <Way
              icon={MessageCircle}
              title="WhatsApp"
              action={
                <a
                  href={waHref()}
                  target="_blank"
                  rel="noopener"
                  className="hidden shrink-0 items-center gap-1 self-center rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100 sm:inline-flex"
                >
                  Chat <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              }
            >
              <a href={waHref()} target="_blank" rel="noopener" className="hover:text-ink">{phone.display}</a>
            </Way>
            <Way icon={Phone} title="Call us">
              <a href={telHref} className="hover:text-ink">{phone.display}</a>
            </Way>
            <Way icon={Mail} title="Email">
              <a href={`mailto:${company.email}`} className="break-all hover:text-ink">{company.email}</a>
            </Way>
            <Way icon={MapPin} title="Visit Westland">
              {mainBranch.address}
              <span className="block text-sm text-ink/50">GPS {mainBranch.gps}</span>
            </Way>
          </ul>

          <div className="mt-4 rounded-2xl bg-paper p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">Opening hours</p>
              <OpenNow />
            </div>
            <dl className="mt-3 grid gap-2 text-sm">
              {hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-ink/65">{h.days}</dt>
                  <dd className="font-semibold">{h.open ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : 'Closed'}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 border-t border-black/10 pt-3 text-sm text-ink/60">{collection}</p>
          </div>
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8" aria-label="Map">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Find us</h2>
          <a
            href={mapsHref()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700"
          >
            Open in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        {mapSrc ? (
          <div className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-paper">
            <iframe
              title="Farhat Printing Press on Google Maps"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full sm:h-96"
            />
          </div>
        ) : (
          // Until the exact pin is set in site.js, no map (a vague search would show other shops).
          <div className="mt-5 grid gap-6 rounded-3xl border border-black/10 bg-paper p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600">
              <MapPin className="h-8 w-8 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl font-bold">{mainBranch.address}</p>
              <p className="mt-1 text-ink/65">
                GhanaPost GPS <span className="font-semibold text-ink">{mainBranch.gps}</span>. Give it to your driver or rider.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Branches ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-3xl bg-paper p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Our branches</h2>
            <p className="mt-2 text-ink/65">Westland is open now. More branches across Accra are on the way.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {branches.map((b) => (
              <li
                key={b.id}
                className={`rounded-2xl p-5 ${b.open ? 'bg-white shadow-sm' : 'border border-dashed border-black/15'}`}
              >
                <MapPin className={`h-6 w-6 ${b.open ? 'text-brand-600' : 'text-ink/30'}`} aria-hidden="true" />
                <p className={`mt-3 font-semibold ${b.open ? '' : 'text-ink/55'}`}>{b.name}</p>
                <p className="text-sm text-ink/50">{b.open ? b.address : 'Coming soon'}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Partners (footer: "Become a partner") ─────── */}
      <section id="partners" className="scroll-mt-28 mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-ink p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <Handshake className="h-10 w-10 shrink-0 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl font-extrabold">Own a print shop?</h2>
              <p className="mt-1.5 max-w-xl text-white/70">
                We're building a partner network for shops across Accra: overflow jobs, shared capacity, more customers
                served. Tell us about your shop and we'll be in touch when it opens.
              </p>
            </div>
          </div>
          <a
            href={waHref("Hi Farhat, I own a print shop and I'm interested in the partner network. Here's about my shop:")}
            target="_blank"
            rel="noopener"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold whitespace-nowrap hover:bg-brand-700"
          >
            Register interest
          </a>
        </div>
      </section>
    </>
  )
}
