// @version 1.0.0
// @category error
// @name error-404-minimal
// @source custom

import { cn } from '@/lib/utils';

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
          fontSize: 'clamp(7rem, 18vw, 14rem)',
          color: 'var(--foreground)',
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Content */}
      <div className="-mt-10 md:-mt-14 relative z-10 max-w-lg">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={homeHref}
            className={cn(
              'inline-flex items-center justify-center',
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
            Back to home
          </a>
        </div>
      </div>

      {/* Reduced motion: disable fade-in animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .error-404-number {
              animation: error404FadeUp 0.8s ease-out both;
            }
            @keyframes error404FadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 0.06; transform: translateY(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .error-404-number {
                animation: none;
                opacity: 0.06;
              }
            }
          `,
        }}
      />
    </main>
  );
}
