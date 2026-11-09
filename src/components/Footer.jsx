import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import {
  company, phone, telHref, waHref, hours, fmtTime, isOpenNow,
  mainBranch, services, footerLinks, collection,
} from '../site.js'

// Shown only in the browser — at build time we can't know if the shop is open.
function OpenNow() {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    setOpen(isOpenNow())
    const t = setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => clearInterval(t)
  }, [])
  if (open === null) return null
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${open ? 'text-emerald-400' : 'text-white/50'}`}>
      <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-white/40'}`} />
      {open ? 'Open now' : 'Closed now'}
    </span>
  )
}

function FooterLink({ link }) {
  const cls = 'text-white/70 hover:text-white'
  if (link.external || link.href.startsWith('http')) {
    return <a href={link.href} className={cls}>{link.label}</a>
  }
  return <Link to={link.href} className={cls}>{link.label}</Link>
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Printing, branding and packaging for people, businesses and organisations in Accra.
          </p>
          <a
            href={waHref()}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold hover:bg-brand-700"
          >
            Send a print job on WhatsApp
          </a>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <FooterLink link={{ href: `/services#${s.id}`, label: s.name }} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><FooterLink link={{ href: '/about', label: 'About us' }} /></li>
            <li><FooterLink link={{ href: '/solutions', label: 'Solutions' }} /></li>
            {footerLinks.map((l) => (
              <li key={l.label}><FooterLink link={l} /></li>
            ))}
            <li><FooterLink link={{ href: '/contact', label: 'Contact' }} /></li>
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-sm font-bold">Visit us</h2>
            <OpenNow />
          </div>
          <ul className="mt-4 space-y-3.5 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <a href={mainBranch.mapsHref} target="_blank" rel="noopener" className="hover:text-white">
                {mainBranch.address}
                <span className="block text-white/45">GPS {mainBranch.gps}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                {hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt>{h.days}</dt>
                    <dd className="text-white/90">{h.open ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : 'Closed'}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <a href={telHref} className="hover:text-white">{phone.display}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="break-all hover:text-white">{company.email}</a>
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/45">{collection}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:justify-between lg:px-8">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p>Serving Accra since {company.founded}</p>
        </div>
      </div>
    </footer>
  )
}
