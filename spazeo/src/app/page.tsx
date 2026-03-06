import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { LogoBar } from '@/components/landing/LogoBar'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { StatsBar } from '@/components/landing/StatsBar'
import { Testimonials } from '@/components/landing/Testimonials'
import { Pricing } from '@/components/landing/Pricing'
import { CTA } from '@/components/landing/CTA'
import { LandingAnalytics } from '@/components/landing/LandingAnalytics'

export const metadata: Metadata = {
  title: 'Spazeo — Step Inside Any Space | AI-Powered 360° Virtual Tours',
  description:
    'Create immersive 360° virtual tours with AI-powered features. Perfect for real estate, hospitality, and commercial spaces.',
  openGraph: {
    title: 'Spazeo — Step Inside Any Space | AI-Powered 360° Virtual Tours',
    description:
      'Create immersive 360° virtual tours with AI-powered features. Perfect for real estate, hospitality, and commercial spaces.',
    siteName: 'Spazeo',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0A0908]">
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <StatsBar />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
      <LandingAnalytics />
    </main>
  )
}
