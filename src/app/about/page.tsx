import type { Metadata } from 'next'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the mission behind Peptide Protocols — making evidence-based peptide education accessible to everyone.',
}

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-warm-50 pb-20 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Our Mission
          </p>
          <h1 className="heading-display">About Peptide Protocols</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl space-y-6">
            <p className="text-body">
              Peptide Protocols was created with a simple mission: make evidence-based
              peptide education accessible to everyone. In a space filled with hype,
              misinformation, and aggressive marketing, we believe there&apos;s a better way.
            </p>

            <p className="text-body">
              We&apos;re here to curate, organize, and present the science — clearly and
              without agenda. Every protocol on this site is grounded in peer-reviewed
              research and structured for practical use.
            </p>

            <p className="text-body">
              Whether you&apos;re a healthcare professional staying current, a researcher
              exploring the field, or someone who simply wants to understand what the science
              actually says — this is your resource.
            </p>
          </div>

          {/* Values */}
          <div className="mx-auto mt-20 max-w-2xl">
            <h2 className="heading-section text-center">What we believe</h2>
            <div className="mt-12 space-y-10">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-50">
                  <span className="text-lg font-medium text-sage-600">01</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-warm-900">
                    Science over hype
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                    We don&apos;t make claims the research doesn&apos;t support. Every protocol
                    is backed by published science and presented with nuance.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-50">
                  <span className="text-lg font-medium text-sage-600">02</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-warm-900">
                    Education empowers
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                    The more you understand, the better decisions you can make. We&apos;re here
                    to inform — not to sell.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-50">
                  <span className="text-lg font-medium text-sage-600">03</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-warm-900">
                    Clarity is respect
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                    Complex science doesn&apos;t have to be confusing. We organize and present
                    information so it&apos;s genuinely useful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-600 py-20">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white">
            Ready to explore?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-sage-100/80">
            Dive into our library of protocols and start learning today.
          </p>
          <Link href="/protocols" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-sage-700 uppercase transition-all duration-300 hover:bg-sage-50 hover:shadow-lg">
            Browse Protocols
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
