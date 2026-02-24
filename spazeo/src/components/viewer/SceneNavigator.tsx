'use client'

import { useState } from 'react'
import { useViewer } from '@/hooks/useViewer'
import type { Scene } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  scenes: Scene[]
  onSceneChange?: (index: number) => void
}

export function SceneNavigator({ scenes, onSceneChange }: Props) {
  const { activeSceneIndex, setActiveScene } = useViewer()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (scenes.length === 0) return null

  function handleSelect(index: number) {
    setActiveScene(index)
    onSceneChange?.(index)
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 z-10">
      <div className="glass-dark rounded-[12px] p-2 overflow-x-auto flex gap-2 scrollbar-hide">
        {scenes.map((scene, index) => {
          const isActive = index === activeSceneIndex
          const isHovered = hoveredIndex === index
          const thumbSrc = scene.panorama_url || scene.thumbnail_url

          return (
            <button
              key={scene.id}
              onClick={() => handleSelect(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Go to scene: ${scene.title}`}
              aria-pressed={isActive}
              className={cn(
                'relative w-20 h-14 rounded-[8px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                isActive && 'ring-2 ring-brand-600',
                !isActive && isHovered && 'ring-2 ring-white/30'
              )}
            >
              {thumbSrc ? (
                <img
                  src={thumbSrc}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-surface-700 flex items-center justify-center">
                  <span className="text-[10px] text-surface-400 text-center px-1 leading-tight">
                    {scene.title}
                  </span>
                </div>
              )}

              {/* Hover tooltip with scene title */}
              {isHovered && (
                <div className="absolute top-0 left-0 right-0 px-1 py-0.5 bg-black/70 z-10">
                  <span className="block text-[10px] text-white truncate leading-tight">
                    {scene.title}
                  </span>
                </div>
              )}

              {/* Active overlay tint */}
              {isActive && (
                <div className="absolute inset-0 bg-brand-600/10" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SceneNavigator
