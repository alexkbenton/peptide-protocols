import type { Metadata } from 'next'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Peptide Protocols shop — curated wellness products coming soon.',
}

export default function ShopPage() {
  return (
    <SiteLayout>
      <section className="bg-warm-50 py-32">
        <div className="container-narrow text-center animate-fade-in-up">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-sage-50">
            <svg className="h-8 w-8 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>

          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Coming Soon
          </p>
          <h1 className="heading-display">The Shop</h1>
          <p className="mx-auto mt-6 max-w-lg text-body">
            We&apos;re curating a collection of high-quality products to complement
            your wellness journey. Sign up for our newsletter to be the first to know
            when the shop launches.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/protocols" className="btn-primary">
              Explore Protocols
            </Link>
            <Link href="/videos" className="btn-secondary">
              Watch Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder grid for future products */}
      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-dashed border-warm-300 bg-warm-50/50 p-8">
                <div className="aspect-square rounded-xl bg-warm-100/80" />
                <div className="mt-6 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-warm-200/60" />
                  <div className="h-3 w-1/2 rounded bg-warm-200/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
