import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import PeptideGuide from '@/components/PeptideGuide'

export const metadata: Metadata = {
  title: 'Peptide Administration Guide',
  description: 'A comprehensive guide to peptide administration, including supplies, reconstitution, injection technique, storage, labeling, and safety best practices.',
}

export default function GuidePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-warm-50 pb-20 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Complete Guide
          </p>
          <h1 className="heading-display">Peptide Administration Guide</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body">
            Everything you need to know about safe, effective peptide use — from supplies and reconstitution to injection technique and storage.
          </p>
        </div>
      </section>

      {/* Guide Content */}
      <PeptideGuide />

      {/* Disclaimer */}
      <section className="bg-warm-100 py-12">
        <div className="container-narrow text-center">
          <p className="text-xs leading-relaxed text-warm-800/50">
            <strong className="text-warm-800/70">Disclaimer:</strong> The content on this site is for
            educational and informational purposes only. It is not intended as medical advice
            and should not be used as a substitute for professional medical guidance, diagnosis,
            or treatment. Always consult with a qualified healthcare provider before beginning any
            new protocol.
          </p>
        </div>
      </section>
    </SiteLayout>
  )
}
