import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Peptide Protocols — Evidence-Based Wellness Education',
    template: '%s | Peptide Protocols',
  },
  description: 'Explore evidence-based peptide protocols, educational videos, and wellness resources. Your trusted source for peptide education.',
  keywords: ['peptide protocols', 'wellness', 'health education', 'peptides', 'BPC-157', 'thymosin', 'peptide science'],
  metadataBase: new URL('https://peptideprotocols.us'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://peptideprotocols.us',
    siteName: 'Peptide Protocols',
    title: 'Peptide Protocols — Evidence-Based Wellness Education',
    description: 'Explore evidence-based peptide protocols, educational videos, and wellness resources. Your trusted source for peptide education.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide Protocols — Evidence-Based Wellness Education',
    description: 'Explore evidence-based peptide protocols, educational videos, and wellness resources.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Peptide Protocols',
              url: 'https://peptideprotocols.us',
              description: 'Evidence-based peptide education — protocols, videos, and research.',
              publisher: {
                '@type': 'Organization',
                name: 'Peptide Protocols',
                url: 'https://peptideprotocols.us',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google tag (gtag.js) — Google Ads AW-18413887967 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18413887967"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18413887967');`}
        </Script>
        {children}
      </body>
    </html>
  )
}
