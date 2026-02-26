import { v } from 'convex/values'
import { query, mutation, internalMutation, internalQuery } from './_generated/server'

export const getByClerkIdInternal = internalQuery({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()
  },
})

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()
  },
})

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
  },
})

export const upsertFromClerk = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        avatarUrl: args.avatarUrl,
      })
      return existing._id
    }

    return await ctx.db.insert('users', {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      plan: 'free',
      role: 'owner',
      onboardingComplete: false,
      aiCreditsUsed: 0,
    })
  },
})

export const completeOnboarding = mutation({
  args: {
    userType: v.union(
      v.literal('agent'),
      v.literal('photographer'),
      v.literal('developer'),
      v.literal('other')
    ),
    country: v.optional(v.string()),
    company: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    await ctx.db.patch(user._id, {
      userType: args.userType,
      country: args.country,
      company: args.company,
      onboardingComplete: true,
      notificationPreferences: {
        newLeads: true,
        weeklyDigest: true,
        productUpdates: true,
      },
    })
  },
})

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    company: v.optional(v.string()),
    country: v.optional(v.string()),
    onboardingComplete: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    const updates: Record<string, unknown> = {}
    if (args.name !== undefined) updates.name = args.name
    if (args.phoneNumber !== undefined) updates.phoneNumber = args.phoneNumber
    if (args.company !== undefined) updates.company = args.company
    if (args.country !== undefined) updates.country = args.country
    if (args.onboardingComplete !== undefined) updates.onboardingComplete = args.onboardingComplete

    await ctx.db.patch(user._id, updates)
  },
})

export const updateNotificationPreferences = mutation({
  args: {
    newLeads: v.boolean(),
    weeklyDigest: v.boolean(),
    productUpdates: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    await ctx.db.patch(user._id, {
      notificationPreferences: {
        newLeads: args.newLeads,
        weeklyDigest: args.weeklyDigest,
        productUpdates: args.productUpdates,
      },
    })
  },
})

export const generateApiKey = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    if (user.plan === 'free' || user.plan === 'starter') {
      throw new Error('API access requires a Professional or higher plan')
    }

    // Generate a random API key
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let apiKey = 'spz_'
    for (let i = 0; i < 32; i++) {
      apiKey += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    await ctx.db.patch(user._id, { apiKey })
    return apiKey
  },
})

export const revokeApiKey = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    await ctx.db.patch(user._id, { apiKey: undefined })
  },
})

export const deleteAccount = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
      .unique()
    if (!user) throw new Error('User not found')

    // Cascade delete: tours → scenes → hotspots
    const tours = await ctx.db
      .query('tours')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    for (const tour of tours) {
      const scenes = await ctx.db
        .query('scenes')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
        .collect()

      for (const scene of scenes) {
        const hotspots = await ctx.db
          .query('hotspots')
          .withIndex('by_sceneId', (q) => q.eq('sceneId', scene._id))
          .collect()
        for (const hotspot of hotspots) {
          await ctx.db.delete(hotspot._id)
        }
        if (scene.imageStorageId) {
          await ctx.storage.delete(scene.imageStorageId)
        }
        if (scene.thumbnailStorageId) {
          await ctx.storage.delete(scene.thumbnailStorageId)
        }
        if (scene.stagedImageStorageId) {
          await ctx.storage.delete(scene.stagedImageStorageId)
        }
        await ctx.db.delete(scene._id)
      }

      // Delete leads for this tour
      const leads = await ctx.db
        .query('leads')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
        .collect()
      for (const lead of leads) {
        await ctx.db.delete(lead._id)
      }

      // Delete analytics for this tour
      const analytics = await ctx.db
        .query('analytics')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
        .collect()
      for (const event of analytics) {
        await ctx.db.delete(event._id)
      }

      // Delete daily analytics for this tour
      const dailyAnalytics = await ctx.db
        .query('dailyAnalytics')
        .withIndex('by_tourId_date', (q) => q.eq('tourId', tour._id))
        .collect()
      for (const da of dailyAnalytics) {
        await ctx.db.delete(da._id)
      }

      // Delete floor plans
      const floorPlans = await ctx.db
        .query('floorPlans')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
        .collect()
      for (const fp of floorPlans) {
        await ctx.storage.delete(fp.imageStorageId)
        await ctx.db.delete(fp._id)
      }

      await ctx.db.delete(tour._id)
    }

    // Delete AI jobs
    const aiJobs = await ctx.db
      .query('aiJobs')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()
    for (const job of aiJobs) {
      await ctx.db.delete(job._id)
    }

    // Delete subscriptions
    const subscription = await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .unique()
    if (subscription) {
      await ctx.db.delete(subscription._id)
    }

    // Delete activity log
    const activities = await ctx.db
      .query('activityLog')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()
    for (const activity of activities) {
      await ctx.db.delete(activity._id)
    }

    // Delete team memberships
    const memberships = await ctx.db
      .query('teamMembers')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()
    for (const membership of memberships) {
      await ctx.db.delete(membership._id)
    }

    // Finally delete user
    await ctx.db.delete(user._id)
  },
})

// Internal mutation for cron: reset monthly AI credits
export const resetMonthlyCredits = internalMutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect()
    for (const user of users) {
      if ((user.aiCreditsUsed ?? 0) > 0) {
        await ctx.db.patch(user._id, { aiCreditsUsed: 0 })
      }
    }
  },
})

// Internal mutation: delete user from Clerk webhook
export const deleteByClerkId = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique()
    if (!user) return

    // Simplified cascade — in production, the full deleteAccount logic would be called
    // For webhook handling, we just mark essential cleanup
    const tours = await ctx.db
      .query('tours')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    for (const tour of tours) {
      const scenes = await ctx.db
        .query('scenes')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
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
      const leads = await ctx.db
        .query('leads')
        .withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
        .collect()
      for (const lead of leads) {
        await ctx.db.delete(lead._id)
      }
      await ctx.db.delete(tour._id)
    }

    const subscription = await ctx.db
      .query('subscriptions')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .unique()
    if (subscription) {
      await ctx.db.delete(subscription._id)
    }

    await ctx.db.delete(user._id)
  },
})
