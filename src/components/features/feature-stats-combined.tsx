// @version 2.0.0
// @category features
// @name feature-stats-combined
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const CARD_RADIUS = 'rounded-2xl';
const ICON_SIZE = 'w-11 h-11';
const ICON_RADIUS = 'rounded-xl';
const ANIMATION_DURATION = '0.6s';
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.1;
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const PULSE_DURATION = '2s';
const PULSE_BASE_DELAY_S = 1;
const PULSE_STAGGER_S = 0.3;
const ACCENT_BAR_HEIGHT = 'h-1';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatsCombinedItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  stat?: string;
  statLabel?: string;
}

interface FeatureStatsCombinedProps {
  headline?: string;
  subheadline?: string;
  items: StatsCombinedItem[];
  columns?: 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes stats-fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stats-counter-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.05); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes stats-fade-up {
    from, to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes stats-counter-pulse {
    0%, 100% { transform: scale(1); }
  }

  .stats-card {
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

export default function FeatureStatsCombined({
  headline,
  subheadline,
  items,
  columns = 3,
  className,
}: FeatureStatsCombinedProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features and stats'}
        className={cn(
          `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24`,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={`${HEADER_MAX_WIDTH} mx-auto text-center mb-14 lg:mb-20`}>
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
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Cards Grid */}
        <div
          className={cn('grid gap-6 lg:gap-8', colClasses[columns])}
          role="list"
        >
          {items.map((item, index) => (
            <article
              key={index}
              role="listitem"
              tabIndex={0}
              className={cn(
                'stats-card',
                `group relative ${CARD_RADIUS} border overflow-hidden`,
                'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'motion-reduce:transition-none motion-reduce:hover:transform-none',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
                animation: `stats-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
              }}
            >
              {/* Stat Banner */}
              {item.stat && (
                <div className="px-6 lg:px-8 pt-6 lg:pt-8">
                  <div
                    className="inline-flex items-end gap-2"
                    style={{
                      animation: `stats-counter-pulse ${PULSE_DURATION} ease-in-out infinite`,
                      animationDelay: `${PULSE_BASE_DELAY_S + index * PULSE_STAGGER_S}s`,
                    }}
                  >
                    <span
                      className="font-black tracking-tighter leading-none"
                      style={{
                        color: 'var(--primary)',
                        fontSize: 'clamp(2.5rem, 2rem + 2vw, 3.75rem)',
                      }}
                    >
                      {item.stat}
                    </span>
                    {item.statLabel && (
                      <span
                        className="text-sm font-medium pb-2"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {item.statLabel}
                      </span>
                    )}
                  </div>

                  {/* Decorative divider */}
                  <div
                    className="mt-4 h-px w-full"
                    style={{ backgroundColor: 'var(--border)' }}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <div
                      className={cn(
                        'inline-flex items-center justify-center flex-shrink-0',
                        ICON_SIZE,
                        ICON_RADIUS,
                        'transition-transform duration-300 group-hover:scale-110',
                        'motion-reduce:transition-none motion-reduce:group-hover:transform-none',
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

                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-bold tracking-tight"
                      style={{
                        color: 'var(--card-foreground)',
                        fontSize: 'clamp(1.125rem, 1rem + 0.3vw, 1.25rem)',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-2 text-sm lg:text-base leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom accent on hover */}
              <div
                className={cn(
                  `absolute inset-x-0 bottom-0 ${ACCENT_BAR_HEIGHT}`,
                  'scale-x-0 group-hover:scale-x-100',
                  'transition-transform duration-300 origin-center',
                  'motion-reduce:transition-none',
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
