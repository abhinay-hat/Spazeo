import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Spazeo — Step Inside Any Space',
  description:
    'Create AI-powered 360° virtual tours that let buyers walk through properties from anywhere. The most immersive virtual tour platform for real estate professionals.',
  keywords: ['virtual tour', '360 tour', 'real estate', 'AI staging', 'panorama', 'proptech'],
  openGraph: {
    title: 'Spazeo — Step Inside Any Space',
    description: 'Create immersive 360° virtual tours for real estate.',
    siteName: 'Spazeo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${dmSans.variable}`}>
      <body className="antialiased font-body">
        <ConvexClientProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1B1916',
                color: '#F5F3EF',
                border: '1px solid rgba(212,160,23,0.18)',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: 'var(--font-dmsans), DM Sans, sans-serif',
              },
              success: { iconTheme: { primary: '#D4A017', secondary: '#1B1916' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#1B1916' } },
            }}
          />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}
