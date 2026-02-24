'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Spinner } from '@/components/ui/Spinner'
import { PLANS } from '@/lib/constants'
import { CreditCard, Check, ArrowRight } from 'lucide-react'
import type { UserPlan } from '@/types'

export default function BillingPage() {
  const subscription = useQuery(api.subscriptions.getCurrent)
  const user = useQuery(api.users.getCurrent)

  if (subscription === undefined || user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  const currentPlan = (user?.plan ?? 'free') as UserPlan

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          Billing
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          backgroundColor: '#12100E',
          border: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={18} style={{ color: '#D4A017' }} />
          <h2
            className="text-lg font-semibold"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
          >
            Current Plan
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold px-3 py-1 rounded-full uppercase"
            style={{
              backgroundColor: 'rgba(212,160,23,0.12)',
              color: '#D4A017',
            }}
          >
            {PLANS[currentPlan].name}
          </span>
          <span className="text-sm" style={{ color: '#6B6560' }}>
            ${PLANS[currentPlan].price}/month
          </span>
        </div>
        {subscription?.currentPeriodEnd && (
          <p className="text-xs mt-3" style={{ color: '#5A5248' }}>
            Next billing date: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Plans Grid */}
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
      >
        Available Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.entries(PLANS) as [UserPlan, (typeof PLANS)[UserPlan]][]).map(
          ([key, plan]) => (
            <div
              key={key}
              className="rounded-xl p-6 relative"
              style={{
                backgroundColor: key === currentPlan ? '#1B1916' : '#12100E',
                border:
                  key === currentPlan
                    ? '1px solid rgba(212,160,23,0.3)'
                    : '1px solid rgba(212,160,23,0.12)',
              }}
            >
              {key === currentPlan && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                  style={{
                    backgroundColor: 'rgba(52,211,153,0.12)',
                    color: '#34D399',
                  }}
                >
                  Current
                </span>
              )}
              <h3
                className="text-lg font-bold"
                style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
              >
                {plan.name}
              </h3>
              <div className="mt-2">
                <span className="text-2xl font-black" style={{ color: '#D4A017' }}>
                  ${plan.price}
                </span>
                <span className="text-sm" style={{ color: '#6B6560' }}>
                  /mo
                </span>
              </div>
              <ul className="mt-4 space-y-2">
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
              {key !== currentPlan && (
                <button
                  className="w-full mt-6 flex items-center justify-center gap-1 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: key === 'business' ? '#D4A017' : 'transparent',
                    color: key === 'business' ? '#0A0908' : '#D4A017',
                    border:
                      key === 'business'
                        ? 'none'
                        : '1px solid rgba(212,160,23,0.2)',
                  }}
                >
                  Upgrade
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
