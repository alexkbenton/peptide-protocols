'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/home', label: 'Home' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/videos', label: 'Videos' },
  { href: '/shop', label: 'Shop', comingSoon: true },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-warm-200/60 bg-warm-50/80 backdrop-blur-lg">
      <div className="container-wide flex h-16 items-center justify-between sm:h-20">
        <Link href="/home" className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-600 sm:h-10 sm:w-10">
            <span className="text-sm font-bold text-white sm:text-lg">P</span>
          </div>
          <span className="font-display text-lg font-medium text-warm-900 sm:text-xl">
            Peptide Protocols
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <div key={link.href} className="relative">
              {link.comingSoon ? (
                <span className="group cursor-default text-sm font-medium tracking-wide text-warm-800/30 uppercase">
                  {link.label}
                  <span className="absolute -top-2 -right-2 rounded-full bg-sage-100 px-1.5 py-0.5 text-[9px] font-semibold text-sage-600 uppercase leading-none">
                    Soon
                  </span>
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-sage-600'
                      : 'text-warm-800/60 hover:text-warm-900'
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-warm-800 transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-warm-200 bg-warm-50 pb-6 lg:hidden animate-fade-in">
          <div className="container-wide flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <div key={link.href}>
                {link.comingSoon ? (
                  <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-warm-800/30 uppercase">
                    {link.label}
                    <span className="rounded-full bg-sage-100 px-1.5 py-0.5 text-[9px] font-semibold text-sage-600 uppercase leading-none">
                      Soon
                    </span>
                  </span>
                ) : (
                  <Link
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
