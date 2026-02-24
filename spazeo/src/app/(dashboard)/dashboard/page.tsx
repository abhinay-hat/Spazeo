'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { StatsCard } from '@/components/ui/StatsCard'
import { Spinner } from '@/components/ui/Spinner'
import { Eye, Image, BarChart3, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const overview = useQuery(api.analytics.getOverview)
  const tours = useQuery(api.tours.list)

  if (overview === undefined || tours === undefined) {
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
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
          Overview of your virtual tour performance
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

      {/* Recent Tours */}
      <div>
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          Recent Tours
        </h2>
        {tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours.slice(0, 6).map((tour: { _id: string; title: string; status: string; viewCount: number }) => (
              <a
                key={tour._id}
                href={`/tours/${tour._id}`}
                className="block rounded-xl p-5 transition-all duration-200 hover:border-[rgba(212,160,23,0.3)]"
                style={{
                  backgroundColor: '#12100E',
                  border: '1px solid rgba(212,160,23,0.12)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="font-semibold text-sm truncate"
                    style={{ color: '#F5F3EF' }}
                  >
                    {tour.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor:
                        tour.status === 'published'
                          ? 'rgba(52,211,153,0.12)'
                          : 'rgba(212,160,23,0.12)',
                      color:
                        tour.status === 'published' ? '#34D399' : '#D4A017',
                    }}
                  >
                    {tour.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: '#6B6560' }}>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {tour.viewCount} views
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              backgroundColor: '#12100E',
              border: '1px solid rgba(212,160,23,0.12)',
            }}
          >
            <Image size={40} className="mx-auto mb-3" style={{ color: '#2E2A24' }} />
            <p className="text-sm" style={{ color: '#6B6560' }}>
              No tours yet. Create your first tour to get started.
            </p>
            <a
              href="/tours"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
            >
              Create Tour
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
