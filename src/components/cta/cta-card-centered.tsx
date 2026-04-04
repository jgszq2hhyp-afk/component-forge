// @version 1.0.0
// @category cta
// @name cta-card-centered
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaCardCenteredProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaCardCentered({
  headline,
  description,
  ctaText,
  href,
  secondaryCtaText,
  secondaryCtaHref = '#',
  className,
}: CtaCardCenteredProps) {
  return (
    <section
      className={cn(
        'flex items-center justify-center',
        'px-6 py-16 md:px-12 lg:py-24',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl px-8 py-12 text-center md:px-14 md:py-16"
        style={{
          backgroundColor: 'var(--background)',
          boxShadow:
            '0 8px 40px color-mix(in oklch, var(--foreground) 8%, transparent), 0 2px 8px color-mix(in oklch, var(--foreground) 4%, transparent)',
          border: '1px solid color-mix(in oklch, var(--border) 60%, transparent)',
        }}
      >
        {/* Subtle decorative accent */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--accent)))',
          }}
        />

        <h2
          className="font-bold tracking-tight leading-[1.1]"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)',
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h2>

        <p
          className="mx-auto mt-4 max-w-md text-base leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          {/* Primary */}
          <a
            href={href}
            className={cn(
              'inline-flex w-full items-center justify-center sm:w-auto',
              'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
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
            {ctaText}
          </a>

          {/* Secondary / Ghost */}
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className={cn(
                'inline-flex w-full items-center justify-center sm:w-auto',
                'rounded-lg border px-7 py-3.5 text-[0.9375rem] font-semibold',
                'bg-transparent transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                color: 'var(--foreground)',
                borderColor: 'color-mix(in oklch, var(--border) 80%, transparent)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  .cta-card-centered * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </section>
  );
}
