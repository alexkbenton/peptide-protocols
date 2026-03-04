import type { Metadata } from 'next'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore evidence-based peptide protocols, educational videos, and the science behind modern wellness. Your trusted source for peptide education.',
}

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-warm-50 pb-24 pt-20">
        <div className="container-narrow text-center animate-fade-in-up">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Evidence-Based Wellness
          </p>
          <h1 className="heading-display mx-auto max-w-3xl">
            Your body is capable of extraordinary things.{' '}
            <span className="text-sage-600">Learn what science knows.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body">
            Explore carefully researched peptide protocols, educational video content,
            and the science behind modern wellness — all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/protocols" className="btn-primary">
              Explore Protocols
            </Link>
            <Link href="/videos" className="btn-secondary">
              Watch Videos
            </Link>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute -bottom-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-sage-100/50 blur-3xl" />
      </section>

      {/* What You'll Find */}
      <section className="bg-white py-24">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-section">What you&apos;ll find here</h2>
            <p className="mx-auto mt-4 max-w-lg text-body">
              Everything you need to understand peptide science, organized clearly and
              backed by research.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="card text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50">
                <svg className="h-6 w-6 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-warm-900">Written Protocols</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-800/60">
                Detailed, structured protocols you can reference anytime.
                Clear dosing, timing, and guidance.
              </p>
            </div>

            <div className="card text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50">
                <svg className="h-6 w-6 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-warm-900">Video Education</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-800/60">
                In-depth video breakdowns that walk you through the science
                behind each protocol.
              </p>
            </div>

            <div className="card text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50">
                <svg className="h-6 w-6 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-warm-900">Research-Backed</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-800/60">
                Every protocol is grounded in peer-reviewed research.
                No hype — just science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-sage-600 py-20">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Start learning today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-sage-100/80">
            Browse our growing library of protocols and video education — all free.
          </p>
          <Link href="/protocols" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-sage-700 uppercase transition-all duration-300 hover:bg-sage-50 hover:shadow-lg">
            Browse Protocols
          </Link>
        </div>
      </section>

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
