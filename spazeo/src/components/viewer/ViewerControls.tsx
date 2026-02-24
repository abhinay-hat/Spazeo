'use client'

import { Minus, Plus, RotateCw, Maximize2, Minimize2 } from 'lucide-react'
import { useViewer } from '@/hooks/useViewer'
import { cn } from '@/lib/utils'

export function ViewerControls() {
  const {
    zoomLevel,
    zoomIn,
    zoomOut,
    isAutoRotating,
    toggleAutoRotate,
    isFullscreen,
    toggleFullscreen,
  } = useViewer()

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div className="glass-dark rounded-full px-4 py-2 flex items-center gap-2">
        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          aria-label="Zoom out"
          className="w-8 h-8 rounded-full hover:bg-white/10 text-surface-200 hover:text-white flex items-center justify-center transition-colors"
        >
          <Minus size={16} strokeWidth={1.5} />
        </button>

        {/* Zoom Level */}
        <span className="text-xs text-surface-300 min-w-[32px] text-center tabular-nums">
          {zoomLevel.toFixed(1)}x
        </span>

        {/* Zoom In */}
        <button
          onClick={zoomIn}
          aria-label="Zoom in"
          className="w-8 h-8 rounded-full hover:bg-white/10 text-surface-200 hover:text-white flex items-center justify-center transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-surface-500" />

        {/* Auto Rotate */}
        <button
          onClick={toggleAutoRotate}
          aria-label={isAutoRotating ? 'Stop auto-rotate' : 'Start auto-rotate'}
          className={cn(
            'w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors',
            isAutoRotating ? 'text-brand-600' : 'text-surface-200 hover:text-white'
          )}
        >
          <RotateCw size={16} strokeWidth={1.5} />
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-surface-500" />

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className="w-8 h-8 rounded-full hover:bg-white/10 text-surface-200 hover:text-white flex items-center justify-center transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 size={16} strokeWidth={1.5} />
          ) : (
            <Maximize2 size={16} strokeWidth={1.5} />
          )}
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-surface-500" />

        {/* Compass */}
        <div
          aria-hidden="true"
          className="w-7 h-7 rounded-full border border-surface-500 flex items-center justify-center bg-white/5 animate-[spin_12s_linear_infinite]"
        >
          <span className="text-[10px] font-semibold text-surface-200 leading-none select-none">
            N
          </span>
        </div>
      </div>
    </div>
  )
}

export default ViewerControls
