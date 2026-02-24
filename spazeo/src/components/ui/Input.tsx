'use client'

import { forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium mb-2 block"
            style={{ color: '#A8A29E' }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-11 px-4 rounded-lg text-sm transition-all duration-200',
              'focus:outline-none',
              className
            )}
            style={{
              backgroundColor: '#1B1916',
              border: error
                ? '1px solid rgba(248, 113, 113, 0.5)'
                : '1px solid rgba(212, 160, 23, 0.15)',
              color: '#F5F3EF',
              fontFamily: 'var(--font-dmsans)',
            }}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.border = '1px solid rgba(212, 160, 23, 0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 160, 23, 0.08)'
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = error
                ? '1px solid rgba(248, 113, 113, 0.5)'
                : '1px solid rgba(212, 160, 23, 0.15)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-xs mt-1.5" style={{ color: '#5A5248' }}>{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
