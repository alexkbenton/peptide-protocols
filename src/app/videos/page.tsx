import SiteLayout from '@/components/SiteLayout'
import { getAllVideos } from '@/data/videos'

export default function VideosPage() {
  const videos = getAllVideos()

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-warm-50 pb-16 pt-20">
        <div className="container-narrow text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-sage-600 uppercase">
            Watch & Learn
          </p>
          <h1 className="heading-display">Video Education</h1>
          <p className="mx-auto mt-4 max-w-lg text-body">
            In-depth video content breaking down the science behind peptide protocols.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="bg-white py-16">
        <div className="container-wide">
          {videos.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-warm-800/50">Videos coming soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((video) => (
                <div key={video.id} className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm">
                  {/* Vimeo Embed */}
                  <div className="relative aspect-video bg-warm-100">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeoId}?h=0&title=0&byline=0&portrait=0`}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <span className="mb-2 inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
                      {video.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-medium text-warm-900">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-warm-800/60">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
