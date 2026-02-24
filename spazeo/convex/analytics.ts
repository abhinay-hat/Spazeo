import { v } from 'convex/values'
import { query, mutation, internalMutation } from './_generated/server'

export const track = mutation({
  args: {
    tourId: v.id('tours'),
    event: v.string(),
    sessionId: v.string(),
    sceneId: v.optional(v.id('scenes')),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('analytics', {
      ...args,
      timestamp: Date.now(),
    })

    if (args.event === 'tour_view') {
      const tour = await ctx.db.get(args.tourId)
      if (tour) {
        await ctx.db.patch(args.tourId, {
          viewCount: tour.viewCount + 1,
        })
      }
    }
  },
})

export const getByTour = query({
  args: {
    tourId: v.id('tours'),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let events = await ctx.db
      .query('analytics')
      .withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
      .collect()

    if (args.startDate) {
      events = events.filter((e) => e.timestamp >= args.startDate!)
    }
    if (args.endDate) {
      events = events.filter((e) => e.timestamp <= args.endDate!)
    }

    return events
  },
})

export const getOverview = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) return null

    const tours = await ctx.db
      .query('tours')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    const totalTours = tours.length
    const activeTours = tours.filter((t) => t.status === 'published').length
    const totalViews = tours.reduce((sum, t) => sum + t.viewCount, 0)

    return {
      totalTours,
      activeTours,
      totalViews,
      avgViewsPerTour: totalTours > 0 ? Math.round(totalViews / totalTours) : 0,
    }
  },
})

export const rollupDaily = internalMutation({
  args: {},
  handler: async (_ctx) => {
    // Placeholder for daily analytics rollup cron job
    // Aggregates raw events into daily summary documents
  },
})
