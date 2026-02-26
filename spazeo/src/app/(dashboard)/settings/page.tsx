'use client'

import { useState } from 'react'
import { ExternalLink, Check } from 'lucide-react'

type Tab = 'profile' | 'billing' | 'notifications' | 'danger'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'danger', label: 'Danger Zone' },
  ]

  const planFeatures = [
    'Unlimited virtual tours',
    'AI-powered staging',
    'Advanced analytics',
    'Priority support',
  ]

  const billingDetails = [
    { label: 'Next billing date', value: 'March 25, 2026' },
    { label: 'Payment method', value: 'Visa ending in 4242' },
    { label: 'Member since', value: 'January 15, 2026' },
  ]

  return (
    <div>
      {/* Top Bar */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#F5F3EF',
            fontFamily: 'var(--font-display)',
            margin: 0,
          }}
        >
          Settings
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#A8A29E',
            fontFamily: 'var(--font-dmsans)',
            marginTop: 6,
          }}
        >
          Manage your account, subscription, and preferences
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid rgba(212,160,23,0.12)',
          marginBottom: 32,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isDanger = tab.id === 'danger'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                fontFamily: 'var(--font-dmsans)',
                color: isActive
                  ? '#F5F3EF'
                  : isDanger
                    ? '#F87171'
                    : '#6B6560',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid #D4A017' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Profile Card */}
      {activeTab === 'profile' && (
        <div
          style={{
            borderRadius: 12,
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            padding: 24,
          }}
        >
          {/* Profile Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#F5F3EF',
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              Profile Information
            </h2>
            <button
              style={{
                backgroundColor: '#D4A017',
                color: '#0A0908',
                fontFamily: 'var(--font-dmsans)',
                fontSize: 14,
                fontWeight: 600,
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </div>

          {/* Avatar Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'rgba(45,212,191,0.13)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: '#2DD4BF',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                JD
              </span>
            </div>
            <button
              style={{
                border: '1px solid rgba(212,160,23,0.12)',
                backgroundColor: 'transparent',
                color: '#A8A29E',
                fontSize: 12,
                fontFamily: 'var(--font-dmsans)',
                fontWeight: 500,
                borderRadius: 6,
                padding: '6px 14px',
                cursor: 'pointer',
              }}
            >
              Change
            </button>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* First Name + Last Name Row */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: '#A8A29E',
                    fontFamily: 'var(--font-dmsans)',
                    marginBottom: 6,
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  defaultValue="John"
                  style={{
                    width: '100%',
                    backgroundColor: '#12100E',
                    border: '1px solid rgba(212,160,23,0.12)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    color: '#F5F3EF',
                    fontSize: 13,
                    fontFamily: 'var(--font-dmsans)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: '#A8A29E',
                    fontFamily: 'var(--font-dmsans)',
                    marginBottom: 6,
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  defaultValue="Doe"
                  style={{
                    width: '100%',
                    backgroundColor: '#12100E',
                    border: '1px solid rgba(212,160,23,0.12)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    color: '#F5F3EF',
                    fontSize: 13,
                    fontFamily: 'var(--font-dmsans)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  color: '#A8A29E',
                  fontFamily: 'var(--font-dmsans)',
                  marginBottom: 6,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@studio.com"
                defaultValue="john@studio.com"
                style={{
                  width: '100%',
                  backgroundColor: '#12100E',
                  border: '1px solid rgba(212,160,23,0.12)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  color: '#F5F3EF',
                  fontSize: 13,
                  fontFamily: 'var(--font-dmsans)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab Content */}
      {activeTab === 'billing' && (
        <div
          style={{
            borderRadius: 12,
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            padding: 24,
          }}
        >
          {/* Subscription Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#F5F3EF',
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              Subscription Plan
            </h2>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'transparent',
                border: '1px solid rgba(212,160,23,0.12)',
                borderRadius: 8,
                padding: '10px 20px',
                color: '#A8A29E',
                fontSize: 14,
                fontFamily: 'var(--font-dmsans)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={14} style={{ color: '#6B6560' }} />
              Manage Billing
            </button>
          </div>

          {/* Current Plan Box */}
          <div
            style={{
              backgroundColor: '#12100E',
              borderRadius: 12,
              border: '1px solid rgba(212,160,23,0.4)',
              padding: 20,
              marginBottom: 16,
            }}
          >
            {/* Plan Top Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    backgroundColor: '#D4A017',
                    color: '#0A0908',
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: 'var(--font-dmsans)',
                    borderRadius: 6,
                    padding: '4px 12px',
                  }}
                >
                  Pro
                </span>
                <span
                  style={{
                    color: '#A8A29E',
                    fontSize: 14,
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  Current Plan
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#D4A017',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  $49
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: '#6B6560',
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  /month
                </span>
              </div>
            </div>

            {/* Plan Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {planFeatures.map((feature) => (
                <div
                  key={feature}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <Check size={16} style={{ color: '#D4A017', flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: 13,
                      color: '#A8A29E',
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Details Box */}
          <div
            style={{
              backgroundColor: '#12100E',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {billingDetails.map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: '#6B6560',
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {detail.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#F5F3EF',
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab Placeholder */}
      {activeTab === 'notifications' && (
        <div
          style={{
            borderRadius: 12,
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#F5F3EF',
              fontFamily: 'var(--font-display)',
              margin: 0,
              marginBottom: 12,
            }}
          >
            Notification Preferences
          </h2>
          <p
            style={{
              fontSize: 14,
              color: '#A8A29E',
              fontFamily: 'var(--font-dmsans)',
              margin: 0,
            }}
          >
            Notification settings will be available soon.
          </p>
        </div>
      )}

      {/* Danger Zone Tab Placeholder */}
      {activeTab === 'danger' && (
        <div
          style={{
            borderRadius: 12,
            backgroundColor: '#1B1916',
            border: '1px solid rgba(248,113,113,0.2)',
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#F87171',
              fontFamily: 'var(--font-display)',
              margin: 0,
              marginBottom: 12,
            }}
          >
            Danger Zone
          </h2>
          <p
            style={{
              fontSize: 14,
              color: '#A8A29E',
              fontFamily: 'var(--font-dmsans)',
              margin: 0,
            }}
          >
            Account deletion and other destructive actions will be available here.
          </p>
        </div>
      )}
    </div>
  )
}
