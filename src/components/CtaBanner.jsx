import { Printer } from 'lucide-react'
import { waHref, orderUrl } from '../site.js'

// Red closing banner used at the bottom of most pages.
export default function CtaBanner({
  title = 'Have a print job?',
  text = "Send it on WhatsApp. We'll confirm the price and when it'll be ready.",
  button = 'Send a print job',
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-7 py-10 text-white sm:px-12 sm:py-12">
        {/* paper-edge stripes: a nod to stacked sheets coming off the press */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 sm:block">
          <div className="absolute inset-y-0 right-[-10%] w-full skew-x-[-18deg] bg-brand-700" />
          <div className="absolute inset-y-0 right-[-26%] w-full skew-x-[-18deg] bg-brand-800" />
        </div>
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
            <p className="mt-2 text-lg text-white/85">{text}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <a
            href={waHref()}
            target="_blank"
            rel="noopener"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold whitespace-nowrap text-ink shadow-lg shadow-black/10 hover:bg-brand-50"
          >
            <Printer className="h-5 w-5 text-brand-600" aria-hidden="true" />
            {button}
          </a>
          <a href={orderUrl} className="text-sm font-semibold text-white/90 underline-offset-4 hover:underline">
            or order online and pay
          </a>
          </div>
        </div>
      </div>
    </section>
  )
}
