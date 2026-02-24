'use client'

import { use, useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { UploadZone } from '@/components/tour/UploadZone'
import { SceneList } from '@/components/tour/SceneList'
import { Spinner } from '@/components/ui/Spinner'
import { ArrowLeft, Save, Globe } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function TourEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const tourId = id as Id<'tours'>
  const tour = useQuery(api.tours.getById, { tourId })
  const scenes = useQuery(api.scenes.listByTour, { tourId })
  const updateTour = useMutation(api.tours.update)
  const generateUploadUrl = useMutation(api.tours.generateUploadUrl)
  const createScene = useMutation(api.scenes.create)

  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  // Sync title from tour data
  if (tour && !title && tour.title) {
    setTitle(tour.title)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateTour({ tourId, title })
      toast.success('Tour saved')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      await updateTour({ tourId, title, status: 'published' })
      toast.success('Tour published!')
    } catch {
      toast.error('Failed to publish')
    } finally {
      setPublishing(false)
    }
  }

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      try {
        const uploadUrl = await generateUploadUrl()
        const result = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: file,
        })
        const { storageId } = await result.json()

        await createScene({
          tourId,
          title: file.name.replace(/\.[^.]+$/, ''),
          imageStorageId: storageId,
          order: (scenes?.length ?? 0) + 1,
        })

        toast.success(`Uploaded ${file.name}`)
      } catch {
        toast.error(`Failed to upload ${file.name}`)
      }
    }
  }

  if (tour === undefined || scenes === undefined) {
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
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/tours/${id}`}
          className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-[#F5F3EF]"
          style={{ color: '#6B6560' }}
        >
          <ArrowLeft size={16} />
          Back to tour
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-60"
            style={{
              border: '1px solid rgba(212,160,23,0.2)',
              color: '#D4A017',
            }}
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 disabled:opacity-60"
            style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
          >
            <Globe size={14} />
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Title Edit */}
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tour title..."
          className="w-full text-xl font-bold bg-transparent border-none outline-none placeholder-[#3D3830]"
          style={{
            color: '#F5F3EF',
            fontFamily: 'var(--font-jakarta)',
          }}
        />
      </div>

      {/* Upload Zone */}
      <div className="mb-8">
        <UploadZone onUpload={handleUpload} />
      </div>

      {/* Scenes */}
      {scenes && scenes.length > 0 && (
        <div>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
          >
            Scenes ({scenes.length})
          </h2>
          <SceneList scenes={scenes} tourId={tourId} />
        </div>
      )}
    </div>
  )
}
