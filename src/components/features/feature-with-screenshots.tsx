// @version 2.0.0
// @category features
// @name feature-with-screenshots
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING = 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADER_MARGIN_BOTTOM = 'mb-16 lg:mb-24';
const ROW_SPACING = 'space-y-16 lg:space-y-28';
const GRID_GAP = 'gap-8 lg:gap-16';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_CLAMP = 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)';
const STAT_CLAMP = 'clamp(2.25rem, 2rem + 1.5vw, 3rem)';
const IMAGE_ASPECT_RATIO = 'aspect-[16/10]';
const BROWSER_CHROME_HEIGHT = 'h-8';
const BROWSER_DOT_SIZE = 'w-2.5 h-2.5';
const ICON_SIZE = 'w-11 h-11';
const ICON_RADIUS = 'rounded-xl';
const BADGE_PADDING = 'px-3 py-1';
const SLIDE_ANIMATION_DURATION_S = 0.7;
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_CONTENT_EXTRA_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.15;
const TRANSLATE_X_PX = 32;
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EAGER_LOAD_THRESHOLD = 2;
const PLACEHOLDER_ICON_SIZE = 48;
const PLACEHOLDER_VIEWBOX = '0 0 24 24';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScreenshotItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  stat?: string;
  badge?: string;
}

interface FeatureWithScreenshotsProps {
  headline?: string;
  subheadline?: string;
  items: ScreenshotItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes screenshot-slide-left {
  from {
    opacity: 0;
    transform: translateX(-${TRANSLATE_X_PX}px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes screenshot-slide-right {
  from {
    opacity: 0;
    transform: translateX(${TRANSLATE_X_PX}px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes screenshot-slide-left {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes screenshot-slide-right {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .screenshot-panel {
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureWithScreenshots({
  headline,
  subheadline,
  items,
  className,
}: FeatureWithScreenshotsProps) {
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

        {/* Feature Rows */}
        <div className={ROW_SPACING}>
          {items.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={index}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 items-center',
                  GRID_GAP,
                  isReversed && 'lg:[direction:rtl]',
                )}
              >
                {/* Screenshot */}
                <figure
                  className="screenshot-panel lg:[direction:ltr]"
                  style={{
                    animation: `${isReversed ? 'screenshot-slide-right' : 'screenshot-slide-left'} ${SLIDE_ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                    animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
                  }}
                >
                  <div
                    className={cn(
                      'relative rounded-2xl overflow-hidden border shadow-lg',
                      IMAGE_ASPECT_RATIO,
                    )}
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--muted)',
                    }}
                  >
                    {/* Browser chrome mockup */}
                    <div
                      className={cn(
                        'absolute inset-x-0 top-0 flex items-center px-3 gap-1.5 z-10',
                        BROWSER_CHROME_HEIGHT,
                      )}
                      style={{ backgroundColor: 'var(--card)' }}
                      aria-hidden="true"
                    >
                      <span className={cn(BROWSER_DOT_SIZE, 'rounded-full')} style={{ backgroundColor: 'var(--destructive, hsl(0 84% 60%))' }} />
                      <span className={cn(BROWSER_DOT_SIZE, 'rounded-full')} style={{ backgroundColor: 'var(--chart-4, hsl(43 96% 56%))' }} />
                      <span className={cn(BROWSER_DOT_SIZE, 'rounded-full')} style={{ backgroundColor: 'var(--chart-2, hsl(142 71% 45%))' }} />
                    </div>

                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.title}
                        fill
                        className="object-cover pt-8"
                        loading={index < EAGER_LOAD_THRESHOLD ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 pt-8 flex items-center justify-center"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        <svg width={PLACEHOLDER_ICON_SIZE} height={PLACEHOLDER_ICON_SIZE} viewBox={PLACEHOLDER_VIEWBOX} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                </figure>

                {/* Text Content */}
                <div
                  className="screenshot-panel lg:[direction:ltr]"
                  style={{
                    animation: `${isReversed ? 'screenshot-slide-left' : 'screenshot-slide-right'} ${SLIDE_ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                    animationDelay: `${ANIMATION_BASE_DELAY_S + ANIMATION_CONTENT_EXTRA_DELAY_S + index * ANIMATION_STAGGER_S}s`,
                  }}
                >
                  {item.badge && (
                    <span
                      className={cn(
                        'inline-block text-xs font-semibold uppercase tracking-widest mb-3 rounded-full',
                        BADGE_PADDING,
                      )}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.icon && (
                    <div
                      className={cn(
                        'inline-flex items-center justify-center mb-4',
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
                      className="font-extrabold tracking-tight mb-2"
                      style={{
                        color: 'var(--primary)',
                        fontSize: STAT_CLAMP,
                      }}
                    >
                      {item.stat}
                    </p>
                  )}

                  <h3
                    className="font-bold tracking-tight"
                    style={{
                      color: 'var(--foreground)',
                      fontSize: TITLE_CLAMP,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-4 text-base lg:text-lg leading-relaxed max-w-lg"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
