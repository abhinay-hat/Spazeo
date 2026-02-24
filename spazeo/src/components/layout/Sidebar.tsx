'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import {
  LayoutDashboard,
  Image,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Tours', href: '/tours', icon: Image },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Leads', href: '/leads', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Billing', href: '/billing', icon: CreditCard },
]

function NavLinkItem({
  item,
  isActive,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  onClick?: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
        isActive
          ? 'text-[#D4A017]'
          : 'text-[#6B6560] hover:text-[#F5F3EF] hover:bg-[rgba(212,160,23,0.06)]'
      )}
      style={
        isActive
          ? {
              backgroundColor: 'rgba(212, 160, 23, 0.08)',
              border: '1px solid rgba(212, 160, 23, 0.2)',
            }
          : undefined
      }
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={20} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
      {item.label}
    </Link>
  )
}

function SidebarContent({
  pathname,
  onNavClick,
}: {
  pathname: string
  onNavClick?: () => void
}) {
  const { user } = useUser()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="h-16 flex items-center px-5 shrink-0"
        style={{ borderBottom: '1px solid rgba(212, 160, 23, 0.1)' }}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-1"
          aria-label="Spazeo dashboard home"
          onClick={onNavClick}
        >
          <span
            className="text-lg font-black"
            style={{ fontFamily: 'var(--font-jakarta)', color: '#F5F3EF' }}
          >
            SPAZEO
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mb-0.5"
            style={{ backgroundColor: '#D4A017' }}
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Nav items */}
      <nav
        className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1"
        aria-label="Dashboard navigation"
      >
        {NAV_ITEMS.map((item) => (
          <NavLinkItem
            key={item.href}
            item={item}
            isActive={isActive(item.href)}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* User section */}
      <div
        className="p-4 shrink-0"
        style={{ borderTop: '1px solid rgba(212, 160, 23, 0.1)' }}
      >
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: '#F5F3EF' }}>
              {user?.fullName ?? 'User'}
            </p>
            <p className="text-xs truncate" style={{ color: '#5A5248' }}>
              {user?.primaryEmailAddress?.emailAddress ?? ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 w-[240px] h-full flex-col z-30"
        style={{
          backgroundColor: '#12100E',
          borderRight: '1px solid rgba(212, 160, 23, 0.1)',
        }}
        aria-label="Dashboard sidebar"
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-3.5 left-4 z-40 flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-xl transition-colors duration-200"
        style={{
          backgroundColor: 'rgba(18, 16, 14, 0.88)',
          border: '1px solid rgba(212, 160, 23, 0.12)',
          color: '#A8A29E',
        }}
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
              style={{ backgroundColor: 'rgba(10, 9, 8, 0.60)' }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="sidebar-drawer"
              id="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed left-0 top-0 z-50 w-[240px] h-full flex flex-col md:hidden"
              style={{
                backgroundColor: '#12100E',
                borderRight: '1px solid rgba(212, 160, 23, 0.1)',
              }}
            >
              <button
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-200"
                style={{ color: '#6B6560' }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              <SidebarContent
                pathname={pathname}
                onNavClick={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
