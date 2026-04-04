// @version 1.0.0
// @category cta
// @name cta-split-highlight
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaSplitHighlightProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  highlightStat?: string;
  highlightLabel?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaSplitHighlight({
  headline,
  description,
  ctaText,
  href,
  highlightStat,
  highlightLabel,
  className,
}: CtaSplitHighlightProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'px-6 py-16 md:px-12 lg:py-24',
        className,
      )}
      style={{
        backgroundColor: 'color-mix(in oklch, var(--primary) 6%, var(--background))',
      }}
    >
      {/* Decorative background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, color-mix(in oklch, var(--primary) 10%, transparent) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        {/* Left — Text content */}
        <div>
          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>

          <p
            className="mt-4 max-w-lg text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {description}
          </p>
        </div>

        {/* Right — Highlight card */}
        <div
          className="flex flex-col items-center gap-6 rounded-2xl p-8 text-center md:p-10"
          style={{
            backgroundColor: 'var(--background)',
            boxShadow:
              '0 4px 24px color-mix(in oklch, var(--foreground) 6%, transparent), 0 1px 4px color-mix(in oklch, var(--foreground) 4%, transparent)',
            border: '1px solid color-mix(in oklch, var(--border) 50%, transparent)',
          }}
        >
          {highlightStat && (
            <div>
              <span
                className="block text-4xl font-extrabold tracking-tight lg:text-5xl"
                style={{ color: 'var(--primary)' }}
              >
                {highlightStat}
              </span>
              {highlightLabel && (
                <span
                  className="mt-1 block text-sm font-medium"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {highlightLabel}
                </span>
              )}
            </div>
          )}

          <a
            href={href}
            className={cn(
              'inline-flex w-full items-center justify-center',
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
        </div>
      </div>

      {/* Reduced-motion: disable all transitions */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  .cta-split-highlight * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </section>
  );
}
