import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) return []

    return await ctx.db
      .query('tours')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})

export const getById = query({
  args: { tourId: v.id('tours') },
  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.tourId)
    if (!tour) return null

    const scenes = await ctx.db
      .query('scenes')
      .withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
      .collect()

    const scenesWithHotspots = await Promise.all(
      scenes.map(async (scene) => {
        const hotspots = await ctx.db
          .query('hotspots')
          .withIndex('by_sceneId', (q) => q.eq('sceneId', scene._id))
          .collect()
        return { ...scene, hotspots }
      })
    )

    return {
      ...tour,
      scenes: scenesWithHotspots.sort((a, b) => a.order - b.order),
    }
  },
})

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const tour = await ctx.db
      .query('tours')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()
    if (!tour || tour.status !== 'published') return null

    const scenes = await ctx.db
      .query('scenes')
      .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
      .collect()

    const scenesWithHotspots = await Promise.all(
      scenes.map(async (scene) => {
        const hotspots = await ctx.db
          .query('hotspots')
          .withIndex('by_sceneId', (q) => q.eq('sceneId', scene._id))
          .collect()

        const imageUrl = scene.imageStorageId
          ? await ctx.storage.getUrl(scene.imageStorageId)
          : null

        return { ...scene, hotspots, imageUrl }
      })
    )

    return {
      ...tour,
      scenes: scenesWithHotspots.sort((a, b) => a.order - b.order),
    }
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    const slug =
      args.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') +
      '-' +
      Date.now().toString(36)

    return await ctx.db.insert('tours', {
      userId: user._id,
      title: args.title,
      description: args.description,
      slug,
      status: 'draft',
      viewCount: 0,
    })
  },
})

export const update = mutation({
  args: {
    tourId: v.id('tours'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal('draft'), v.literal('published'), v.literal('archived'))),
    settings: v.optional(
      v.object({
        autoRotate: v.optional(v.boolean()),
        showMiniMap: v.optional(v.boolean()),
        allowFullscreen: v.optional(v.boolean()),
        brandingEnabled: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const tour = await ctx.db.get(args.tourId)
    if (!tour) throw new Error('Tour not found')

    const { tourId, ...updates } = args
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    )

    if (updates.status === 'published' && tour.status !== 'published') {
      Object.assign(cleanUpdates, { publishedAt: Date.now() })
    }

    await ctx.db.patch(tourId, cleanUpdates)
  },
})

export const remove = mutation({
  args: { tourId: v.id('tours') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const scenes = await ctx.db
      .query('scenes')
      .withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
      .collect()

    for (const scene of scenes) {
      const hotspots = await ctx.db
        .query('hotspots')
        .withIndex('by_sceneId', (q) => q.eq('sceneId', scene._id))
        .collect()
      for (const hotspot of hotspots) {
        await ctx.db.delete(hotspot._id)
      }
      await ctx.db.delete(scene._id)
    }

    await ctx.db.delete(args.tourId)
  },
})

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error('Not authenticated')
  return await ctx.storage.generateUploadUrl()
})
