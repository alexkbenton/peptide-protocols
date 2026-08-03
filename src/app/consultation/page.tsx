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

// ──────────────────────────────────────────────
// Fill these in to show pricing and payment details on the page.
// Both are optional: the payment step falls back to generic wording
// while they're blank, so nothing wrong or half-filled ships publicly.
//   VENMO_HANDLE — your Venmo *business profile* handle, e.g. '@Peptide-Protocols'
//   CONSULT_PRICE — displayed as-is, e.g. '$150'
// ──────────────────────────────────────────────
const VENMO_HANDLE = '@ForgeA'
const CONSULT_PRICE = '$99'
const CONSULT_DURATION = '45 minutes'
const CONSULT_PERK = '10% off your first Forge Amino order'

const howItWorks = [
  {
    step: '1',
    title: 'Pick a time',
    body: 'Choose a slot that works for you below. You’ll get a confirmation email with the details.',
  },
  {
    step: '2',
    title: CONSULT_PRICE ? `Send payment (${CONSULT_PRICE})` : 'Send payment',
    body: VENMO_HANDLE
      ? `Payment is due before the call. Send it via Venmo to ${VENMO_HANDLE} and include your name so we can match it to your booking.`
      : 'Payment is due before the call. Payment details are included in your booking confirmation email.',
  },
  {
    step: '3',
    title: 'We call you',
    body: 'Give us the best number to reach you when you book, and we’ll call at your scheduled time.',
  },
]

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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[CONSULT_DURATION, CONSULT_PRICE, CONSULT_PERK]
              .filter(Boolean)
              .map((detail) => (
                <span
                  key={detail}
                  className="rounded-full border border-sage-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-sage-700"
                >
                  {detail}
                </span>
              ))}
          </div>
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

      {/* How it works */}
      <section className="bg-white pb-12">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-2xl border border-sage-200 bg-sage-50/60 p-8">
            <h2 className="text-center font-display text-xl font-medium text-warm-900">
              How it works
            </h2>
            <ol className="mt-6 space-y-5">
              {howItWorks.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-600 text-sm font-semibold text-white"
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-medium text-warm-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-warm-800/70">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-sage-200 pt-4 text-xs leading-relaxed text-warm-800/60">
              Your call includes 10% off your first order at{' '}
              <a
                href="https://www.forgeamino.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sage-700 underline-offset-4 hover:underline"
              >
                forgeamino.com
              </a>{' '}
              — we&apos;ll cover the details before we wrap up. Your time slot is
              held once payment is received. If you need to reschedule or cancel,
              use the links in your confirmation email.
            </p>
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
