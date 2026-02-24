'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Product', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
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
        style={
          scrolled
            ? {
                backgroundColor: 'rgba(10, 9, 8, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(212, 160, 23, 0.12)',
                boxShadow: '0 1px 0 rgba(212, 160, 23, 0.06)',
              }
            : {
                backgroundColor: 'transparent',
              }
        }
        className="fixed top-0 w-full z-50 h-16 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left — Logo */}
          <Link
            href="/"
            aria-label="Spazeo home"
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <span
              style={{
                fontFamily: 'var(--font-jakarta)',
                color: '#F5F3EF',
              }}
              className="text-xl font-black tracking-[-0.5px] transition-colors duration-300"
            >
              SPAZEO
            </span>
            <span
              style={{ backgroundColor: '#D4A017' }}
              className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 mb-1 shrink-0 transition-colors duration-300"
            />
          </Link>

          {/* Center — Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: '#A8A29E' }}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#F5F3EF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — Auth Actions + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                style={{ color: '#A8A29E' }}
                className="hidden md:inline-flex text-sm font-medium transition-colors duration-200 hover:text-[#F5F3EF]"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                style={{
                  backgroundColor: '#D4A017',
                  color: '#0A0908',
                }}
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_4px_16px_rgba(212,160,23,0.25)]"
              >
                Get started
                <ArrowRight size={14} />
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden md:inline-flex items-center text-sm font-medium transition-colors duration-200 hover:text-[#F5F3EF]"
                style={{ color: '#A8A29E' }}
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

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center transition-colors duration-200"
              style={{ color: '#A8A29E' }}
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
              className="fixed right-0 top-0 h-full w-80 max-w-full flex flex-col z-50 md:hidden"
              style={{
                backgroundColor: '#12100E',
                borderLeft: '1px solid rgba(212, 160, 23, 0.12)',
              }}
            >
              <div
                className="h-16 flex items-center justify-between px-6"
                style={{ borderBottom: '1px solid rgba(212, 160, 23, 0.1)' }}
              >
                <Link
                  href="/"
                  aria-label="Spazeo home"
                  className="flex items-center hover:opacity-80 transition-opacity duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    style={{ fontFamily: 'var(--font-jakarta)', color: '#F5F3EF' }}
                    className="text-xl font-black tracking-[-0.5px]"
                  >
                    SPAZEO
                  </span>
                  <span
                    style={{ backgroundColor: '#D4A017' }}
                    className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 mb-1 shrink-0"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{ color: '#6B6560' }}
                  className="transition-colors duration-200 hover:text-[#F5F3EF]"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-1 p-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: '#A8A29E',
                      borderBottom: '1px solid rgba(212, 160, 23, 0.06)',
                    }}
                    className="text-base font-medium py-3 transition-colors duration-200 hover:text-[#F5F3EF]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-6 flex flex-col gap-3">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 text-center rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{
                      border: '1px solid rgba(212, 160, 23, 0.2)',
                      color: '#A8A29E',
                    }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 text-center rounded-xl text-sm font-bold transition-all duration-200 hover:bg-[#E5B120]"
                    style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
                  >
                    Get started
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 text-center rounded-xl text-sm font-bold transition-all duration-200 hover:bg-[#E5B120]"
                    style={{ backgroundColor: '#D4A017', color: '#0A0908' }}
                  >
                    Dashboard
                  </Link>
                </SignedIn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
