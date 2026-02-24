'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { StatsCard } from '@/components/ui/StatsCard'
import { Spinner } from '@/components/ui/Spinner'
import { Eye, Image, TrendingUp, BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  const overview = useQuery(api.analytics.getOverview)

  if (overview === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          Analytics
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
          Track how visitors engage with your tours
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Tours"
          value={overview?.totalTours ?? 0}
          icon={<Image size={20} />}
        />
        <StatsCard
          label="Active Tours"
          value={overview?.activeTours ?? 0}
          icon={<TrendingUp size={20} />}
        />
        <StatsCard
          label="Total Views"
          value={overview?.totalViews ?? 0}
          icon={<Eye size={20} />}
        />
        <StatsCard
          label="Avg. Views/Tour"
          value={overview?.avgViewsPerTour ?? 0}
          icon={<BarChart3 size={20} />}
        />
      </div>

      {/* Placeholder for charts */}
      <div
        className="rounded-xl p-8 text-center"
        style={{
          backgroundColor: '#12100E',
          border: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <BarChart3 size={48} className="mx-auto mb-3" style={{ color: '#2E2A24' }} />
        <p className="text-sm" style={{ color: '#6B6560' }}>
          Detailed analytics charts coming soon. Tour view data is being tracked.
        </p>
      </div>
    </div>
  )
}
