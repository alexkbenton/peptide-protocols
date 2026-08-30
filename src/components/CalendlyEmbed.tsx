'use client'

import { useEffect, useRef } from 'react'
import { reportConversion } from '@/lib/gtag'

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
        initInlineWidget: (opts: {
          url: string
          parentElement: HTMLElement
          resize?: boolean
        }) => void
      } }).Calendly
      if (!Calendly || !container) return
      container.innerHTML = '' // guard against double-init in React strict mode
      // resize:true makes the booking page post its content height to us, so the
      // container grows instead of trapping the calendar in an inner scrollbar.
      Calendly.initInlineWidget({ url, parentElement: container, resize: true })
    }

    // Belt and braces: apply the height Calendly reports directly. resize:true
    // handles this on its own in most cases, but the listener also covers the
    // step-to-step growth as an invitee moves through the booking flow.
    function onMessage(e: MessageEvent) {
      if (typeof e.origin !== 'string' || !e.origin.includes('calendly.com')) return
      const data = e.data as { event?: string; payload?: { height?: string | number } }
      if (data?.event === 'calendly.event_scheduled') {
        reportConversion('consultationBooking', { value: 1.0, currency: 'USD' })
        return
      }
      if (data?.event !== 'calendly.page_height') return
      const height = data.payload?.height
      if (!height || !container) return
      container.style.height = typeof height === 'number' ? `${height}px` : height
    }

    window.addEventListener('message', onMessage)

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
      window.removeEventListener('message', onMessage)
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
