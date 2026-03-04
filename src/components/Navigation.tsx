'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/home', label: 'Home' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-warm-200/60 bg-warm-50/80 backdrop-blur-lg">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <span className="font-display text-xl font-medium text-warm-900">
            Peptide Protocols
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-sage-600'
                  : 'text-warm-800/60 hover:text-warm-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-warm-200 bg-warm-50 pb-6 md:hidden">
          <div className="container-wide flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-wide uppercase ${
                  pathname === link.href
                    ? 'text-sage-600'
                    : 'text-warm-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
