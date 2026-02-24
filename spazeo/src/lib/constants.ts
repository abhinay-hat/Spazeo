export const PLANS = {
  free: {
    name: 'Starter',
    price: 0,
    tourLimit: 3,
    sceneLimit: 10,
    features: [
      'Up to 3 tours',
      '10 scenes per tour',
      'Basic analytics',
      'Spazeo branding',
    ],
  },
  pro: {
    name: 'Professional',
    price: 29,
    tourLimit: 25,
    sceneLimit: 50,
    features: [
      'Up to 25 tours',
      '50 scenes per tour',
      'AI staging & descriptions',
      'Advanced analytics',
      'Custom branding',
      'Lead capture',
      'Priority support',
    ],
  },
  business: {
    name: 'Business',
    price: 79,
    tourLimit: -1,
    sceneLimit: 100,
    features: [
      'Unlimited tours',
      '100 scenes per tour',
      'All AI features',
      'Full analytics suite',
      'Team collaboration',
      'White-label',
      'API access',
      'Dedicated support',
    ],
  },
} as const

export const TOUR_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
}

export const AI_JOB_TYPE_LABELS: Record<string, string> = {
  scene_analysis: 'Scene Analysis',
  staging: 'Virtual Staging',
  description: 'Description Generation',
  floor_plan: 'Floor Plan Generation',
  enhancement: 'Image Enhancement',
  auto_hotspots: 'Auto Hotspot Detection',
}
