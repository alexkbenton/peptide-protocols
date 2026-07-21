'use client'

import { useEffect, useRef } from 'react'

interface CalendlyEmbedProps {
  /** Full Calendly scheduling URL, e.g. https://calendly.com/your-name/consultation */
  url: string
  /** Minimum height of the inline widget in pixels. */
  minHeight?: number
  className?: string
}

/**
 * Inline Calendly scheduling widget.
 *
 * Loads Calendly's widget.js once, then initializes the inline widget into a
 * dedicated container. Using initInlineWidget explicitly (rather than relying on
 * widget.js auto-scanning) keeps it working across Next.js client-side
 * navigations, where the script is already loaded and won't re-scan the DOM.
 *
 * Docs: https://help.calendly.com/hc/en-us/articles/31618265722775
 */
export default function CalendlyEmbed({
  url,
  minHeight = 700,
  className = '',
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Append the Calendly styles once.
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)
    }

    function init() {
      const Calendly = (window as unknown as { Calendly?: {
        initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void
      } }).Calendly
      if (!Calendly || !container) return
      container.innerHTML = '' // guard against double-init in React strict mode
      Calendly.initInlineWidget({ url, parentElement: container })
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="calendly.com/assets/external/widget.js"]'
    )

    if (existing) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = init
      document.body.appendChild(script)
    }

    return () => {
      if (container) container.innerHTML = ''
    }
  }, [url])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: 320, minHeight }}
    />
  )
}
