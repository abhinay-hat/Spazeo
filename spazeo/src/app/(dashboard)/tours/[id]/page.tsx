'use client'

import { use } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Eye, Edit, ExternalLink, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const tour = useQuery(api.tours.getById, {
    tourId: id as Id<'tours'>,
  })

  if (tour === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (tour === null) {
    return (
      <div className="text-center py-20">
        <p style={{ color: '#6B6560' }}>Tour not found.</p>
        <Link
          href="/tours"
          className="text-sm font-medium mt-2 inline-block"
          style={{ color: '#D4A017' }}
        >
          Back to tours
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/tours"
          className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[#F5F3EF]"
          style={{ color: '#6B6560' }}
        >
          <ArrowLeft size={16} />
          Back to tours
        </Link>
        <div className="flex items-center gap-3">
          {tour.status === 'published' && tour.slug && (
            <a
              href={`/tour/${tour.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              style={{
                border: '1px solid rgba(45,212,191,0.2)',
                color: '#2DD4BF',
              }}
            >
              <ExternalLink size={14} />
              View Live
            </a>
          )}
          <Link
            href={`/tours/${id}/edit`}
            className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
          >
            <Edit size={14} />
            Edit Tour
          </Link>
        </div>
      </div>

      {/* Tour Info */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: '#12100E',
          border: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
            >
              {tour.title}
            </h1>
            {tour.description && (
              <p className="text-sm mt-2" style={{ color: '#6B6560' }}>
                {tour.description}
              </p>
            )}
          </div>
          <Badge
            variant={
              tour.status === 'published'
                ? 'success'
                : tour.status === 'archived'
                  ? 'muted'
                  : 'default'
            }
          >
            {tour.status}
          </Badge>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#6B6560' }}>
            <Eye size={14} />
            {tour.viewCount} views
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#6B6560' }}>
            <Calendar size={14} />
            {tour.scenes?.length ?? 0} scenes
          </span>
        </div>
      </div>

      {/* Scenes List */}
      {tour.scenes && tour.scenes.length > 0 && (
        <div className="mt-6">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
          >
            Scenes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tour.scenes.map((scene: { _id: string; title: string; hotspots?: unknown[] }, i: number) => (
              <div
                key={scene._id}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: '#1B1916',
                  border: '1px solid rgba(212,160,23,0.08)',
                }}
              >
                <div
                  className="rounded-lg mb-3 flex items-center justify-center"
                  style={{
                    height: 120,
                    backgroundColor: '#12100E',
                    border: '1px solid rgba(212,160,23,0.06)',
                  }}
                >
                  <span className="text-xs" style={{ color: '#5A5248' }}>
                    Scene {i + 1}
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: '#F5F3EF' }}>
                  {scene.title}
                </p>
                <p className="text-xs mt-1" style={{ color: '#5A5248' }}>
                  {scene.hotspots?.length ?? 0} hotspots
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
