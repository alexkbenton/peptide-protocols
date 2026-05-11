import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import PeptideCalculator from '@/components/PeptideCalculator'

export const metadata: Metadata = {
  title: 'Peptide Reconstitution Calculator',
  description:
    'Peptide reconstitution calculator — single peptide and blend modes. Calculate concentration, volume per dose, units to draw, and doses per vial. Educational use only.',
}

export default function CalculatorPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-warm-50 pb-10 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Reconstitution
          </p>
          <h1 className="heading-display">Peptide Reconstitution Calculator</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body">
            Single peptide and blend modes. Punch in your COA numbers — get the exact units to
            draw on a U-100 syringe, plus concentration, volume per dose, and doses per vial.
          </p>
        </div>
      </section>

      <PeptideCalculator />
    </SiteLayout>
  )
}
