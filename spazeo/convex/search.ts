import { v } from 'convex/values'
import { action } from './_generated/server'

export const searchTours = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    // Generate embedding for the search query
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: args.query,
      }),
    })

    const embeddingData = await embeddingResponse.json()
    const embedding = embeddingData.data[0].embedding

    // Use Convex vector search to find similar tours
    // Note: Vector search requires a vector index on the tours table
    // This will be set up when vector indexes are configured
    const results = await ctx.vectorSearch('tours', 'by_embedding', {
      vector: embedding,
      limit: 10,
    })

    return results
  },
})
