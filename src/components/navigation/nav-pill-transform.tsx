"use client"

// @version 2.0.0
// @category navigation
// @name Nav Pill Transform
// @source custom-implementation

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SCROLL_THRESHOLD = 50;
const TRANSITION_DURATION = 'duration-500';
const PILL_MAX_WIDTH = 'max-w-3xl';
const FULL_MAX_WIDTH = 'max-w-7xl';
const LOGO_FONT_CLAMP_SCROLLED = 'clamp(1rem, 1.25vw + 0.5rem, 1.125rem)';
const LOGO_FONT_CLAMP_DEFAULT = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavPillTransformProps {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavPillTransform({
  logo = 'Brand',
  links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
  ],
  ctaLabel = 'Get Started',
  ctaHref = '#cta',
  className,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: NavPillTransformProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

  const ringStyle = {
    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
    ['--tw-ring-offset-color' as string]: 'var(--background)',
  };

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all ${TRANSITION_DURATION}`,
        'motion-reduce:transition-none',
        isScrolled ? 'top-3 px-4 sm:px-8 md:px-16 lg:px-32' : 'px-0',
        className,
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          `mx-auto flex items-center justify-between transition-all ${TRANSITION_DURATION}`,
          'motion-reduce:transition-none',
          isScrolled
            ? `${PILL_MAX_WIDTH} rounded-full px-4 py-2 shadow-lg backdrop-blur-md border`
            : `${FULL_MAX_WIDTH} px-4 sm:px-6 lg:px-8 py-4`,
        )}
        style={{
          backgroundColor: isScrolled
            ? 'color-mix(in srgb, var(--background) 85%, transparent)'
            : 'var(--background)',
          borderColor: isScrolled ? 'var(--border)' : 'transparent',
        }}
      >
        <a
          href="/"
          className={cn(
            focusRing,
            `rounded-lg font-bold transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
          )}
          style={{
            color: 'var(--foreground)',
            fontSize: isScrolled ? LOGO_FONT_CLAMP_SCROLLED : LOGO_FONT_CLAMP_DEFAULT,
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
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-colors motion-reduce:transition-none',
                )}
                style={{
                  color: 'var(--muted-foreground)',
                  ...ringStyle,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
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
            `hidden md:inline-flex items-center rounded-full font-medium transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
            isScrolled ? 'px-4 py-1.5 text-sm' : 'px-5 py-2 text-sm',
          )}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
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
            color: 'var(--muted-foreground)',
            ...ringStyle,
          }}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
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
          ref={mobileMenuRef}
          className={cn(
            'md:hidden mt-2 mx-4 rounded-2xl p-4 shadow-lg backdrop-blur-md',
            'border',
          )}
          role="menu"
          aria-label="Mobile navigation"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--background) 95%, transparent)',
            borderColor: 'var(--border)',
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
                    'block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none',
                  )}
                  style={{
                    color: 'var(--muted-foreground)',
                    ...ringStyle,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)';
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
                  'block rounded-xl px-4 py-2.5 text-sm font-medium text-center mt-2 transition-colors motion-reduce:transition-none',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
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
