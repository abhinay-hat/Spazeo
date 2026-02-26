'use client'

import { useState } from 'react'
import { Download, Search } from 'lucide-react'

const LEADS_DATA = [
  {
    id: '1',
    name: 'Sarah Kim',
    email: 'sarah.kim@email.com',
    tour: 'Luxury Penthouse',
    date: 'Feb 24, 2026',
    status: 'New' as const,
    initialsColor: '#D4A017',
    initialsBg: 'rgba(212,160,23,0.13)',
  },
  {
    id: '2',
    name: 'Michael Ross',
    email: 'm.ross@agency.co',
    tour: 'Office Space',
    date: 'Feb 23, 2026',
    status: 'Contacted' as const,
    initialsColor: '#D4A017',
    initialsBg: 'rgba(212,160,23,0.13)',
  },
  {
    id: '3',
    name: 'Jane Cooper',
    email: 'j.cooper@realty.com',
    tour: 'Beach Villa',
    date: 'Feb 22, 2026',
    status: 'Qualified' as const,
    initialsColor: '#2DD4BF',
    initialsBg: 'rgba(45,212,191,0.13)',
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'd.chen@prop.io',
    tour: 'Mountain Lodge',
    date: 'Feb 21, 2026',
    status: 'New' as const,
    initialsColor: '#2DD4BF',
    initialsBg: 'rgba(45,212,191,0.13)',
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa.p@homes.com',
    tour: 'Garden Suite',
    date: 'Feb 20, 2026',
    status: 'Contacted' as const,
    initialsColor: '#D4A017',
    initialsBg: 'rgba(212,160,23,0.13)',
  },
]

const TABS = ['All Leads', 'New', 'Contacted', 'Qualified'] as const

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  New: { color: '#2DD4BF', bg: 'rgba(45,212,191,0.13)' },
  Contacted: { color: '#D4A017', bg: 'rgba(212,160,23,0.13)' },
  Qualified: { color: '#34D399', bg: 'rgba(52,211,153,0.13)' },
}

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('All Leads')

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#F5F3EF',
              fontFamily: 'var(--font-display)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Leads
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#A8A29E',
              fontFamily: 'var(--font-dmsans)',
              margin: '6px 0 0 0',
            }}
          >
            Manage and follow up on captured leads from your tours
          </p>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            borderRadius: 8,
            color: '#F5F3EF',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'var(--font-dmsans)',
            cursor: 'pointer',
          }}
        >
          <Download size={16} style={{ color: '#A8A29E' }} />
          Export CSV
        </button>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Leads', value: '186' },
          { label: 'This Month', value: '34' },
          { label: 'Conversion Rate', value: '7.4%' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: 12,
              padding: '20px 24px',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: '#A8A29E',
                fontFamily: 'var(--font-dmsans)',
                margin: 0,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#F5F3EF',
                fontFamily: 'var(--font-display)',
                margin: '8px 0 0 0',
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
          gap: 16,
        }}
      >
        {/* Tab Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            backgroundColor: '#1B1916',
            borderRadius: 8,
            padding: 3,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: 'none',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'var(--font-dmsans)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: activeTab === tab ? '#12100E' : 'transparent',
                color: activeTab === tab ? '#F5F3EF' : '#6B6560',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B6560',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search leads..."
            style={{
              padding: '9px 14px 9px 36px',
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: 8,
              color: '#F5F3EF',
              fontSize: 13,
              fontFamily: 'var(--font-dmsans)',
              outline: 'none',
              width: 220,
            }}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div
        style={{
          backgroundColor: '#1B1916',
          border: '1px solid rgba(212,160,23,0.12)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
            padding: '12px 24px',
            backgroundColor: '#12100E',
          }}
        >
          {['Name', 'Email', 'Tour', 'Date', 'Status'].map((col) => (
            <span
              key={col}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6B6560',
                fontFamily: 'var(--font-dmsans)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        {LEADS_DATA.map((lead, index) => {
          const initials = lead.name
            .split(' ')
            .map((n) => n[0])
            .join('')
          const statusStyle = STATUS_STYLES[lead.status]
          const isLast = index === LEADS_DATA.length - 1

          return (
            <div
              key={lead.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
                padding: '14px 24px',
                alignItems: 'center',
                borderBottom: isLast ? 'none' : '1px solid rgba(212,160,23,0.12)',
              }}
            >
              {/* Name + Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: lead.initialsBg,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: lead.initialsColor,
                      fontFamily: 'var(--font-dmsans)',
                    }}
                  >
                    {initials}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#F5F3EF',
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  {lead.name}
                </span>
              </div>

              {/* Email */}
              <span
                style={{
                  fontSize: 13,
                  color: '#A8A29E',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                {lead.email}
              </span>

              {/* Tour */}
              <span
                style={{
                  fontSize: 13,
                  color: '#A8A29E',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                {lead.tour}
              </span>

              {/* Date */}
              <span
                style={{
                  fontSize: 13,
                  color: '#A8A29E',
                  fontFamily: 'var(--font-dmsans)',
                }}
              >
                {lead.date}
              </span>

              {/* Status Badge */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 500,
                    color: statusStyle.color,
                    backgroundColor: statusStyle.bg,
                    fontFamily: 'var(--font-dmsans)',
                  }}
                >
                  {lead.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
