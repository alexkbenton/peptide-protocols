// Google Ads conversion tracking.
//
// The base Google tag (AW-18413887967) is installed site-wide in
// src/app/layout.tsx. To turn a conversion "on", create the conversion action
// in Google Ads (Goals → Conversions → New conversion action → Website), copy
// its conversion label — the part after the slash in the "send_to" value, e.g.
// in "AW-18413887967/AbC-dEfGhIjK..." the label is "AbC-dEfGhIjK..." — and
// paste it below. Until a label is filled in, reportConversion() is a safe
// no-op for that action, so this is safe to ship as-is.

export const GA_ADS_ID = 'AW-18413887967'

export const CONVERSION_LABELS = {
  consultationBooking: '_V02CITtw-kcEN_DtsxE', // "Consultation booking" action (Google Ads)
  newsletterSignup: '',    // paste the label for the "Newsletter signup" action
} as const

type ConversionKey = keyof typeof CONVERSION_LABELS

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fire a Google Ads conversion. No-ops safely on the server, before the gtag
 * script has loaded, or when the label for `key` has not been configured yet.
 */
export function reportConversion(
  key: ConversionKey,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const label = CONVERSION_LABELS[key]
  if (!label) return
  window.gtag('event', 'conversion', {
    send_to: `${GA_ADS_ID}/${label}`,
    ...params,
  })
}
