// @version 1.0.0 // @category loading // @name loading-skeleton-cards // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SHIMMER_DURATION = '1.8s';
const CARD_HEIGHT = '16rem';
const CARD_BORDER_RADIUS = '0.75rem';
const TITLE_BAR_HEIGHT = '1rem';
const TITLE_BAR_WIDTH = '75%';
const SUBTITLE_BAR_HEIGHT = '0.75rem';
const SUBTITLE_BAR_WIDTH = '50%';
const AVATAR_SIZE = '2.5rem';
const IMAGE_PLACEHOLDER_HEIGHT = '8rem';
const LINE_GAP = '0.75rem';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LoadingSkeletonCardsProps {
  /** Number of skeleton cards to render */
  count?: number;
  /** Grid columns: 2, 3, or 4 */
  columns?: 2 | 3 | 4;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Column mapping
// ---------------------------------------------------------------------------

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

// ---------------------------------------------------------------------------
// Scoped styles with prefers-reduced-motion
// ---------------------------------------------------------------------------

const shimmerStyles = `
  @keyframes skeleton-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .skeleton-bone {
    background: linear-gradient(
      90deg,
      var(--muted, hsl(210 40% 96%)) 25%,
      var(--border, hsl(214 32% 91%)) 37%,
      var(--muted, hsl(210 40% 96%)) 63%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer ${SHIMMER_DURATION} ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton-bone {
      animation: none;
      background: var(--muted, hsl(210 40% 96%));
    }
  }
`;

// ---------------------------------------------------------------------------
// Skeleton bone element
// ---------------------------------------------------------------------------

function Bone({
  width,
  height,
  rounded = '0.375rem',
  className,
}: {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('skeleton-bone', className)}
      style={{
        width: width ?? '100%',
        height: height ?? SUBTITLE_BAR_HEIGHT,
        borderRadius: rounded,
      }}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Single skeleton card
// ---------------------------------------------------------------------------

function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--card, hsl(0 0% 100%))',
        borderRadius: CARD_BORDER_RADIUS,
        border: '1px solid var(--border)',
        minHeight: CARD_HEIGHT,
      }}
    >
      {/* Image placeholder */}
      <Bone
        height={IMAGE_PLACEHOLDER_HEIGHT}
        rounded="0"
      />

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Avatar + title row */}
        <div className="flex items-center gap-3">
          <Bone
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            rounded="9999px"
          />
          <div className="flex flex-1 flex-col" style={{ gap: LINE_GAP }}>
            <Bone width={TITLE_BAR_WIDTH} height={TITLE_BAR_HEIGHT} />
            <Bone width={SUBTITLE_BAR_WIDTH} height={SUBTITLE_BAR_HEIGHT} />
          </div>
        </div>

        {/* Body lines */}
        <div className="mt-2 flex flex-col" style={{ gap: LINE_GAP }}>
          <Bone width="100%" height={SUBTITLE_BAR_HEIGHT} />
          <Bone width="90%" height={SUBTITLE_BAR_HEIGHT} />
          <Bone width="60%" height={SUBTITLE_BAR_HEIGHT} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LoadingSkeletonCards({
  count = 3,
  columns = 3,
  className,
}: LoadingSkeletonCardsProps) {
  const cardCount = Math.max(1, Math.min(count, 12));

  return (
    <>
      {/* Scoped shimmer animation styles */}
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />

      <div
        role="status"
        aria-busy="true"
        aria-label="Loading content"
        className={cn(
          'grid gap-6',
          COLUMN_CLASSES[columns],
          className,
        )}
      >
        {Array.from({ length: cardCount }, (_, index) => (
          <SkeletonCard key={index} />
        ))}

        {/* Screen reader announcement */}
        <span className="sr-only">Loading content, please wait...</span>
      </div>
    </>
  );
}
