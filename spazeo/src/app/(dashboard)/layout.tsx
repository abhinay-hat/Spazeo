'use client'

import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0908' }}>
      <Sidebar />
      <main className="md:ml-[240px] min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
