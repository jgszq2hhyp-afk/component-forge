"use client"

// @version 2.0.0
// @category navigation
// @name Nav Transparent Dark
// @source custom-implementation

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SCROLL_THRESHOLD = 100;
const TRANSITION_DURATION = 'duration-500';
const LOGO_FONT_SIZE = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavTransparentDarkProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  scrollThreshold?: number;
}

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const ringStyle = {
  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
  ['--tw-ring-offset-color' as string]: 'var(--background)',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavTransparentDark({
  logo = 'Brand',
  links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaLabel = 'Get Started',
  ctaHref = '#cta',
  className,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: NavTransparentDarkProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isMobileOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
        className,
      )}
      style={{
        backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
        boxShadow: isScrolled ? '0 1px 3px 0 color-mix(in srgb, var(--foreground) 10%, transparent)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4"
      >
        <a
          href="/"
          className={cn(
            focusRing,
            `rounded-lg font-bold transition-colors ${TRANSITION_DURATION} motion-reduce:transition-none`,
          )}
          style={{
            color: isScrolled
              ? 'var(--foreground)'
              : 'var(--nav-dark-logo, var(--background))',
            fontSize: LOGO_FONT_SIZE,
            ...ringStyle,
          }}
        >
          {logo}
        </a>

        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  focusRing,
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${TRANSITION_DURATION} motion-reduce:transition-none`,
                )}
                style={{
                  color: isScrolled
                    ? 'var(--muted-foreground)'
                    : 'var(--nav-dark-link, color-mix(in srgb, var(--background) 80%, transparent))',
                  ...ringStyle,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isScrolled
                    ? 'var(--foreground)'
                    : 'var(--nav-dark-link-hover, var(--background))';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isScrolled
                    ? 'var(--muted-foreground)'
                    : 'var(--nav-dark-link, color-mix(in srgb, var(--background) 80%, transparent))';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={ctaHref}
          className={cn(
            focusRing,
            `hidden md:inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
          )}
          style={{
            backgroundColor: isScrolled ? 'var(--primary)' : 'var(--background)',
            color: isScrolled ? 'var(--primary-foreground)' : 'var(--foreground)',
            ...ringStyle,
          }}
        >
          {ctaLabel}
        </a>

        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            focusRing,
            'md:hidden rounded-lg p-2 transition-colors motion-reduce:transition-none',
          )}
          style={{
            color: isScrolled
              ? 'var(--muted-foreground)'
              : 'var(--nav-dark-link, color-mix(in srgb, var(--background) 80%, transparent))',
            ...ringStyle,
          }}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMobileOpen && (
        <div
          className="md:hidden px-4 pb-4"
          role="menu"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: isScrolled
              ? 'var(--background)'
              : 'var(--nav-dark-mobile-bg, color-mix(in srgb, var(--foreground) 90%, transparent))',
            backdropFilter: isScrolled ? 'none' : 'blur(12px)',
            WebkitBackdropFilter: isScrolled ? 'none' : 'blur(12px)',
          }}
        >
          <ul className="flex flex-col gap-1" role="list">
            {links.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    focusRing,
                    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none',
                  )}
                  style={{
                    color: isScrolled
                      ? 'var(--muted-foreground)'
                      : 'var(--nav-dark-link, color-mix(in srgb, var(--background) 80%, transparent))',
                    ...ringStyle,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      `color-mix(in srgb, var(--${isScrolled ? 'muted' : 'background'}) 10%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li role="none">
              <a
                href={ctaHref}
                role="menuitem"
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  focusRing,
                  'block rounded-lg px-4 py-2.5 text-sm font-medium text-center mt-2 transition-colors motion-reduce:transition-none',
                )}
                style={{
                  backgroundColor: isScrolled ? 'var(--primary)' : 'var(--background)',
                  color: isScrolled ? 'var(--primary-foreground)' : 'var(--foreground)',
                  ...ringStyle,
                }}
              >
                {ctaLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
