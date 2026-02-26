'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize, Share2, X } from 'lucide-react'

const scenes = [
  { id: 0, label: 'Living Room', src: '/images/scene-living.png' },
  { id: 1, label: 'Kitchen', src: '/images/scene-kitchen.png' },
  { id: 2, label: 'Bedroom', src: '/images/scene-bedroom.png' },
  { id: 3, label: 'Balcony', src: '/images/scene-balcony.png' },
]

export default function PublicTourViewerPage() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeScene, setActiveScene] = useState(0)

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0A0908',
      }}
    >
      {/* Background Panorama */}
      <Image
        src="/images/editor-viewport.png"
        alt="360° panorama view"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 56,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.6), transparent)',
        }}
      >
        {/* Left: Title + Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#F5F3EF',
              fontFamily: 'var(--font-display)',
            }}
          >
            Luxury Penthouse
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#A8A29E',
              backgroundColor: 'rgba(10,9,8,0.4)',
              borderRadius: 9999,
              padding: '4px 10px',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            4 Scenes
          </span>
        </div>

        {/* Right: Fullscreen + Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            aria-label="Toggle fullscreen"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: 'rgba(10,9,8,0.4)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Maximize size={18} color="#F5F3EF" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Share tour"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: 'rgba(10,9,8,0.4)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Share2 size={18} color="#F5F3EF" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Scene Navigator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 92,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          background: 'linear-gradient(to top, rgba(10,9,8,0.6), transparent)',
        }}
      >
        {scenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            aria-label={`Navigate to ${scene.label}`}
            onClick={() => setActiveScene(scene.id)}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: 'transparent',
              border:
                activeScene === scene.id
                  ? '2px solid #D4A017'
                  : '1px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          >
            <Image
              src={scene.src}
              alt={scene.label}
              fill
              style={{ objectFit: 'cover' }}
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Powered Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          backgroundColor: 'rgba(10,9,8,0.53)',
          borderRadius: 6,
          padding: '6px 12px',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: '#6B6560',
            fontFamily: 'var(--font-dmsans)',
          }}
        >
          Powered by
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#D4A017',
            fontFamily: 'var(--font-display)',
          }}
        >
          Spazeo
        </span>
      </div>

      {/* Lead Capture Panel */}
      {panelOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: 280,
            zIndex: 20,
            backgroundColor: '#12100E',
            borderLeft: '1px solid rgba(212,160,23,0.12)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            overflowY: 'auto',
            fontFamily: 'var(--font-dmsans)',
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#F5F3EF',
                margin: 0,
                fontFamily: 'var(--font-display)',
              }}
            >
              Get in Touch
            </h2>
            <button
              type="button"
              aria-label="Close panel"
              onClick={() => setPanelOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} color="#6B6560" strokeWidth={1.5} />
            </button>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 13,
              color: '#A8A29E',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Interested in this property? Fill out the form below and the agent will
            get back to you shortly.
          </p>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Full Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label
                htmlFor="lead-fullname"
                style={{
                  fontSize: 12,
                  color: '#A8A29E',
                }}
              >
                Full Name
              </label>
              <input
                id="lead-fullname"
                type="text"
                placeholder="John Doe"
                style={{
                  backgroundColor: '#1B1916',
                  border: '1px solid rgba(212,160,23,0.12)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: '#F5F3EF',
                  outline: 'none',
                  fontFamily: 'var(--font-dmsans)',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label
                htmlFor="lead-email"
                style={{
                  fontSize: 12,
                  color: '#A8A29E',
                }}
              >
                Email
              </label>
              <input
                id="lead-email"
                type="email"
                placeholder="john@example.com"
                style={{
                  backgroundColor: '#1B1916',
                  border: '1px solid rgba(212,160,23,0.12)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: '#F5F3EF',
                  outline: 'none',
                  fontFamily: 'var(--font-dmsans)',
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label
                htmlFor="lead-phone"
                style={{
                  fontSize: 12,
                  color: '#A8A29E',
                }}
              >
                Phone
              </label>
              <input
                id="lead-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                style={{
                  backgroundColor: '#1B1916',
                  border: '1px solid rgba(212,160,23,0.12)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: '#F5F3EF',
                  outline: 'none',
                  fontFamily: 'var(--font-dmsans)',
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            style={{
              width: '100%',
              backgroundColor: '#D4A017',
              color: '#0A0908',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              padding: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
