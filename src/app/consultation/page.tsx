import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Book a personalized peptide consultation. Get one-on-one guidance on protocols, dosing, and safety tailored to your goals.',
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL

const whatYouGet = [
  {
    title: 'A protocol built around you',
    body: 'We review your goals, history, and any bloodwork you have, then map out a peptide approach suited to your situation.',
  },
  {
    title: 'Dosing & administration guidance',
    body: 'Reconstitution, dosing schedules, injection technique, timing, and storage — walked through in plain language.',
  },
  {
    title: 'Safety & interactions review',
    body: 'An honest look at contraindications, what the research does and does not support, and when to involve your physician.',
  },
]

export default function ConsultationPage() {
  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-warm-50 pb-14 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            One-on-One
          </p>
          <h1 className="heading-display">Book a Consultation</h1>
          <p className="mx-auto mt-4 max-w-lg text-body">
            Personalized, one-on-one guidance on peptide protocols, dosing, and
            safety — tailored to your goals. Pick a time that works for you below.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white pt-4 pb-12">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {whatYouGet.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-warm-200 bg-warm-50/50 p-6"
              >
                <h3 className="font-display text-lg font-medium text-warm-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduler */}
      <section className="bg-white pb-16">
        <div className="container-wide">
          {CALENDLY_URL ? (
            <div className="overflow-hidden rounded-2xl border border-warm-200">
              <CalendlyEmbed url={CALENDLY_URL} minHeight={720} />
            </div>
          ) : (
            /* Fallback shown until NEXT_PUBLIC_CALENDLY_URL is configured */
            <div className="mx-auto max-w-xl rounded-2xl border-2 border-dashed border-warm-200 bg-warm-50/50 px-8 py-14 text-center">
              <h2 className="font-display text-2xl font-semibold text-warm-900">
                Consultations open soon
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-warm-800/60">
                We&apos;re putting the finishing touches on our booking system.
                Leave your email and we&apos;ll let you know the moment
                consultations go live.
              </p>
              <NewsletterSignup
                source="consultation-waitlist"
                className="mx-auto mt-6 max-w-md text-left"
              />
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-warm-50 py-10">
        <div className="container-narrow text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-warm-800/50">
            Consultations are educational and informational only and do not
            constitute medical advice, diagnosis, or treatment. Always consult a
            qualified healthcare provider before starting any new protocol.
          </p>
        </div>
      </section>
    </SiteLayout>
  )
}
