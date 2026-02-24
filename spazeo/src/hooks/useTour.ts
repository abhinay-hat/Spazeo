import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

export function useTourList() {
  return useQuery(api.tours.list)
}

export function useTourById(tourId: Id<'tours'>) {
  return useQuery(api.tours.getById, { tourId })
}

export function useTourBySlug(slug: string) {
  return useQuery(api.tours.getBySlug, { slug })
}

export function useTourMutations() {
  const create = useMutation(api.tours.create)
  const update = useMutation(api.tours.update)
  const remove = useMutation(api.tours.remove)
  const generateUploadUrl = useMutation(api.tours.generateUploadUrl)

  return { create, update, remove, generateUploadUrl }
}
