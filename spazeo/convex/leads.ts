import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const listByTour = query({
  args: { tourId: v.id('tours') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('leads')
      .withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
      .order('desc')
      .collect()
  },
})

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) return []

    const tours = await ctx.db
      .query('tours')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    const allLeads = await Promise.all(
      tours.map((tour) =>
        ctx.db
          .query('leads')
          .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
          .collect()
      )
    )

    return allLeads
      .flat()
      .sort((a, b) => b._creationTime - a._creationTime)
  },
})

export const capture = mutation({
  args: {
    tourId: v.id('tours'),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('leads', args)
  },
})

export const remove = mutation({
  args: { leadId: v.id('leads') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')
    await ctx.db.delete(args.leadId)
  },
})
