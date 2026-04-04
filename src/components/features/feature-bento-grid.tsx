// @version 1.0.0
// @category features
// @name feature-bento-grid
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  span?: 'default' | 'wide' | 'tall' | 'large';
}

interface FeatureBentoGridProps {
  headline?: string;
  subheadline?: string;
  items: BentoItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes bento-fade-up {
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
  @keyframes bento-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const spanClasses: Record<NonNullable<BentoItem['span']>, string> = {
  default: 'md:col-span-1 md:row-span-1',
  wide: 'md:col-span-2 md:row-span-1',
  tall: 'md:col-span-1 md:row-span-2',
  large: 'md:col-span-2 md:row-span-2',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureBentoGrid({
  headline,
  subheadline,
  items,
  className,
}: FeatureBentoGridProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'group relative rounded-2xl overflow-hidden border p-6 lg:p-8',
                'transition-shadow duration-300 hover:shadow-lg',
                spanClasses[item.span ?? 'default'],
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                animation: 'bento-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.08}s`,
              }}
            >
              {/* Optional image */}
              {item.imageSrc && (
                <div className="relative w-full h-40 lg:h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Icon */}
              {item.icon && (
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {item.icon}
                </div>
              )}

              {/* Text */}
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
          ))}
        </div>
      </section>
    </>
  );
}
