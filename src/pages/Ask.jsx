// src/pages/Ask.jsx
// "Not sure what to ask for?" (23 Nov 2026). The visitor shows Octos a photo,
// short video or GIF of something like what they want. Octos works out what
// it is (searching the web when it needs to), then whether Farhat can make it,
// roughly what it costs and when it'd be ready. While it works, the Farhat
// hummingbird hovers round their photo and four steps tick off with what
// Octos is finding. Then: continue on WhatsApp (the case number goes with
// them, so Octos picks up where it left off) or order online.

import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ImagePlus, MessageCircle, RotateCcw, ShoppingBag, X } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Hummingbird from '../components/Hummingbird.jsx'
import { getLook, startLook } from '../api/sandbox.js'
import { orderUrl, waHref } from '../site.js'

const STEPS = ['Looking at your photo', 'Searching to identify it', 'Checking what we can make', 'Working out price and time']
const FINISHED = ['DONE', 'UNSURE', 'FAILED']
const STEP_MS = 900          // the slowest a step may tick, so each one can be read
const POLL_MS = 1500
const SLOW_MS = 30000        // "This one's unusual, still checking…"
const GIVE_UP_MS = 150000

const VERDICT = {
  yes: ['We can make this', 'bg-emerald-50 text-emerald-800'],
  partly: ['We can do part of this', 'bg-amber-50 text-amber-800'],
  no: ["We don't make this", 'bg-ink/5 text-ink/70'],
  unsure: ["We're checking with the team", 'bg-amber-50 text-amber-800'],
}

function price(r) {
  if (r.price_from && r.price_to && r.price_from !== r.price_to) return `${r.price_from} – ${r.price_to.replace('GHS ', '')}`
  if (r.price_from) return `From ${r.price_from}`
  return 'A person will confirm'
}

function Picker({ files, setFiles, note, setNote, onAsk, error, busy }) {
  const input = useRef(null)
  const previews = useMemo(() => files.map((f) => ({ f, url: URL.createObjectURL(f) })), [files])
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews])

  const add = (list) => {
    const picked = Array.from(list || [])
    const moving = picked.find((f) => f.type.startsWith('video/') || f.type === 'image/gif')
    setFiles(moving ? [moving] : [...files.filter((f) => f.type.startsWith('image/') && f.type !== 'image/gif'), ...picked].slice(0, 3))
  }

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files) }}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/15 bg-paper px-6 py-10 text-center hover:border-brand-600/50"
      >
        <ImagePlus className="h-9 w-9 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-semibold">Add a photo, a short video or a GIF</span>
        <span className="text-sm text-ink/55">Up to 3 photos, or one video (30 seconds) or GIF</span>
      </button>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/gif,video/mp4,video/quicktime,video/webm"
        multiple
        className="hidden"
        onChange={(e) => { add(e.target.files); e.target.value = '' }}
      />

      {previews.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-3">
          {previews.map(({ f, url }) => (
            <li key={url} className="relative h-24 w-24 overflow-hidden rounded-xl border border-black/10 bg-paper">
              {f.type.startsWith('video/')
                ? <video src={url} className="h-full w-full object-cover" muted />
                : <img src={url} alt="" className="h-full w-full object-cover" />}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => setFiles(files.filter((x) => x !== f))}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink shadow"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <label className="mt-6 block">
        <span className="text-sm font-semibold">Anything to add?</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          rows={2}
          placeholder="I need 100 of these for a wedding"
          className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 text-[16px] outline-none focus:border-brand-600"
        />
      </label>

      {error && <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">{error}</p>}

      <button
        type="button"
        onClick={onAsk}
        disabled={busy}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {busy ? 'Sending…' : 'Ask Octos'}
      </button>
      <p className="mt-4 text-xs text-ink/50">Five looks a day. Your photo is only used to answer you.</p>
    </div>
  )
}

function Checking({ files, shown, findings, slow, done }) {
  const first = files[0]
  const [url] = useState(() => (first ? URL.createObjectURL(first) : ''))
  return (
    <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-6 sm:grid-cols-[220px_1fr] sm:p-8">
      <div className="pt-10">
        <div className="relative mx-auto h-44 w-44">
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-paper">
            {first && (first.type.startsWith('video/')
              ? <video src={url} className="h-full w-full object-cover" muted autoPlay loop playsInline />
              : <img src={url} alt="Your photo" className="h-full w-full object-cover" />)}
          </div>
          <div className={`absolute h-20 w-20 ${done ? 'hb-settled' : 'hb-tour'}`} style={{ position: 'absolute' }}>
            <div className={done ? '' : 'hb-face'}>
              <div className="hb-bob">
                <Hummingbird className="h-20 w-20 drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-ink/55" aria-live="polite">
          {done ? 'Found it. Here is what we think' : slow ? "This one's unusual, still checking…" : 'Taking a closer look…'}
        </p>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold">Working it out</h2>
        <p className="mt-1 text-sm text-ink/50">Usually 10 to 20 seconds</p>
        <ol className="mt-4 divide-y divide-black/5">
          {STEPS.map((step, i) => {
            const state = i < shown ? 'done' : i === shown ? 'run' : 'wait'
            return (
              <li key={step} className="flex gap-3 py-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    state === 'done' ? 'bg-emerald-50 text-emerald-700'
                      : state === 'run' ? 'animate-spin border-2 border-black/10 border-t-brand-600'
                        : 'border-[1.5px] border-black/20'}`}
                >
                  {state === 'done' && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
                <div>
                  <p className={`text-[15px] ${state === 'wait' ? 'text-ink/40' : ''}`}>{step}</p>
                  {state === 'done' && findings[i] && <p className="mt-0.5 text-sm text-ink/55">{findings[i]}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function Answer({ look, onAgain }) {
  const r = look.result || {}
  const [label, tone] = VERDICT[r.can_do] || VERDICT.unsure
  const wa = waHref(`Hi Farhat, about my photo ${look.code}`)
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
      <p className="text-sm font-medium text-ink/55">What it is</p>
      <h2 className="mt-1 font-display text-2xl font-extrabold">{r.what || "We couldn't quite tell"}</h2>
      {r.detail && <p className="mt-2 text-ink/65">{r.detail}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${tone}`}>{label}</span>
        {r.why && <span className="text-sm text-ink/60">{r.why}</span>}
      </div>

      {r.can_do !== 'no' && r.can_do !== 'unsure' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-paper px-5 py-4">
            <p className="text-sm text-ink/55">Price guide</p>
            <p className="mt-0.5 font-display text-xl font-bold">{price(r)}</p>
            {r.assumptions && <p className="mt-1 text-xs text-ink/50">{r.assumptions}</p>}
          </div>
          <div className="rounded-2xl bg-paper px-5 py-4">
            <p className="text-sm text-ink/55">Ready</p>
            <p className="mt-0.5 font-display text-xl font-bold">{r.ready ? r.ready.replace(/^between /, '') : 'We’ll confirm'}</p>
          </div>
        </div>
      )}

      {r.how?.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold">How we'd make it</p>
          <p className="mt-1 text-ink/70">{r.how.join(' · ')}</p>
        </div>
      )}
      {r.nearest && (
        <div className="mt-6">
          <p className="text-sm font-semibold">What we can do instead</p>
          <p className="mt-1 text-ink/70">{r.nearest}</p>
        </div>
      )}
      {r.questions?.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold">{r.can_do === 'unsure' ? 'To help us tell' : 'To firm up the price'}</p>
          <ul className="mt-1 list-inside list-disc text-ink/70">
            {r.questions.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={wa} target="_blank" rel="noopener"
           className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-700">
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> Continue on WhatsApp
        </a>
        {r.can_do !== 'no' && (
          <a href={orderUrl} target="_blank" rel="noopener"
             className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 px-6 py-3.5 font-semibold hover:border-black/30">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" /> Order online
          </a>
        )}
        <button type="button" onClick={onAgain}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-ink/60 hover:text-ink">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Ask about something else
        </button>
      </div>
      <p className="mt-5 text-xs text-ink/50">
        A guide, not a final price: someone at Farhat confirms before you pay. Case {look.code}.
      </p>
    </div>
  )
}

export default function Ask() {
  const [files, setFiles] = useState([])
  const [note, setNote] = useState('')
  const [phase, setPhase] = useState('pick')      // pick → checking → answer
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [look, setLook] = useState(null)
  const [shown, setShown] = useState(0)
  const [slow, setSlow] = useState(false)
  const started = useRef(0)

  // Poll the case while Octos works.
  useEffect(() => {
    if (phase !== 'checking' || !look?.code) return
    const t = setInterval(async () => {
      const fresh = await getLook(look.code)
      if (fresh?.status === 'FAILED') {
        clearInterval(t)
        setError(fresh.result?.message || 'Octos couldn’t finish looking.')
        setPhase('pick')
        return
      }
      if (fresh) setLook(fresh)
      const waited = Date.now() - started.current
      setSlow(waited > SLOW_MS)
      if (waited > GIVE_UP_MS) {
        clearInterval(t)
        setError("This is taking longer than it should. Continue on WhatsApp and we'll help you there.")
        setPhase('pick')
      }
    }, POLL_MS)
    return () => clearInterval(t)
  }, [phase, look?.code])

  // Tick the steps one at a time, so each can be read, never ahead of Octos.
  useEffect(() => {
    if (phase !== 'checking' || !look) return
    const finished = FINISHED.includes(look.status)
    if (shown < (look.stage || 0)) {
      const t = setTimeout(() => setShown((s) => s + 1), STEP_MS)
      return () => clearTimeout(t)
    }
    if (finished && shown >= STEPS.length) {
      const t = setTimeout(() => setPhase('answer'), 1200)
      return () => clearTimeout(t)
    }
  }, [phase, look, shown])

  const ask = async () => {
    setError('')
    if (!files.length) { setError('Add a photo, a short video or a GIF first.'); return }
    setBusy(true)
    const res = await startLook(files, note)
    setBusy(false)
    if (!res.ok) { setError(res.error); return }
    started.current = Date.now()
    setShown(0); setSlow(false)
    setLook({ code: res.code, status: 'QUEUED', stage: 0, findings: [] })
    setPhase('checking')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const again = () => { setFiles([]); setNote(''); setLook(null); setPhase('pick') }

  return (
    <>
      <Seo
        title="Not sure what to ask for?"
        description="Show us a photo of something like what you want. Octos tells you what it is, whether Farhat can make it, roughly what it costs and when it'll be ready."
        path="/ask"
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
          <p className="flex items-center gap-3 text-sm font-bold text-brand-600">
            <span className="h-0.5 w-8 rounded-full bg-brand-600" />
            Not sure what to ask for?
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
            Show us, and we'll tell you
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
            Upload a photo, short video or GIF of something like what you want. Octos, our assistant, says what it is,
            whether we can make it, and roughly what it costs.
          </p>
          <div className="mt-10">
            {phase === 'pick' && (
              <Picker files={files} setFiles={setFiles} note={note} setNote={setNote} onAsk={ask} error={error} busy={busy} />
            )}
            {phase === 'checking' && look && (
              <Checking files={files} shown={shown} findings={look.findings || []} slow={slow}
                        done={FINISHED.includes(look.status) && shown >= STEPS.length} />
            )}
            {phase === 'answer' && look && <Answer look={look} onAgain={again} />}
          </div>
        </div>
      </section>
    </>
  )
}
