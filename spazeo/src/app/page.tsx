'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  ArrowRight,
  Play,
  Building2,
  Eye,
  Wand2,
  Box,
  MapPin,
  Video,
  BarChart3,
  UploadCloud,
  Share2,
  Check,
  Zap,
  Camera,
  Cpu,
} from 'lucide-react'

const DynamicViewer = dynamic(
  () => import('@/components/viewer/PanoramaViewer').then((m) => ({ default: m.PanoramaViewer })),
  { ssr: false }
)

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

        {/* ─── SECTION 1: HERO (Dark Atmospheric) ──────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: '100vh',
            paddingBottom: 0,
            background: 'linear-gradient(180deg, #0A0908 0%, #0E0D0B 30%, #12100E 60%, #0A0908 100%)',
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
              zIndex: 1,
            }}
          />

          {/* Aurora glow orb — Gold (top-right) */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 800,
              height: 800,
              top: -300,
              right: -200,
              background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0.06) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'aurora-drift 12s ease-in-out infinite',
            }}
          />

          {/* Aurora glow orb — Teal (bottom-left) */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 700,
              height: 700,
              bottom: -200,
              left: -180,
              background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(45,212,191,0.04) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'aurora-drift-reverse 14s ease-in-out infinite',
            }}
          />

          {/* Aurora glow orb — Coral (center-right) */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 500,
              height: 500,
              top: '40%',
              right: '10%',
              background: 'radial-gradient(circle, rgba(251,122,84,0.08) 0%, rgba(251,122,84,0.02) 40%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'aurora-drift 16s ease-in-out infinite',
            }}
          />

          {/* Mesh gradient (center canvas glow) */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(212,160,23,0.06) 0%, transparent 60%)',
            }}
          />

          {/* Top fade edge */}
          <div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              height: 120,
              background: 'linear-gradient(180deg, rgba(10,9,8,0.8) 0%, transparent 100%)',
              zIndex: 2,
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-28 pb-20"
              style={{ minHeight: 'calc(100vh - 0px)' }}
            >
              {/* LEFT COLUMN */}
              <div>
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                  style={{
                    background: 'rgba(212,160,23,0.08)',
                    border: '1px solid rgba(212,160,23,0.20)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
                  }}
                >
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: 6,
                      height: 6,
                      background: '#D4A017',
                      boxShadow: '0 0 8px rgba(212,160,23,0.6)',
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: '#D4A017' }}
                  >
                    AI-Powered Virtual Tours
                  </span>
                </div>

                {/* H1 */}
                <h1
                  className="font-black leading-[1.04] tracking-[-2px]"
                  style={{
                    fontSize: 'clamp(44px, 6.5vw, 78px)',
                    fontFamily: 'var(--font-display)',
                    animation: 'fadeUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both',
                  }}
                >
                  <span style={{ color: '#F5F3EF' }}>Step Inside</span>
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #F5C842 0%, #D4A017 40%, #2DD4BF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Any Space.
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className="text-lg md:text-xl leading-relaxed mt-6"
                  style={{
                    color: '#A8A29E',
                    maxWidth: 460,
                    animation: 'fadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both',
                  }}
                >
                  The AI platform that converts a single panorama into a fully immersive,
                  walkable 360° tour — ready to share in minutes.
                </p>

                {/* CTA Row */}
                <div
                  className="mt-10 flex gap-4 flex-wrap items-center"
                  style={{ animation: 'fadeUp 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  <button
                    className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #D4A017 0%, #E5B120 100%)',
                      color: '#0A0908',
                      fontWeight: 700,
                      padding: '16px 32px',
                      borderRadius: 12,
                      fontSize: 16,
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(212,160,23,0.25), 0 0 60px rgba(212,160,23,0.10)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'linear-gradient(135deg, #E5B120 0%, #F5C842 100%)'
                      el.style.boxShadow = '0 8px 32px rgba(212,160,23,0.35), 0 0 80px rgba(212,160,23,0.15)'
                      el.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'linear-gradient(135deg, #D4A017 0%, #E5B120 100%)'
                      el.style.boxShadow = '0 4px 20px rgba(212,160,23,0.25), 0 0 60px rgba(212,160,23,0.10)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    Start Free Tour
                    <ArrowRight size={16} />
                  </button>

                  <button
                    className="flex items-center gap-2 cursor-pointer transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: '#A8A29E',
                      fontWeight: 500,
                      padding: '16px 24px',
                      borderRadius: 12,
                      fontSize: 16,
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = 'rgba(255,255,255,0.20)'
                      el.style.color = '#F5F3EF'
                      el.style.background = 'rgba(255,255,255,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = 'rgba(255,255,255,0.10)'
                      el.style.color = '#A8A29E'
                      el.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  >
                    <Play size={16} />
                    Watch Demo
                  </button>
                </div>

                {/* Trust Line */}
                <div
                  className="mt-6 flex items-center gap-3"
                  style={{
                    fontSize: 13,
                    color: '#6B6560',
                    animation: 'fadeUp 0.7s 0.4s cubic-bezier(0.16,1,0.3,1) both',
                  }}
                >
                  <div className="flex items-center">
                    {['S', 'A', 'J', 'M', 'P'].map((initial, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          background: 'rgba(212,160,23,0.10)',
                          border: '2px solid rgba(212,160,23,0.15)',
                          color: '#D4A017',
                          marginLeft: i === 0 ? 0 : -10,
                          zIndex: 5 - i,
                          position: 'relative',
                        }}
                      >
                        {initial}
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 2,400+ real estate teams</span>
                </div>
              </div>

              {/* RIGHT COLUMN — Glassmorphism Viewer */}
              <div className="relative hidden lg:flex items-center justify-center">
                {/* Ambient glow behind viewer */}
                <div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: 500,
                    height: 500,
                    background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 65%)',
                    filter: 'blur(60px)',
                    animation: 'glow-pulse 4s ease-in-out infinite',
                  }}
                />

                <div
                  className="rounded-2xl overflow-hidden w-full"
                  style={{
                    maxWidth: 580,
                    aspectRatio: '4/3',
                    padding: 2,
                    background: 'linear-gradient(135deg, rgba(212,160,23,0.30) 0%, rgba(45,212,191,0.15) 50%, rgba(212,160,23,0.10) 100%)',
                    borderRadius: 20,
                    animation: 'border-glow 4s ease-in-out infinite',
                    border: '1px solid rgba(212,160,23,0.2)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 18,
                      overflow: 'hidden',
                      background: '#0A0908',
                    }}
                  >
                    <DynamicViewer
                      imageUrl="https://picsum.photos/seed/spazeo-tour/2048/1024"
                      height="100%"
                    />
                  </div>
                </div>

                {/* Floating live badge — glass */}
                <div
                  className="rounded-xl flex items-center gap-3 absolute"
                  style={{
                    bottom: -16,
                    left: -20,
                    padding: '12px 16px',
                    zIndex: 20,
                    background: 'rgba(18,16,14,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.40), 0 0 0 1px rgba(212,160,23,0.10)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    animation: 'float-gentle 3s ease-in-out infinite',
                  }}
                >
                  <div className="relative flex-shrink-0" style={{ width: 8, height: 8 }}>
                    <div
                      className="rounded-full absolute inset-0"
                      style={{ background: '#34D399', animation: 'ping-slow 1.8s ease-out infinite' }}
                    />
                    <div
                      className="rounded-full absolute inset-0"
                      style={{ background: '#34D399' }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#F5F3EF' }}>
                    Live Tour · 2 viewers
                  </span>
                </div>

                {/* Floating AI chip — glass */}
                <div
                  className="absolute flex items-center gap-1.5 rounded-full"
                  style={{
                    top: -14,
                    right: -14,
                    background: 'rgba(18,16,14,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,160,23,0.20)',
                    padding: '6px 14px',
                    zIndex: 20,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.30), 0 0 20px rgba(212,160,23,0.08)',
                    animation: 'float-gentle 3.5s ease-in-out infinite 0.5s',
                  }}
                >
                  <Zap size={12} style={{ color: '#D4A017' }} />
                  <span className="text-xs font-semibold" style={{ color: '#D4A017' }}>
                    AI Processing
                  </span>
                </div>

                {/* Stats chip — glass (new) */}
                <div
                  className="absolute flex items-center gap-2 rounded-xl"
                  style={{
                    bottom: -16,
                    right: -10,
                    background: 'rgba(18,16,14,0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(45,212,191,0.15)',
                    padding: '10px 14px',
                    zIndex: 20,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.30)',
                    animation: 'float-gentle 4s ease-in-out infinite 1s',
                  }}
                >
                  <Eye size={14} style={{ color: '#2DD4BF' }} />
                  <span className="text-xs font-medium" style={{ color: '#A8A29E' }}>
                    <span style={{ color: '#F5F3EF', fontWeight: 700 }}>12.4K</span> views today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade into next section */}
          <div
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{
              height: 120,
              background: 'linear-gradient(180deg, transparent 0%, #12100E 100%)',
              zIndex: 2,
            }}
          />
        </section>

        {/* ─── SECTION 2: TICKER / SOCIAL PROOF ───────────────────── */}
        <section
          style={{
            background: '#12100E',
            borderTop: '1px solid rgba(212,160,23,0.12)',
            borderBottom: '1px solid rgba(212,160,23,0.12)',
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.16em',
              color: '#5A5248',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Trusted by leading teams at
          </p>
          <div
            style={{
              overflow: 'hidden',
              maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                width: 'max-content',
                animation: 'ticker 35s linear infinite',
              }}
            >
              {[
                'Compass', "Sotheby's", 'CBRE', 'JLL', 'Berkshire', 'Century 21', 'Coldwell', 'RE/MAX',
                'Compass', "Sotheby's", 'CBRE', 'JLL', 'Berkshire', 'Century 21', 'Coldwell', 'RE/MAX',
              ].map((name, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginLeft: 48,
                    marginRight: 48,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <Building2 size={15} style={{ color: '#2E2A24', flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#2E2A24',
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: FEATURES BENTO GRID ─────────────────────── */}
        <section style={{ background: '#0A0908', paddingTop: 112, paddingBottom: 112 }}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16 animate-on-scroll">
              <p
                className="text-xs uppercase font-semibold mb-4"
                style={{ letterSpacing: '0.16em', color: '#D4A017' }}
              >
                Platform Features
              </p>
              <h2
                className="font-bold leading-tight mx-auto"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  letterSpacing: '-1.5px',
                  fontFamily: 'var(--font-display)',
                  color: '#F5F3EF',
                  maxWidth: 640,
                }}
              >
                Everything built for
                <br />
                immersive property tours
              </h2>
              <p
                className="text-lg mt-4 mx-auto"
                style={{ color: '#6B6560', maxWidth: 480 }}
              >
                One platform to capture, process, and share stunning 360° experiences
                that convert buyers faster than any listing photo.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card 1 — 360° Immersive Viewer (col-span-2) */}
              <div
                className="bento-card p-7 lg:col-span-2 animate-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, #1B1916 0%, #1B1916 100%)',
                }}
              >
                <Eye size={44} style={{ color: '#D4A017' }} />
                <h3
                  className="text-2xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  360° Immersive Viewer
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560', maxWidth: 420 }}
                >
                  Deliver cinematic, fully navigable 360° tours that run in any browser,
                  on any device — no downloads, no plugins, no friction for buyers.
                </p>
                <div
                  className="mt-8 rounded-xl flex flex-col items-center justify-center gap-2"
                  style={{
                    height: 144,
                    background: '#12100E',
                    border: '1px solid rgba(212,160,23,0.12)',
                  }}
                >
                  <Camera size={28} style={{ color: '#2E2A24' }} />
                  <span className="text-sm" style={{ color: '#5A5248' }}>
                    360° Preview
                  </span>
                </div>
              </div>

              {/* Card 2 — AI Staging */}
              <div
                className="bento-card gradient-border p-7 animate-on-scroll delay-100"
              >
                <Wand2 size={40} style={{ color: '#D4A017' }} />
                <h3
                  className="text-xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  AI Staging
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560' }}
                >
                  Transform empty rooms into beautifully furnished spaces with one click.
                  No photographers, no stylists — just AI.
                </p>
                <p
                  className="text-sm font-semibold mt-6"
                  style={{ color: '#B8860B' }}
                >
                  10x faster than traditional staging
                </p>
              </div>

              {/* Card 3 — Gaussian Splatting */}
              <div className="bento-card p-7 animate-on-scroll delay-200">
                <Box size={40} style={{ color: '#A8A29E' }} />
                <h3
                  className="text-xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  Gaussian Splatting
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560' }}
                >
                  Next-gen photorealistic 3D reconstruction that renders every surface,
                  material, and light with unprecedented fidelity.
                </p>
                <div
                  className="inline-flex items-center rounded-full text-xs font-semibold mt-4"
                  style={{
                    padding: '4px 12px',
                    background: 'rgba(212,160,23,0.12)',
                    color: '#A8A29E',
                    border: '1px solid rgba(212,160,23,0.12)',
                  }}
                >
                  Coming Soon
                </div>
              </div>

              {/* Card 4 — Smart Hotspots */}
              <div className="bento-card p-7 animate-on-scroll delay-300">
                <MapPin size={40} style={{ color: '#FB7A54' }} />
                <h3
                  className="text-xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  Smart Hotspots
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560' }}
                >
                  Place interactive hotspots anywhere inside your tour. Link rooms, attach
                  property details, or embed media — all without code.
                </p>
              </div>

              {/* Card 5 — Live Tours */}
              <div className="bento-card gradient-border p-7 animate-on-scroll delay-400">
                <Video size={40} style={{ color: '#2DD4BF' }} />
                <h3
                  className="text-xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  Live Tours
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560' }}
                >
                  Host real-time guided tours with buyers anywhere in the world. Walk
                  them through every room, live inside your 360° space.
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full text-xs font-semibold mt-6"
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(212,160,23,0.12)',
                    color: '#D4A017',
                    border: '1px solid rgba(212,160,23,0.2)',
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{ width: 6, height: 6, background: '#D4A017', animation: 'ping-slow 1.8s ease-out infinite' }}
                  />
                  Join live sessions
                </div>
              </div>

              {/* Card 6 — Analytics */}
              <div className="bento-card p-7 animate-on-scroll delay-500">
                <BarChart3 size={40} style={{ color: '#B8860B' }} />
                <h3
                  className="text-xl font-bold mt-5"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  Analytics
                </h3>
                <p
                  className="text-base mt-3 leading-relaxed"
                  style={{ color: '#6B6560' }}
                >
                  Understand exactly how buyers engage with your tours — heatmaps, dwell
                  time, drop-off points, and conversion tracking.
                </p>
                <div className="flex gap-2 mt-6">
                  {[
                    { value: '847', label: 'views' },
                    { value: '4m 12s', label: 'avg' },
                    { value: '68%', label: 'engaged' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex-1 rounded-lg px-3 py-2 text-center"
                      style={{ background: '#12100E', border: '1px solid rgba(212,160,23,0.12)' }}
                    >
                      <div
                        className="text-sm font-bold"
                        style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: '#5A5248' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HOW IT WORKS (Light Section) ─────────────── */}
        <section
          className="light relative overflow-hidden"
          style={{
            paddingTop: 112,
            paddingBottom: 112,
            background: 'linear-gradient(180deg, #FAFAF7 0%, #F5F3EF 50%, #FAFAF7 100%)',
          }}
        >
          {/* Subtle warm orbs for depth */}
          <div
            className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.35] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-[0.25] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)' }}
          />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            {/* Header */}
            <div className="animate-on-scroll">
              <p
                className="text-xs uppercase font-semibold mb-4"
                style={{ letterSpacing: '0.14em', color: '#B8860B' }}
              >
                Simple as 1, 2, 3
              </p>
              <h2
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontFamily: 'var(--font-display)',
                  color: '#1C1917',
                  letterSpacing: '-1.5px',
                }}
              >
                Upload. Process. Share.
              </h2>
            </div>

            {/* Steps */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div
                className="hidden md:block absolute border-t border-dashed"
                style={{
                  top: 36,
                  left: '25%',
                  right: '25%',
                  borderColor: 'rgba(184,134,11,0.25)',
                }}
              />

              {[
                {
                  num: '01',
                  Icon: UploadCloud,
                  title: 'Upload Panorama',
                  desc: 'Drag and drop your 360° photo. JPG, PNG, or WebP up to 50MB.',
                  delay: 0,
                },
                {
                  num: '02',
                  Icon: Cpu,
                  title: 'AI Processes It',
                  desc: 'Our AI instantly generates a fully navigable 3D tour from your image.',
                  delay: 200,
                },
                {
                  num: '03',
                  Icon: Share2,
                  title: 'Share Everywhere',
                  desc: 'Publish with one click. Share via link or embed on any website.',
                  delay: 400,
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`animate-on-scroll delay-${step.delay} relative z-10`}
                >
                  <div
                    className="rounded-full flex items-center justify-center mx-auto"
                    style={{
                      width: 72,
                      height: 72,
                      background: 'linear-gradient(135deg, rgba(184,134,11,0.10) 0%, rgba(184,134,11,0.03) 100%)',
                      border: '1px solid rgba(184,134,11,0.20)',
                    }}
                  >
                    <span
                      className="text-2xl font-black"
                      style={{ color: '#B8860B', fontFamily: 'var(--font-display)' }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <step.Icon size={28} style={{ color: '#78716C' }} />
                  </div>
                  <h3
                    className="text-xl font-bold mt-4"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm mt-2 leading-relaxed mx-auto"
                    style={{ color: '#57534E', maxWidth: 220 }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: LIVE VIEWER DEMO ─────────────────────────── */}
        <section style={{ background: '#0A0908', paddingTop: 112, paddingBottom: 112 }}>
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center animate-on-scroll">
              <div
                className="inline-flex items-center gap-2 rounded-full mb-6"
                style={{
                  background: 'rgba(212,160,23,0.12)',
                  border: '1px solid rgba(212,160,23,0.2)',
                  padding: '6px 16px',
                }}
              >
                <span
                  className="rounded-full"
                  style={{ width: 6, height: 6, background: '#D4A017', flexShrink: 0, animation: 'ping-slow 1.8s ease-out infinite' }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: '#D4A017' }}
                >
                  Live Demo
                </span>
              </div>
              <h2
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontFamily: 'var(--font-display)',
                  color: '#F5F3EF',
                  letterSpacing: '-1.5px',
                }}
              >
                Drag to explore. Right now.
              </h2>
              <p
                className="text-lg mt-4 mx-auto"
                style={{ color: '#6B6560', maxWidth: 560 }}
              >
                This is a real 360° panorama viewer — built with the same engine powering
                every Spazeo tour.
              </p>
            </div>

            {/* Viewer Box */}
            <div
              className="mt-12 relative gradient-border rounded-2xl overflow-hidden shadow-glow-gold"
              style={{ height: 500 }}
            >
              <DynamicViewer
                imageUrl="https://picsum.photos/seed/spazeo-tour/2048/1024"
                height="500px"
              />
              {/* Overlay instruction */}
              <div
                className="glass-dark absolute rounded-full"
                style={{
                  top: 16,
                  left: 16,
                  padding: '8px 16px',
                  fontSize: 14,
                  color: '#A8A29E',
                  zIndex: 10,
                }}
              >
                Drag to pan · Pinch to zoom
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRICING (Light Section) ────────────────────── */}
        <section
          className="light relative overflow-hidden"
          style={{
            paddingTop: 112,
            paddingBottom: 112,
            background: 'linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 30%, #FFFFFF 70%, #FAFAF7 100%)',
          }}
        >
          {/* Subtle warm orb */}
          <div
            className="absolute top-[20%] left-[-80px] w-[350px] h-[350px] rounded-full opacity-[0.30] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[10%] right-[-60px] w-[280px] h-[280px] rounded-full opacity-[0.25] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)' }}
          />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 animate-on-scroll">
              <p
                className="text-xs uppercase font-semibold mb-4"
                style={{ letterSpacing: '0.16em', color: '#B8860B' }}
              >
                Simple pricing
              </p>
              <h2
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontFamily: 'var(--font-display)',
                  color: '#1C1917',
                  letterSpacing: '-1.5px',
                }}
              >
                Start free. Scale as you grow.
              </h2>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* FREE */}
              <div
                className="p-8 rounded-2xl animate-on-scroll transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(28,25,23,0.08)',
                  boxShadow: '0 1px 3px rgba(28,25,23,0.04), 0 8px 24px rgba(28,25,23,0.06)',
                }}
              >
                <p
                  className="text-sm uppercase font-semibold tracking-widest"
                  style={{ color: '#78716C' }}
                >
                  Free
                </p>
                <div className="flex items-end gap-1 mt-3">
                  <span
                    className="text-5xl font-black"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', lineHeight: 1 }}
                  >
                    $0
                  </span>
                  <span className="text-sm mb-1" style={{ color: '#A8A29E' }}>
                    /month
                  </span>
                </div>
                <ul className="mt-8 space-y-3.5">
                  {[
                    '1 virtual tour',
                    'Up to 5 scenes',
                    'Spazeo watermark',
                    'Basic analytics',
                    '512MB storage',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm" style={{ color: '#57534E' }}>
                      <Check size={16} style={{ color: '#78716C', flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-8 rounded-xl font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    padding: '14px 0',
                    border: '1px solid rgba(28,25,23,0.12)',
                    color: '#57534E',
                    background: 'transparent',
                    fontSize: 15,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'rgba(184,134,11,0.35)'
                    el.style.color = '#1C1917'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'rgba(28,25,23,0.12)'
                    el.style.color = '#57534E'
                  }}
                >
                  Get Started Free
                </button>
              </div>

              {/* PRO — highlighted */}
              <div className="relative animate-on-scroll delay-100">
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-full text-xs font-bold"
                  style={{
                    top: -16,
                    background: '#B8860B',
                    color: '#FFFFFF',
                    padding: '6px 20px',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(184,134,11,0.30)',
                  }}
                >
                  Most Popular
                </div>
                <div
                  className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1.5px solid rgba(184,134,11,0.25)',
                    background: 'linear-gradient(180deg, rgba(184,134,11,0.04) 0%, #FFFFFF 100%)',
                    boxShadow: '0 1px 3px rgba(184,134,11,0.06), 0 8px 32px rgba(184,134,11,0.10), 0 20px 40px rgba(28,25,23,0.04)',
                  }}
                >
                  <p
                    className="text-sm uppercase font-semibold tracking-widest"
                    style={{ color: '#B8860B' }}
                  >
                    Pro
                  </p>
                  <div className="flex items-end gap-1 mt-3">
                    <span
                      className="text-5xl font-black"
                      style={{
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, #B8860B 0%, #92690A 40%, #0D9488 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      $29
                    </span>
                    <span className="text-sm mb-1" style={{ color: '#A8A29E' }}>
                      /month
                    </span>
                  </div>
                  <ul className="mt-8 space-y-3.5">
                    {[
                      '25 virtual tours',
                      'Unlimited scenes',
                      'Custom branding',
                      'Advanced analytics',
                      '25GB storage',
                      'Priority processing',
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm" style={{ color: '#57534E' }}>
                        <Check size={16} style={{ color: '#B8860B', flexShrink: 0 }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full mt-8 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      padding: '14px 0',
                      background: '#B8860B',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 15,
                      boxShadow: '0 4px 20px rgba(184,134,11,0.25)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#D4A017'
                      el.style.boxShadow = '0 4px 28px rgba(212,160,23,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#B8860B'
                      el.style.boxShadow = '0 4px 20px rgba(184,134,11,0.25)'
                    }}
                  >
                    Start Pro Trial
                  </button>
                </div>
              </div>

              {/* BUSINESS */}
              <div
                className="p-8 rounded-2xl animate-on-scroll delay-200 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(28,25,23,0.08)',
                  boxShadow: '0 1px 3px rgba(28,25,23,0.04), 0 8px 24px rgba(28,25,23,0.06)',
                }}
              >
                <p
                  className="text-sm uppercase font-semibold tracking-widest"
                  style={{ color: '#78716C' }}
                >
                  Business
                </p>
                <div className="flex items-end gap-1 mt-3">
                  <span
                    className="text-5xl font-black"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', lineHeight: 1 }}
                  >
                    $99
                  </span>
                  <span className="text-sm mb-1" style={{ color: '#A8A29E' }}>
                    /month
                  </span>
                </div>
                <ul className="mt-8 space-y-3.5">
                  {[
                    'Unlimited everything',
                    'API access',
                    'White-label embedding',
                    'Dedicated support',
                    'Team collaboration',
                    'Custom integrations',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm" style={{ color: '#57534E' }}>
                      <Check size={16} style={{ color: '#78716C', flexShrink: 0 }} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-8 rounded-xl font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    padding: '14px 0',
                    border: '1px solid rgba(28,25,23,0.12)',
                    color: '#57534E',
                    background: 'transparent',
                    fontSize: 15,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'rgba(184,134,11,0.35)'
                    el.style.color = '#1C1917'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = 'rgba(28,25,23,0.12)'
                    el.style.color = '#57534E'
                  }}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: TESTIMONIALS (Light Section) ─────────────── */}
        <section
          className="light"
          style={{
            background: 'linear-gradient(180deg, #F5F3EF 0%, #FAFAF7 40%, #FAFAF7 60%, #F5F3EF 100%)',
            paddingTop: 112,
            paddingBottom: 112,
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16 animate-on-scroll">
              <h2
                className="font-bold"
                style={{
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontFamily: 'var(--font-display)',
                  color: '#1C1917',
                  letterSpacing: '-1px',
                }}
              >
                Loved by real estate professionals
              </h2>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "Spazeo transformed how we showcase luxury properties. Buyers explore every room before scheduling a showing — our conversion rate jumped 40%.",
                  author: 'Sarah Chen',
                  role: 'Sales Director, Compass Real Estate',
                  delay: 0,
                },
                {
                  quote:
                    "The AI processing is jaw-dropping. We upload one photo, and within minutes we have a fully interactive 360° tour ready to share. ROI was immediate.",
                  author: 'Marcus Williams',
                  role: 'Broker, Williams & Co.',
                  delay: 100,
                },
                {
                  quote:
                    "The AI staging feature is what sells our listings. Clients visualize furnished spaces from empty rooms, and our days-on-market dropped by half.",
                  author: 'Priya Sharma',
                  role: 'Property Developer, Skyline Group',
                  delay: 200,
                },
              ].map((t) => (
                <div
                  key={t.author}
                  className={`rounded-2xl p-7 animate-on-scroll delay-${t.delay} transition-all duration-300 hover:-translate-y-0.5`}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(28,25,23,0.06)',
                    boxShadow: '0 1px 3px rgba(28,25,23,0.04), 0 12px 32px rgba(28,25,23,0.06)',
                  }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm" style={{ color: '#B8860B' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed mt-4 italic"
                    style={{ color: '#57534E' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div
                    className="mt-5 pt-5"
                    style={{ borderTop: '1px solid rgba(28,25,23,0.06)' }}
                  >
                    <p className="text-sm font-semibold" style={{ color: '#1C1917' }}>
                      {t.author}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: FINAL CTA ────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #12100E 0%, #0A0908 100%)',
            paddingTop: 112,
            paddingBottom: 112,
          }}
        >
          {/* Gold orb centered */}
          <div
            className="orb orb-gold absolute"
            style={{
              width: 600,
              height: 600,
              opacity: 0.18,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'glow-pulse 5s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          {/* Accent line top */}
          <div className="accent-line mx-auto mb-16" style={{ maxWidth: 200 }} />

          <div
            className="max-w-3xl mx-auto px-6 text-center relative"
            style={{ zIndex: 10 }}
          >
            <p
              className="text-xs uppercase font-semibold mb-6 tracking-[0.16em]"
              style={{ color: '#D4A017' }}
            >
              Get started today
            </p>
            <h2
              className="text-gradient-hero font-black leading-tight"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 60px)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-2px',
              }}
            >
              Ready to create your
              <br />
              first tour?
            </h2>
            <p
              className="text-xl mt-5 leading-relaxed"
              style={{ color: '#6B6560', maxWidth: 480, margin: '20px auto 0' }}
            >
              Join thousands of real estate professionals already using Spazeo to close
              deals faster and impress every buyer.
            </p>
            <button
              className="flex items-center gap-3 mx-auto transition-all duration-200 cursor-pointer"
              style={{
                marginTop: 40,
                background: '#D4A017',
                color: '#0A0908',
                padding: '20px 44px',
                borderRadius: 16,
                fontSize: 18,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 0 48px rgba(212,160,23,0.5), 0 8px 24px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = '#E5B120'
                el.style.boxShadow = '0 0 64px rgba(212,160,23,0.7), 0 8px 28px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = '#D4A017'
                el.style.boxShadow = '0 0 48px rgba(212,160,23,0.5), 0 8px 24px rgba(0,0,0,0.15)'
              }}
            >
              Start Free — No Card Required
              <ArrowRight size={20} />
            </button>
            <p className="text-sm mt-5" style={{ color: '#5A5248' }}>
              No credit card · Cancel anytime · Free forever
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
