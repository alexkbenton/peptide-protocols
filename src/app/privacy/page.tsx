import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Peptide Protocols — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="bg-white py-20">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl animate-fade-in-up">
            <h1 className="heading-display">Privacy Policy</h1>
            <p className="mt-4 text-sm text-warm-800/50">Last updated: March 2026</p>

            <hr className="my-10 border-warm-200" />

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Information We Collect</h2>
                <p className="mt-3 text-body">
                  Peptide Protocols does not require an account or email address to browse
                  the site. If you voluntarily sign up for our newsletter, we collect only
                  the email address you provide. We may also collect standard analytics data
                  such as page views and general geographic region through third-party
                  analytics services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">How We Use Your Information</h2>
                <p className="mt-3 text-body">
                  If you opt in, your email address is used solely for sending you notice of
                  new protocols, educational content, and occasional newsletters related to
                  peptide science and wellness. We will never sell, rent, or share your email
                  address with third parties for marketing purposes, and you can unsubscribe
                  at any time.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Email Marketing (Mailchimp)</h2>
                <p className="mt-3 text-body">
                  We use Mailchimp to manage our email list. When you provide your email
                  address, it is stored securely on Mailchimp&apos;s servers. You can
                  unsubscribe at any time by clicking the unsubscribe link in any email
                  we send you, or by contacting us directly.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Cookies</h2>
                <p className="mt-3 text-body">
                  We do not use tracking cookies for advertising purposes. Any cookies set by
                  the site are functional only and contain no personal information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Third-Party Services</h2>
                <p className="mt-3 text-body">
                  Our site may embed video content from Vimeo. When you view an embedded
                  video, Vimeo may collect information in accordance with their own privacy
                  policy. We encourage you to review Vimeo&apos;s privacy practices.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Your Rights</h2>
                <p className="mt-3 text-body">
                  You have the right to request access to, correction of, or deletion of
                  your personal information at any time. You can also unsubscribe from our
                  email list at any time. To exercise any of these rights, please contact
                  us at the email address below.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Changes to This Policy</h2>
                <p className="mt-3 text-body">
                  We may update this privacy policy from time to time. Any changes will be
                  posted on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-medium text-warm-900">Contact</h2>
                <p className="mt-3 text-body">
                  If you have any questions about this privacy policy, please contact us at{' '}
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
