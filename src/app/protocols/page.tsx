import type { Metadata } from 'next'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import { getAllProtocols } from '@/data/protocols'

export const metadata: Metadata = {
  title: 'Protocols',
  description: 'Browse our collection of research-backed peptide protocols. Each one is structured for clarity and easy reference.',
}

export default function ProtocolsPage() {
  const protocols = getAllProtocols()

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-warm-50 pb-16 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Library
          </p>
          <h1 className="heading-display">Protocols</h1>
          <p className="mx-auto mt-4 max-w-lg text-body">
            Browse our collection of research-backed peptide protocols. Each one is
            structured for clarity and easy reference.
          </p>
        </div>
      </section>

      {/* Protocol Grid */}
      <section className="bg-white py-16">
        <div className="container-wide">
          {protocols.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-warm-800/50">Protocols coming soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {protocols.map((protocol) => (
                <Link
                  key={protocol.slug}
                  href={`/protocols/${protocol.slug}`}
                  className="card group"
                >
                  <span className="mb-3 inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
                    {protocol.category}
                  </span>
                  <h3 className="font-display text-xl font-medium text-warm-900 transition-colors group-hover:text-sage-600">
                    {protocol.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-800/60">
                    {protocol.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sage-600">
                    Read protocol
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
