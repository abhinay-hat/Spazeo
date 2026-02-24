import { v } from 'convex/values'
import { query, internalMutation } from './_generated/server'

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) return null

    return await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .unique()
  },
})

export const upsertFromStripe = internalMutation({
  args: {
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
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .unique()

    const data = {
      userId: args.userId,
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
      plan: args.plan,
      status: args.status,
      currentPeriodEnd: args.currentPeriodEnd,
    }

    if (existing) {
      await ctx.db.patch(existing._id, data)
      return existing._id
    }

    return await ctx.db.insert('subscriptions', data)
  },
})
