import type { Id } from '../../convex/_generated/dataModel'

export type TourStatus = 'draft' | 'published' | 'archived'
export type UserPlan = 'free' | 'pro' | 'business'
export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer'
export type HotspotType = 'navigation' | 'info' | 'media' | 'link'
export type PanoramaType = 'equirectangular' | 'cubemap' | 'gaussian'
export type AIJobType = 'scene_analysis' | 'staging' | 'description' | 'floor_plan' | 'enhancement' | 'auto_hotspots'
export type AIJobStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface TourStats {
  totalTours: number
  activeTours: number
  totalViews: number
  avgViewsPerTour: number
}

export interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
  storageId?: Id<'_storage'>
}

// Legacy interfaces for viewer components (compatible with Convex data)
export interface Hotspot {
  id: string
  scene_id?: string
  target_scene_id?: string | null
  position_x: number
  position_y: number
  position_z: number
  label: string | null
  icon: string
}

export interface Scene {
  id: string
  tour_id?: string
  title: string
  panorama_url: string
  thumbnail_url: string | null
  position_order: number
  hotspots?: Hotspot[]
}

export interface ViewerScene {
  id: string
  title: string
  imageUrl: string | null
  thumbnailUrl: string | null
  order: number
  hotspots: Array<{
    id: string
    targetSceneId?: string
    type: HotspotType
    position: { x: number; y: number; z: number }
    tooltip?: string
    icon?: string
  }>
}
