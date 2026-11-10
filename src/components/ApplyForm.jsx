import { useRef, useState } from 'react'
import { CircleCheck, FileText, Send } from 'lucide-react'
import { submitApplication } from '../api/careers.js'

// Posts straight to Octos HR (/api/v1/careers/apply/). No WhatsApp anywhere.
// `vacancy` is null for a general application.

const MAX_BYTES = 5 * 1024 * 1024
const OK_TYPES = ['.pdf', '.doc', '.docx']

const input =
  'mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-ink placeholder:text-ink/40 ' +
  'focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 focus:outline-none'

function checkFile(file, label, required) {
  if (!file) return required ? `Attach your ${label}.` : ''
  const ext = '.' + (file.name.split('.').pop() || '').toLowerCase()
  if (!OK_TYPES.includes(ext)) return `${label[0].toUpperCase() + label.slice(1)} must be a PDF or Word document.`
  if (file.size > MAX_BYTES) return `${label[0].toUpperCase() + label.slice(1)} must be 5 MB or smaller.`
  return ''
}

function FilePick({ label, hint, file, onPick, error }) {
  const ref = useRef(null)
  return (
    <div>
      <span className="text-sm font-semibold">{label}</span>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`mt-1.5 flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-left ${
          error ? 'border-brand-600' : 'border-black/25 hover:border-black/40'
        }`}
      >
        <FileText className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-sm text-ink/70">{file ? file.name : hint}</span>
        <span className="shrink-0 text-sm font-semibold text-brand-600">{file ? 'Change' : 'Choose file'}</span>
      </button>
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] || null)}
      />
      {error && <p className="mt-1 text-sm text-brand-700">{error}</p>}
    </div>
  )
}

export default function ApplyForm({ vacancy = null }) {
  const [f, setF] = useState({ first: '', last: '', phone: '', email: '', channel: 'SMS', website: '' })
  const [cv, setCv] = useState(null)
  const [cover, setCover] = useState(null)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k) => (e) => {
    setF((v) => ({ ...v, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: '', form: '' }))
  }

  const phoneDigits = f.phone.replace(/\D/g, '').replace(/^233/, '').replace(/^0/, '')

  async function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!f.first.trim()) errs.first = 'Enter your first name.'
    if (!f.last.trim()) errs.last = 'Enter your last name.'
    if (phoneDigits.length !== 9) errs.phone = 'Enter a Ghana number, e.g. 24 412 3456.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errs.email = 'Enter a valid email address.'
    const cvErr = checkFile(cv, 'CV', true)
    if (cvErr) errs.cv = cvErr
    const coverErr = checkFile(cover, 'cover letter', false)
    if (coverErr) errs.cover_letter = coverErr
    if (!consent) errs.consent = 'Tick the box so we can keep your details for this application.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const fd = new FormData()
    fd.append('first_name', f.first.trim())
    fd.append('last_name', f.last.trim())
    fd.append('phone', '+233' + phoneDigits)
    fd.append('email', f.email.trim())
    fd.append('preferred_channel', f.channel)
    fd.append('cv', cv)
    if (cover) fd.append('cover_letter', cover)
    if (vacancy) fd.append('vacancy', String(vacancy.id))
    if (f.website) fd.append('website', f.website) // honeypot: only bots fill it

    setSending(true)
    const result = await submitApplication(fd)
    setSending(false)
    if (result.ok) setDone(true)
    else {
      // map server field names onto the form's
      const map = { first_name: 'first', last_name: 'last', preferred_channel: 'form' }
      const mapped = {}
      Object.entries(result.errors).forEach(([k, v]) => { mapped[map[k] || k] = v })
      setErrors(mapped)
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm" role="status">
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-600" strokeWidth={1.6} aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-extrabold">Application received</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/65">
          Thank you, {f.first.trim()}. Our HR team will review it and contact you by{' '}
          {f.channel === 'EMAIL' ? 'email' : f.channel === 'WHATSAPP' ? 'WhatsApp' : 'SMS'}.
        </p>
      </div>
    )
  }

  const err = (k) => errors[k] && <p className="mt-1 text-sm text-brand-700">{errors[k]}</p>

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
      <h3 className="font-display text-2xl font-extrabold">
        {vacancy ? `Apply for ${vacancy.title}` : 'Send a general application'}
      </h3>
      <p className="mt-1 text-sm text-ink/60">Goes straight to our HR team.</p>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">First name</span>
            <input className={input} autoComplete="given-name" value={f.first} onChange={set('first')} placeholder="Ama" />
            {err('first')}
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Last name</span>
            <input className={input} autoComplete="family-name" value={f.last} onChange={set('last')} placeholder="Mensah" />
            {err('last')}
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold">Phone number</span>
          <div className="mt-1.5 flex rounded-xl border border-black/15 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
            <span className="flex items-center border-r border-black/10 px-3.5 whitespace-nowrap text-ink/70">+233</span>
            <input
              type="tel" inputMode="tel" autoComplete="tel-national"
              className="w-full rounded-r-xl px-4 py-3 placeholder:text-ink/40 focus:outline-none"
              value={f.phone} onChange={set('phone')} placeholder="24 412 3456"
            />
          </div>
          {err('phone')}
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Email</span>
          <input className={input} type="email" autoComplete="email" value={f.email} onChange={set('email')} placeholder="ama@example.com" />
          {err('email')}
        </label>

        <fieldset>
          <legend className="text-sm font-semibold">How should HR contact you?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[['SMS', 'SMS'], ['WHATSAPP', 'WhatsApp'], ['EMAIL', 'Email']].map(([value, label]) => (
              <button
                key={value} type="button" aria-pressed={f.channel === value}
                onClick={() => setF((v) => ({ ...v, channel: value }))}
                className={`rounded-full border px-5 py-2 text-sm font-medium ${
                  f.channel === value ? 'border-brand-600 bg-brand-600 text-white' : 'border-black/15 text-ink/75 hover:border-black/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <FilePick
          label="CV" hint="PDF or Word, up to 5 MB" file={cv} error={errors.cv}
          onPick={(file) => { setCv(file); setErrors((x) => ({ ...x, cv: '', form: '' })) }}
        />
        <FilePick
          label="Cover letter (optional)" hint="PDF or Word, up to 5 MB" file={cover} error={errors.cover_letter}
          onPick={(file) => { setCover(file); setErrors((x) => ({ ...x, cover_letter: '', form: '' })) }}
        />

        {/* Honeypot: hidden from people and screen readers; bots fill it */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
        </div>

        <label className="flex items-start gap-3 text-sm text-ink/70">
          <input
            type="checkbox" checked={consent}
            onChange={(e) => { setConsent(e.target.checked); setErrors((x) => ({ ...x, consent: '' })) }}
            className="mt-0.5 h-4 w-4 accent-brand-600"
          />
          <span>I agree that Farhat Printing Press may store my details to process this application.</span>
        </label>
        {err('consent')}

        {errors.form && <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">{errors.form}</p>}

        <button
          type="submit" disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          {sending ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}
