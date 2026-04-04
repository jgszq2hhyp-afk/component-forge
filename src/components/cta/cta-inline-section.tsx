// @version 1.0.0 // @category cta // @name cta-inline-section // @score pending

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaInlineSectionProps {
  headline: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: 'default' | 'gradient' | 'dark';
  className?: string;
}

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

const variantStyles: Record<
  NonNullable<CtaInlineSectionProps['variant']>,
  {
    section: React.CSSProperties;
    headline: React.CSSProperties;
    description: React.CSSProperties;
    primaryCta: React.CSSProperties;
    secondaryCta: React.CSSProperties;
    decorative: React.CSSProperties;
  }
> = {
  default: {
    section: {
      backgroundColor: 'var(--primary)',
    },
    headline: {
      color: 'var(--primary-foreground)',
    },
    description: {
      color: 'color-mix(in oklch, var(--primary-foreground) 80%, transparent)',
    },
    primaryCta: {
      backgroundColor: 'var(--primary-foreground)',
      color: 'var(--primary)',
    },
    secondaryCta: {
      color: 'var(--primary-foreground)',
      borderColor: 'color-mix(in oklch, var(--primary-foreground) 40%, transparent)',
    },
    decorative: {
      background:
        'radial-gradient(ellipse at 70% 20%, color-mix(in oklch, var(--primary-foreground) 8%, transparent) 0%, transparent 70%)',
    },
  },
  gradient: {
    section: {
      background:
        'linear-gradient(135deg, var(--primary) 0%, color-mix(in oklch, var(--primary) 85%, var(--secondary)) 50%, color-mix(in oklch, var(--primary) 70%, var(--secondary)) 100%)',
    },
    headline: {
      color: 'var(--primary-foreground)',
    },
    description: {
      color: 'color-mix(in oklch, var(--primary-foreground) 80%, transparent)',
    },
    primaryCta: {
      backgroundColor: 'var(--primary-foreground)',
      color: 'var(--primary)',
    },
    secondaryCta: {
      color: 'var(--primary-foreground)',
      borderColor: 'color-mix(in oklch, var(--primary-foreground) 40%, transparent)',
    },
    decorative: {
      background:
        'radial-gradient(ellipse at 80% 10%, color-mix(in oklch, var(--primary-foreground) 6%, transparent) 0%, transparent 60%)',
    },
  },
  dark: {
    section: {
      backgroundColor: 'color-mix(in oklch, var(--foreground) 95%, var(--background))',
    },
    headline: {
      color: 'var(--background)',
    },
    description: {
      color: 'color-mix(in oklch, var(--background) 70%, transparent)',
    },
    primaryCta: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    },
    secondaryCta: {
      color: 'var(--background)',
      borderColor: 'color-mix(in oklch, var(--background) 30%, transparent)',
    },
    decorative: {
      background:
        'radial-gradient(ellipse at 75% 15%, color-mix(in oklch, var(--background) 5%, transparent) 0%, transparent 65%)',
    },
  },
};

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaInlineSection({
  headline,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref = '#',
  variant = 'default',
  className,
}: CtaInlineSectionProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'px-6 py-20 md:px-12 lg:py-28',
        className,
      )}
      style={styles.section}
    >
      {/* Decorative abstract shape — top-right */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={styles.decorative}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Headline */}
        <h2
          className="font-bold tracking-tight leading-[1.1]"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3rem)',
            ...styles.headline,
          }}
        >
          {headline}
        </h2>

        {/* Description */}
        {description && (
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed md:mt-5 md:text-lg"
            style={styles.description}
          >
            {description}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
          {/* Primary CTA */}
          <a
            href={ctaHref}
            className={cn(
              'inline-flex items-center justify-center',
              'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'active:scale-[0.98]',
            )}
            style={{
              ...styles.primaryCta,
              ['--tw-ring-color' as string]: styles.primaryCta.backgroundColor,
              ['--tw-ring-offset-color' as string]: styles.section.backgroundColor ?? styles.section.background,
            }}
          >
            {ctaText}
          </a>

          {/* Secondary CTA (ghost) */}
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg border px-7 py-3.5 text-[0.9375rem] font-semibold',
                'bg-transparent transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                ...styles.secondaryCta,
                ['--tw-ring-color' as string]: styles.secondaryCta.color,
                ['--tw-ring-offset-color' as string]: styles.section.backgroundColor ?? styles.section.background,
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
