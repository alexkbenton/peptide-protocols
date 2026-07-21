import type { Metadata } from 'next'
import SiteLayout from '@/components/SiteLayout'
import WistiaPlayer from '@/components/WistiaPlayer'
import NewsletterSignup from '@/components/NewsletterSignup'
import {
  categoryDescriptions,
  getCategoriesWithVideos,
  getVideosByCategory,
  type VideoCategory,
} from '@/data/videos'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'In-depth video content breaking down the science behind peptide protocols. Watch and learn at your own pace.',
}

/* ── category icons (inline SVG keeps it dependency-free) ── */
const categoryIcons: Record<VideoCategory, JSX.Element> = {
  'Peptide Basics': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  'Gut Health & Recovery': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  'Body Composition & Performance': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
  ),
  'Cellular Repair & Longevity': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  'Administration & Safety': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
}

export default function VideosPage() {
  const categories = getCategoriesWithVideos()

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-warm-50 pb-16 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Watch &amp; Learn
          </p>
          <h1 className="heading-display">Video Education</h1>
          <p className="mx-auto mt-4 max-w-lg text-body">
            In-depth video content breaking down the science behind peptide
            protocols. New videos are added regularly.
          </p>
        </div>
      </section>

      {/* Category Sections */}
      <section className="bg-white py-16">
        <div className="container-wide space-y-20">
          {categories.map((category) => {
            const catVideos = getVideosByCategory(category)

            return (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-50 text-sage-600">
                    {categoryIcons[category]}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-warm-900">
                      {category}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-warm-800/60">
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                </div>

                {/* Video Grid */}
                <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
                    {catVideos.map((video) => (
                      <div
                        key={video.id}
                        className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm max-w-md"
                      >
                        <div className="bg-warm-100">
                          <WistiaPlayer wistiaId={video.wistiaId} startTime={video.startTime} />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg font-medium text-warm-900">
                              {video.title}
                            </h3>
                            {video.duration && (
                              <span className="ml-2 shrink-0 text-xs text-warm-800/40">
                                {video.duration}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-sage-600 py-16 text-center text-white">
        <div className="container-narrow">
          <h2 className="font-display text-3xl font-semibold">
            More videos on the way
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sage-100/80">
            We&apos;re producing new episodes covering protocols, mechanisms,
            and administration. Get an email when they drop.
          </p>
          <NewsletterSignup
            source="videos"
            variant="dark"
            className="mx-auto mt-6 max-w-md text-left"
          />
        </div>
      </section>
    </SiteLayout>
  )
}
