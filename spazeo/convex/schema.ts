import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    plan: v.union(v.literal('free'), v.literal('pro'), v.literal('business')),
    role: v.union(v.literal('owner'), v.literal('admin'), v.literal('editor'), v.literal('viewer')),
    onboardingComplete: v.boolean(),
  })
    .index('by_clerkId', ['clerkId'])
    .index('by_email', ['email']),

  tours: defineTable({
    userId: v.id('users'),
    title: v.string(),
    description: v.optional(v.string()),
    slug: v.string(),
    status: v.union(v.literal('draft'), v.literal('published'), v.literal('archived')),
    settings: v.optional(
      v.object({
        autoRotate: v.optional(v.boolean()),
        showMiniMap: v.optional(v.boolean()),
        allowFullscreen: v.optional(v.boolean()),
        brandingEnabled: v.optional(v.boolean()),
      })
    ),
    thumbnailStorageId: v.optional(v.id('_storage')),
    viewCount: v.number(),
    publishedAt: v.optional(v.number()),
  })
    .index('by_userId', ['userId'])
    .index('by_slug', ['slug'])
    .index('by_status', ['status']),

  scenes: defineTable({
    tourId: v.id('tours'),
    title: v.string(),
    imageStorageId: v.id('_storage'),
    thumbnailStorageId: v.optional(v.id('_storage')),
    order: v.number(),
    panoramaType: v.union(v.literal('equirectangular'), v.literal('cubemap'), v.literal('gaussian')),
    roomType: v.optional(v.string()),
    aiAnalysis: v.optional(
      v.object({
        objects: v.optional(v.array(v.string())),
        features: v.optional(v.array(v.string())),
        qualityScore: v.optional(v.number()),
      })
    ),
    stagedImageStorageId: v.optional(v.id('_storage')),
  }).index('by_tourId', ['tourId']),

  hotspots: defineTable({
    sceneId: v.id('scenes'),
    targetSceneId: v.optional(v.id('scenes')),
    type: v.union(v.literal('navigation'), v.literal('info'), v.literal('media'), v.literal('link')),
    position: v.object({
      x: v.number(),
      y: v.number(),
      z: v.number(),
    }),
    tooltip: v.optional(v.string()),
    icon: v.optional(v.string()),
    content: v.optional(v.string()),
  }).index('by_sceneId', ['sceneId']),

  floorPlans: defineTable({
    tourId: v.id('tours'),
    imageStorageId: v.id('_storage'),
    rooms: v.optional(
      v.array(
        v.object({
          name: v.string(),
          sceneId: v.optional(v.id('scenes')),
          polygon: v.array(v.object({ x: v.number(), y: v.number() })),
        })
      )
    ),
    scale: v.optional(v.number()),
  }).index('by_tourId', ['tourId']),

  leads: defineTable({
    tourId: v.id('tours'),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.optional(v.string()),
  })
    .index('by_tourId', ['tourId'])
    .index('by_email', ['email']),

  analytics: defineTable({
    tourId: v.id('tours'),
    event: v.string(),
    sessionId: v.string(),
    sceneId: v.optional(v.id('scenes')),
    metadata: v.optional(v.any()),
    timestamp: v.number(),
  })
    .index('by_tourId', ['tourId'])
    .index('by_event', ['event'])
    .index('by_timestamp', ['timestamp']),

  subscriptions: defineTable({
    userId: v.id('users'),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.optional(v.string()),
    plan: v.union(v.literal('free'), v.literal('pro'), v.literal('business')),
    status: v.union(
      v.literal('active'),
      v.literal('canceled'),
      v.literal('past_due'),
      v.literal('trialing'),
      v.literal('incomplete')
    ),
    currentPeriodEnd: v.optional(v.number()),
  })
    .index('by_userId', ['userId'])
    .index('by_stripeCustomerId', ['stripeCustomerId']),

  teamMembers: defineTable({
    teamId: v.string(),
    userId: v.id('users'),
    role: v.union(v.literal('owner'), v.literal('admin'), v.literal('editor'), v.literal('viewer')),
    invitedBy: v.id('users'),
  })
    .index('by_teamId', ['teamId'])
    .index('by_userId', ['userId']),

  aiJobs: defineTable({
    tourId: v.id('tours'),
    sceneId: v.optional(v.id('scenes')),
    type: v.union(
      v.literal('scene_analysis'),
      v.literal('staging'),
      v.literal('description'),
      v.literal('floor_plan'),
      v.literal('enhancement'),
      v.literal('auto_hotspots')
    ),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('completed'),
      v.literal('failed')
    ),
    input: v.optional(v.any()),
    output: v.optional(v.any()),
    provider: v.optional(v.string()),
    error: v.optional(v.string()),
  })
    .index('by_tourId', ['tourId'])
    .index('by_status', ['status']),
})
