// @version 1.0.0
// @category features
// @name feature-icon-list
// @source self-authored

import { cn } from '@/lib/utils';

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
      className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      {(headline || subheadline) && (
        <div className="max-w-2xl mb-12 lg:mb-16">
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

      {/* Items */}
      <div
        className={cn(
          layout === 'vertical'
            ? 'space-y-8 lg:space-y-10'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10',
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'flex gap-5',
              layout === 'vertical'
                ? 'items-start'
                : 'flex-col sm:flex-row sm:items-start',
            )}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
              }}
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
                className="hidden lg:block absolute left-[23px] top-full w-px h-8"
                style={{ backgroundColor: 'var(--border)' }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
