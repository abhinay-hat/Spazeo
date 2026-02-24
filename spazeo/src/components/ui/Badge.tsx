'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'gold' | 'teal' | 'muted'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  error:   'bg-red-500/10 text-red-400 border border-red-500/20',
  info:    'bg-[rgba(45,212,191,0.10)] text-[#2DD4BF] border border-[rgba(45,212,191,0.2)]',
  gold:    'bg-[rgba(212,160,23,0.10)] text-[#D4A017] border border-[rgba(212,160,23,0.20)]',
  teal:    'bg-[rgba(45,212,191,0.10)] text-[#2DD4BF] border border-[rgba(45,212,191,0.20)]',
  default: 'bg-[rgba(212,160,23,0.06)] text-[#A8A29E] border border-[rgba(212,160,23,0.12)]',
  muted:   'bg-[rgba(107,101,96,0.10)] text-[#6B6560] border border-[rgba(107,101,96,0.20)]',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex items-center gap-1.5 tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
