import { v } from 'convex/values'
import { query, internalMutation } from './_generated/server'

export const log = internalMutation({
  args: {
    userId: v.id('users'),
    type: v.union(
      v.literal('tour_created'),
      v.literal('tour_published'),
      v.literal('lead_captured'),
      v.literal('ai_completed'),
      v.literal('scene_uploaded'),
      v.literal('building_created'),
      v.literal('building_published')
    ),
    tourId: v.optional(v.id('tours')),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('activityLog', {
      ...args,
      timestamp: Date.now(),
    })
  },
})

export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) return []

    const activities = await ctx.db
      .query('activityLog')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .take(20)

    return activities
  },
})
