// @version 1.0.0
// @category features
// @name feature-with-screenshots
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    transform: translateX(-32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes screenshot-slide-right {
  from {
    opacity: 0;
    transform: translateX(32px);
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
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-24">
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

        {/* Feature Rows */}
        <div className="space-y-16 lg:space-y-28">
          {items.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={index}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center',
                  isReversed && 'lg:[direction:rtl]',
                )}
              >
                {/* Screenshot */}
                <div
                  className="lg:[direction:ltr]"
                  style={{
                    animation: `${isReversed ? 'screenshot-slide-right' : 'screenshot-slide-left'} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${0.1 + index * 0.15}s`,
                  }}
                >
                  <div
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden border shadow-lg"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--muted)',
                    }}
                  >
                    {/* Browser chrome mockup */}
                    <div
                      className="absolute inset-x-0 top-0 h-8 flex items-center px-3 gap-1.5 z-10"
                      style={{ backgroundColor: 'var(--card)' }}
                      aria-hidden="true"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--destructive, #ef4444)' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--chart-4, #f59e0b)' }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--chart-2, #22c55e)' }} />
                    </div>

                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.title}
                        fill
                        className="object-cover pt-8"
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 pt-8 flex items-center justify-center"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className="lg:[direction:ltr]"
                  style={{
                    animation: `${isReversed ? 'screenshot-slide-left' : 'screenshot-slide-right'} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${0.2 + index * 0.15}s`,
                  }}
                >
                  {item.badge && (
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
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
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
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
                      className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      {item.stat}
                    </p>
                  )}

                  <h3
                    className="text-2xl lg:text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--foreground)' }}
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
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
