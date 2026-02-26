'use client'

import Link from 'next/link'
import { CreditCard, Check, ArrowRight, ExternalLink } from 'lucide-react'

const CURRENT_PLAN = {
  name: 'Pro',
  price: 49,
  features: [
    'Unlimited virtual tours',
    'AI-powered staging',
    'Advanced analytics',
    'Custom branding',
    'Priority support',
  ],
}

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 0,
    features: ['Up to 3 tours', '10 scenes per tour', 'Basic analytics', 'Spazeo branding'],
    ctaLabel: 'Downgrade',
    ctaBg: 'transparent',
    ctaColor: '#6B6560',
    ctaBorder: '1px solid rgba(107,101,96,0.2)',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 49,
    features: ['Unlimited tours', 'AI staging', 'Advanced analytics', 'Custom branding', 'Priority support'],
    ctaLabel: 'Current Plan',
    ctaBg: 'transparent',
    ctaColor: '#34D399',
    ctaBorder: '1px solid rgba(52,211,153,0.2)',
    current: true,
  },
  {
    key: 'business',
    name: 'Business',
    price: 79,
    features: ['Everything in Pro', 'Team collaboration', 'White-label', 'API access', 'Dedicated support'],
    ctaLabel: 'Upgrade',
    ctaBg: '#D4A017',
    ctaColor: '#0A0908',
    ctaBorder: 'none',
  },
]

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-[28px] font-bold"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
          >
            Billing
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
          >
            Manage your subscription and billing
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{
            border: '1px solid rgba(212,160,23,0.12)',
            color: '#A8A29E',
            backgroundColor: 'transparent',
            fontFamily: 'var(--font-dmsans)',
          }}
        >
          <ExternalLink size={14} style={{ color: '#6B6560' }} />
          Manage Billing
        </button>
      </div>

      {/* Current Plan */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: '#1B1916',
          border: '1px solid rgba(212,160,23,0.3)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <CreditCard size={18} style={{ color: '#D4A017' }} />
            <h2
              className="text-lg font-semibold"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
            >
              Current Plan
            </h2>
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-[28px] font-bold"
              style={{ color: '#D4A017', fontFamily: 'var(--font-display)' }}
            >
              ${CURRENT_PLAN.price}
            </span>
            <span
              className="text-sm"
              style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
            >
              /month
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-[13px] font-bold px-3 py-1 rounded-md"
            style={{ backgroundColor: '#D4A017', color: '#0A0908', fontFamily: 'var(--font-dmsans)' }}
          >
            {CURRENT_PLAN.name}
          </span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399', fontFamily: 'var(--font-dmsans)' }}
          >
            Active
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {CURRENT_PLAN.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check size={14} style={{ color: '#D4A017' }} />
              <span
                className="text-[13px]"
                style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-xs mt-4"
          style={{ color: '#5A5248', fontFamily: 'var(--font-dmsans)' }}
        >
          Next billing date: March 25, 2026 &bull; Visa ending in 4242
        </p>
      </div>

      {/* Available Plans */}
      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
        >
          Available Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className="rounded-xl p-6 relative flex flex-col"
              style={{
                backgroundColor: plan.current ? '#1B1916' : '#12100E',
                border: plan.current
                  ? '1px solid rgba(212,160,23,0.3)'
                  : '1px solid rgba(212,160,23,0.12)',
              }}
            >
              {plan.current && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                  style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399', fontFamily: 'var(--font-dmsans)' }}
                >
                  Current
                </span>
              )}

              <h3
                className="text-lg font-bold"
                style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                {plan.name}
              </h3>

              <div className="mt-2 mb-5">
                <span
                  className="text-2xl font-black"
                  style={{ color: plan.current ? '#D4A017' : '#F5F3EF', fontFamily: 'var(--font-display)' }}
                >
                  ${plan.price}
                </span>
                <span className="text-sm" style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}>
                  /mo
                </span>
              </div>

              <ul className="flex-1 flex flex-col gap-2.5 mb-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[13px]"
                    style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                  >
                    <Check size={14} style={{ color: '#34D399', flexShrink: 0 }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: plan.ctaBg,
                  color: plan.ctaColor,
                  border: plan.ctaBorder,
                  fontFamily: 'var(--font-dmsans)',
                }}
                disabled={plan.current}
              >
                {plan.ctaLabel}
                {!plan.current && <ArrowRight size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
