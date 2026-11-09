import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom'

// Placeholder shell — the real header, mobile menu and footer come in step 3.
const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/solutions', 'Solutions'],
  ['/our-work', 'Our Work'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-black/10">
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-5 px-6 py-4 text-sm">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                isActive ? 'font-semibold text-brand-600' : 'text-ink/70 hover:text-ink'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-ink px-6 py-6 text-sm text-white/70">
        © {new Date().getFullYear()} Farhat Printing Press
      </footer>
      <ScrollRestoration />
    </div>
  )
}
