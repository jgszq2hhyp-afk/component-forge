// @version 2.0.0
// @category features
// @name feature-timeline
// @source self-authored

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-4xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADER_MARGIN_BOTTOM = 'mb-14 lg:mb-20';
const ITEM_SPACING = 'space-y-12 lg:space-y-16';
const DOT_SIZE = 'w-3 h-3';
const ICON_SIZE = 'w-9 h-9';
const ICON_RADIUS = 'rounded-lg';
const BADGE_PADDING = 'px-3 py-1';
const LINE_ANIMATION_DURATION_S = 1;
const FADE_ANIMATION_DURATION_S = 0.6;
const FADE_ANIMATION_BASE_DELAY_S = 0.2;
const FADE_ANIMATION_STAGGER_S = 0.15;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TimelineItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface FeatureTimelineProps {
  headline?: string;
  subheadline?: string;
  items: TimelineItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes timeline-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes timeline-line-grow {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes timeline-fade-in {
    from { opacity: 1; }
    to   { opacity: 1; }
  }
  @keyframes timeline-line-grow {
    from { transform: scaleY(1); }
    to   { transform: scaleY(1); }
  }

  .timeline-item,
  .timeline-line {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureTimeline({
  headline,
  subheadline,
  items,
  className,
}: FeatureTimelineProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Timeline'}
        className={cn(
          SECTION_MAX_WIDTH,
          'mx-auto',
          SECTION_PADDING_X,
          SECTION_PADDING_Y,
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
                  fontSize: 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)',
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Timeline steps">
          {/* Vertical line */}
          <div
            className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              backgroundColor: 'var(--border)',
              animation: `timeline-line-grow ${LINE_ANIMATION_DURATION_S}s cubic-bezier(0.16, 1, 0.3, 1) both`,
            }}
            aria-hidden="true"
          />

          {/* Items */}
          <div className={ITEM_SPACING}>
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <article
                  key={index}
                  role="listitem"
                  className={cn(
                    'timeline-item relative flex items-start',
                    'md:items-center',
                  )}
                  style={{
                    animation: `timeline-fade-in ${FADE_ANIMATION_DURATION_S}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${FADE_ANIMATION_BASE_DELAY_S + index * FADE_ANIMATION_STAGGER_S}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      'absolute left-6 md:left-1/2 rounded-full -translate-x-1/2 z-10',
                      DOT_SIZE,
                      'ring-4',
                    )}
                    style={{
                      backgroundColor: 'var(--primary)',
                      ['--tw-ring-color' as string]: 'var(--background)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div
                    className={cn(
                      'ml-14 md:ml-0 md:w-[calc(50%-2rem)]',
                      isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8',
                    )}
                  >
                    {item.badge && (
                      <span
                        className={cn(
                          'inline-block text-xs font-semibold uppercase tracking-widest mb-2 rounded-full',
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

                    <div
                      className={cn(
                        'flex items-center gap-3 mb-2',
                        isLeft && 'md:flex-row-reverse',
                      )}
                    >
                      {item.icon && (
                        <div
                          className={cn(
                            'inline-flex items-center justify-center rounded-lg flex-shrink-0',
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
                      <h3
                        className="text-lg font-semibold tracking-tight"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
