'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Eye,
  Globe,
  Plus,
  X,
  ArrowRight,
  Info,
} from 'lucide-react'

/* ── Types ── */
interface Scene {
  id: string
  name: string
  hotspots: number
  image: string
}

interface Hotspot {
  id: string
  type: 'navigation' | 'info'
  label: string
  x: number
  y: number
  color: string
  bgColor: string
}

interface SettingToggle {
  label: string
  enabled: boolean
}

/* ── Placeholder data ── */
const SCENES: Scene[] = [
  { id: '1', name: 'Living Room', hotspots: 3, image: '/images/scene-living.png' },
  { id: '2', name: 'Kitchen', hotspots: 2, image: '/images/scene-kitchen.png' },
  { id: '3', name: 'Master Bedroom', hotspots: 1, image: '/images/scene-bedroom.png' },
  { id: '4', name: 'Bathroom', hotspots: 1, image: '/images/scene-bathroom.png' },
  { id: '5', name: 'Balcony View', hotspots: 2, image: '/images/scene-balcony.png' },
]

const HOTSPOTS: Hotspot[] = [
  { id: 'h1', type: 'navigation', label: 'Go to Kitchen', x: 36.5, y: 35.5, color: '#2DD4BF', bgColor: 'rgba(45,212,191,0.19)' },
  { id: 'h2', type: 'info', label: 'Info Point', x: 62.5, y: 53.3, color: '#D4A017', bgColor: 'rgba(212,160,23,0.19)' },
  { id: 'h3', type: 'navigation', label: 'Go to Balcony', x: 18.8, y: 61.6, color: '#2DD4BF', bgColor: 'rgba(45,212,191,0.19)' },
]

const INITIAL_SETTINGS: SettingToggle[] = [
  { label: 'Auto-rotate', enabled: true },
  { label: 'Show compass', enabled: false },
  { label: 'Music overlay', enabled: false },
]

/* ── Page ── */
export default function TourEditorPage() {
  const [activeScene, setActiveScene] = useState('1')
  const [settings, setSettings] = useState(INITIAL_SETTINGS)
  const [sceneName, setSceneName] = useState('Living Room')
  const [propertiesOpen, setPropertiesOpen] = useState(true)

  const toggleSetting = (idx: number) => {
    setSettings((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, enabled: !s.enabled } : s))
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#0A0908' }}
    >
      {/* ── Top Bar ── */}
      <div
        className="flex items-center justify-between h-14 px-6 flex-shrink-0"
        style={{
          backgroundColor: '#12100E',
          borderBottom: '1px solid rgba(212,160,23,0.12)',
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            href="/tours"
            className="flex items-center justify-center rounded-md"
            style={{
              padding: '6px 8px',
              border: '1px solid rgba(212,160,23,0.12)',
            }}
            aria-label="Back to tours"
          >
            <ArrowLeft size={18} style={{ color: '#A8A29E' }} />
          </Link>
          <span
            className="text-base font-semibold"
            style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
          >
            Coastal Paradise Tour
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200"
            style={{
              border: '1px solid rgba(212,160,23,0.12)',
              color: '#A8A29E',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            className="flex items-center px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200"
            style={{
              border: '1px solid rgba(212,160,23,0.12)',
              color: '#A8A29E',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            Save Draft
          </button>
          <button
            className="flex items-center px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200"
            style={{
              backgroundColor: '#D4A017',
              color: '#0A0908',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            Publish
          </button>
        </div>
      </div>

      {/* ── Editor Body ── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Scenes Panel (Left) ── */}
        <div
          className="hidden md:flex flex-col w-[240px] flex-shrink-0"
          style={{
            backgroundColor: '#12100E',
            borderRight: '1px solid rgba(212,160,23,0.12)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <span
              className="text-sm font-semibold"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
            >
              Scenes
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
            >
              {SCENES.length}
            </span>
          </div>

          {/* Scene List */}
          <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1">
            {SCENES.map((scene) => {
              const isActive = scene.id === activeScene
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveScene(scene.id)
                    setSceneName(scene.name)
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-lg text-left transition-all duration-150 w-full"
                  style={{
                    backgroundColor: isActive ? 'rgba(212,160,23,0.07)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(212,160,23,0.4)'
                      : '1px solid transparent',
                  }}
                >
                  <div className="w-[60px] h-10 rounded-md overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={scene.image}
                      alt={scene.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-[13px] font-semibold truncate"
                      style={{
                        color: isActive ? '#F5F3EF' : '#A8A29E',
                        fontFamily: 'var(--font-dmsans)',
                      }}
                    >
                      {scene.name}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {scene.hotspots} hotspot{scene.hotspots !== 1 ? 's' : ''}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Add Scene */}
          <button
            className="flex items-center justify-center gap-2 px-4 py-3"
            style={{
              borderTop: '1px solid rgba(212,160,23,0.12)',
              color: '#D4A017',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            <Plus size={16} />
            <span className="text-[13px] font-semibold">Add Scene</span>
          </button>
        </div>

        {/* ── Viewport (Center) ── */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{ backgroundColor: '#0A0908' }}
        >
          <Image
            src="/images/editor-viewport.png"
            alt="360° panorama — Living Room"
            fill
            className="object-cover"
            priority
          />

          {/* Hotspot Markers */}
          {HOTSPOTS.map((hs) => (
            <button
              key={hs.id}
              className="absolute flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
              style={{
                width: 32,
                height: 32,
                left: `${hs.x}%`,
                top: `${hs.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: hs.bgColor,
                border: `2px solid ${hs.color}`,
              }}
              aria-label={hs.label}
            >
              {hs.type === 'navigation' ? (
                <ArrowRight size={14} style={{ color: hs.color }} />
              ) : (
                <Info size={14} style={{ color: hs.color }} />
              )}
            </button>
          ))}
        </div>

        {/* ── Properties Panel (Right) ── */}
        {propertiesOpen && (
          <div
            className="hidden lg:flex flex-col w-[260px] flex-shrink-0"
            style={{
              backgroundColor: '#12100E',
              borderLeft: '1px solid rgba(212,160,23,0.12)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4">
              <span
                className="text-sm font-semibold"
                style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
              >
                Properties
              </span>
              <button
                onClick={() => setPropertiesOpen(false)}
                aria-label="Close properties panel"
              >
                <X size={16} style={{ color: '#6B6560' }} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6">
              {/* Scene Name */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-medium"
                  style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                >
                  Scene Name
                </label>
                <input
                  type="text"
                  value={sceneName}
                  onChange={(e) => setSceneName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg text-[13px] outline-none"
                  style={{
                    backgroundColor: '#0A0908',
                    border: '1px solid rgba(212,160,23,0.12)',
                    color: '#F5F3EF',
                    fontFamily: 'var(--font-dmsans)',
                  }}
                />
              </div>

              {/* Hotspots */}
              <div className="flex flex-col gap-2.5">
                <span
                  className="text-xs font-medium"
                  style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                >
                  Hotspots
                </span>
                {HOTSPOTS.map((hs) => (
                  <div
                    key={hs.id}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-md"
                    style={{
                      backgroundColor: '#0A0908',
                      border: '1px solid rgba(212,160,23,0.12)',
                    }}
                  >
                    {hs.type === 'navigation' ? (
                      <ArrowRight size={14} style={{ color: '#2DD4BF' }} />
                    ) : (
                      <Info size={14} style={{ color: '#D4A017' }} />
                    )}
                    <span
                      className="text-xs"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {hs.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <div className="flex flex-col gap-2.5">
                <span
                  className="text-xs font-medium"
                  style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                >
                  Settings
                </span>
                {settings.map((s, idx) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span
                      className="text-[13px]"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {s.label}
                    </span>
                    <button
                      onClick={() => toggleSetting(idx)}
                      className="relative rounded-full transition-colors duration-200"
                      style={{
                        width: 36,
                        height: 20,
                        backgroundColor: s.enabled ? '#D4A017' : '#2E2A24',
                      }}
                      role="switch"
                      aria-checked={s.enabled}
                      aria-label={s.label}
                    >
                      <span
                        className="absolute top-[2px] rounded-full transition-transform duration-200"
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: s.enabled ? '#F5F3EF' : '#6B6560',
                          transform: s.enabled
                            ? 'translateX(18px)'
                            : 'translateX(2px)',
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer — Publish */}
            <div
              className="p-4"
              style={{ borderTop: '1px solid rgba(212,160,23,0.12)' }}
            >
              <button
                className="w-full h-10 rounded-[10px] flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200"
                style={{
                  backgroundColor: '#D4A017',
                  color: '#0A0908',
                  fontFamily: 'var(--font-dmsans)',
                  boxShadow: '0 0 20px rgba(212,160,23,0.19)',
                }}
              >
                <Globe size={16} />
                Publish Tour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
