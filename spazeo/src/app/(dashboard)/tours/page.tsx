'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Plus, Eye } from 'lucide-react'

type TourStatus = 'published' | 'draft'

interface Tour {
  id: string
  title: string
  status: TourStatus
  views: number
  date: string
  image: string
}

const PLACEHOLDER_TOURS: Tour[] = [
  {
    id: '1',
    title: 'Luxury Penthouse',
    status: 'published',
    views: 1247,
    date: 'Dec 15, 2025',
    image: '/images/tour-penthouse.png',
  },
  {
    id: '2',
    title: 'Coastal Paradise Villa',
    status: 'published',
    views: 832,
    date: 'Jan 3, 2026',
    image: '/images/tour-coastal.png',
  },
  {
    id: '3',
    title: 'Mountain Retreat Lodge',
    status: 'draft',
    views: 0,
    date: 'Feb 20, 2026',
    image: '/images/tour-mountain.png',
  },
]

type FilterTab = 'all' | 'published' | 'drafts'

const TABS: { label: string; value: FilterTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'drafts' },
]

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [])

  return { ref, isVisible }
}

function StatusBadge({ status }: { status: TourStatus }) {
  const isPublished = status === 'published'

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        color: isPublished ? '#2DD4BF' : '#6B6560',
        backgroundColor: isPublished
          ? 'rgba(45,212,191,0.1)'
          : 'rgba(107,101,96,0.1)',
        fontFamily: 'var(--font-dmsans)',
      }}
    >
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}

function TourCard({ tour }: { tour: Tour }) {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: '#12100E',
        border: '1px solid rgba(212,160,23,0.12)',
        borderRadius: 12,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <Link href={`/tours/${tour.id}`}>
        <div
          className="relative w-full overflow-hidden"
          style={{ height: 200 }}
        >
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div style={{ padding: 16 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <Link href={`/tours/${tour.id}`}>
            <h3
              className="font-semibold hover:opacity-80 transition-opacity"
              style={{
                fontSize: 15,
                color: '#F5F3EF',
                fontFamily: 'var(--font-display)',
              }}
            >
              {tour.title}
            </h3>
          </Link>
          <StatusBadge status={tour.status} />
        </div>

        <div
          className="flex items-center gap-3"
          style={{
            color: '#6B6560',
            fontSize: 13,
            fontFamily: 'var(--font-dmsans)',
          }}
        >
          <span className="flex items-center gap-1">
            <Eye size={14} style={{ color: '#6B6560' }} />
            {tour.views.toLocaleString()} views
          </span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              backgroundColor: '#6B6560',
              display: 'inline-block',
            }}
          />
          <span>{tour.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function ToursPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTours = PLACEHOLDER_TOURS.filter((tour) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'published' && tour.status === 'published') ||
      (activeTab === 'drafts' && tour.status === 'draft')

    const matchesSearch =
      searchQuery === '' ||
      tour.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    []
  )

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: 24 }}>
        <h1
          className="font-bold"
          style={{
            fontSize: 28,
            color: '#F5F3EF',
            fontFamily: 'var(--font-display)',
          }}
        >
          My Tours
        </h1>

        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div
            className="relative flex items-center"
            style={{ width: 260 }}
          >
            <Search
              size={16}
              className="absolute left-3 pointer-events-none"
              style={{ color: '#6B6560' }}
            />
            <input
              type="text"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full outline-none text-sm"
              style={{
                backgroundColor: '#12100E',
                border: '1px solid #D4A017',
                borderRadius: 8,
                padding: '8px 12px 8px 36px',
                color: '#F5F3EF',
                fontFamily: 'var(--font-dmsans)',
                fontSize: 14,
              }}
            />
          </div>

          {/* Create New Tour Button */}
          <Link href="/tours/new">
            <button
              className="flex items-center gap-2 font-semibold text-sm whitespace-nowrap transition-opacity duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#D4A017',
                color: '#0A0908',
                borderRadius: 8,
                padding: '8px 16px',
                fontFamily: 'var(--font-dmsans)',
                fontSize: 14,
                height: 38,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Plus size={16} />
              Create New Tour
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          borderBottom: '1px solid rgba(212,160,23,0.12)',
          marginBottom: 24,
        }}
      >
        <div className="flex items-center gap-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="relative transition-colors duration-200"
                style={{
                  color: isActive ? '#D4A017' : '#6B6560',
                  fontFamily: 'var(--font-dmsans)',
                  fontSize: 14,
                  fontWeight: 500,
                  paddingBottom: 12,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: isActive
                    ? '2px solid #D4A017'
                    : '2px solid transparent',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tour Cards Grid */}
      {filteredTours.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 20 }}
        >
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            minHeight: 300,
            color: '#6B6560',
            fontFamily: 'var(--font-dmsans)',
            fontSize: 15,
          }}
        >
          <p>No tours found.</p>
        </div>
      )}
    </div>
  )
}
