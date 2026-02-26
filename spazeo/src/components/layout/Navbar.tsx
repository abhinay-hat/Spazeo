'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { isProvidersConfigured } from '@/components/providers/ConvexClientProvider'

const NAV_LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <header
        className="fixed top-0 w-full z-50 h-16 transition-all duration-300 border-b border-[rgba(212,160,23,0.12)]"
        style={
          scrolled
            ? {
                backgroundColor: 'rgba(10, 9, 8, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }
            : {
                backgroundColor: '#0A0908',
              }
        }
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-[60px] h-full flex items-center justify-between">
          {/* Left — Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Logo href="/" />

            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = link.href.startsWith('/')
                  && !link.href.includes('#')
                  && pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#D4A017]'
                        : 'text-[#A8A29E] hover:text-[#F5F3EF]'
                    }`}
                    style={{ fontFamily: 'var(--font-dmsans)' }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right — Auth Actions + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {isProvidersConfigured ? (
              <>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="hidden md:inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-[#A8A29E] transition-colors duration-200 hover:text-[#F5F3EF]"
                    style={{ fontFamily: 'var(--font-dmsans)' }}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="hidden md:inline-flex items-center rounded-lg px-6 py-3 bg-[#D4A017] text-sm font-semibold text-[#0A0908] transition-all duration-300 hover:bg-[#E5B120] hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]"
                    style={{ fontFamily: 'var(--font-dmsans)' }}
                  >
                    Get Started
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="hidden md:inline-flex items-center text-sm font-medium text-[#A8A29E] transition-colors duration-200 hover:text-[#F5F3EF]"
                    style={{ fontFamily: 'var(--font-dmsans)' }}
                  >
                    Dashboard
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8',
                      },
                    }}
                  />
                </SignedIn>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-[#A8A29E] transition-colors duration-200 hover:text-[#F5F3EF]"
                  style={{ fontFamily: 'var(--font-dmsans)' }}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden md:inline-flex items-center rounded-lg px-6 py-3 bg-[#D4A017] text-sm font-semibold text-[#0A0908] transition-all duration-300 hover:bg-[#E5B120] hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]"
                  style={{ fontFamily: 'var(--font-dmsans)' }}
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center text-[#A8A29E] transition-colors duration-200"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                backgroundColor: 'rgba(10, 9, 8, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 max-w-full flex flex-col z-50 md:hidden bg-[#12100E] border-l border-[rgba(212,160,23,0.12)]"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-[rgba(212,160,23,0.1)]">
                <Logo href="/" />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-[#6B6560] transition-colors duration-200 hover:text-[#F5F3EF]"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-1 p-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = link.href.startsWith('/')
                    && !link.href.includes('#')
                    && pathname.startsWith(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-base font-medium py-3 border-b border-[rgba(212,160,23,0.06)] transition-colors duration-200 ${
                        isActive
                          ? 'text-[#D4A017]'
                          : 'text-[#A8A29E] hover:text-[#F5F3EF]'
                      }`}
                      style={{ fontFamily: 'var(--font-dmsans)' }}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-6 flex flex-col gap-3">
                {isProvidersConfigured ? (
                  <>
                    <SignedOut>
                      <Link
                        href="/sign-in"
                        onClick={() => setMobileOpen(false)}
                        className="w-full py-3 text-center rounded-xl text-sm font-medium text-[#A8A29E] border border-[rgba(212,160,23,0.2)] transition-colors duration-200"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/sign-up"
                        onClick={() => setMobileOpen(false)}
                        className="w-full py-3 text-center rounded-xl text-sm font-bold bg-[#D4A017] text-[#0A0908] transition-all duration-200 hover:bg-[#E5B120]"
                      >
                        Get Started
                      </Link>
                    </SignedOut>
                    <SignedIn>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="w-full py-3 text-center rounded-xl text-sm font-bold bg-[#D4A017] text-[#0A0908] transition-all duration-200 hover:bg-[#E5B120]"
                      >
                        Dashboard
                      </Link>
                    </SignedIn>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-3 text-center rounded-xl text-sm font-medium text-[#A8A29E] border border-[rgba(212,160,23,0.2)] transition-colors duration-200"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-3 text-center rounded-xl text-sm font-bold bg-[#D4A017] text-[#0A0908] transition-all duration-200 hover:bg-[#E5B120]"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
