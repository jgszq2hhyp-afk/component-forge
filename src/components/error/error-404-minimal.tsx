// @version 2.0.0
// @category error
// @name error-404-minimal
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ERROR_CODE_FONT_SIZE = 'clamp(7rem, 18vw, 14rem)';
const ERROR_CODE_OPACITY = 0.06;
const HEADING_CLAMP = 'clamp(1.5rem, 4vw, 2.25rem)';
const CONTENT_MAX_WIDTH = 'max-w-lg';
const DESCRIPTION_MAX_WIDTH = 'max-w-md';
const BUTTON_PADDING_X = 'px-7';
const BUTTON_PADDING_Y = 'py-3';
const FADE_DURATION = '0.8s';
const TRANSLATE_OFFSET = '20px';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorPageProps {
  title?: string;
  message?: string;
  homeHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component — no interactivity needed)
// ---------------------------------------------------------------------------

export default function Error404Minimal({
  title = 'Page not found',
  message = 'Sorry, the page you are looking for does not exist or has been moved.',
  homeHref = '/',
  className,
}: ErrorPageProps) {
  return (
    <main
      aria-label="404 error page"
      className={cn(
        'flex min-h-svh flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Animated 404 number */}
      <p
        className={cn(
          'select-none font-extrabold tracking-tighter leading-none',
          'error-404-number',
        )}
        style={{
          fontSize: ERROR_CODE_FONT_SIZE,
          color: 'var(--foreground)',
          opacity: ERROR_CODE_OPACITY,
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Content */}
      <div className={cn('-mt-10 md:-mt-14 relative z-10', CONTENT_MAX_WIDTH)}>
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

        <nav aria-label="Error page navigation" className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={homeHref}
            className={cn(
              'inline-flex items-center justify-center',
              'rounded-lg text-sm font-semibold',
              BUTTON_PADDING_X,
              BUTTON_PADDING_Y,
              'transition-all duration-200 motion-reduce:transition-none',
              'hover:brightness-110 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'active:scale-[0.98] motion-reduce:active:scale-100',
            )}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            Back to home
          </a>
        </nav>
      </div>

      {/* Reduced motion: disable ALL animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .error-404-number {
              animation: error404FadeUp ${FADE_DURATION} ease-out both;
            }
            @keyframes error404FadeUp {
              from { opacity: 0; transform: translateY(${TRANSLATE_OFFSET}); }
              to   { opacity: ${ERROR_CODE_OPACITY}; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .error-404-number {
                animation: none !important;
                transition: none !important;
                opacity: ${ERROR_CODE_OPACITY};
              }
            }
          `,
        }}
      />
    </main>
  );
}
