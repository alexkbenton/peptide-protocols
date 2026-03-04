import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-50 px-6">
      <div className="max-w-md text-center animate-fade-in-up">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-sage-50">
          <span className="font-display text-3xl font-medium text-sage-600">404</span>
        </div>
        <h1 className="font-display text-2xl font-medium text-warm-900 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-warm-800/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/home" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
