import Link from 'next/link'

const FOOTER_COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'API', href: '/api' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Support', href: '/support' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      style={{
        backgroundColor: '#0A0908',
        borderTop: '1px solid rgba(212, 160, 23, 0.1)',
      }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand column — spans 2 cols */}
          <div className="md:col-span-2">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Spazeo home"
              className="inline-flex items-center hover:opacity-80 transition-opacity duration-200"
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

            {/* Tagline */}
            <p style={{ color: '#6B6560' }} className="text-sm mt-2">
              Step Inside Any Space
            </p>

            {/* Description */}
            <p
              style={{ color: '#5A5248', maxWidth: '260px' }}
              className="text-sm leading-relaxed mt-4"
            >
              The AI-powered platform that turns a single panorama into a fully immersive 360° virtual tour.
            </p>

            {/* Status badge */}
            <div
              style={{ color: '#2DD4BF' }}
              className="mt-6 inline-flex items-center gap-2 text-xs"
            >
              <span
                style={{ backgroundColor: '#2DD4BF' }}
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              />
              All systems operational
            </div>
          </div>

          {/* Link columns — each spans 1 col */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="md:col-span-1">
              <h3
                style={{ color: '#A8A29E', letterSpacing: '0.12em' }}
                className="text-xs uppercase font-semibold mb-5"
              >
                {column.heading}
              </h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ color: '#5A5248' }}
                      className="text-sm block py-1.5 transition-colors duration-200 hover:text-[#D4A017]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Accent divider */}
      <div className="accent-line mx-6" />

      {/* Bottom bar */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p style={{ color: '#5A5248' }} className="text-sm">
            &copy; 2025 Spazeo Inc. All rights reserved.
          </p>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <span style={{ color: '#5A5248' }} className="text-sm">
              Built for real estate professionals
            </span>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/spazeo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spazeo on X (Twitter)"
                style={{ color: '#5A5248' }}
                className="transition-colors duration-200 hover:text-[#D4A017]"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com/company/spazeo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spazeo on LinkedIn"
                style={{ color: '#5A5248' }}
                className="transition-colors duration-200 hover:text-[#D4A017]"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/spazeo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spazeo on GitHub"
                style={{ color: '#5A5248' }}
                className="transition-colors duration-200 hover:text-[#D4A017]"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
