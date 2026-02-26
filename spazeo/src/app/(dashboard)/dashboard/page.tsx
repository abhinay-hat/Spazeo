'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Eye } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { isProvidersConfigured } from '@/components/providers/ConvexClientProvider'

/* ── Placeholder data (shown when Convex is not configured) ── */
const PLACEHOLDER_STATS = [
  { label: 'Total Tours', value: '12' },
  { label: 'Total Views', value: '8,432' },
  { label: 'Avg. Engagement', value: '4:32' },
  { label: 'Active Shares', value: '28' },
]

const PLACEHOLDER_TOURS = [
  {
    id: '1',
    title: 'Coastal Paradise Villa',
    date: 'Feb 18, 2026',
    views: '2,847',
    status: 'Published',
    statusColor: '#34D399',
    statusBg: 'rgba(52,211,153,0.13)',
    image: '/images/tour-coastal.png',
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    date: 'Feb 12, 2026',
    views: '3,210',
    status: 'Published',
    statusColor: '#34D399',
    statusBg: 'rgba(52,211,153,0.13)',
    image: '/images/tour-penthouse.png',
  },
  {
    id: '3',
    title: 'Mountain Retreat Lodge',
    date: 'Feb 8, 2026',
    views: '2,375',
    status: 'Draft',
    statusColor: '#D4A017',
    statusBg: 'rgba(212,160,23,0.13)',
    image: '/images/tour-mountain.png',
  },
]

/* ── Dashboard with live Convex data (client-only) ── */
function LiveDashboard() {
  const overview = useQuery(api.analytics.getOverview)
  const tours = useQuery(api.tours.list)

  const stats = [
    { label: 'Total Tours', value: overview?.totalTours ?? '—' },
    { label: 'Total Views', value: overview?.totalViews?.toLocaleString() ?? '—' },
    { label: 'Avg. Engagement', value: overview?.avgEngagement ?? '—' },
    { label: 'Active Shares', value: overview?.activeShares ?? '—' },
  ]

  return (
    <DashboardShell
      stats={stats}
      tours={
        tours?.slice(0, 3).map((t: { _id: string; title: string; status: string; viewCount: number; createdAt?: number }) => ({
          id: t._id,
          title: t.title,
          date: t.createdAt
            ? new Date(t.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '',
          views: t.viewCount?.toLocaleString() ?? '0',
          status: t.status === 'published' ? 'Published' : 'Draft',
          statusColor: t.status === 'published' ? '#34D399' : '#D4A017',
          statusBg:
            t.status === 'published'
              ? 'rgba(52,211,153,0.13)'
              : 'rgba(212,160,23,0.13)',
          image: '/images/tour-coastal.png',
        })) ?? []
      }
      loading={overview === undefined}
    />
  )
}

/* ── Dashboard shell (shared UI) ── */
function DashboardShell({
  stats,
  tours,
  loading,
}: {
  stats: { label: string; value: string | number }[]
  tours: {
    id: string
    title: string
    date: string
    views: string
    status: string
    statusColor: string
    statusBg: string
    image: string
  }[]
  loading?: boolean
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between">
        <h1
          className="text-[28px] font-bold"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
        >
          Welcome back, John
        </h1>

        <Link
          href="/tours"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]"
          style={{
            backgroundColor: '#D4A017',
            color: '#0A0908',
            fontFamily: 'var(--font-dmsans)',
          }}
        >
          <Plus size={18} />
          Create New Tour
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl px-6 py-5 flex flex-col gap-2"
            style={{
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
            }}
          >
            <span
              className="text-[13px]"
              style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
            >
              {stat.label}
            </span>
            <span
              className="text-[32px] font-bold"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
            >
              {loading ? (
                <span
                  className="inline-block w-16 h-8 rounded-md animate-pulse"
                  style={{ backgroundColor: 'rgba(212,160,23,0.08)' }}
                />
              ) : (
                stat.value
              )}
            </span>
          </div>
        ))}
      </div>

      {/* ── Recent Tours ── */}
      <div className="flex flex-col gap-5">
        <h2
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
        >
          Recent Tours
        </h2>

        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="group rounded-xl overflow-hidden transition-all duration-200 hover:border-[rgba(212,160,23,0.3)]"
                style={{
                  backgroundColor: '#1B1916',
                  border: '1px solid rgba(212,160,23,0.12)',
                }}
              >
                {/* Card Image */}
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3
                    className="text-[15px] font-semibold truncate"
                    style={{
                      color: '#F5F3EF',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {tour.date}
                    </span>
                    <div className="flex items-center gap-1">
                      <Eye size={14} style={{ color: '#6B6560' }} />
                      <span
                        className="text-xs"
                        style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                      >
                        {tour.views}
                      </span>
                    </div>
                  </div>

                  <span
                    className="inline-block w-fit text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: tour.statusBg,
                      color: tour.statusColor,
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {tour.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
            }}
          >
            <p
              className="text-sm"
              style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
            >
              No tours yet. Create your first tour to get started.
            </p>
            <Link
              href="/tours"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: '#D4A017',
                color: '#0A0908',
                fontFamily: 'var(--font-dmsans)',
              }}
            >
              <Plus size={16} />
              Create Tour
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Page Export ── */
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (mounted && isProvidersConfigured) {
    return <LiveDashboard />
  }

  return (
    <DashboardShell
      stats={PLACEHOLDER_STATS}
      tours={PLACEHOLDER_TOURS}
    />
  )
}
