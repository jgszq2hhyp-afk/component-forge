// @version 1.0.0
// @category features
// @name feature-hover-cards
// @source custom

'use client';

import { cn } from '@/lib/utils';

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
    transform: translateY(16px);
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
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
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

        {/* Card Grid */}
        <div className={cn('grid gap-6', colClasses[columns])}>
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
                  'group relative rounded-2xl border p-6 lg:p-8 overflow-hidden',
                  'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  item.href && 'cursor-pointer',
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  animation: 'hover-card-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: `${0.1 + index * 0.08}s`,
                } as React.CSSProperties}
              >
                {/* Top gradient accent on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: 'var(--primary)' }}
                  aria-hidden="true"
                />

                {/* Always-visible content */}
                <div className="relative z-10">
                  {item.icon && (
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors duration-300"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      {item.icon}
                    </div>
                  )}

                  {item.stat && (
                    <p
                      className="text-3xl font-extrabold tracking-tight mb-1"
                      style={{ color: 'var(--primary)' }}
                    >
                      {item.stat}
                    </p>
                  )}

                  <h3
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: 'var(--card-foreground)' }}
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
                      'group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100',
                      'group-focus-within:mt-4 group-focus-within:max-h-40 group-focus-within:opacity-100',
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
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
