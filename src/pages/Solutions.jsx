import {
  ArrowRight, Briefcase, Building2, CalendarDays, Check, FileCheck2, GraduationCap, Layers,
  MessageCircle, Package, PenTool, Printer, ReceiptText, Store, User,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { solutions, waHref, collection } from '../site.js'

const icons = {
  education: GraduationCap,
  corporate: Briefcase,
  events: CalendarDays,
  retail: Package,
  organisations: Building2,
  personal: User,
}

// What each kind of customer usually prints with us.
const examples = {
  education: ['Exam papers and handouts', 'Certificates and ID cards', 'Admission banners', 'Brochures and yearbooks'],
  corporate: ['Business cards and letterheads', 'Branded polos and caps', 'Roll-up stands', 'Reports and proposals'],
  events: ['Backdrops and flexy banners', 'Programmes and invitations', 'Branded T-shirts', 'Stickers and labels'],
  retail: ['Product labels and stickers', 'Custom boxes and paper bags', 'Flyers and price cards', 'Shop signage'],
  organisations: ['Church programmes and calendars', 'Banners for events', 'Branded shirts', 'Annual reports'],
  personal: ['Documents and CVs', 'Passport and photo prints', 'Binding for projects', 'Scanning and typing'],
}

const capabilities = [
  [PenTool, 'Design & file prep', 'Layout, artwork fixes and files made print-ready.'],
  [Printer, 'Print production', 'Small runs to large volumes, every size we offer.'],
  [Layers, 'Finishing', 'Binding, lamination, cutting and more.'],
  [Package, 'Packaging', 'Custom boxes, bags and branded packaging.'],
  [Store, 'Collection', 'Ready at Westland, or send a rider to pick up.'],
]

const process = [
  [MessageCircle, 'Tell us what you need', 'Your idea, your files, or a photo of a sample.'],
  [ReceiptText, 'Get a clear price', 'The cost and the ready time, before anything is printed.'],
  [Printer, 'We print and finish', 'Produced and checked with the right finishing.'],
  [Store, 'Collect it', collection],
]

const tenderIncluded = [
  'Document formatting and professional layout',
  'Colour and black & white printing',
  'Binding and finishing',
  'Submission-ready packaging and labelling',
  'Same-day and urgent orders accepted',
]

const tenderSteps = [
  ['Send your files', 'WhatsApp them or walk in with your documents. We confirm the scope and when it will be ready.'],
  ['We format and print', 'Layout, page numbering and production-quality printing to the tender’s requirements.'],
  ['Binding and packaging', 'Bound, labelled and packaged exactly as the submission requires.'],
  ['Collect', 'Pick up at Westland, or send someone to collect for you.'],
]

const industries = solutions.filter((s) => s.id !== 'tender')

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Print and branding for schools, businesses, events, shops, organisations and individuals, plus tender document preparation, at Farhat Printing Press, Accra."
        path="/solutions"
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-12 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
          <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
            <span className="h-0.5 w-8 rounded-full bg-brand-600" />
            Our solutions
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
            Printing solutions for every need
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            Print and branding for schools, businesses, events and organisations, designed to help you communicate,
            promote and grow.
          </p>
          <a
            href="#tender"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-white hover:bg-black"
          >
            <FileCheck2 className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Preparing a tender? Start here
          </a>
        </div>
      </section>

      {/* ── By industry ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Solutions by industry</h2>
          <p className="text-ink/60">What different customers usually print with us.</p>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((s) => {
            const Icon = icons[s.id]
            return (
              <li key={s.id} id={s.id} className="scroll-mt-28 flex flex-col rounded-2xl border border-black/10 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.name}</h3>
                <p className="mt-1 text-ink/65">{s.summary}</p>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-ink/75">
                  {examples[s.id].map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} aria-hidden="true" />
                      {e}
                    </li>
                  ))}
                </ul>
                <a
                  href={waHref(`Hi Farhat, I'd like to talk about printing for ${s.name.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Talk to us about it <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ── Capabilities ───────────────────────────────── */}
      <section className="bg-brand-50/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_3fr] lg:items-center lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-extrabold">What we handle</h2>
            <p className="mt-2 text-ink/65">From your idea to the finished piece, under one roof.</p>
          </div>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {capabilities.map(([Icon, title, text]) => (
              <li key={title}>
                <Icon className="h-8 w-8 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-3 font-semibold">{title}</p>
                <p className="mt-1 text-sm text-ink/60">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Our process</h2>
          <p className="text-ink/60">From your idea to a finished print.</p>
        </div>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([Icon, title, text], i) => (
            <li key={title} className="rounded-2xl border border-black/10 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Tender ─────────────────────────────────────── */}
      <section id="tender" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-brand-600" />
              Specialist service
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Tender &amp; document services</h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">
              Winning a tender starts with a professional submission. We prepare, print and package your tender
              documents to the standard the panel expects.
            </p>
            <ul className="mt-7 space-y-3">
              {tenderIncluded.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-600">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={waHref("Hi Farhat, I'm preparing a tender submission and need help with the documents.")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold hover:bg-brand-700"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>

          <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 sm:p-9">
            <h3 className="font-display text-xl font-bold">How it works</h3>
            <ol className="mt-5 divide-y divide-white/10">
              {tenderSteps.map(([title, text], i) => (
                <li key={title} className="flex gap-5 py-5">
                  <span className="w-7 shrink-0 font-display text-3xl font-extrabold text-brand-600">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-white/60">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="pt-16 lg:pt-20">
        <CtaBanner title="Ready to bring your idea to life?" text="Let's create a print solution that works for you." />
      </div>
    </>
  )
}
