const providers: { domain: string; applicationID: string }[] = []

if (process.env.CLERK_ISSUER_URL) {
  providers.push({
    domain: process.env.CLERK_ISSUER_URL,
    applicationID: 'convex',
  })
}

export default { providers }
