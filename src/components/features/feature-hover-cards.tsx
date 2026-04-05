// @version 2.0.0
// @category features
// @name feature-hover-cards
// @source custom

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING = 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADER_MARGIN_BOTTOM = 'mb-12 lg:mb-16';
const GRID_GAP = 'gap-6';
const CARD_PADDING = 'p-6 lg:p-8';
const ICON_SIZE = 'w-12 h-12';
const ICON_RADIUS = 'rounded-xl';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const STAT_FONT_SIZE = 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)';
const ANIMATION_DURATION_S = 0.5;
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.08;
const TRANSLATE_Y_PX = 16;
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const REVEAL_MAX_HEIGHT = 'group-hover:max-h-40 group-focus-within:max-h-40';
const ACCENT_BAR_HEIGHT = 'h-1';
const ARROW_ICON_SIZE = 14;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HoverCardItem {
  title: string;
  description: string;
  detailedDescription?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href?: string;
  stat?: string;
}

interface FeatureHoverCardsProps {
  headline?: string;
  subheadline?: string;
  items: HoverCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hover-card-enter {
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
  @keyframes hover-card-enter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .hover-card-reveal {
    transition: none !important;
  }

  .hover-card-item {
    transition: none !important;
    animation-duration: 0.01ms !important;
  }

  .hover-card-accent-bar {
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const colClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureHoverCards({
  headline,
  subheadline,
  items,
  columns = 3,
  className,
}: FeatureHoverCardsProps) {
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

        {/* Card Grid */}
        <div className={cn('grid', GRID_GAP, colClasses[columns])}>
          {items.map((item, index) => {
            const CardWrapper = item.href ? 'a' : 'div';
            const linkProps = item.href
              ? { href: item.href, target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};

            return (
              <CardWrapper
                key={index}
                {...linkProps}
                tabIndex={0}
                className={cn(
                  'hover-card-item',
                  'group relative rounded-2xl border overflow-hidden',
                  CARD_PADDING,
                  'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                  'motion-reduce:transition-none motion-reduce:hover:transform-none',
                  FOCUS_RING,
                  item.href && 'cursor-pointer',
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  animation: `hover-card-enter ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                  animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
                }}
              >
                {/* Top gradient accent on hover */}
                <div
                  className={cn(
                    'hover-card-accent-bar absolute inset-x-0 top-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left',
                    ACCENT_BAR_HEIGHT,
                  )}
                  style={{ backgroundColor: 'var(--primary)' }}
                  aria-hidden="true"
                />

                {/* Always-visible content */}
                <div className="relative z-10">
                  {item.icon && (
                    <div
                      className={cn(
                        'inline-flex items-center justify-center mb-4 transition-colors duration-300',
                        ICON_SIZE,
                        ICON_RADIUS,
                      )}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                  )}

                  {item.stat && (
                    <p
                      className="font-extrabold tracking-tight mb-1"
                      style={{
                        color: 'var(--primary)',
                        fontSize: STAT_FONT_SIZE,
                      }}
                    >
                      {item.stat}
                    </p>
                  )}

                  <h3
                    className="font-semibold tracking-tight"
                    style={{
                      color: 'var(--card-foreground)',
                      fontSize: TITLE_FONT_SIZE,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Reveal on hover (desktop) / focus (keyboard) / active (mobile tap) */}
                {(item.detailedDescription || item.href) && (
                  <div
                    className={cn(
                      'hover-card-reveal',
                      'relative z-10 mt-0 max-h-0 overflow-hidden opacity-0',
                      'group-hover:mt-4 group-hover:opacity-100',
                      'group-focus-within:mt-4 group-focus-within:opacity-100',
                      REVEAL_MAX_HEIGHT,
                      'transition-all duration-300 ease-out',
                    )}
                  >
                    {item.detailedDescription && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {item.detailedDescription}
                      </p>
                    )}

                    {item.href && (
                      <span
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium"
                        style={{ color: 'var(--primary)' }}
                      >
                        Learn more
                        <svg width={ARROW_ICON_SIZE} height={ARROW_ICON_SIZE} viewBox={`0 0 ${ARROW_ICON_SIZE} ${ARROW_ICON_SIZE}`} fill="none" aria-hidden="true">
                          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                )}
              </CardWrapper>
            );
          })}
        </div>
      </section>
    </>
  );
}
