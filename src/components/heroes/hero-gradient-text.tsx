// @version 2.0.0
// @category heroes
// @name hero-gradient-text
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GRADIENT_SHIFT_DURATION = '6s';
const GRADIENT_BG_SIZE = '200% 200%';
const DEFAULT_GRADIENT = 'linear-gradient(135deg, var(--primary), var(--accent), var(--primary))';
const HEADING_CLAMP = 'clamp(2.5rem, 6vw + 1rem, 5.5rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroGradientTextProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** CSS gradient value for the headline. Defaults to primary->accent gradient using CSS vars. */
  gradient?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-gradient-shift {
    from, to { background-position: 0% 50%; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component (server component -- pure CSS gradient animation)
// ---------------------------------------------------------------------------

export default function HeroGradientText({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  gradient,
  className,
}: HeroGradientTextProps) {
  const gradientValue = gradient ?? DEFAULT_GRADIENT;

  return (
    <section
      aria-label="Gradient text hero"
      className={cn(
        'relative flex min-h-[80vh] flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <header className="max-w-5xl">
        <h1
          className="font-extrabold tracking-tight"
          style={{
            fontSize: HEADING_CLAMP,
            background: gradientValue,
            backgroundSize: GRADIENT_BG_SIZE,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: `hero-gradient-shift ${GRADIENT_SHIFT_DURATION} ease infinite`,
          }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed md:text-xl"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {subheadline}
          </p>
        )}
      </header>

      {(ctaText || secondaryCtaText) && (
        <nav aria-label="Call to action" className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {ctaText && (
            <a
              href={ctaHref}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-7 py-3.5 text-sm font-semibold',
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
          )}

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-7 py-3.5 text-sm font-semibold',
                'border transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                color: 'var(--foreground)',
                borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)',
                ['--tw-ring-color' as string]: 'var(--foreground)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </nav>
      )}
    </section>
  );
}
