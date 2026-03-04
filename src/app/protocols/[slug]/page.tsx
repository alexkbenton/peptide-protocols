import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteLayout from '@/components/SiteLayout'
import { getProtocolBySlug, getAllProtocols } from '@/data/protocols'

// Generate static paths for all protocols
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

  // Simple markdown-like rendering (headings, bold, italic, paragraphs)
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      const trimmed = block.trim()
      if (!trimmed) return null

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="mb-4 mt-10 font-display text-2xl font-medium text-warm-900">
            {trimmed.replace('## ', '')}
          </h2>
        )
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="mb-3 mt-8 font-display text-xl font-medium text-warm-900">
            {trimmed.replace('### ', '')}
          </h3>
        )
      }

      // Italic placeholder
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
        return (
          <p key={i} className="mb-4 italic text-warm-800/50">
            {trimmed.replace(/\*/g, '')}
          </p>
        )
      }

      return (
        <p key={i} className="mb-4 text-lg leading-relaxed text-warm-800/80">
          {trimmed}
        </p>
      )
    })
  }

  return (
    <SiteLayout>
      <article className="bg-white py-20">
        <div className="container-narrow">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <Link href="/protocols" className="text-sm text-sage-600 transition-colors hover:text-sage-700">
              &larr; Back to Protocols
            </Link>
          </nav>

          {/* Header */}
          <span className="mb-4 inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
            {protocol.category}
          </span>
          <h1 className="heading-display">{protocol.title}</h1>
          <p className="mt-4 text-body">{protocol.summary}</p>

          {/* Divider */}
          <hr className="my-10 border-warm-200" />

          {/* Content */}
          <div className="prose-custom">
            {renderContent(protocol.content)}
          </div>

          {/* Disclaimer */}
          <div className="mt-16 rounded-2xl bg-warm-100 p-8">
            <p className="text-xs leading-relaxed text-warm-800/60">
              <strong className="text-warm-800/80">Disclaimer:</strong> This protocol is for
              educational purposes only. It is not medical advice. Consult a qualified
              healthcare provider before starting any new protocol.
            </p>
          </div>
        </div>
      </article>
    </SiteLayout>
  )
}
