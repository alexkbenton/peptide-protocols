import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
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
        {children}
      </body>
    </html>
  )
}
