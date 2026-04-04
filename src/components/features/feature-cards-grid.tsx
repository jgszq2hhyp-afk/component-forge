// @version 1.0.0
// @category features
// @name feature-cards-grid
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

interface FeatureCardsGridProps {
  headline?: string;
  subheadline?: string;
  cards: FeatureCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

// ---------------------------------------------------------------------------
// Arrow icon
// ---------------------------------------------------------------------------

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureCardsGrid({
  headline,
  subheadline,
  cards,
  columns = 3,
  className,
}: FeatureCardsGridProps) {
  return (
    <section
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

      {/* Cards Grid */}
      <div
        className={cn(
          'grid grid-cols-1 gap-6 lg:gap-8',
          columnClasses[columns],
        )}
      >
        {cards.map((card, index) => {
          const Wrapper = card.href ? 'a' : 'div';
          const linkProps = card.href
            ? { href: card.href }
            : {};

          return (
            <Wrapper
              key={index}
              {...linkProps}
              className={cn(
                'group relative flex flex-col rounded-2xl border p-6 lg:p-8',
                'transition-all duration-300',
                'hover:shadow-lg hover:-translate-y-0.5',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              {/* Icon */}
              {card.icon && (
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                >
                  {card.icon}
                </div>
              )}

              {/* Title */}
              <h3
                className="text-lg font-semibold tracking-tight"
                style={{ color: 'var(--card-foreground)' }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 text-sm leading-relaxed flex-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {card.description}
              </p>

              {/* Link arrow */}
              {card.href && (
                <div
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--primary)' }}
                >
                  Mehr erfahren
                  <ArrowIcon />
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
