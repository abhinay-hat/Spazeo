'use client'

import Link from 'next/link'
import { Eye, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { TourStatus } from '@/types'

interface TourCardProps {
  tour: {
    _id: string
    title: string
    status: TourStatus
    viewCount: number
    _creationTime: number
  }
}

const statusVariant: Record<TourStatus, 'default' | 'success' | 'warning'> = {
  draft: 'default',
  published: 'success',
  archived: 'warning',
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour._id}`}
      className={cn(
        'block rounded-[12px] overflow-hidden',
        'hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer'
      )}
      style={{
        backgroundColor: '#12100E',
        border: '1px solid rgba(212, 160, 23, 0.12)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Thumbnail placeholder */}
      <div
        className="aspect-video relative flex items-center justify-center"
        style={{ backgroundColor: '#1B1916' }}
      >
        <span className="text-xs" style={{ color: '#2E2A24' }}>
          360° Preview
        </span>
        <div className="absolute top-3 left-3">
          <Badge variant={statusVariant[tour.status]}>
            {tour.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm font-semibold truncate" style={{ color: '#F5F3EF' }}>
          {tour.title}
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: '#5A5248' }}>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
            {tour.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
            {new Date(tour._creationTime).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  )
}
