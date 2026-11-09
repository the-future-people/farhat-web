import Seo from '../components/Seo.jsx'

export default function Home() {
  return (
    <>
      <Seo title={null} description="Large-format printing, branding, packaging and everyday print in Accra. Send your print job on WhatsApp." path="/" />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Accra's trusted printing partner</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold">Large. Bold. Printed.</h1>
        <p className="mt-4 text-ink/60">Placeholder — built in a later step.</p>
      </section>
    </>
  )
}
