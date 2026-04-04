// @version 1.0.0
// @category cta
// @name cta-banner-gradient
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaBannerGradientProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes cta-gradient-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes cta-gradient-shimmer {
    0%, 50%, 100% { background-position: 0% 50%; }
  }
  .cta-banner-gradient * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaBannerGradient({
  headline,
  description,
  ctaText,
  href,
  className,
}: CtaBannerGradientProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'cta-banner-gradient relative overflow-hidden',
          'px-6 py-20 md:px-12 lg:py-28',
          className,
        )}
        style={{
          background:
            'linear-gradient(135deg, var(--primary) 0%, color-mix(in oklch, var(--primary) 80%, var(--accent)) 40%, color-mix(in oklch, var(--primary) 65%, var(--accent)) 100%)',
          backgroundSize: '200% 200%',
          animation: 'cta-gradient-shimmer 12s ease infinite',
        }}
      >
        {/* Decorative overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 30% 80%, color-mix(in oklch, var(--primary-foreground) 5%, transparent) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-3xl text-center">
          <h2
            className="font-extrabold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.25rem)',
              color: 'var(--primary-foreground)',
            }}
          >
            {headline}
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed md:mt-5 md:text-lg"
            style={{
              color: 'color-mix(in oklch, var(--primary-foreground) 82%, transparent)',
            }}
          >
            {description}
          </p>

          <div className="mt-8 md:mt-10">
            <a
              href={href}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-8 py-4 text-base font-semibold',
                'transition-all duration-200',
                'hover:shadow-xl hover:scale-[1.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                backgroundColor: 'var(--primary-foreground)',
                color: 'var(--primary)',
                ['--tw-ring-color' as string]: 'var(--primary-foreground)',
                ['--tw-ring-offset-color' as string]: 'var(--primary)',
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
