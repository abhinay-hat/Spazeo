import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

// Daily analytics rollup at 2:00 AM UTC
crons.daily(
  'analytics rollup',
  { hourUTC: 2, minuteUTC: 0 },
  internal.analytics.rollupDaily,
)

export default crons
