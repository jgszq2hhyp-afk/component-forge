// @version 2.0.0
// @category cta
// @name cta-banner-gradient
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 0.5rem, 3.25rem)';
const MAX_CONTENT_WIDTH = 'max-w-3xl';
const SECTION_PADDING = 'px-6 py-20 md:px-12 lg:py-28';
const GRADIENT_BG =
  'linear-gradient(135deg, var(--primary) 0%, color-mix(in oklch, var(--primary) 80%, var(--accent)) 40%, color-mix(in oklch, var(--primary) 65%, var(--accent)) 100%)';
const GRADIENT_SIZE = '200% 200%';
const SHIMMER_DURATION = '12s';
const OVERLAY_GRADIENT =
  'radial-gradient(ellipse at 30% 80%, color-mix(in oklch, var(--primary-foreground) 5%, transparent) 0%, transparent 50%)';
const DESC_OPACITY = 'color-mix(in oklch, var(--primary-foreground) 82%, transparent)';
const HOVER_SCALE = '1.02';
const ACTIVE_SCALE = '0.98';

const KEYFRAMES_CSS = `
@keyframes cta-gradient-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  [data-cta-banner-gradient] *,
  [data-cta-banner-gradient] *::before,
  [data-cta-banner-gradient] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-cta-banner-gradient] {
    animation: none !important;
  }
}
`;

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
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />

      <section
        aria-label="Handlungsaufforderung mit Farbverlauf"
        data-cta-banner-gradient=""
        className={cn(
          'relative overflow-hidden',
          SECTION_PADDING,
          className,
        )}
        style={{
          background: GRADIENT_BG,
          backgroundSize: GRADIENT_SIZE,
          animation: `cta-gradient-shimmer ${SHIMMER_DURATION} ease infinite`,
        }}
      >
        {/* Decorative overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: OVERLAY_GRADIENT,
          }}
        />

        {/* Content */}
        <div className={cn('relative mx-auto text-center', MAX_CONTENT_WIDTH)}>
          <h2
            className="font-extrabold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--primary-foreground)',
            }}
          >
            {headline}
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed md:mt-5 md:text-lg"
            style={{
              color: DESC_OPACITY,
            }}
          >
            {description}
          </p>

          <nav className="mt-8 md:mt-10" aria-label="Handlungsaufforderung">
            <a
              href={href}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-8 py-4 text-base font-semibold',
                'transition-all duration-200',
                `hover:shadow-xl hover:scale-[${HOVER_SCALE}]`,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                `active:scale-[${ACTIVE_SCALE}]`,
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
          </nav>
        </div>
      </section>
    </>
  );
}
