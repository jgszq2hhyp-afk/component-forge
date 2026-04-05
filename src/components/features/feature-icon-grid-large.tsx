// @version 2.0.0
// @category features
// @name feature-icon-grid-large
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING = 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADER_MARGIN_BOTTOM = 'mb-14 lg:mb-20';
const GRID_GAP = 'gap-8 lg:gap-10';
const CARD_PADDING = 'p-8 lg:p-10';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_FONT_SIZE = 'clamp(1.125rem, 1rem + 0.5vw, 1.5rem)';
const STAT_FONT_SIZE = 'clamp(2.25rem, 2rem + 1.5vw, 3rem)';
const ICON_BOX_SIZE = 'w-16 h-16 lg:w-20 lg:h-20';
const ICON_BOX_RADIUS = 'rounded-2xl';
const INNER_ICON_SIZE = 'w-8 h-8 lg:w-10 lg:h-10';
const ACCENT_BAR_WIDTH = 'w-12';
const ACCENT_BAR_HEIGHT = 'h-1';
const ANIMATION_DURATION_S = 0.6;
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.1;
const TRANSLATE_Y_PX = 24;
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface IconGridItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  stat?: string;
}

interface FeatureIconGridLargeProps {
  headline?: string;
  subheadline?: string;
  items: IconGridItem[];
  columns?: 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes icon-grid-fade-up {
  from {
    opacity: 0;
    transform: translateY(${TRANSLATE_Y_PX}px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes icon-grid-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .icon-grid-card {
    transition: none !important;
    animation-duration: 0.01ms !important;
  }

  .icon-grid-icon-box {
    transition: none !important;
  }

  .icon-grid-accent-bar {
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const colClasses: Record<2 | 3, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureIconGridLarge({
  headline,
  subheadline,
  items,
  columns = 3,
  className,
}: FeatureIconGridLargeProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features'}
        className={cn(
          SECTION_MAX_WIDTH,
          'mx-auto',
          SECTION_PADDING,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={cn(HEADER_MAX_WIDTH, 'mx-auto text-center', HEADER_MARGIN_BOTTOM)}>
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: HEADING_CLAMP,
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 leading-relaxed"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: SUBHEADING_FONT_SIZE,
                }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Grid */}
        <div className={cn('grid', GRID_GAP, colClasses[columns])}>
          {items.map((item, index) => (
            <article
              key={index}
              tabIndex={0}
              className={cn(
                'icon-grid-card',
                'group text-center rounded-2xl border',
                CARD_PADDING,
                'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                'motion-reduce:transition-none motion-reduce:hover:transform-none',
                FOCUS_RING,
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                animation: `icon-grid-fade-up ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
              }}
            >
              {/* Large Icon */}
              {item.icon && (
                <div
                  className={cn(
                    'icon-grid-icon-box inline-flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110',
                    ICON_BOX_SIZE,
                    ICON_BOX_RADIUS,
                  )}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                  aria-hidden="true"
                >
                  <div className={INNER_ICON_SIZE}>
                    {item.icon}
                  </div>
                </div>
              )}

              {/* Stat */}
              {item.stat && (
                <p
                  className="font-extrabold tracking-tight mb-2"
                  style={{
                    color: 'var(--primary)',
                    fontSize: STAT_FONT_SIZE,
                  }}
                >
                  {item.stat}
                </p>
              )}

              {/* Title */}
              <h3
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--card-foreground)',
                  fontSize: TITLE_FONT_SIZE,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-base leading-relaxed max-w-sm mx-auto"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div
                className={cn(
                  'icon-grid-accent-bar mx-auto mt-6 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300',
                  ACCENT_BAR_WIDTH,
                  ACCENT_BAR_HEIGHT,
                )}
                style={{ backgroundColor: 'var(--primary)' }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
