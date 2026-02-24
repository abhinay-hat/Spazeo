'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { TourCard } from '@/components/tour/TourCard'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Plus, Image } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ToursPage() {
  const tours = useQuery(api.tours.list)
  const createTour = useMutation(api.tours.create)
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    setCreating(true)
    try {
      const tourId = await createTour({ title: 'Untitled Tour' })
      window.location.href = `/tours/${tourId}/edit`
    } catch {
      toast.error('Failed to create tour')
    } finally {
      setCreating(false)
    }
  }

  if (tours === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
          >
            My Tours
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
            Manage and create virtual tours
          </p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60"
          style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
        >
          <Plus size={16} />
          {creating ? 'Creating...' : 'New Tour'}
        </button>
      </div>

      {/* Tours Grid */}
      {tours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour: { _id: string; title: string; status: 'draft' | 'published' | 'archived'; viewCount: number; _creationTime: number }) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Image size={48} />}
          title="No tours yet"
          description="Create your first virtual tour to start showcasing properties."
          action={
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
            >
              <Plus size={16} />
              Create First Tour
            </button>
          }
        />
      )}
    </div>
  )
}
