'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Pencil, Share2, Trash2, Eye } from 'lucide-react'

/* ── Placeholder Data ── */
const TOUR = {
  title: 'Luxury Penthouse',
  status: 'Published',
}

const STATS = [
  { label: 'Views', value: '1,247' },
  { label: 'Avg. Time', value: '3m 24s' },
  { label: 'Leads', value: '38' },
  { label: 'Shares', value: '156' },
]

const SCENES = [
  { name: 'Living Room', hotspots: 3, active: true, image: '/images/scene-living.png' },
  { name: 'Kitchen', hotspots: 2, active: false, image: '/images/scene-kitchen.png' },
  { name: 'Master Bedroom', hotspots: 1, active: false, image: '/images/scene-bedroom.png' },
  { name: 'Bathroom', hotspots: 1, active: false, image: '/images/scene-bathroom.png' },
]

const LEADS = [
  {
    name: 'Sarah Kim',
    initials: 'SK',
    email: 'sarah.kim@email.com',
    tour: 'Luxury Penthouse',
    date: 'Feb 24',
    status: 'New',
    statusColor: '#2DD4BF',
    statusBg: 'rgba(45,212,191,0.1)',
  },
  {
    name: 'Michael Ross',
    initials: 'MR',
    email: 'm.ross@agency.co',
    tour: 'Office Space',
    date: 'Feb 23',
    status: 'Contacted',
    statusColor: '#D4A017',
    statusBg: 'rgba(212,160,23,0.1)',
  },
  {
    name: 'Jane Cooper',
    initials: 'JC',
    email: 'j.cooper@realty.com',
    tour: 'Beach Villa',
    date: 'Feb 22',
    status: 'Qualified',
    statusColor: '#34D399',
    statusBg: 'rgba(52,211,153,0.1)',
  },
]

export default function TourDetailPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/tours" className="flex items-center justify-center">
            <ArrowLeft size={20} style={{ color: '#A8A29E' }} />
          </Link>
          <h1
            className="text-[24px] font-bold"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
          >
            {TOUR.title}
          </h1>
          <span
            className="text-[12px] font-medium px-3 py-1 rounded-full"
            style={{
              color: '#2DD4BF',
              backgroundColor: 'rgba(45,212,191,0.1)',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            {TOUR.status}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tours/1/edit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
            style={{
              color: '#F5F3EF',
              border: '1px solid rgba(212,160,23,0.2)',
              fontFamily: 'var(--font-dmsans)',
            }}
          >
            <Pencil size={14} />
            Edit
          </Link>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
            style={{
              color: '#F5F3EF',
              border: '1px solid rgba(212,160,23,0.2)',
              fontFamily: 'var(--font-dmsans)',
              backgroundColor: 'transparent',
            }}
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
            style={{
              color: '#F87171',
              border: '1px solid rgba(248,113,113,0.1)',
              fontFamily: 'var(--font-dmsans)',
              backgroundColor: 'transparent',
            }}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1"
            style={{
              backgroundColor: '#12100E',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: '10px',
              padding: '16px',
            }}
          >
            <span
              className="text-[12px]"
              style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
            >
              {stat.label}
            </span>
            <span
              className="text-[24px] font-bold"
              style={{ color: '#F5F3EF', fontFamily: 'var(--font-display)' }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Two Columns: Preview + Scenes ── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left — Panorama Preview */}
        <div className="flex-1 flex flex-col gap-3">
          <h2
            className="text-[16px] font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
          >
            Panorama Preview
          </h2>
          <div
            className="relative overflow-hidden"
            style={{ height: '300px', borderRadius: '12px' }}
          >
            <Image
              src="/images/editor-viewport.png"
              alt="Panorama preview of Luxury Penthouse"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — Scenes */}
        <div className="flex flex-col gap-3 w-full lg:w-[300px] lg:min-w-[300px]">
          <h2
            className="text-[16px] font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
          >
            Scenes
          </h2>
          <div className="flex flex-col gap-2">
            {SCENES.map((scene) => (
              <div
                key={scene.name}
                className="flex items-center gap-3 rounded-lg cursor-pointer transition-colors"
                style={{
                  backgroundColor: '#12100E',
                  border: scene.active
                    ? '1px solid #D4A017'
                    : '1px solid rgba(212,160,23,0.12)',
                  padding: '10px',
                }}
              >
                <div
                  className="relative overflow-hidden flex-shrink-0"
                  style={{ width: '48px', height: '48px', borderRadius: '8px' }}
                >
                  <Image
                    src={scene.image}
                    alt={scene.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: '#F5F3EF', fontFamily: 'var(--font-dmsans)' }}
                  >
                    {scene.name}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                  >
                    {scene.hotspots} hotspots
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Leads Section ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2
            className="text-[16px] font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F3EF' }}
          >
            Recent Leads
          </h2>
          <span
            className="text-[13px]"
            style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
          >
            38 total
          </span>
        </div>

        <div
          className="overflow-x-auto rounded-xl"
          style={{
            backgroundColor: '#12100E',
            border: '1px solid rgba(212,160,23,0.12)',
          }}
        >
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1B1916' }}>
                <th
                  className="text-left text-[12px] font-medium uppercase px-4 py-3"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  Name
                </th>
                <th
                  className="text-left text-[12px] font-medium uppercase px-4 py-3"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  Email
                </th>
                <th
                  className="text-left text-[12px] font-medium uppercase px-4 py-3"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  Tour
                </th>
                <th
                  className="text-left text-[12px] font-medium uppercase px-4 py-3"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  Date
                </th>
                <th
                  className="text-left text-[12px] font-medium uppercase px-4 py-3"
                  style={{ color: '#6B6560', fontFamily: 'var(--font-dmsans)' }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map((lead) => (
                <tr
                  key={lead.email}
                  style={{ borderTop: '1px solid rgba(212,160,23,0.08)' }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center flex-shrink-0 rounded-full text-[11px] font-semibold"
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: 'rgba(212,160,23,0.12)',
                          color: '#D4A017',
                          fontFamily: 'var(--font-dmsans)',
                        }}
                      >
                        {lead.initials}
                      </div>
                      <span
                        className="text-[13px] font-medium"
                        style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                      >
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[13px]"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {lead.email}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[13px]"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {lead.tour}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[13px]"
                      style={{ color: '#A8A29E', fontFamily: 'var(--font-dmsans)' }}
                    >
                      {lead.date}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        color: lead.statusColor,
                        backgroundColor: lead.statusBg,
                        fontFamily: 'var(--font-dmsans)',
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
