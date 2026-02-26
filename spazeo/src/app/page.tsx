'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  ArrowRight,
  Play,
  Building2,
  Eye,
  Share2,
  Check,
  Upload,
  Sparkles,
  Globe,
  BarChart3,
  Smartphone,
  ShieldCheck,
  ChevronDown,
  Lock,
  CreditCard,
  Timer,
  Star,
  Brain,
  Infinity,
  Headphones,
  MapPin,
  Zap,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const HOW_IT_WORKS_STEPS = [
  {
    num: '1',
    title: 'Upload',
    desc: 'Drop any 360° panorama or standard photo. Our AI handles the rest.',
    icon: Upload,
  },
  {
    num: '2',
    title: 'AI Enhances',
    desc: 'Gaussian Splatting + depth estimation creates true 3D from a single image.',
    icon: Sparkles,
  },
  {
    num: '3',
    title: 'Share & Explore',
    desc: 'Get an instant shareable link. Viewers walk through your space on any device.',
    icon: Globe,
  },
]

const FEATURE_SHOWCASE = [
  {
    title: 'Gaussian Splatting Engine',
    desc: 'Convert flat panoramas into photorealistic 3D environments. Our neural rendering creates depth and parallax that feels like being there.',
    bullets: [
      'Real-time neural rendering',
      'Photorealistic depth from single images',
      'Works with any panorama format',
    ],
    imageAlt: 'Gaussian Splatting 3D rendering visualization',
    imageSrc: '/images/feature-gaussian.jpg',
  },
  {
    title: 'AI Virtual Staging',
    desc: 'Furnish empty spaces instantly. Our AI adds photorealistic furniture, decor, and styling matched to any design aesthetic.',
    bullets: [
      'Multiple design styles available',
      'Photorealistic furniture placement',
      'One-click staging transformations',
    ],
    imageAlt: 'AI Virtual Staging before and after',
    imageSrc: '/images/feature-staging.jpg',
  },
  {
    title: 'One-Click Publishing',
    desc: 'Share immersive tours with a single link. Embed on your website, share on social, or add to your MLS listing.',
    bullets: [
      'Shareable links in one click',
      'Website embed & social sharing',
      'MLS & real estate platform integration',
    ],
    imageAlt: 'One-click publishing dashboard',
    imageSrc: '/images/feature-publish.jpg',
  },
]

const PLATFORM_FEATURES = [
  {
    icon: Eye,
    title: '360° Panorama Viewer',
    desc: 'Interactive drag-to-explore viewer with smooth transitions and hotspot navigation.',
    color: '#D4A017',
  },
  {
    icon: Brain,
    title: 'Depth Estimation AI',
    desc: 'Automatic depth maps from 2D photos create parallax and real 3D perception.',
    color: '#2DD4BF',
  },
  {
    icon: Share2,
    title: 'One-Link Sharing',
    desc: 'Share tours instantly via link, embed on websites, or add to MLS listings.',
    color: '#FB7A54',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track views, engagement time, hotspot clicks, and visitor behavior in real time.',
    color: '#D4A017',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    desc: 'Responsive tours that look stunning on desktop, tablet, mobile, and VR headsets.',
    color: '#D4A017',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'SOC 2 compliant with SSO, role-based access, password-protected tours, and audit logs.',
    color: '#FB7A54',
  },
]

const EDITOR_STEPS = [
  {
    num: '1',
    icon: Upload,
    title: 'Upload Panoramas',
    desc: 'Drag and drop your 360° panoramic images. We support all major formats and resolutions.',
    color: '#D4A017',
  },
  {
    num: '2',
    icon: MapPin,
    title: 'Add Hotspots & Scenes',
    desc: 'Place interactive markers, link rooms together, and build a seamless spatial navigation flow.',
    color: '#2DD4BF',
  },
  {
    num: '3',
    icon: Share2,
    title: 'Publish & Share',
    desc: 'One click to publish your tour. Share via link, embed on your website, or send directly to clients.',
    color: '#FB7A54',
  },
]

const USE_CASES = [
  {
    title: 'Real Estate',
    desc: 'Sell properties faster with immersive virtual tours that let buyers explore every room before visiting.',
    imageSrc: '/images/usecase-realestate.jpg',
    imageAlt: 'Luxury living room virtual tour',
    icon: Building2,
    color: '#D4A017',
  },
  {
    title: 'Hospitality',
    desc: 'Boost hotel bookings by letting guests virtually walk through suites, amenities, and event spaces.',
    imageSrc: '/images/usecase-hospitality.jpg',
    imageAlt: 'Hotel suite virtual tour',
    icon: Star,
    color: '#2DD4BF',
  },
  {
    title: 'Architecture',
    desc: 'Present design concepts as walkable 3D spaces. Clients feel the scale and flow before construction begins.',
    imageSrc: '/images/usecase-architecture.jpg',
    imageAlt: 'Architecture walkthrough',
    icon: MapPin,
    color: '#FB7A54',
  },
  {
    title: 'Retail & Showrooms',
    desc: 'Turn physical showrooms into 24/7 virtual stores. Customers browse products in context, anywhere in the world.',
    imageSrc: '/images/usecase-retail.jpg',
    imageAlt: 'Virtual retail showroom',
    icon: Eye,
    color: '#D4A017',
  },
]

const STATS = [
  { value: '50K+', label: 'Tours Created', color: '#D4A017' },
  { value: '12M+', label: 'Virtual Walkthroughs', color: '#2DD4BF' },
  { value: '98%', label: 'Customer Satisfaction', color: '#FB7A54' },
  { value: '3.2x', label: 'Faster Than Competitors', color: '#F5F3EF' },
]

const TESTIMONIALS = [
  {
    quote:
      '"Spazeo cut our listing time in half. Buyers can walk through properties before scheduling a visit — it\'s a game changer."',
    name: 'Sarah Mitchell',
    role: 'Lead Agent, Compass Real Estate',
  },
  {
    quote:
      '"The AI staging feature alone is worth it. We furnished 40 empty units virtually and lease-up accelerated by 3 weeks."',
    name: 'James Rodriguez',
    role: 'VP of Marketing, Greystar',
  },
  {
    quote:
      '"We replaced our old Matterport workflow with Spazeo. Faster, cheaper, and the quality blew our clients away."',
    name: 'Emily Chen',
    role: 'Founder, LuxeView Properties',
  },
]

const PRICING_PLANS = [
  {
    name: 'Starter',
    desc: 'Perfect for trying out virtual tours.',
    price: '$0',
    period: '/month',
    checkColor: '#34D399',
    features: [
      '3 active tours',
      'Basic panorama viewer',
      'Shareable links',
      'Community support',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'outline' as const,
    highlight: false,
  },
  {
    name: 'Pro',
    desc: 'For agents and teams who need more.',
    price: '$49',
    period: '/month',
    badge: 'MOST POPULAR',
    checkColor: '#D4A017',
    features: [
      'Unlimited tours',
      'Gaussian Splatting 3D engine',
      'AI virtual staging',
      'Analytics dashboard',
      'Custom branding + embed',
      'Priority email support',
    ],
    cta: 'Start Pro Trial',
    ctaStyle: 'primary' as const,
    highlight: true,
  },
  {
    name: 'Enterprise',
    desc: 'For teams and brokerages at scale.',
    price: 'Custom',
    period: '',
    checkColor: '#2DD4BF',
    features: [
      'Everything in Pro',
      'SSO & role-based access',
      'SOC 2 compliance',
      'Dedicated account manager',
      'White-label option',
      'SLA & 24/7 support',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'teal' as const,
    highlight: false,
  },
]

const FAQ_ITEMS = [
  {
    q: 'What is Gaussian Splatting?',
    a: "Gaussian Splatting is a cutting-edge 3D rendering technique that reconstructs photorealistic scenes from images. It creates millions of tiny 3D 'splats' that together form a walkable, depth-aware environment from a single panorama.",
  },
  {
    q: 'Do I need a 360° camera?',
    a: 'No! While 360° panoramas provide the best results, Spazeo works with standard photos too. Our AI fills in the missing angles using depth estimation and neural rendering.',
  },
  {
    q: 'How long does it take to create a tour?',
    a: 'Most tours are ready in under 60 seconds. Upload your image, and our AI handles the 3D reconstruction, enhancement, and publishing automatically.',
  },
  {
    q: 'Can viewers experience tours in VR?',
    a: 'Yes! Spazeo tours are compatible with WebXR and work with Meta Quest, Apple Vision Pro, and other VR headsets. Simply open the tour link in a VR browser.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Absolutely. The Starter plan is free forever with up to 3 active tours. Upgrade to Pro anytime with a 14-day free trial — no credit card required.',
  },
]

const TRIAL_BENEFITS = [
  {
    title: 'Unlimited Tours',
    desc: 'Create as many virtual tours as you need during your trial period.',
    icon: Infinity,
    color: '#D4A017',
  },
  {
    title: 'AI Virtual Staging',
    desc: 'Furnish empty spaces instantly with AI-powered photorealistic staging.',
    icon: Brain,
    color: '#2DD4BF',
  },
  {
    title: 'Full Analytics Suite',
    desc: 'Track every view, interaction, and engagement metric across all your tours.',
    icon: BarChart3,
    color: '#FB7A54',
  },
  {
    title: 'Priority Support',
    desc: 'Get dedicated onboarding help and priority email support throughout your trial.',
    icon: Headphones,
    color: '#2DD4BF',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   SECTION BADGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
      style={{
        background: 'transparent',
        border: '1px solid rgba(212,160,23,0.30)',
        color: '#D4A017',
      }}
    >
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ ITEM COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <button
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-lg font-semibold pr-4"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
        >
          {q}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: '#6B6560',
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="text-base leading-relaxed pb-6"
          style={{ color: '#A8A29E', maxWidth: 720 }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>

        {/* ─── SECTION 1: HERO ─────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0A0908 0%, #0E0D0B 30%, #12100E 60%, #0A0908 100%)',
          }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
              zIndex: 1,
            }}
          />

          {/* Aurora orbs */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 800, height: 800, top: -300, right: -200,
              background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.06) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'aurora-drift 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 700, height: 700, bottom: -200, left: -180,
              background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(45,212,191,0.04) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'aurora-drift-reverse 14s ease-in-out infinite',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-20">
            {/* Center-aligned hero content */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 animate-on-scroll"
                style={{
                  background: 'rgba(212,160,23,0.08)',
                  border: '1px solid rgba(212,160,23,0.20)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 6, height: 6, background: '#D4A017',
                    boxShadow: '0 0 8px rgba(212,160,23,0.6)',
                    animation: 'glow-pulse 2s ease-in-out infinite',
                  }}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#D4A017' }}>
                  AI-Powered Virtual Tours
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-black leading-[1.04] tracking-[-2px] animate-on-scroll"
                style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontFamily: 'var(--font-display)' }}
              >
                <span style={{ color: '#F5F3EF' }}>Step Inside Any Space</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl leading-relaxed mt-6 animate-on-scroll"
                style={{ color: '#A8A29E', maxWidth: 600 }}
              >
                Transform a single panorama into an immersive, walkable 3D experience &mdash;
                powered by Gaussian Splatting, AI staging, and depth estimation.
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex gap-4 flex-wrap items-center justify-center animate-on-scroll">
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_8px_32px_rgba(212,160,23,0.35)] hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #D4A017 0%, #E5B120 100%)',
                    color: '#0A0908',
                    boxShadow: '0 4px 20px rgba(212,160,23,0.25)',
                  }}
                >
                  Start Creating Free
                  <ArrowRight size={16} />
                </Link>

                <button
                  className="flex items-center gap-2 font-medium text-base px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer hover:bg-[rgba(212,160,23,0.08)] hover:border-[rgba(212,160,23,0.40)]"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(212,160,23,0.30)',
                    color: '#D4A017',
                  }}
                >
                  <Play size={16} />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Hero image */}
            <div
              className="mt-16 rounded-2xl overflow-hidden mx-auto animate-on-scroll"
              style={{
                maxWidth: 1100,
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(45,212,191,0.08) 50%, rgba(212,160,23,0.05) 100%)',
                padding: 2,
                border: '1px solid rgba(212,160,23,0.15)',
              }}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden relative"
                style={{ background: '#12100E' }}
              >
                <Image
                  src="/images/hero-panorama.jpg"
                  alt="Immersive 360° virtual tour of a luxury living room"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1100px"
                />
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{ height: 120, background: 'linear-gradient(180deg, transparent 0%, #0A0908 100%)', zIndex: 2 }}
          />
        </section>

        {/* ─── SECTION 2: TRUSTED BY ──────────────────────────────── */}
        <section
          style={{
            background: '#0A0908',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <p
            className="text-center mb-6"
            style={{
              fontSize: 11, letterSpacing: '0.16em', color: '#5A5248',
              textTransform: 'uppercase', fontWeight: 600,
            }}
          >
            Trusted by leading real estate companies
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap max-w-4xl mx-auto px-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  width: 120,
                  height: 40,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION 3: HOW IT WORKS ─────────────────────────────── */}
        <section
          id="product"
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>How It Works</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                From Panorama to Walkthrough in Seconds
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E', maxWidth: 520 }}>
                Three simple steps to create immersive virtual experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl p-8 animate-on-scroll"
                    style={{
                      background: 'rgba(18,16,14,0.95)',
                      border: '1px solid rgba(212,160,23,0.10)',
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-6"
                      style={{
                        border: '1.5px solid rgba(212,160,23,0.4)',
                        color: '#D4A017',
                      }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: FEATURE SHOWCASE (Alternating) ───────────── */}
        <section
          className="relative"
          style={{ background: '#0A0908', paddingTop: 48, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24">
            {FEATURE_SHOWCASE.map((feat, i) => {
              const isReversed = i % 2 === 1
              return (
                <div
                  key={feat.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-on-scroll ${isReversed ? '' : ''}`}
                >
                  {/* Text side */}
                  <div className={isReversed ? 'lg:order-2' : ''}>
                    <h3
                      className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                      style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                    >
                      {feat.title}
                    </h3>
                    <p className="text-base leading-relaxed mb-6" style={{ color: '#A8A29E' }}>
                      {feat.desc}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {feat.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm" style={{ color: '#A8A29E' }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: '#2DD4BF' }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Image side */}
                  <div className={isReversed ? 'lg:order-1' : ''}>
                    <div
                      className="rounded-2xl overflow-hidden relative"
                      style={{
                        aspectRatio: '4/3',
                        background: '#12100E',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <Image
                        src={feat.imageSrc}
                        alt={feat.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 560px"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── SECTION 5: EVERYTHING YOU NEED ──────────────────────── */}
        <section
          id="features"
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>Why Spazeo</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Everything You Need to Create Stunning Tours
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E', maxWidth: 520 }}>
                Powerful tools that work behind the scenes so you can focus on showcasing spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLATFORM_FEATURES.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div
                    key={feat.title}
                    className="bento-card rounded-2xl p-7 animate-on-scroll"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25` }}
                    >
                      <Icon size={20} style={{ color: feat.color }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}>
                      {feat.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>
                      {feat.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: EDITOR PREVIEW ───────────────────────────── */}
        <section
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>See It In Action</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Experience the Spazeo Editor
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E', maxWidth: 640 }}>
                Upload your 360° panoramas, place interactive hotspots, link scenes together,
                and publish immersive virtual tours&mdash;all from one powerful dark-mode editor.
              </p>
            </div>

            {/* Editor mockup with browser chrome */}
            <div
              className="rounded-2xl overflow-hidden mx-auto mb-16 animate-on-scroll flex flex-col"
              style={{
                maxWidth: 1000,
                background: '#12100E',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.60)',
              }}
            >
              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#34D399' }} />
                </div>
                <span className="text-xs ml-3" style={{ color: '#5A5248' }}>
                  Spazeo Editor
                </span>
              </div>
              <div className="relative" style={{ aspectRatio: '16/10' }}>
                <Image
                  src="/images/editor-preview.jpg"
                  alt="Spazeo Tour Editor interface showing panorama editing with hotspots and scene navigation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
              </div>
            </div>

            {/* Editor steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDITOR_STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="bento-card rounded-2xl p-7 text-center animate-on-scroll"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: USE CASES ────────────────────────────────── */}
        <section
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>Use Cases</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Built for Every Space
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E', maxWidth: 520 }}>
                From luxury homes to global hotel chains &mdash; Spazeo powers immersive experiences across industries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {USE_CASES.map((uc, i) => {
                const Icon = uc.icon
                return (
                  <div
                    key={uc.title}
                    className="rounded-2xl overflow-hidden animate-on-scroll group"
                    style={{
                      background: '#12100E',
                      border: '1px solid rgba(255,255,255,0.06)',
                      animationDelay: `${i * 100}ms`,
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <div className="relative" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={uc.imageSrc}
                        alt={uc.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
                      />
                    </div>
                    <div className="p-6">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: `${uc.color}15`, border: `1px solid ${uc.color}25` }}
                      >
                        <Icon size={18} style={{ color: uc.color }} />
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}>
                        {uc.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>
                        {uc.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: STATS + TESTIMONIALS ─────────────────────── */}
        <section
          id="about"
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-on-scroll">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-4xl md:text-5xl font-black mb-2"
                    style={{ color: stat.color, fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: '#6B6560' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials header */}
            <div className="text-center mb-12 animate-on-scroll">
              <h2
                className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Loved by Real Estate Professionals
              </h2>
              <p className="text-base" style={{ color: '#A8A29E', maxWidth: 480, margin: '0 auto' }}>
                See what our customers say about transforming their business with Spazeo.
              </p>
            </div>

            {/* Testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className="bento-card rounded-2xl p-7 animate-on-scroll"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} fill="#D4A017" style={{ color: '#D4A017' }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#A8A29E' }}>
                    {t.quote}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                    <div className="text-sm font-semibold" style={{ color: '#F5F3EF' }}>
                      {t.name}
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#6B6560' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: PRICING ──────────────────────────────────── */}
        <section
          id="pricing"
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>Pricing</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E' }}>
                Start free. Upgrade when you&apos;re ready. No hidden fees, ever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PRICING_PLANS.map((plan, i) => (
                <div
                  key={plan.name}
                  className="rounded-2xl p-7 relative animate-on-scroll flex flex-col"
                  style={{
                    background: plan.highlight
                      ? 'rgba(18,16,14,0.95)'
                      : 'rgba(18,16,14,0.95)',
                    border: plan.highlight
                      ? '1.5px solid rgba(212,160,23,0.35)'
                      : '1px solid rgba(255,255,255,0.06)',
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: '#D4A017', color: '#0A0908' }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#6B6560' }}>
                      {plan.desc}
                    </p>
                  </div>
                  <div className="mb-6">
                    <span
                      className="text-4xl font-black"
                      style={{
                        color: plan.highlight ? '#D4A017' : '#F5F3EF',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm ml-1" style={{ color: '#6B6560' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#A8A29E' }}>
                        <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: plan.checkColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.ctaStyle === 'teal' ? '/contact' : '/sign-up'}
                    className="w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 block"
                    style={
                      plan.ctaStyle === 'primary'
                        ? {
                            background: '#D4A017',
                            color: '#0A0908',
                          }
                        : plan.ctaStyle === 'teal'
                          ? {
                              background: 'transparent',
                              border: '1.5px solid rgba(45,212,191,0.4)',
                              color: '#2DD4BF',
                            }
                          : {
                              background: 'transparent',
                              border: '1.5px solid rgba(255,255,255,0.10)',
                              color: '#A8A29E',
                            }
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: FAQ ─────────────────────────────────────── */}
        <section
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12 animate-on-scroll">
              <SectionBadge>FAQ</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="animate-on-scroll">
              {FAQ_ITEMS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 11: FREE TRIAL CTA WITH FORM ────────────────── */}
        <section
          className="relative"
          style={{ background: '#0A0908', paddingTop: 96, paddingBottom: 96 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 animate-on-scroll">
              <SectionBadge>Start Free Trial</SectionBadge>
              <h2
                className="mt-6 font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Try Spazeo Free for 14 Days
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#A8A29E' }}>
                No credit card required. Full access to all Pro features. Cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left — benefits */}
              <div className="animate-on-scroll">
                <h3
                  className="text-xl font-bold mb-8"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  What you get with your free trial
                </h3>
                <div className="flex flex-col gap-6">
                  {TRIAL_BENEFITS.map((b) => {
                    const Icon = b.icon
                    return (
                      <div key={b.title} className="flex gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${b.color}12` }}
                        >
                          <Icon size={20} style={{ color: b.color }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1" style={{ color: '#F5F3EF' }}>
                            {b.title}
                          </h4>
                          <p className="text-sm" style={{ color: '#6B6560' }}>
                            {b.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right — form */}
              <div
                className="rounded-2xl p-8 animate-on-scroll"
                style={{
                  background: '#12100E',
                  border: '1px solid rgba(212,160,23,0.12)',
                }}
              >
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  Start your free trial
                </h3>
                <p className="text-sm mb-6" style={{ color: '#6B6560' }}>
                  Get instant access to all features. No setup fees.
                </p>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label
                      className="text-xs font-semibold mb-1.5 block"
                      style={{ color: '#A8A29E' }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 focus:border-[#D4A017]"
                      style={{
                        background: '#1B1916',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#F5F3EF',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold mb-1.5 block"
                      style={{ color: '#A8A29E' }}
                    >
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 focus:border-[#D4A017]"
                      style={{
                        background: '#1B1916',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#F5F3EF',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold mb-1.5 block"
                      style={{ color: '#A8A29E' }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200 focus:border-[#D4A017]"
                      style={{
                        background: '#1B1916',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#F5F3EF',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:shadow-[0_8px_32px_rgba(212,160,23,0.3)] hover:-translate-y-0.5"
                    style={{
                      background: '#D4A017',
                      color: '#0A0908',
                      border: 'none',
                    }}
                  >
                    Start Free Trial
                  </button>
                </form>

                <p className="text-xs mt-4 text-center" style={{ color: '#5A5248' }}>
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-[#A8A29E]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline hover:text-[#A8A29E]">
                    Privacy Policy
                  </Link>
                  .
                </p>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mt-6">
                  {[
                    { icon: ShieldCheck, label: 'SSL Secured' },
                    { icon: CreditCard, label: 'No Card Required' },
                    { icon: Timer, label: 'Setup in 30s' },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5">
                      <badge.icon size={14} style={{ color: '#34D399' }} />
                      <span className="text-xs" style={{ color: '#6B6560' }}>
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 12: FINAL CTA ───────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: 96, paddingBottom: 96 }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,160,23,0.12) 0%, transparent 60%), #0A0908',
            }}
          />

          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <h2
              className="text-3xl md:text-5xl font-black tracking-tight mb-6 animate-on-scroll"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
            >
              Ready to Step Inside?
            </h2>
            <p
              className="text-lg leading-relaxed mb-10 animate-on-scroll"
              style={{ color: '#A8A29E', maxWidth: 560, margin: '0 auto 40px' }}
            >
              Join thousands of real estate professionals creating immersive experiences with Spazeo.
              Start free &mdash; no credit card required.
            </p>

            <div className="flex gap-4 flex-wrap items-center justify-center animate-on-scroll">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_8px_32px_rgba(212,160,23,0.35)] hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #FB7A54 0%, #F46036 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(251,122,84,0.3)',
                }}
              >
                <Zap size={16} />
                Start Creating Free
              </Link>

              <button
                className="flex items-center gap-2 font-medium text-base px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(251,122,84,0.08)',
                  border: '1px solid rgba(251,122,84,0.25)',
                  color: '#FB7A54',
                }}
              >
                <Play size={16} />
                Watch Demo
              </button>
            </div>

            <p className="mt-8 text-sm animate-on-scroll" style={{ color: '#5A5248' }}>
              Free forever for up to 3 tours &middot; No credit card &middot; Setup in 30 seconds
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
