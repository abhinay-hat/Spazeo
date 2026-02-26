'use client'

import dynamic from 'next/dynamic'

const Sidebar = dynamic(
  () => import('@/components/layout/Sidebar').then((mod) => mod.Sidebar),
  { ssr: false }
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0908' }}>
      <Sidebar />
      <main className="md:ml-[240px] min-h-screen">
        <div className="p-6 md:px-10 md:py-8">{children}</div>
      </main>
    </div>
  )
}
