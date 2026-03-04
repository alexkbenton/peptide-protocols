import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Peptide Protocols — guidelines for using our educational wellness content.',
}

export default function TermsPage() {
  return (
    <SiteLayout>
      <article className="bg-white py-20">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl animate-fade-in-up">
            <h1 className="heading-display">Terms of Use</h1>
            <p className="mt-4 text-sm text-warm-800/50">Last updated: March 2026</p>

            <hr className="my-10 border-warm-200" />

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Acceptance of Terms</h2>
                <p className="mt-3 text-body">
                  By accessing and using Peptide Protocols (&quot;the Site&quot;), you accept and agree
                  to be bound by these Terms of Use. If you do not agree to these terms, please
                  do not use the Site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Age Requirement</h2>
                <p className="mt-3 text-body">
                  You must be at least 18 years of age to access and use this Site. By
                  confirming your age at our verification gate, you represent and warrant
                  that you are 18 years of age or older.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Educational Content Disclaimer</h2>
                <p className="mt-3 text-body">
                  All content on this Site is provided for educational and informational
                  purposes only. Nothing on this Site constitutes medical advice, diagnosis,
                  or treatment. The protocols, articles, videos, and other materials are
                  intended to inform and educate — not to replace professional medical guidance.
                </p>
                <p className="mt-3 text-body">
                  Always consult with a qualified healthcare provider before starting any new
                  health protocol, supplement, or treatment. Never disregard professional
                  medical advice or delay seeking medical treatment because of something you
                  have read on this Site.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Intellectual Property</h2>
                <p className="mt-3 text-body">
                  All content on this Site — including text, graphics, logos, images, videos,
                  and the compilation thereof — is the property of Peptide Protocols and is
                  protected by copyright and intellectual property laws. You may not reproduce,
                  distribute, or create derivative works from any content on this Site without
                  prior written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Limitation of Liability</h2>
                <p className="mt-3 text-body">
                  Peptide Protocols shall not be liable for any direct, indirect, incidental,
                  special, or consequential damages resulting from the use or inability to use
                  the Site or its content. This includes but is not limited to damages for loss
                  of profits, data, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">External Links</h2>
                <p className="mt-3 text-body">
                  The Site may contain links to external websites or embed third-party content
                  (such as videos). We are not responsible for the content, privacy policies,
                  or practices of any third-party sites or services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Changes to Terms</h2>
                <p className="mt-3 text-body">
                  We reserve the right to modify these Terms of Use at any time. Changes will
                  be effective immediately upon posting to the Site. Your continued use of the
                  Site constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Contact</h2>
                <p className="mt-3 text-body">
                  If you have any questions about these Terms of Use, please contact us at{' '}
                  <span className="text-sage-600">hello@peptideprotocols.us</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  )
}
