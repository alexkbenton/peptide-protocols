import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import { getProtocolBySlug, getAllProtocols } from '@/data/protocols'

// Protocol content components
import GutHealthContent from './content/gut-health-anti-inflammation'
import OptimalFatMuscleContent from './content/optimal-fat-muscle-mito'
import CellularRepairContent from './content/cellular-repair'

const contentMap: Record<string, React.ComponentType> = {
  'gut-health-anti-inflammation': GutHealthContent,
  'optimal-fat-muscle-mito': OptimalFatMuscleContent,
  'cellular-repair': CellularRepairContent,
}

export function generateStaticParams() {
  return getAllProtocols().map((protocol) => ({
    slug: protocol.slug,
  }))
}

export default function ProtocolPage({ params }: { params: { slug: string } }) {
  const protocol = getProtocolBySlug(params.slug)

  if (!protocol) {
    notFound()
  }

  const ContentComponent = contentMap[params.slug]

  return (
    <SiteLayout>
      <article className="bg-white py-20">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <nav className="mb-10 animate-fade-in">
            <Link href="/protocols" className="text-sm text-sage-600 transition-colors hover:text-sage-700">
              &larr; Back to Protocols
            </Link>
          </nav>

          {/* Header */}
          <div className="animate-fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
              {protocol.category}
            </span>
            <h1 className="heading-display">{protocol.title}</h1>
            <p className="mt-4 text-body">{protocol.summary}</p>

            {protocol.compounds && (
              <div className="mt-6 flex flex-wrap gap-2">
                {protocol.compounds.map((compound) => (
                  <span key={compound} className="rounded-lg bg-warm-100 px-3 py-1 text-xs font-medium text-warm-800/70">
                    {compound}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <hr className="my-10 border-warm-200" />

          {/* Warning */}
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm leading-relaxed text-amber-900/80">
              <strong>Important:</strong> This content is for informational and research purposes only and is not intended for human or veterinary use. Consult your physician for health-related guidance and laboratory monitoring. Any health or longevity protocol assumes diet and exercise are already optimized.
            </p>
          </div>

          {/* Content */}
          <div className="protocol-content">
            {ContentComponent ? <ContentComponent /> : (
              <p className="text-warm-800/60 italic">Content coming soon.</p>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 rounded-2xl bg-warm-100 p-8">
            <p className="text-xs leading-relaxed text-warm-800/60">
              <strong className="text-warm-800/80">Disclaimer:</strong> This protocol is for
              educational and research purposes only. It is not medical advice. These products are not approved by the FDA. Consult a qualified
              healthcare provider before starting any new protocol.
            </p>
          </div>
        </div>
      </article>
    </SiteLayout>
  )
}
