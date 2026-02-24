'use client'

import { use } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Spinner } from '@/components/ui/Spinner'

const DynamicViewer = dynamic(
  () => import('@/components/viewer/PanoramaViewer').then((m) => ({ default: m.PanoramaViewer })),
  { ssr: false }
)

export default function PublicTourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const tour = useQuery(api.tours.getBySlug, { slug })

  if (tour === undefined) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0A0908' }}
      >
        <Spinner size="lg" />
      </div>
    )
  }

  if (tour === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0A0908' }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
          >
            Tour not found
          </h1>
          <p className="text-sm" style={{ color: '#6B6560' }}>
            This tour may have been removed or is no longer available.
          </p>
          <a
            href="/"
            className="inline-block mt-4 text-sm font-medium"
            style={{ color: '#D4A017' }}
          >
            Go to Spazeo
          </a>
        </div>
      </div>
    )
  }

  const firstScene = tour.scenes?.[0]
  const imageUrl = firstScene?.imageUrl

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#0A0908' }}
    >
      {/* Top bar */}
      <div
        className="h-14 flex items-center justify-between px-4 shrink-0"
        style={{
          backgroundColor: 'rgba(18,16,14,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <div>
          <h1 className="text-sm font-semibold" style={{ color: '#F5F3EF' }}>
            {tour.title}
          </h1>
          <p className="text-xs" style={{ color: '#6B6560' }}>
            {tour.scenes?.length ?? 0} scenes
          </p>
        </div>
        <a
          href="/"
          className="flex items-center"
          style={{ color: '#5A5248' }}
        >
          <span
            className="text-xs font-bold"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            SPAZEO
          </span>
          <span
            className="inline-block w-1 h-1 rounded-full ml-0.5 mb-0.5"
            style={{ backgroundColor: '#D4A017' }}
          />
        </a>
      </div>

      {/* Viewer */}
      <div className="flex-1 relative">
        {imageUrl ? (
          <DynamicViewer imageUrl={imageUrl} height="100%" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm" style={{ color: '#6B6560' }}>
              No scenes available for this tour.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
