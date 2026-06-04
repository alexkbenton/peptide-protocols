import type { Metadata } from 'next'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'Source Compounds',
  description: 'Source high-quality, third-party tested research peptides from Forge Amino — the trusted supplier behind Peptide Protocols.',
}

const features = [
  {
    title: '99%+ Purity',
    description: 'Every compound independently third-party tested in a US laboratory.',
  },
  {
    title: 'QR-Linked COA',
    description: 'Certificate of Analysis stamped directly on each vial — scan to verify.',
  },
  {
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $250. Discreet, reliable delivery.',
  },
]

export default function ShopPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-warm-50 py-24 sm:py-32">
        <div className="container-narrow text-center animate-fade-in-up">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Our Trusted Source
          </p>
          <h1 className="heading-display">Source Your Compounds</h1>
          <p className="mx-auto mt-6 max-w-lg text-body">
            The protocols on this site are built around compounds sourced from{' '}
            <strong className="text-warm-900">Forge Amino</strong> — independently
            third-party tested research peptides with verified purity and a QR-linked
            Certificate of Analysis on every vial.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.forgeamino.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Shop Forge Amino →
            </a>
            <Link href="/protocols" className="btn-secondary">
              Browse Protocols
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-warm-200 bg-warm-50/50 p-8">
                <h3 className="font-display text-lg font-medium text-warm-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-800/60">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner callout */}
      <section className="bg-warm-50 py-20">
        <div className="container-narrow">
          <div className="rounded-2xl border border-sage-200 bg-white p-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">Sister Site</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-warm-900">Forge Amino</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-warm-800/60">
              Peptide Protocols and Forge Amino are sister sites. We handle the education;
              they handle the supply chain. Same standard of quality across both.
            </p>
            <a
              href="https://www.forgeamino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-medium text-sage-600 underline underline-offset-4 transition-colors hover:text-sage-700"
            >
              Visit forgeamino.com
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
