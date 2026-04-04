// @version 1.0.0
// @category features
// @name feature-stats-combined
// @source custom

import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
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
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
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
          </div>
        )}

        {/* Cards Grid */}
        <div className={cn('grid gap-6 lg:gap-8', colClasses[columns])}>
          {items.map((item, index) => (
            <div
              key={index}
              tabIndex={0}
              className={cn(
                'stats-card',
                'group relative rounded-2xl border overflow-hidden',
                'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                animation: 'stats-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.1}s`,
              } as React.CSSProperties}
            >
              {/* Stat Banner */}
              {item.stat && (
                <div
                  className="px-6 lg:px-8 pt-6 lg:pt-8"
                >
                  <div
                    className="inline-flex items-end gap-2"
                    style={{
                      animation: 'stats-counter-pulse 2s ease-in-out infinite',
                      animationDelay: `${1 + index * 0.3}s`,
                    }}
                  >
                    <span
                      className="text-5xl lg:text-6xl font-black tracking-tighter leading-none"
                      style={{ color: 'var(--primary)' }}
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
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-lg lg:text-xl font-bold tracking-tight"
                      style={{ color: 'var(--card-foreground)' }}
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
                className="absolute inset-x-0 bottom-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                style={{ backgroundColor: 'var(--primary)' }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
