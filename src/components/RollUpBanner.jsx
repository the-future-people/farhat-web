import { BookOpen, Layers, Package, Presentation, Printer, Shirt } from 'lucide-react'

// The hero visual: a roll-up banner, drawn in HTML. Swap for a real photo later if wanted.
const rows = [
  [Printer, 'Printing'],
  [Layers, 'Branding'],
  [Shirt, 'DTF & Embroidery'],
  [Package, 'Packaging'],
  [Presentation, 'Banners & Signage'],
  [BookOpen, 'Books & Magazines'],
]

export default function RollUpBanner() {
  return (
    <div className="relative mx-auto w-[min(19rem,64vw)]" aria-hidden="true">
      {/* top rail */}
      <div className="relative z-10 mx-auto h-3 w-[104%] -translate-x-[2%] rounded-full bg-gradient-to-b from-zinc-200 to-zinc-400 shadow" />
      {/* the print */}
      <div className="relative -mt-1 overflow-hidden bg-white px-6 pt-8 pb-28 shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2.5">
          <img src="/farhat-mark.svg" alt="" className="h-10 w-10" />
          <p className="font-display text-lg leading-[1.05] font-extrabold uppercase">
            Farhat
            <span className="block text-sm text-brand-600">Printing Press</span>
          </p>
        </div>
        <ul className="mt-6 divide-y divide-black/10">
          {rows.map(([Icon, label]) => (
            <li key={label} className="flex items-center gap-3 py-2.5 text-[0.95rem] font-semibold">
              <Icon className="h-5 w-5 text-brand-600" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>
        {/* red wave at the foot of the print */}
        <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 300 110" preserveAspectRatio="none">
          <path d="M0 45 C 80 10, 170 85, 300 30 L300 110 L0 110 Z" fill="#c0000d" />
          <path d="M0 70 C 90 35, 190 105, 300 60 L300 110 L0 110 Z" fill="#e3000f" />
        </svg>
      </div>
      {/* base */}
      <div className="relative mx-auto h-4 w-[112%] -translate-x-[5%] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-lg" />
      <div className="mx-auto -mt-1 h-3 w-[70%] rounded-full bg-black/20 blur-md" />
    </div>
  )
}
