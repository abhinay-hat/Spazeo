'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Check, X, ChevronDown, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for trying out Spazeo',
    badge: null,
    checkColor: '#34D399',
    cardBorder: 'rgba(212,160,23,0.12)',
    cardBg: '#12100E',
    ctaStyle: 'outline-gold' as const,
    ctaLabel: 'Get Started Free',
    features: [
      '3 active tours',
      'Basic panorama viewer',
      'Shareable links',
      'Community support',
      'Standard image quality',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 49, yearly: 39 },
    description: 'For professionals who need more',
    badge: 'MOST POPULAR',
    checkColor: '#D4A017',
    cardBorder: 'rgba(212,160,23,0.3)',
    cardBg: '#1B1916',
    ctaStyle: 'filled-gold' as const,
    ctaLabel: 'Get Started',
    features: [
      'Unlimited tours',
      'Gaussian Splatting',
      'AI virtual staging',
      'Analytics dashboard',
      'Custom branding',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: -1, yearly: -1 },
    description: 'For teams and large organizations',
    badge: null,
    checkColor: '#2DD4BF',
    cardBorder: 'rgba(45,212,191,0.2)',
    cardBg: '#12100E',
    ctaStyle: 'outline-teal' as const,
    ctaLabel: 'Contact Sales',
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'SOC 2 compliance',
      'Dedicated account manager',
      'White-label solution',
      'SLA & 24/7 support',
    ],
  },
]

const FAQ_ITEMS = [
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, the remaining balance will be credited to your account.',
  },
  {
    question: 'What happens when my trial ends?',
    answer:
      'After your 14-day free trial ends, you\'ll automatically be moved to the Starter plan. You won\'t lose any of your existing tours, but you\'ll be limited to 3 active tours until you upgrade.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes! You save 20% when you choose annual billing. The discount is applied automatically when you switch to yearly billing on any paid plan.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express), as well as bank transfers for Enterprise plans. All payments are securely processed through Stripe.',
  },
]

const FOOTER_LINKS = {
  Product: ['Virtual Tours', '360° Viewer', 'AI Staging', 'Analytics', 'Integrations'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Resources: ['Documentation', 'Help Center', 'API Reference', 'Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#0A0908', minHeight: '100vh' }}>
        {/* ── Hero ── */}
        <section
          className="pt-32 pb-16 text-center"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,160,23,0.08) 0%, transparent 70%)',
          }}
        >
          <div className="max-w-4xl mx-auto px-6 animate-on-scroll">
            {/* Badge */}
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.16em] px-4 py-1.5 rounded-full mb-6"
              style={{
                color: '#D4A017',
                border: '1px solid rgba(212,160,23,0.3)',
                background: 'transparent',
                fontFamily: 'var(--font-dmsans)',
              }}
            >
              Pricing
            </span>

            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontFamily: 'var(--font-display)',
                color: '#F5F3EF',
                letterSpacing: '-1.5px',
              }}
            >
              Simple, Transparent Pricing
            </h1>

            <p
              className="text-lg mt-4 mx-auto"
              style={{
                color: '#6B6560',
                maxWidth: 480,
                fontFamily: 'var(--font-dmsans)',
              }}
            >
              Start free. Upgrade when you need more power.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span
                className="text-sm font-medium"
                style={{
                  color: billing === 'monthly' ? '#F5F3EF' : '#6B6560',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                Monthly
              </span>

              <button
                onClick={() => setBilling((b) => (b === 'monthly' ? 'yearly' : 'monthly'))}
                className="relative w-12 h-6 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    billing === 'yearly' ? '#D4A017' : 'rgba(212,160,23,0.2)',
                }}
                aria-label={`Switch to ${billing === 'monthly' ? 'yearly' : 'monthly'} billing`}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: billing === 'yearly' ? '#0A0908' : '#A8A29E',
                    transform:
                      billing === 'yearly' ? 'translateX(26px)' : 'translateX(2px)',
                  }}
                />
              </button>

              <span
                className="text-sm font-medium"
                style={{
                  color: billing === 'yearly' ? '#F5F3EF' : '#6B6560',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                Yearly
              </span>

              {billing === 'yearly' && (
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(52,211,153,0.12)',
                    color: '#34D399',
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Pricing Cards ── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className="animate-on-scroll rounded-2xl p-8 relative flex flex-col"
                style={{
                  backgroundColor: plan.cardBg,
                  border: `1px solid ${plan.cardBorder}`,
                  animationDelay: `${i * 100}ms`,
                  ...(plan.name === 'Pro'
                    ? {
                        boxShadow: '0 0 40px rgba(212,160,23,0.08)',
                      }
                    : {}),
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(212,160,23,0.15)',
                      color: '#D4A017',
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Plan Name */}
                <h3
                  className="text-lg font-bold"
                  style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  {plan.name}
                </h3>

                <p
                  className="text-sm mt-1"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-5">
                  {plan.price.monthly === -1 ? (
                    <span
                      className="text-4xl font-black"
                      style={{ color: '#2DD4BF', fontFamily: 'var(--font-display)' }}
                    >
                      Custom
                    </span>
                  ) : (
                    <>
                      <span
                        className="text-4xl font-black"
                        style={{
                          color: plan.name === 'Pro' ? '#D4A017' : '#F5F3EF',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        ${billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span
                        className="text-sm ml-1"
                        style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                      >
                        /month
                      </span>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        style={{ color: plan.checkColor, flexShrink: 0 }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.name === 'Enterprise' ? '/#contact' : '/sign-up'}
                  className="w-full mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold py-3 rounded-xl transition-all duration-200"
                  style={
                    plan.ctaStyle === 'filled-gold'
                      ? {
                          backgroundColor: '#D4A017',
                          color: '#0A0908',
                          boxShadow: '0 0 20px rgba(212,160,23,0.25)',
                        }
                      : plan.ctaStyle === 'outline-teal'
                        ? {
                            backgroundColor: 'transparent',
                            color: '#2DD4BF',
                            border: '1.5px solid rgba(45,212,191,0.3)',
                          }
                        : {
                            backgroundColor: 'transparent',
                            color: '#D4A017',
                            border: '1.5px solid rgba(212,160,23,0.2)',
                          }
                  }
                >
                  {plan.ctaLabel}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-6" style={{ backgroundColor: '#12100E' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-center font-bold mb-12 animate-on-scroll"
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontFamily: 'var(--font-display)',
                color: '#F5F3EF',
                letterSpacing: '-1px',
              }}
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="animate-on-scroll rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: '#1B1916',
                    border: '1px solid rgba(212,160,23,0.08)',
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: '#F5F3EF',
                        fontFamily: 'var(--font-dmsans)',
                      }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: '#6B6560',
                        flexShrink: 0,
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: openFaq === i ? '200px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{
                        color: '#A8A29E',
                        fontFamily: 'var(--font-dmsans)',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-24 px-6 text-center"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(212,160,23,0.06) 0%, transparent 70%)',
          }}
        >
          <div className="max-w-2xl mx-auto animate-on-scroll">
            {/* Gold accent line */}
            <div
              className="mx-auto mb-6"
              style={{
                width: 60,
                height: 3,
                borderRadius: 2,
                backgroundColor: '#D4A017',
              }}
            />

            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontFamily: 'var(--font-display)',
                color: '#F5F3EF',
                letterSpacing: '-1px',
              }}
            >
              Ready to Get Started?
            </h2>

            <p
              className="mt-4 text-base mx-auto"
              style={{
                color: '#6B6560',
                maxWidth: 440,
                fontFamily: 'var(--font-dmsans)',
              }}
            >
              Join thousands of professionals creating immersive virtual experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: '#FB7A54',
                  color: '#FFFFFF',
                  boxShadow: '0 0 24px rgba(251,122,84,0.3)',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                Start Free Trial
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  color: '#D4A017',
                  border: '1.5px solid rgba(212,160,23,0.25)',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                Contact Sales
              </Link>
            </div>

            <p
              className="mt-6 text-xs"
              style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
            >
              No credit card required. 14-day free trial on all paid plans.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="border-t px-6 pt-16 pb-8"
          style={{
            borderColor: 'rgba(212,160,23,0.08)',
            backgroundColor: '#0A0908',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
              {/* Brand */}
              <div className="col-span-2">
                <Link
                  href="/"
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
                >
                  Spazeo
                </Link>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{
                    color: '#6B6560',
                    maxWidth: 260,
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  <em>Step Inside Any Space.</em> AI-powered 360° virtual tours for real estate
                  professionals.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4 mt-5">
                  {['twitter', 'linkedin', 'youtube', 'instagram'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="transition-colors duration-200"
                      style={{ color: '#6B6560' }}
                      aria-label={social}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = '#D4A017')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = '#6B6560')
                      }
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {social === 'twitter' && (
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        )}
                        {social === 'linkedin' && (
                          <>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </>
                        )}
                        {social === 'youtube' && (
                          <>
                            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                            <path d="m10 15 5-3-5-3z" />
                          </>
                        )}
                        {social === 'instagram' && (
                          <>
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </>
                        )}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Link columns */}
              {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                <div key={title}>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                  >
                    {title}
                  </h4>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm transition-colors duration-200"
                          style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = '#F5F3EF')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = '#6B6560')
                          }
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div
              className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderTop: '1px solid rgba(212,160,23,0.06)' }}
            >
              <p
                className="text-xs"
                style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
              >
                &copy; {new Date().getFullYear()} Spazeo. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {['Privacy', 'Terms', 'Cookies'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-xs transition-colors duration-200"
                    style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#F5F3EF')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#6B6560')
                    }
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
