// @version 1.0.0
// @category features
// @name feature-alternating-rows
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureRow {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  bullets?: string[];
}

interface FeatureAlternatingRowsProps {
  headline?: string;
  subheadline?: string;
  rows: FeatureRow[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes alt-slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes alt-slide-in-right {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes alt-slide-in-left {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes alt-slide-in-right {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Checkmark icon
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
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

export default function FeatureAlternatingRows({
  headline,
  subheadline,
  rows,
  className,
}: FeatureAlternatingRowsProps) {
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
          <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
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

        {/* Rows */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {rows.map((row, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={index}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center',
                  isReversed && 'lg:direction-rtl',
                )}
              >
                {/* Text */}
                <div
                  className={cn(
                    isReversed ? 'lg:order-2' : 'lg:order-1',
                  )}
                  style={{
                    animation: `alt-slide-in-${isReversed ? 'right' : 'left'} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${0.1 + index * 0.15}s`,
                  }}
                >
                  {row.badge && (
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      {row.badge}
                    </span>
                  )}
                  <h3
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {row.title}
                  </h3>
                  <p
                    className="mt-4 text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {row.description}
                  </p>

                  {/* Bullet list */}
                  {row.bullets && row.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {row.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: 'var(--primary)' }}
                          >
                            <CheckIcon />
                          </span>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image */}
                <div
                  className={cn(
                    'relative aspect-[4/3] rounded-2xl overflow-hidden',
                    isReversed ? 'lg:order-1' : 'lg:order-2',
                  )}
                  style={{
                    animation: `alt-slide-in-${isReversed ? 'left' : 'right'} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${0.2 + index * 0.15}s`,
                  }}
                >
                  <Image
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
