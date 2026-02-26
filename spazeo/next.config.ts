import type { NextConfig } from 'next'
import { resolve } from 'path'

const nextConfig: NextConfig = {
  typescript: {
    // Convex CLI handles type-checking for convex/ files separately.
    // The generated api.d.ts imports all convex source files, which creates
    // circular type references that break the Next.js build.
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '*.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

export default nextConfig
