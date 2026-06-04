import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteLayout from '@/components/SiteLayout'
import { getPeptideBySlug, getAllPeptides } from '@/data/peptides'
import type { Metadata } from 'next'

// Helper to generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const peptide = getPeptideBySlug(params.slug)

  if (!peptide) {
    return {
      title: 'Not Found | Peptide Protocols',
      description: 'Peptide not found',
    }
  }

  return {
    title: `${peptide.name} | Peptide Wiki | Peptide Protocols`,
    description: peptide.summary,
    openGraph: {
      title: `${peptide.name} | Peptide Wiki`,
      description: peptide.summary,
      type: 'article',
    },
  }
}

export function generateStaticParams() {
  return getAllPeptides().map((peptide) => ({
    slug: peptide.slug,
  }))
}

// Map peptide slugs to their Forge Amino product pages
const forgeAminoProducts: Record<string, { url: string; label: string }> = {
  'bpc-157':      { url: 'https://www.forgeamino.com/shop/p/bpc-157',              label: 'BPC-157 10MG' },
  'tb-500':       { url: 'https://www.forgeamino.com/shop/p/tb-500',               label: 'TB-500 10MG' },
  'ghk-cu':       { url: 'https://www.forgeamino.com/shop/p/ghk-cu',               label: 'GHK-Cu 50MG' },
  'ipamorelin':   { url: 'https://www.forgeamino.com/shop/p/ipamorelin',           label: 'Ipamorelin 10MG' },
  'cjc-1295':     { url: 'https://www.forgeamino.com/shop/p/cjc1295nodac-ipamorelin', label: 'CJC-1295 / Ipamorelin Blend' },
  'tesamorelin':  { url: 'https://www.forgeamino.com/shop/p/tesamorelin',          label: 'Tesamorelin 10MG' },
  'epithalon':    { url: 'https://www.forgeamino.com/shop/p/epithalon-50mg',       label: 'Epithalon 50MG' },
  'pinealon':     { url: 'https://www.forgeamino.com/shop/p/pinealon-20mg',        label: 'Pinealon 20MG' },
  'mots-c':       { url: 'https://www.forgeamino.com/shop/p/mots-c',               label: 'MOTS-C 10MG' },
  '5-amino-1mq':  { url: 'https://www.forgeamino.com/shop/p/5-amino-1mq',         label: '5-Amino-1MQ' },
  'slu-pp-332':   { url: 'https://www.forgeamino.com/shop/p/slu-pp-332',          label: 'SLU-PP-332' },
}

export default function PeptidePage({ params }: { params: { slug: string } }) {
  const peptide = getPeptideBySlug(params.slug)

  if (!peptide) {
    notFound()
  }

  // Get evidence level badge styling
  const evidenceLevelMap = {
    approved: { bg: 'bg-green-50', text: 'text-green-700', label: 'Approved' },
    emerging: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Emerging' },
    preclinical: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Preclinical' },
    'early-research': { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Early Research' },
  }
  const evidenceStyle = evidenceLevelMap[peptide.evidenceLevel]

  // Helper to get peptide link for synergies
  const getPeptideLink = (synergy: string): { slug: string; name: string } | null => {
    const linkedPeptide = getAllPeptides().find(
      (p) => p.name.toLowerCase() === synergy.toLowerCase() || p.slug === synergy.toLowerCase()
    )
    return linkedPeptide ? { slug: linkedPeptide.slug, name: linkedPeptide.name } : null
  }

  return (
    <SiteLayout>
      <article className="bg-warm-50 py-20">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <nav className="mb-10 animate-fade-in">
            <Link
              href="/peptides"
              className="text-sm text-sage-600 transition-colors hover:text-sage-700"
            >
              &larr; Back to Peptide Wiki
            </Link>
          </nav>

          {/* Header Section */}
          <div className="animate-fade-in-up rounded-2xl bg-white p-8 md:p-10">
            {/* Badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${peptide.categoryColor}`}>
                {peptide.category}
              </span>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${evidenceStyle.bg} ${evidenceStyle.text}`}>
                {evidenceStyle.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="heading-display mb-4">{peptide.name}</h1>

            {/* Summary */}
            <p className="mb-6 text-lg leading-relaxed text-warm-800/80">
              {peptide.summary}
            </p>

            {/* Aliases */}
            {peptide.aliases.length > 0 && (
              <p className="mb-6 text-sm text-warm-700/70">
                <span className="font-medium">Also known as:</span> {peptide.aliases.join(', ')}
              </p>
            )}

            {/* Routes */}
            {peptide.routes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {peptide.routes.map((route) => (
                  <span
                    key={route}
                    className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700"
                  >
                    {route}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Forge Amino sourcing CTA */}
          {forgeAminoProducts[peptide.slug] && (
            <div className="mt-8 animate-fade-in-up rounded-2xl border border-sage-200 bg-sage-50/50 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-sage-600 uppercase">
                    Available on Forge Amino
                  </p>
                  <p className="mt-1 text-sm text-warm-800/70">
                    {forgeAminoProducts[peptide.slug].label} — independently lab tested, 99%+ purity, QR-linked COA.
                  </p>
                </div>
                <a
                  href={forgeAminoProducts[peptide.slug].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700"
                >
                  Source this compound →
                </a>
              </div>
            </div>
          )}

          {/* Divider */}
          <hr className="my-10 border-warm-200" />

          {/* Warning Box */}
          <div className="mb-10 animate-fade-in-delay-1 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm leading-relaxed text-amber-900/80">
              <strong>Important:</strong> This content is for informational and research purposes only and is not intended for human or veterinary use. Consult your physician for health-related guidance and laboratory monitoring.
            </p>
          </div>

          {/* Section 1: How It Works */}
          <section className="mb-12 animate-fade-in-delay-2">
            <h2 className="mb-4 font-display text-2xl font-medium text-warm-900">How It Works</h2>
            <div className="rounded-2xl border border-sage-200 bg-sage-50 p-6 md:p-8">
              <p className="text-base leading-relaxed text-warm-800/80">
                {peptide.mechanism}
              </p>
            </div>
          </section>

          {/* Section 2: Key Benefits */}
          <section className="mb-12 animate-fade-in-delay-2">
            <h2 className="mb-6 font-display text-2xl font-medium text-warm-900">Key Benefits</h2>
            <div className="rounded-2xl bg-white p-8">
              <ul className="space-y-3">
                {peptide.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-sage-100 text-sm font-medium text-sage-700">
                      ✓
                    </span>
                    <span className="text-base leading-relaxed text-warm-800/80">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3: Dosing Protocols */}
          <section className="mb-12 animate-fade-in-delay-3">
            <h2 className="mb-6 font-display text-2xl font-medium text-warm-900">Dosing Protocols</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Beginner / Intermediate Card */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="bg-sage-100 px-6 py-4">
                  <h3 className="font-display text-lg font-medium text-warm-900">
                    Beginner / Intermediate
                  </h3>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Dose
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.beginnerIntermediate.dose}
                    </p>
                  </div>
                  <div className="border-t border-warm-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Frequency
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.beginnerIntermediate.frequency}
                    </p>
                  </div>
                  <div className="border-t border-warm-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Cycle Length
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.beginnerIntermediate.cycleWeeks}
                    </p>
                  </div>
                  {peptide.dosing.beginnerIntermediate.notes && (
                    <div className="border-t border-warm-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                        Notes
                      </p>
                      <p className="mt-1 text-sm text-warm-800/80">
                        {peptide.dosing.beginnerIntermediate.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Card */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="bg-sage-600 px-6 py-4">
                  <h3 className="font-display text-lg font-medium text-white">
                    Advanced
                  </h3>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Dose
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.advanced.dose}
                    </p>
                  </div>
                  <div className="border-t border-warm-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Frequency
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.advanced.frequency}
                    </p>
                  </div>
                  <div className="border-t border-warm-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                      Cycle Length
                    </p>
                    <p className="mt-1 text-base font-medium text-warm-900">
                      {peptide.dosing.advanced.cycleWeeks}
                    </p>
                  </div>
                  {peptide.dosing.advanced.notes && (
                    <div className="border-t border-warm-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-warm-700/60">
                        Notes
                      </p>
                      <p className="mt-1 text-sm text-warm-800/80">
                        {peptide.dosing.advanced.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Side Effects & Safety */}
          <section className="mb-12">
            <h2 className="mb-6 font-display text-2xl font-medium text-warm-900">Side Effects & Safety</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Common Side Effects */}
              <div className="rounded-2xl bg-white p-8">
                <h3 className="mb-4 font-display text-lg font-medium text-warm-900">
                  Common Side Effects
                </h3>
                <ul className="space-y-2">
                  {peptide.sideEffects.map((effect, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                      <span className="text-warm-800/80">{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contraindications */}
              <div className="rounded-2xl bg-white p-8">
                <h3 className="mb-4 font-display text-lg font-medium text-warm-900">
                  Contraindications
                </h3>
                <ul className="space-y-2">
                  {peptide.contraindications.map((contraindication, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      <span className="text-warm-800/80">{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Stacking & Synergies */}
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl font-medium text-warm-900">Stacking & Synergies</h2>
            <div className="mb-4 text-sm text-warm-800/70">
              <p>
                These compounds have complementary mechanisms and may enhance results when used together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {peptide.synergies.map((synergy, idx) => {
                const linkedPeptide = getPeptideLink(synergy)

                return linkedPeptide ? (
                  <Link
                    key={idx}
                    href={`/peptides/${linkedPeptide.slug}`}
                    className="inline-block rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 transition-all hover:bg-sage-200 hover:shadow-sm"
                  >
                    {synergy}
                  </Link>
                ) : (
                  <span
                    key={idx}
                    className="inline-block rounded-full bg-warm-100 px-4 py-2 text-sm font-medium text-warm-700"
                  >
                    {synergy}
                  </span>
                )
              })}
            </div>
          </section>

          {/* Section 6: Key Takeaway */}
          <section className="mb-12">
            <div className="rounded-2xl border-l-4 border-sage-600 bg-sage-50 p-8">
              <h3 className="mb-3 font-display text-lg font-medium text-warm-900">Key Takeaway</h3>
              <p className="text-base leading-relaxed text-warm-800/80">
                {peptide.keyTakeaway}
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="rounded-2xl bg-warm-100 p-8">
            <p className="text-xs leading-relaxed text-warm-800/60">
              <strong className="text-warm-800/80">Research Disclaimer:</strong> This content is for informational and research purposes only. It is not medical advice. These products are not approved by the FDA for human consumption. Consult a qualified healthcare provider before starting any new protocol. The information provided is based on preclinical research and anecdotal reports and has not been formally evaluated in randomized controlled trials.
            </p>
          </div>
        </div>
      </article>
    </SiteLayout>
  )
}
