'use client'

import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/utils'

interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  change?: number
  className?: string
}

export function StatsCard({ icon, label, value, change, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5',
        className
      )}
      style={{
        backgroundColor: '#12100E',
        border: '1px solid rgba(212, 160, 23, 0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(212, 160, 23, 0.08)',
          border: '1px solid rgba(212, 160, 23, 0.2)',
          color: '#D4A017',
        }}
      >
        {icon}
      </div>

      <p className="text-sm font-medium mt-4" style={{ color: '#6B6560' }}>{label}</p>

      <p
        className="text-3xl font-black mt-1.5"
        style={{ fontFamily: 'var(--font-jakarta)', color: '#F5F3EF' }}
      >
        {typeof value === 'number' ? formatNumber(value) : value}
      </p>

      {change !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold">
          <span className={change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span className="font-normal ml-1" style={{ color: '#5A5248' }}>vs last month</span>
        </div>
      )}
    </div>
  )
}
