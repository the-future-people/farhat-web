import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page doesn't exist." path="/404" />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">404</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold">Page not found</h1>
        <p className="mt-4 text-ink/60">Placeholder — built in a later step.</p>
      </section>
    </>
  )
}
