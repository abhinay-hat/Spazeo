'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Spinner } from '@/components/ui/Spinner'
import { Settings, User } from 'lucide-react'

export default function SettingsPage() {
  const { user: clerkUser } = useUser()
  const convexUser = useQuery(api.users.getCurrent)

  if (convexUser === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: '#12100E',
          border: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <h2
          className="text-lg font-semibold mb-4 flex items-center gap-2"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          <User size={18} style={{ color: '#D4A017' }} />
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#6B6560' }}>
              Name
            </label>
            <p className="text-sm" style={{ color: '#F5F3EF' }}>
              {convexUser?.name ?? clerkUser?.fullName ?? 'Not set'}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#6B6560' }}>
              Email
            </label>
            <p className="text-sm" style={{ color: '#F5F3EF' }}>
              {convexUser?.email ?? clerkUser?.primaryEmailAddress?.emailAddress ?? 'Not set'}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#6B6560' }}>
              Plan
            </label>
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold uppercase"
              style={{
                backgroundColor: 'rgba(212,160,23,0.12)',
                color: '#D4A017',
              }}
            >
              {convexUser?.plan ?? 'free'}
            </span>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: '#12100E',
          border: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <h2
          className="text-lg font-semibold mb-4 flex items-center gap-2"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          <Settings size={18} style={{ color: '#D4A017' }} />
          Account
        </h2>
        <p className="text-sm" style={{ color: '#6B6560' }}>
          Manage your account settings, password, and connected accounts through Clerk.
        </p>
        <a
          href="/user-profile"
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          style={{
            border: '1px solid rgba(212,160,23,0.2)',
            color: '#D4A017',
          }}
        >
          Manage Account
        </a>
      </div>
    </div>
  )
}
