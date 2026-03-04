import Navigation from './Navigation'
import Footer from './Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
