// @version 2.0.0
// @category error
// @name error-maintenance
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { type ReactNode, useState, type FormEvent } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 4vw, 2.25rem)';
const CONTENT_MAX_WIDTH = 'max-w-lg';
const DESCRIPTION_MAX_WIDTH = 'max-w-md';
const FORM_MAX_WIDTH = 'max-w-sm';
const PROGRESS_MAX_WIDTH = 'max-w-xs';
const ICON_CONTAINER_SIZE = 'size-16';
const ICON_SIZE = 'size-8';
const SOCIAL_ICON_SIZE = 'size-5';
const SOCIAL_BUTTON_SIZE = 'size-10';
const PROGRESS_HEIGHT = 'h-2';
const PROGRESS_DEFAULT_WIDTH = '65%';
const SPIN_DURATION = '8s';
const GROW_DURATION = '1.2s';
const HOME_LINK_OPACITY = 0.7;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorPageProps {
  title?: string;
  message?: string;
  homeHref?: string;
  className?: string;
}

interface MaintenancePageProps extends ErrorPageProps {
  estimatedTime?: string;
  onEmailSubmit?: (email: string) => void;
  socialLinks?: Array<{
    label: string;
    href: string;
    icon: 'x' | 'instagram' | 'linkedin' | 'facebook';
  }>;
}

// ---------------------------------------------------------------------------
// Social icon map
// ---------------------------------------------------------------------------

const socialIcons: Record<string, ReactNode> = {
  x: (
    <svg className={SOCIAL_ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className={SOCIAL_ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg className={SOCIAL_ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  facebook: (
    <svg className={SOCIAL_ICON_SIZE} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Component ('use client' — email signup form needs state)
// ---------------------------------------------------------------------------

export default function ErrorMaintenance({
  title = 'We\'ll be back soon',
  message = 'We\'re performing scheduled maintenance to improve your experience. Thank you for your patience.',
  homeHref = '/',
  estimatedTime,
  onEmailSubmit,
  socialLinks,
  className,
}: MaintenancePageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    onEmailSubmit?.(email);
    setSubmitted(true);
  }

  return (
    <main
      aria-label="Maintenance page"
      className={cn(
        'flex min-h-svh flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Gear / wrench icon */}
      <div
        className={cn(
          'mb-6 flex items-center justify-center rounded-full',
          ICON_CONTAINER_SIZE,
          'maintenance-icon',
        )}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
        }}
        aria-hidden="true"
      >
        <svg
          className={ICON_SIZE}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </div>

      <div className={CONTENT_MAX_WIDTH}>
        <h1
          className="font-bold tracking-tight"
          style={{
            color: 'var(--foreground)',
            fontSize: HEADING_CLAMP,
          }}
        >
          {title}
        </h1>

        <p
          className={cn('mx-auto mt-4 text-base leading-relaxed md:text-lg', DESCRIPTION_MAX_WIDTH)}
          style={{ color: 'var(--muted-foreground)' }}
        >
          {message}
        </p>

        {/* Estimated time / progress indicator */}
        {estimatedTime && (
          <div className="mt-8" role="status" aria-label="Maintenance progress">
            <p
              className="mb-3 text-sm font-medium uppercase tracking-wider"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Estimated completion
            </p>
            <div className={cn('mx-auto', PROGRESS_MAX_WIDTH)}>
              {/* Progress bar track */}
              <div
                className={cn(PROGRESS_HEIGHT, 'w-full overflow-hidden rounded-full')}
                role="progressbar"
                aria-valuenow={65}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Maintenance progress"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--border) 60%, transparent)',
                }}
              >
                <div
                  className={cn('maintenance-progress h-full rounded-full')}
                  style={{
                    width: PROGRESS_DEFAULT_WIDTH,
                    backgroundColor: 'var(--primary)',
                  }}
                />
              </div>
              <p
                className="mt-2 text-sm font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {estimatedTime}
              </p>
            </div>
          </div>
        )}

        {/* Email notification signup */}
        {onEmailSubmit && (
          <div className="mt-10">
            {submitted ? (
              <div
                className={cn('mx-auto rounded-lg px-5 py-4', FORM_MAX_WIDTH)}
                role="status"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)',
                  color: 'var(--primary)',
                }}
              >
                <p className="text-sm font-medium">
                  Thanks! We&apos;ll notify you when we&apos;re back online.
                </p>
              </div>
            ) : (
              <>
                <p
                  className="mb-3 text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Get notified when we&apos;re back:
                </p>
                <form
                  onSubmit={handleSubmit}
                  aria-label="Email notification signup"
                  className={cn(
                    'mx-auto flex overflow-hidden rounded-lg',
                    FORM_MAX_WIDTH,
                    'transition-shadow duration-200 motion-reduce:transition-none',
                    'focus-within:ring-2 focus-within:ring-offset-2',
                  )}
                  style={{
                    border: '1px solid var(--border)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <label htmlFor="maintenance-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="maintenance-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      'flex-1 border-0 bg-transparent px-4 py-3 text-sm',
                      'outline-none placeholder:opacity-50',
                    )}
                    style={{ color: 'var(--foreground)' }}
                  />
                  <button
                    type="submit"
                    className={cn(
                      'inline-flex items-center justify-center px-5',
                      'text-sm font-medium',
                      'transition-colors duration-150 motion-reduce:transition-none',
                      'hover:brightness-110',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      ['--tw-ring-color' as string]: 'var(--primary)',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    Notify me
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* Social links */}
        {socialLinks && socialLinks.length > 0 && (
          <nav aria-label="Social media links" className="mt-10">
            <p
              className="mb-4 text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Follow us for updates:
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center justify-center rounded-full',
                    SOCIAL_BUTTON_SIZE,
                    'transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110 hover:scale-105 motion-reduce:hover:scale-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--foreground) 8%, transparent)',
                    color: 'var(--foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {socialIcons[link.icon]}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Home link */}
        <p
          className="mt-10 text-sm"
          style={{ color: 'var(--muted-foreground)', opacity: HOME_LINK_OPACITY }}
        >
          <a
            href={homeHref}
            className="underline underline-offset-4 transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            Return to homepage
          </a>
        </p>
      </div>

      {/* Animations + reduced motion: disable ALL */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .maintenance-icon {
              animation: maintenanceSpin ${SPIN_DURATION} linear infinite;
            }
            .maintenance-progress {
              animation: maintenanceGrow ${GROW_DURATION} ease-out both;
            }
            @keyframes maintenanceSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes maintenanceGrow {
              from { width: 0%; }
              to   { width: ${PROGRESS_DEFAULT_WIDTH}; }
            }
            @media (prefers-reduced-motion: reduce) {
              .maintenance-icon,
              .maintenance-progress {
                animation: none !important;
                transition: none !important;
              }
              .maintenance-progress {
                width: ${PROGRESS_DEFAULT_WIDTH};
              }
            }
          `,
        }}
      />
    </main>
  );
}
