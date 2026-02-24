import { v } from 'convex/values'
import { action, internalMutation } from './_generated/server'
import { internal } from './_generated/api'

export const createJob = internalMutation({
  args: {
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
    input: v.optional(v.any()),
    provider: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('aiJobs', {
      ...args,
      status: 'pending',
    })
  },
})

export const updateJobStatus = internalMutation({
  args: {
    jobId: v.id('aiJobs'),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('completed'),
      v.literal('failed')
    ),
    output: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { jobId, ...updates } = args
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    )
    await ctx.db.patch(jobId, cleanUpdates)
  },
})

export const analyzeScene = action({
  args: {
    jobId: v.id('aiJobs'),
    sceneStorageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.ai.updateJobStatus, {
      jobId: args.jobId,
      status: 'processing',
    })

    try {
      const imageUrl = await ctx.storage.getUrl(args.sceneStorageId)
      if (!imageUrl) throw new Error('Image not found in storage')

      // Call OpenAI Vision API for scene analysis
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Analyze this 360° panorama image. Return JSON with: roomType (string), objects (array of strings), features (array of strings), qualityScore (1-10). Only return valid JSON.',
                },
                { type: 'image_url', image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 500,
        }),
      })

      const data = await response.json()
      const analysis = JSON.parse(data.choices[0].message.content)

      await ctx.runMutation(internal.ai.updateJobStatus, {
        jobId: args.jobId,
        status: 'completed',
        output: analysis,
      })

      return analysis
    } catch (error) {
      await ctx.runMutation(internal.ai.updateJobStatus, {
        jobId: args.jobId,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },
})

export const generateDescription = action({
  args: {
    jobId: v.id('aiJobs'),
    tourTitle: v.string(),
    sceneAnalyses: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.ai.updateJobStatus, {
      jobId: args.jobId,
      status: 'processing',
    })

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a real estate marketing copywriter. Write compelling, professional property descriptions based on scene analysis data.',
            },
            {
              role: 'user',
              content: `Write a property marketing description for "${args.tourTitle}" based on these room analyses: ${JSON.stringify(args.sceneAnalyses)}. Keep it under 200 words, highlight key features, and make it engaging for potential buyers.`,
            },
          ],
          max_tokens: 400,
        }),
      })

      const data = await response.json()
      const description = data.choices[0].message.content

      await ctx.runMutation(internal.ai.updateJobStatus, {
        jobId: args.jobId,
        status: 'completed',
        output: { description },
      })

      return description
    } catch (error) {
      await ctx.runMutation(internal.ai.updateJobStatus, {
        jobId: args.jobId,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  },
})
