import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import PeptideGrid from '@/components/PeptideGrid'
import { getAllPeptides } from '@/data/peptides'

export const metadata: Metadata = {
  title: 'Peptide Wiki | Peptide Protocols',
  description: 'Browse our comprehensive compound library — dosing protocols, mechanisms, clinical evidence, and stacking strategies for 19 research peptides.',
}

export default function PeptidesPage() {
  const peptides = getAllPeptides()

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-warm-50 pb-16 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Compound Library
          </p>
          <h1 className="heading-display">Peptide Wiki</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body">
            Explore our compound library — dosing protocols, mechanisms, clinical evidence, and stacking strategies for 19 research peptides.
          </p>
        </div>
      </section>

      {/* Forge Amino sourcing banner */}
      <section className="bg-white border-b border-warm-200">
        <div className="container-wide py-5">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-warm-800/60">
              <span className="font-medium text-warm-900">Source your compounds from Forge Amino</span>
              {' '}— independently third-party tested, 99%+ purity, QR-linked COA on every vial.
            </p>
            <a
              href="https://www.forgeamino.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-sage-300 bg-sage-50 px-4 py-2 text-xs font-semibold text-sage-700 transition-colors hover:bg-sage-100"
            >
              Shop Forge Amino →
            </a>
          </div>
        </div>
      </section>

      {/* Peptide Grid */}
      <section className="bg-white py-16">
        <div className="container-wide">
          <PeptideGrid peptides={peptides} />
        </div>
      </section>
    </SiteLayout>
  )
}
