import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'

const http = httpRouter()

// Stripe webhook endpoint
http.route({
  path: '/stripe-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return new Response('Missing stripe-signature header', { status: 400 })
    }

    // Verify and process the webhook
    // In production, verify the signature using Stripe's webhook secret
    try {
      const event = JSON.parse(body)

      switch (event.type) {
        case 'checkout.session.completed':
          // Handle successful checkout
          break
        case 'customer.subscription.updated':
          // Handle subscription update
          break
        case 'customer.subscription.deleted':
          // Handle subscription cancellation
          break
        case 'invoice.payment_failed':
          // Handle failed payment
          break
      }

      return new Response('OK', { status: 200 })
    } catch (error) {
      return new Response('Webhook processing failed', { status: 500 })
    }
  }),
})

// Public tour embed API
http.route({
  path: '/api/tour',
  method: 'GET',
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const tour = await ctx.runQuery(
      // @ts-expect-error — api reference resolved at runtime
      'tours:getBySlug' as never,
      { slug }
    )

    return new Response(JSON.stringify(tour), {
      status: tour ? 200 : 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }),
})

export default http
