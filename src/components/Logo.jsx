import { Link } from 'react-router-dom'

// Mark from /public/farhat-mark.svg (placeholder until the real file is dropped in).
export default function Logo({ onDark = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Farhat Printing Press home"
      className={`flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <img src="/farhat-mark.svg" alt="" width="40" height="40" className="h-9 w-9" />
      <span className="font-display text-[1.05rem] leading-none font-extrabold tracking-tight uppercase sm:text-[1.2rem]">
        <span className={onDark ? 'text-white' : 'text-ink'}>Farhat</span>{' '}
        <span className="text-brand-600">Printing Press</span>
      </span>
    </Link>
  )
}
