import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const listByTour = query({
  args: { tourId: v.id('tours') },
  handler: async (ctx, args) => {
    const scenes = await ctx.db
      .query('scenes')
      .withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
      .collect()

    const scenesWithUrls = await Promise.all(
      scenes.map(async (scene) => {
        const imageUrl = await ctx.storage.getUrl(scene.imageStorageId)
        const thumbnailUrl = scene.thumbnailStorageId
          ? await ctx.storage.getUrl(scene.thumbnailStorageId)
          : null
        return { ...scene, imageUrl, thumbnailUrl }
      })
    )

    return scenesWithUrls.sort((a, b) => a.order - b.order)
  },
})

export const create = mutation({
  args: {
    tourId: v.id('tours'),
    title: v.string(),
    imageStorageId: v.id('_storage'),
    order: v.number(),
    panoramaType: v.optional(
      v.union(v.literal('equirectangular'), v.literal('cubemap'), v.literal('gaussian'))
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    return await ctx.db.insert('scenes', {
      tourId: args.tourId,
      title: args.title,
      imageStorageId: args.imageStorageId,
      order: args.order,
      panoramaType: args.panoramaType ?? 'equirectangular',
    })
  },
})

export const update = mutation({
  args: {
    sceneId: v.id('scenes'),
    title: v.optional(v.string()),
    order: v.optional(v.number()),
    roomType: v.optional(v.string()),
    aiAnalysis: v.optional(
      v.object({
        objects: v.optional(v.array(v.string())),
        features: v.optional(v.array(v.string())),
        qualityScore: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const { sceneId, ...updates } = args
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    )

    await ctx.db.patch(sceneId, cleanUpdates)
  },
})

export const remove = mutation({
  args: { sceneId: v.id('scenes') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const hotspots = await ctx.db
      .query('hotspots')
      .withIndex('by_sceneId', (q) => q.eq('sceneId', args.sceneId))
      .collect()

    for (const hotspot of hotspots) {
      await ctx.db.delete(hotspot._id)
    }

    const scene = await ctx.db.get(args.sceneId)
    if (scene) {
      await ctx.storage.delete(scene.imageStorageId)
      if (scene.thumbnailStorageId) {
        await ctx.storage.delete(scene.thumbnailStorageId)
      }
    }

    await ctx.db.delete(args.sceneId)
  },
})
