import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, Printer, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { nav, phone, telHref, waHref, services, solutions } from '../site.js'

// Which top-level items get a dropdown, and what's in it.
const submenus = {
  '/services': {
    items: services.map((s) => ({ to: `/services#${s.id}`, label: s.name, soon: !s.available })),
    all: { to: '/services', label: 'All services' },
  },
  '/solutions': {
    items: solutions.map((s) => ({ to: `/solutions#${s.id}`, label: s.name })),
    all: { to: '/solutions', label: 'All solutions' },
  },
}

const visibleNav = nav.filter((n) => !n.hidden)

const linkClass =
  'relative py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink ' +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-brand-600 after:opacity-0 " +
  'aria-[current=page]:font-semibold aria-[current=page]:text-ink aria-[current=page]:after:opacity-100'

function CtaButton({ className = '', label = 'Send a print job' }) {
  return (
    <a
      href={waHref()}
      target="_blank"
      rel="noopener"
      className={
        // no display class here: callers set it (e.g. "hidden md:inline-flex"), so they never clash
        'items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white ' +
        'shadow-sm transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ' +
        className
      }
    >
      <Printer className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  )
}

function Dropdown({ item, menu }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to={item.to} className={linkClass}>
        {item.label}
      </NavLink>
      <button
        type="button"
        aria-label={`${item.label} menu`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="ml-0.5 rounded p-1 text-ink/60 hover:text-ink"
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        // pt-3 bridges the gap so the menu doesn't close on the way down
        <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
          <div className="w-72 rounded-xl border border-black/5 bg-white p-2 shadow-xl shadow-black/10">
            <ul>
              {menu.items.map((m) => (
                <li key={m.to}>
                  <Link
                    to={m.to}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-brand-50 hover:text-ink"
                  >
                    {m.label}
                    {m.soon && <span className="text-xs text-ink/45">Coming soon</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={menu.all.to}
              className="mt-1 block border-t border-black/5 px-3 pt-2.5 pb-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {menu.all.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileMenu({ onClose }) {
  // Lock page scroll behind the menu.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
      <nav className="px-5 pt-4 pb-8" aria-label="Mobile">
        <ul className="divide-y divide-black/5">
          {visibleNav.map((item) => {
            const menu = submenus[item.to]
            if (!menu) {
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    onClick={onClose}
                    className="block py-4 text-lg font-semibold text-ink aria-[current=page]:text-brand-600"
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            }
            return (
              <li key={item.to}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold text-ink">
                    {item.label}
                    <ChevronDown className="h-5 w-5 text-ink/50 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="pb-3">
                    {[menu.all, ...menu.items].map((m) => (
                      <li key={m.to}>
                        <Link
                          to={m.to}
                          onClick={onClose}
                          className={`flex justify-between py-2 pl-3 ${m === menu.all ? 'font-semibold text-brand-600' : 'text-ink/75'}`}
                        >
                          {m.label}
                          {m.soon && <span className="text-sm text-ink/45">Coming soon</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 grid gap-3">
          <CtaButton className="flex py-3.5 text-base" />
          <a
            href={telHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/15 py-3.5 font-semibold text-ink"
          >
            <Phone className="h-5 w-5 text-brand-600" aria-hidden="true" />
            Call {phone.display}
          </a>
        </div>
      </nav>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled || menuOpen ? 'shadow-md shadow-black/5' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 lg:h-20 lg:px-8">
        <Logo />

        <nav className="ml-auto hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main">
          {visibleNav.map((item) =>
            submenus[item.to] ? (
              <Dropdown key={item.to} item={item} menu={submenus[item.to]} />
            ) : (
              <NavLink key={item.to} to={item.to} end className={linkClass}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-4">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink hover:border-black/25 xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
            {phone.display}
          </a>
          <CtaButton className="hidden text-sm md:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 rounded-lg p-2 text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  )
}

export { CtaButton }
