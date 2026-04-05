// @version 1.0.0
// @category features
// @name feature-neobrutalism
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const CARD_TITLE_CLAMP = 'clamp(1.125rem, 1rem + 0.3vw, 1.375rem)';
const SECTION_MAX_WIDTH = '72rem';
const MAX_HEADER_WIDTH = '42rem';
const CARD_BORDER_WIDTH = '2.5px';
const CARD_SHADOW_OFFSET = '4px';
const CARD_SHADOW_HOVER_OFFSET = '6px';
const CARD_HOVER_TRANSLATE = '-2px';
const CARD_ROTATION_DEG = 1;
const ICON_CONTAINER_SIZE = '3rem';
const DEFAULT_ACCENT_FALLBACK = 'color-mix(in oklch, var(--primary) 12%, transparent)';

// Rotation values per card index (mod 6 for repetition)
const ROTATION_MAP: readonly number[] = [
  -CARD_ROTATION_DEG,
  CARD_ROTATION_DEG,
  -CARD_ROTATION_DEG * 0.5,
  CARD_ROTATION_DEG,
  -CARD_ROTATION_DEG,
  CARD_ROTATION_DEG * 0.5,
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureItem {
  title: string;
  description: string;
  icon?: ReactNode;
  accentColor?: string;
}

interface FeatureNeobrutalismProps {
  headline?: string;
  subheadline?: string;
  features: FeatureItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles (scoped via class prefix)
// ---------------------------------------------------------------------------

const cardStyles = `
  .neo-card {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .neo-card:hover {
    transform: translateY(${CARD_HOVER_TRANSLATE}) rotate(0deg);
    box-shadow: ${CARD_SHADOW_HOVER_OFFSET}px ${CARD_SHADOW_HOVER_OFFSET}px 0px 0px var(--foreground);
  }

  @media (prefers-reduced-motion: reduce) {
    .neo-card {
      transition: none;
      transform: none !important;
    }
    .neo-card:hover {
      transform: none !important;
      box-shadow: ${CARD_SHADOW_OFFSET}px ${CARD_SHADOW_OFFSET}px 0px 0px var(--foreground);
    }
  }
`;

// ---------------------------------------------------------------------------
// Feature Card
// ---------------------------------------------------------------------------

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const rotation = ROTATION_MAP[index % ROTATION_MAP.length];
  const accentBg = feature.accentColor ?? DEFAULT_ACCENT_FALLBACK;

  return (
    <article
      className="neo-card rounded-lg p-6 sm:p-8"
      style={{
        border: `${CARD_BORDER_WIDTH} solid var(--foreground)`,
        boxShadow: `${CARD_SHADOW_OFFSET}px ${CARD_SHADOW_OFFSET}px 0px 0px var(--foreground)`,
        backgroundColor: accentBg,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Icon */}
      {feature.icon && (
        <div
          className="mb-4 flex items-center justify-center rounded-md"
          style={{
            width: ICON_CONTAINER_SIZE,
            height: ICON_CONTAINER_SIZE,
            backgroundColor: 'var(--background)',
            border: `${CARD_BORDER_WIDTH} solid var(--foreground)`,
            color: 'var(--foreground)',
          }}
          aria-hidden="true"
        >
          {feature.icon}
        </div>
      )}

      {/* Title */}
      <h3
        className="font-bold leading-tight"
        style={{
          fontSize: CARD_TITLE_CLAMP,
          color: 'var(--foreground)',
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: 'var(--foreground)', opacity: 0.8 }}
      >
        {feature.description}
      </p>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FeatureNeobrutalism({
  headline,
  subheadline,
  features,
  className,
}: FeatureNeobrutalismProps) {
  return (
    <section
      aria-label={headline ?? 'Features'}
      className={cn(
        'mx-auto px-6 py-20 md:px-12 md:py-28 lg:px-20',
        className,
      )}
      style={{
        maxWidth: SECTION_MAX_WIDTH,
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Scoped card hover styles */}
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />

      {/* Header */}
      {(headline || subheadline) && (
        <header
          className="mx-auto text-center mb-14"
          style={{ maxWidth: MAX_HEADER_WIDTH }}
        >
          {headline && (
            <h2
              className="font-extrabold tracking-tight"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: SUBHEADING_CLAMP,
              }}
            >
              {subheadline}
            </p>
          )}
        </header>
      )}

      {/* Feature cards grid */}
      <div
        className={cn(
          'grid gap-6 sm:gap-8',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
        role="list"
        aria-label="Feature list"
      >
        {features.map((feature, index) => (
          <div key={feature.title} role="listitem">
            <FeatureCard feature={feature} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
