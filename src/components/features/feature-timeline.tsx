// @version 1.0.0
// @category features
// @name feature-timeline
// @source self-authored

'use client';

import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes timeline-line-grow {
    from { transform: scaleY(1); }
    to   { transform: scaleY(1); }
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
        className={cn(
          'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            {headline && (
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              backgroundColor: 'var(--border)',
              animation: 'timeline-line-grow 1s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
            aria-hidden="true"
          />

          {/* Items */}
          <div className="space-y-12 lg:space-y-16">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={cn(
                    'relative flex items-start',
                    'md:items-center',
                  )}
                  style={{
                    animation: 'timeline-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                    animationDelay: `${0.2 + index * 0.15}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      'absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10',
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
                        className="inline-block text-xs font-semibold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
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
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                          style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--accent-foreground)',
                          }}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
