// @version 1.0.0
// @category error
// @name error-500-server
// @source custom

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorPageProps {
  title?: string;
  message?: string;
  homeHref?: string;
  className?: string;
  contactHref?: string;
  onRetry?: () => void;
}

// ---------------------------------------------------------------------------
// Component ('use client' — retry button needs onClick handler)
// ---------------------------------------------------------------------------

export default function Error500Server({
  title = 'Something went wrong',
  message = 'An unexpected error occurred on our end. Please try again, or contact support if the problem persists.',
  homeHref = '/',
  contactHref = '/contact',
  onRetry,
  className,
}: ErrorPageProps) {
  function handleRetry() {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }

  return (
    <main
      className={cn(
        'flex min-h-svh flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Warning icon */}
      <div
        className={cn(
          'mb-6 flex size-16 items-center justify-center rounded-full',
          'error-500-icon',
        )}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
        }}
        aria-hidden="true"
      >
        <svg
          className="size-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      {/* Error code badge */}
      <span
        className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)',
          color: 'var(--primary)',
        }}
      >
        Error 500
      </span>

      <div className="max-w-lg">
        <h1
          className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h1>

        <p
          className="mx-auto mt-4 max-w-md text-base leading-relaxed md:text-lg"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Retry button */}
          <button
            type="button"
            onClick={handleRetry}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-lg px-7 py-3 text-sm font-semibold',
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-lg',
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
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8a6 6 0 0111.47-2.47M14 8a6 6 0 01-11.47 2.47"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14 2v4h-4M2 14v-4h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try again
          </button>

          {/* Contact support link */}
          <a
            href={contactHref}
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-semibold',
              'transition-colors duration-200',
              'hover:underline underline-offset-4',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              color: 'var(--muted-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            Contact support
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Home fallback */}
        <p
          className="mt-10 text-sm"
          style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}
        >
          Or go back to the{' '}
          <a
            href={homeHref}
            className="underline underline-offset-4 transition-colors duration-150"
            style={{ color: 'var(--foreground)' }}
          >
            homepage
          </a>
          .
        </p>
      </div>

      {/* Animations + reduced motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .error-500-icon {
              animation: error500Pulse 2.5s ease-in-out infinite;
            }
            @keyframes error500Pulse {
              0%, 100% { transform: scale(1); }
              50%      { transform: scale(1.06); }
            }
            @media (prefers-reduced-motion: reduce) {
              .error-500-icon {
                animation: none;
              }
            }
          `,
        }}
      />
    </main>
  );
}
