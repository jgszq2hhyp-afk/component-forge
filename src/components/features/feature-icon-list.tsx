// @version 2.0.0
// @category features
// @name feature-icon-list
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const ICON_SIZE = 'w-12 h-12';
const ICON_RADIUS = 'rounded-xl';
const SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADER_MARGIN_BOTTOM = 'mb-12 lg:mb-16';
const ITEM_GAP = 'gap-5';
const VERTICAL_SPACING = 'space-y-8 lg:space-y-10';
const GRID_GAP = 'gap-8 lg:gap-10';
const DIVIDER_HEIGHT = 'h-8';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureIconListProps {
  headline?: string;
  subheadline?: string;
  items: FeatureItem[];
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureIconList({
  headline,
  subheadline,
  items,
  layout = 'vertical',
  className,
}: FeatureIconListProps) {
  return (
    <section
      aria-label={headline ?? 'Features'}
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
        <header className={cn(HEADER_MAX_WIDTH, HEADER_MARGIN_BOTTOM)}>
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

      {/* Items */}
      <ul
        role="list"
        className={cn(
          layout === 'vertical'
            ? VERTICAL_SPACING
            : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${GRID_GAP}`,
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              'flex',
              ITEM_GAP,
              layout === 'vertical'
                ? 'items-start'
                : 'flex-col sm:flex-row sm:items-start',
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex-shrink-0 inline-flex items-center justify-center',
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

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-base font-semibold tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                {item.title}
              </h3>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.description}
              </p>
            </div>

            {/* Divider for vertical layout */}
            {layout === 'vertical' && index < items.length - 1 && (
              <div
                className={cn(
                  'hidden lg:block absolute left-[23px] top-full w-px',
                  DIVIDER_HEIGHT,
                )}
                style={{ backgroundColor: 'var(--border)' }}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
