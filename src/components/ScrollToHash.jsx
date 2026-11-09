import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Links like /solutions#tender scroll to that section, including after client-side navigation.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    // wait a frame so the new page has rendered
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
  return null
}
