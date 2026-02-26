'use client'

import { Eye, Users, UserPlus, Clock, Calendar, Download, Search, TrendingUp, TrendingDown, Monitor, Smartphone, Tablet } from 'lucide-react'

const stats = [
  {
    label: 'Total Views',
    value: '24,847',
    change: '+24%',
    positive: true,
    icon: Eye,
  },
  {
    label: 'Unique Visitors',
    value: '12,394',
    change: '+18%',
    positive: true,
    icon: Users,
  },
  {
    label: 'Leads Captured',
    value: '186',
    change: '+42%',
    positive: true,
    icon: UserPlus,
  },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    change: '-5%',
    positive: false,
    icon: Clock,
  },
]

const timePeriods = ['7D', '30D', '90D']

const deviceBreakdown = [
  { label: 'Desktop', percentage: 58, color: '#D4A017', icon: Monitor },
  { label: 'Mobile', percentage: 35, color: '#2DD4BF', icon: Smartphone },
  { label: 'Tablet', percentage: 7, color: '#FB7A54', icon: Tablet },
]

const tourPerformance = [
  {
    name: 'Coastal Villa',
    views: '8,432',
    leads: 42,
    avgTime: '4m 12s',
    change: '+12%',
    positive: true,
  },
  {
    name: 'Downtown Penthouse',
    views: '6,218',
    leads: 31,
    avgTime: '3m 45s',
    change: '+8%',
    positive: true,
  },
  {
    name: 'Mountain Retreat',
    views: '5,847',
    leads: 28,
    avgTime: '5m 02s',
    change: '+15%',
    positive: true,
  },
  {
    name: 'Beach Villa',
    views: '4,350',
    leads: 22,
    avgTime: '3m 18s',
    change: '-3%',
    positive: false,
  },
]

export default function AnalyticsPage() {
  return (
    <div style={{ fontFamily: 'var(--font-dmsans)' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
        }}
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
            Analytics
          </h1>
          <p
            style={{
              fontSize: 14,
              color: '#A8A29E',
              margin: '6px 0 0 0',
            }}
          >
            Track your tour performance and viewer engagement
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: 8,
              color: '#A8A29E',
              fontSize: 13,
              fontFamily: 'var(--font-dmsans)',
              cursor: 'pointer',
            }}
          >
            <Calendar size={15} style={{ color: '#6B6560' }} />
            Last 30 days
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              backgroundColor: '#1B1916',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: 8,
              color: '#A8A29E',
              fontSize: 13,
              fontFamily: 'var(--font-dmsans)',
              cursor: 'pointer',
            }}
          >
            <Download size={15} style={{ color: '#6B6560' }} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{
          gap: 16,
          marginBottom: 24,
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: '#1B1916',
                border: '1px solid rgba(212,160,23,0.12)',
                borderRadius: 12,
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#A8A29E' }}>
                    {stat.label}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: 9999,
                      color: stat.positive ? '#34D399' : '#F87171',
                      backgroundColor: stat.positive
                        ? 'rgba(52,211,153,0.13)'
                        : 'rgba(248,113,113,0.13)',
                    }}
                  >
                    {stat.positive ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}
                    {stat.change}
                  </span>
                </div>
                <Icon size={18} style={{ color: '#6B6560' }} />
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#F5F3EF',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div
        className="flex flex-col lg:flex-row"
        style={{
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Views Over Time */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            borderRadius: 12,
            padding: 24,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#F5F3EF',
                margin: 0,
                fontFamily: 'var(--font-display)',
              }}
            >
              Views Over Time
            </h3>
            <div
              style={{
                display: 'flex',
                gap: 2,
                backgroundColor: '#2E2A24',
                borderRadius: 8,
                padding: 2,
              }}
            >
              {timePeriods.map((period) => (
                <button
                  key={period}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-dmsans)',
                    backgroundColor: period === '7D' ? '#1B1916' : 'transparent',
                    color: period === '7D' ? '#F5F3EF' : '#6B6560',
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: '#12100E',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#6B6560', fontSize: 13 }}>
              Chart placeholder — Views over time
            </span>
          </div>
        </div>

        {/* Device Breakdown */}
        <div
          className="w-full lg:w-[320px] lg:flex-shrink-0"
          style={{
            backgroundColor: '#1B1916',
            border: '1px solid rgba(212,160,23,0.12)',
            borderRadius: 12,
            padding: 24,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#F5F3EF',
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-display)',
            }}
          >
            Device Breakdown
          </h3>
          {/* Donut Chart Placeholder */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `conic-gradient(
                  #D4A017 0deg 208.8deg,
                  #2DD4BF 208.8deg 334.8deg,
                  #FB7A54 334.8deg 360deg
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  backgroundColor: '#1B1916',
                }}
              />
            </div>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            {deviceBreakdown.map((device) => (
              <div
                key={device.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: device.color,
                    }}
                  />
                  <span style={{ fontSize: 13, color: '#A8A29E' }}>
                    {device.label}
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F3EF' }}>
                  {device.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tour Performance Table */}
      <div
        style={{
          backgroundColor: '#1B1916',
          border: '1px solid rgba(212,160,23,0.12)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* Table Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(212,160,23,0.08)',
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#F5F3EF',
              margin: 0,
              fontFamily: 'var(--font-display)',
            }}
          >
            Tour Performance
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#12100E',
              border: '1px solid rgba(212,160,23,0.12)',
              borderRadius: 8,
              padding: '6px 12px',
            }}
          >
            <Search size={14} style={{ color: '#6B6560' }} />
            <input
              type="text"
              placeholder="Search tours..."
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#F5F3EF',
                fontSize: 13,
                fontFamily: 'var(--font-dmsans)',
                width: 140,
              }}
            />
          </div>
        </div>

        {/* Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              {['Tour Name', 'Views', 'Leads', 'Avg. Time', 'Trend'].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: 'left',
                      padding: '12px 24px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#6B6560',
                      borderBottom: '1px solid rgba(212,160,23,0.08)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {tourPerformance.map((tour, idx) => (
              <tr
                key={tour.name}
                style={{
                  borderBottom:
                    idx < tourPerformance.length - 1
                      ? '1px solid rgba(212,160,23,0.06)'
                      : 'none',
                }}
              >
                <td style={{ padding: '14px 24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        backgroundColor: '#2E2A24',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#F5F3EF',
                      }}
                    >
                      {tour.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: '14px 24px',
                    fontSize: 13,
                    color: '#A8A29E',
                  }}
                >
                  {tour.views}
                </td>
                <td
                  style={{
                    padding: '14px 24px',
                    fontSize: 13,
                    color: '#A8A29E',
                  }}
                >
                  {tour.leads}
                </td>
                <td
                  style={{
                    padding: '14px 24px',
                    fontSize: 13,
                    color: '#A8A29E',
                  }}
                >
                  {tour.avgTime}
                </td>
                <td style={{ padding: '14px 24px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      color: tour.positive ? '#34D399' : '#F87171',
                      backgroundColor: tour.positive
                        ? 'rgba(52,211,153,0.13)'
                        : 'rgba(248,113,113,0.13)',
                    }}
                  >
                    {tour.positive ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}
                    {tour.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
