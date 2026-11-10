import { Link } from 'react-router-dom'

// Bird mark (public/farhat-mark.svg, traced from the official logo) with the name stacked:
// FARHAT on top, PRINTING PRESS in red underneath.
export default function Logo({ onDark = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Farhat Printing Press home"
      className={`flex shrink-0 items-center gap-2 ${className}`}
    >
      <img src="/farhat-mark.svg" alt="" width="52" height="47" className="h-10 w-auto sm:h-11" />
      <span className="font-display leading-none font-extrabold uppercase">
        <span className={`block text-[1.35rem] tracking-tight sm:text-[1.5rem] ${onDark ? 'text-white' : 'text-ink'}`}>
          Farhat
        </span>
        <span className="mt-0.5 block text-[0.62rem] tracking-[0.12em] text-brand-600 sm:text-[0.68rem]">
          Printing Press
        </span>
      </span>
    </Link>
  )
}
