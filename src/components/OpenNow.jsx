import { useEffect, useState } from 'react'
import { isOpenNow } from '../site.js'

// Browser-only: at build time we can't know if the shop is open, so render nothing until mounted.
export default function OpenNow({ onDark = false }) {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    setOpen(isOpenNow())
    const t = setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => clearInterval(t)
  }, [])
  if (open === null) return null
  const on = onDark ? 'text-emerald-400' : 'text-emerald-700'
  const off = onDark ? 'text-white/50' : 'text-ink/50'
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${open ? on : off}`}>
      <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-500' : onDark ? 'bg-white/40' : 'bg-ink/30'}`} />
      {open ? 'Open now' : 'Closed now'}
    </span>
  )
}
