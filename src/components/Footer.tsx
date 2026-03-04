import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-white">
      <div className="container-wide py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-600">
                <span className="text-base font-bold text-white">P</span>
              </div>
              <span className="font-display text-lg font-medium text-warm-900">
                Peptide Protocols
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-800/60">
              Evidence-based peptide education for those who take their health seriously.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-warm-800/40 uppercase">
              Navigate
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/home" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">Home</Link>
              <Link href="/protocols" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">Protocols</Link>
              <Link href="/videos" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">Videos</Link>
              <Link href="/about" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">About</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-warm-800/40 uppercase">
              Legal
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/privacy" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-warm-800/70 transition-colors hover:text-sage-600">Terms of Use</Link>
            </div>
            <p className="mt-6 text-xs text-warm-800/40">
              This site is for educational purposes only and does not provide medical advice.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-warm-200 pt-8">
          <p className="text-center text-xs text-warm-800/40">
            &copy; {new Date().getFullYear()} Peptide Protocols. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
