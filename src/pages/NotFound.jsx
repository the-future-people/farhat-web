import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { waHref } from '../site.js'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page doesn't exist." path="/404" noindex />
      <section className="mx-auto max-w-3xl px-5 py-24 text-center lg:py-32">
        <p className="font-display text-7xl font-extrabold text-brand-600 sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">This page doesn't exist</h1>
        <p className="mt-3 text-lg text-ink/65">The link may be old or mistyped. Start from the home page, or ask us directly.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white hover:bg-brand-700">
            Go to the home page
          </Link>
          <a
            href={waHref()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-6 py-3.5 font-semibold hover:border-black/30"
          >
            <MessageCircle className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
