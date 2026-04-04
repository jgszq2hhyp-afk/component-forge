// @version 1.0.0 // @category navigation // @name nav-with-cta-bar // @source custom

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavWithCtaBarProps {
  barText?: string;
  barCtaLabel?: string;
  barCtaHref?: string;
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Client Component — dismiss state + mobile menu)
// ---------------------------------------------------------------------------

export default function NavWithCtaBar({
  barText = 'New: Our latest feature is now live.',
  barCtaLabel = 'Learn more',
  barCtaHref = '/blog/new-feature',
  logo = 'Brand',
  links = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  ctaLabel = 'Get Started',
  ctaHref = '/signup',
  className,
}: NavWithCtaBarProps) {
  const [barVisible, setBarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Announcement / CTA Bar */}
      {barVisible && (
        <div
          className="relative flex items-center justify-center gap-2 px-10 py-2.5 text-center text-sm"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <span>{barText}</span>
          <a
            href={barCtaHref}
            className={cn(
              'font-semibold underline underline-offset-4',
              'transition-opacity duration-200 hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
            )}
            style={{
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary-foreground)',
              ['--tw-ring-offset-color' as string]: 'var(--primary)',
            }}
          >
            {barCtaLabel}
          </a>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setBarVisible(false)}
            aria-label="Dismiss announcement"
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'flex h-6 w-6 items-center justify-center rounded-full',
              'transition-opacity duration-200 hover:opacity-70',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary-foreground)',
              ['--tw-ring-offset-color' as string]: 'var(--primary)',
            }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main navigation */}
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:justify-between md:py-3">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              'text-xl font-bold tracking-tight',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
            )}
            style={{
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            {logo}
          </a>

          {/* Links */}
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    color: 'var(--muted-foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={ctaHref}
            className={cn(
              'inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold',
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'active:scale-[0.98]',
            )}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            {ctaLabel}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between py-3 md:hidden">
          <a
            href="/"
            className={cn(
              'text-xl font-bold tracking-tight',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
            )}
            style={{
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            {logo}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="px-4 py-4 md:hidden"
          style={{
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2.5 text-sm font-medium',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    color: 'var(--muted-foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'mt-3 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            {ctaLabel}
          </a>
        </div>
      )}

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  header * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </header>
  );
}
