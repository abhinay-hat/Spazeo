'use client'

import { useState } from 'react'
import { Html } from '@react-three/drei'
import { MapPin } from 'lucide-react'
import type { Hotspot } from '@/types'

interface Props {
  hotspot: Hotspot
  onClick: () => void
}

export function HotspotMarker({ hotspot, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Html
      position={[hotspot.position_x, hotspot.position_y, hotspot.position_z]}
      center
      zIndexRange={[10, 0]}
    >
      <div className="relative flex flex-col items-center">
        {/* Tooltip label — shown on hover */}
        {isHovered && hotspot.label && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-[4px] bg-[#0A0908]/90 border border-white/10 text-white text-xs font-medium shadow-lg pointer-events-none">
            {hotspot.label}
          </div>
        )}

        {/* Marker button */}
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={hotspot.label ?? 'View hotspot'}
          className="relative w-9 h-9 flex items-center justify-center rounded-full bg-[#2DD4BF] text-[#0A0908] shadow-lg transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/60"
          style={{ cursor: 'pointer' }}
        >
          {/* Ping animation ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#2DD4BF]/40 animate-ping"
            aria-hidden="true"
          />
          {/* Solid base ring */}
          <span
            className="absolute inset-0 rounded-full ring-2 ring-[#2DD4BF]/40"
            aria-hidden="true"
          />
          <MapPin size={16} strokeWidth={1.5} className="relative z-10" />
        </button>
      </div>
    </Html>
  )
}

export default HotspotMarker
