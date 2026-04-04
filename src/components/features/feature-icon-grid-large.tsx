// @version 1.0.0
// @category features
// @name feature-icon-grid-large
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface IconGridItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  stat?: string;
}

interface FeatureIconGridLargeProps {
  headline?: string;
  subheadline?: string;
  items: IconGridItem[];
  columns?: 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes icon-grid-fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes icon-grid-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .icon-grid-card {
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

export default function FeatureIconGridLarge({
  headline,
  subheadline,
  items,
  columns = 3,
  className,
}: FeatureIconGridLargeProps) {
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

        {/* Grid */}
        <div className={cn('grid gap-8 lg:gap-10', colClasses[columns])}>
          {items.map((item, index) => (
            <div
              key={index}
              tabIndex={0}
              className={cn(
                'icon-grid-card',
                'group text-center p-8 lg:p-10 rounded-2xl border',
                'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                animation: 'icon-grid-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.1}s`,
              } as React.CSSProperties}
            >
              {/* Large Icon */}
              {item.icon && (
                <div
                  className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl mb-6 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10">
                    {item.icon}
                  </div>
                </div>
              )}

              {/* Stat */}
              {item.stat && (
                <p
                  className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  {item.stat}
                </p>
              )}

              {/* Title */}
              <h3
                className="text-xl lg:text-2xl font-bold tracking-tight"
                style={{ color: 'var(--card-foreground)' }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-base leading-relaxed max-w-sm mx-auto"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="mx-auto mt-6 h-1 w-12 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
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
