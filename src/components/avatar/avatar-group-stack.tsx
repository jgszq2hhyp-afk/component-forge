// @version 1.0.0
// @category avatar
// @name avatar-group-stack
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { dimension: 32, text: 'text-xs', overlap: '-ml-2', border: 'border-2' },
  md: { dimension: 40, text: 'text-sm', overlap: '-ml-3', border: 'border-2' },
  lg: { dimension: 48, text: 'text-base', overlap: '-ml-3.5', border: 'border-[3px]' },
} as const;

const DEFAULT_MAX_VISIBLE = 5;
const DEFAULT_SIZE = 'md';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AvatarItem {
  src: string;
  alt: string;
  name?: string;
}

interface AvatarGroupStackProps {
  avatars: AvatarItem[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ---------------------------------------------------------------------------
// Helper: generate initials from name
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------------------
// Sub-component: Single Avatar
// ---------------------------------------------------------------------------

function AvatarCircle({
  avatar,
  size,
  isFirst,
}: {
  avatar: AvatarItem;
  size: 'sm' | 'md' | 'lg';
  isFirst: boolean;
}) {
  const config = SIZE_MAP[size];

  return (
    <li
      className={cn(
        'relative inline-block rounded-full',
        config.border,
        'border-[var(--avatar-border,var(--background,hsl(0_0%_100%)))]',
        !isFirst && config.overlap,
        'transition-transform duration-200 ease-out',
        'motion-safe:hover:scale-110 motion-safe:hover:z-10',
        'motion-reduce:transition-none'
      )}
      style={{
        width: config.dimension,
        height: config.dimension,
      }}
    >
      <Image
        src={avatar.src}
        alt={avatar.alt}
        width={config.dimension}
        height={config.dimension}
        className="rounded-full object-cover"
        style={{
          width: config.dimension,
          height: config.dimension,
        }}
      />
      {avatar.name && (
        <span className="sr-only">{avatar.name}</span>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Overflow Indicator
// ---------------------------------------------------------------------------

function OverflowIndicator({
  count,
  size,
}: {
  count: number;
  size: 'sm' | 'md' | 'lg';
}) {
  const config = SIZE_MAP[size];

  return (
    <li
      className={cn(
        'relative inline-flex items-center justify-center rounded-full',
        config.border,
        config.overlap,
        config.text,
        'border-[var(--avatar-border,var(--background,hsl(0_0%_100%)))]',
        'bg-[var(--avatar-overflow-bg,var(--muted,hsl(210_40%_96%)))]',
        'text-[var(--avatar-overflow-text,var(--muted-foreground,hsl(215_16%_47%)))]',
        'font-medium',
        'select-none'
      )}
      style={{
        width: config.dimension,
        height: config.dimension,
      }}
      aria-hidden="true"
    >
      +{count}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function AvatarGroupStack({
  avatars,
  maxVisible = DEFAULT_MAX_VISIBLE,
  size = DEFAULT_SIZE,
  className,
}: AvatarGroupStackProps) {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const overflowCount = Math.max(0, avatars.length - maxVisible);
  const totalCount = avatars.length;

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      role="group"
      aria-label={`Avatar group showing ${totalCount} ${totalCount === 1 ? 'person' : 'people'}`}
    >
      <ol className="flex items-center" role="list">
        {visibleAvatars.map((avatar, index) => (
          <AvatarCircle
            key={`${avatar.src}-${index}`}
            avatar={avatar}
            size={size}
            isFirst={index === 0}
          />
        ))}
        {overflowCount > 0 && (
          <OverflowIndicator count={overflowCount} size={size} />
        )}
      </ol>

      {/* Screen-reader accessible count */}
      <span className="sr-only">
        {overflowCount > 0
          ? `Showing ${visibleAvatars.length} of ${totalCount} people. ${overflowCount} more not shown.`
          : `Showing all ${totalCount} ${totalCount === 1 ? 'person' : 'people'}.`}
      </span>
    </div>
  );
}
