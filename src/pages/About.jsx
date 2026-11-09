import Seo from '../components/Seo.jsx'

export default function About() {
  return (
    <>
      <Seo title="About" description="Farhat Printing Press is a Ghanaian printing and branding company serving individuals, businesses and organisations." path="/about" />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">About Farhat</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold">More than printing. A print partner.</h1>
        <p className="mt-4 text-ink/60">Placeholder — built in a later step.</p>
      </section>
    </>
  )
}
