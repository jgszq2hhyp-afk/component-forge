// @version 1.0.0
// @category heroes
// @name hero-gradient-text
// @source self-authored

import { cn } from '@/lib/utils';

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
    0%, 50%, 100% { background-position: 0% 50%; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component (server component — pure CSS gradient animation)
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
  const gradientValue =
    gradient ??
    'linear-gradient(135deg, var(--primary), var(--accent), var(--primary))';

  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <h1
        className="max-w-5xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        style={{
          background: gradientValue,
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'hero-gradient-shift 6s ease infinite',
        }}
      >
        {headline}
      </h1>

      {subheadline && (
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {subheadline}
        </p>
      )}

      {(ctaText || secondaryCtaText) && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {ctaText && (
            <a
              href={ctaHref}
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {ctaText}
            </a>
          )}

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
