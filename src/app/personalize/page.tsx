import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import ProtocolWizard from '@/components/ProtocolWizard'

export const metadata: Metadata = {
  title: 'Personalize Your Protocol',
  description:
    'Get a personalized peptide protocol tailored to your goals, profile, and biomarkers. Educational AI-powered recommendations based on your health data.',
  openGraph: {
    title: 'Personalize Your Protocol | Peptide Protocols',
    description:
      'Get a personalized peptide protocol tailored to your goals, profile, and biomarkers.',
    type: 'website',
  },
}

export default function PersonalizePage() {
  return (
    <SiteLayout>
      <div className="bg-warm-50 py-12 sm:py-16 md:py-20">
        <div className="container-narrow">
          <ProtocolWizard />
        </div>
      </div>
    </SiteLayout>
  )
}
