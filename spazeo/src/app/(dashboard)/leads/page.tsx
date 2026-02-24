'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Spinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Users, Mail, Phone, Calendar } from 'lucide-react'

export default function LeadsPage() {
  const leads = useQuery(api.leads.listAll)

  if (leads === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: '#F5F3EF', fontFamily: 'var(--font-jakarta)' }}
        >
          Leads
        </h1>
        <p className="text-sm mt-1" style={{ color: '#6B6560' }}>
          Visitors who expressed interest through your tours
        </p>
      </div>

      {leads.length > 0 ? (
        <div className="space-y-3">
          {leads.map((lead: { _id: string; name: string; email: string; phone?: string; _creationTime: number }) => (
            <div
              key={lead._id}
              className="rounded-xl p-5 flex items-center justify-between"
              style={{
                backgroundColor: '#12100E',
                border: '1px solid rgba(212,160,23,0.12)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'rgba(212,160,23,0.1)',
                    border: '1px solid rgba(212,160,23,0.2)',
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: '#D4A017' }}>
                    {lead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F5F3EF' }}>
                    {lead.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#6B6560' }}>
                      <Mail size={11} />
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: '#6B6560' }}>
                        <Phone size={11} />
                        {lead.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs" style={{ color: '#5A5248' }}>
                <Calendar size={11} />
                {new Date(lead._creationTime).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Users size={48} />}
          title="No leads yet"
          description="When visitors submit interest forms on your tours, they'll appear here."
        />
      )}
    </div>
  )
}
