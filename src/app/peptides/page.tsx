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

      {/* Peptide Grid */}
      <section className="bg-white py-16">
        <div className="container-wide">
          <PeptideGrid peptides={peptides} />
        </div>
      </section>
    </SiteLayout>
  )
}
