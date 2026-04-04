// @version 1.0.0 // @category navigation // @name nav-minimal-logo // @source custom

'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavMinimalLogoProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Client Component — menu state)
// ---------------------------------------------------------------------------

export default function NavMinimalLogo({
  logo = 'Brand',
  links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaLabel = 'Get in Touch',
  ctaHref = '/contact',
  className,
}: NavMinimalLogoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10',
          className,
        )}
        style={{
          backgroundColor: 'var(--background)',
          borderBottom: '1px solid var(--border)',
        }}
      >
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

        {/* Hamburger — always visible */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className={cn(
            'relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg',
            'transition-colors duration-200',
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
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Slide-out panel + overlay */}
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[55] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        style={{
          backgroundColor: 'color-mix(in oklch, var(--foreground) 40%, transparent)',
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        aria-label="Main navigation"
        className={cn(
          'fixed right-0 top-0 z-[58] flex h-full w-full max-w-sm flex-col',
          'px-8 pb-10 pt-24',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{
          backgroundColor: 'var(--background)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className={cn(
                  'block rounded-lg px-4 py-3 text-lg font-medium',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  color: 'var(--foreground)',
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
          onClick={close}
          className={cn(
            'mt-8 inline-flex items-center justify-center',
            'rounded-lg px-6 py-3 text-base font-semibold',
            'transition-all duration-200',
            'hover:brightness-110',
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
      </nav>

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  nav, div {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </>
  );
}
