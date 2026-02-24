import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PLANS } from '@/lib/constants'
import { Check, ArrowRight } from 'lucide-react'
import type { UserPlan } from '@/types'

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main
        className="pt-24 pb-20"
        style={{
          background: 'linear-gradient(180deg, #0A0908 0%, #12100E 50%, #0A0908 100%)',
          minHeight: '100vh',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase font-semibold mb-4"
              style={{ letterSpacing: '0.16em', color: '#D4A017' }}
            >
              Pricing
            </p>
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontFamily: 'var(--font-jakarta)',
                color: '#F5F3EF',
                letterSpacing: '-1.5px',
              }}
            >
              Simple, transparent pricing
            </h1>
            <p className="text-lg mt-4 mx-auto" style={{ color: '#6B6560', maxWidth: 480 }}>
              Start free. Upgrade when you need more.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.entries(PLANS) as [UserPlan, (typeof PLANS)[UserPlan]][]).map(
              ([key, plan]) => (
                <div
                  key={key}
                  className="rounded-2xl p-8 relative"
                  style={{
                    backgroundColor: key === 'pro' ? '#1B1916' : '#12100E',
                    border:
                      key === 'pro'
                        ? '1px solid rgba(212,160,23,0.3)'
                        : '1px solid rgba(212,160,23,0.12)',
                  }}
                >
                  {key === 'pro' && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase"
                      style={{
                        backgroundColor: 'rgba(212,160,23,0.15)',
                        color: '#D4A017',
                      }}
                    >
                      Popular
                    </span>
                  )}
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
                  >
                    {plan.name}
                  </h3>
                  <div className="mt-3">
                    <span className="text-4xl font-black" style={{ color: '#D4A017' }}>
                      ${plan.price}
                    </span>
                    <span className="text-sm" style={{ color: '#6B6560' }}>
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: '#A8A29E' }}
                      >
                        <Check size={14} style={{ color: '#34D399' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/sign-up"
                    className="w-full mt-8 flex items-center justify-center gap-1 text-sm font-semibold py-3 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: key === 'pro' ? '#D4A017' : 'transparent',
                      color: key === 'pro' ? '#0A0908' : '#D4A017',
                      border:
                        key === 'pro' ? 'none' : '1.5px solid rgba(212,160,23,0.2)',
                    }}
                  >
                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    <ArrowRight size={14} />
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
