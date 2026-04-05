// @version 1.0.0
// @category banners
// @name banner-maintenance-mode
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const ICON_SIZE = 'size-5' as const;
const MAX_WIDTH = 'max-w-5xl' as const;
const DEFAULT_ESTIMATED_TIME = '' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BannerMaintenanceModeProps {
  /** Maintenance message shown to users */
  message: string;
  /** Optional estimated time for completion (e.g. "ca. 30 Minuten") */
  estimatedTime?: string;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Wrench Icon (inline SVG)                                          */
/* ------------------------------------------------------------------ */

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(ICON_SIZE, 'shrink-0', className)}
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Clock Icon (inline SVG)                                           */
/* ------------------------------------------------------------------ */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4 shrink-0', className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BannerMaintenanceMode({
  message,
  estimatedTime = DEFAULT_ESTIMATED_TIME,
  className,
}: BannerMaintenanceModeProps) {
  return (
    <div
      role="alert"
      className={cn(
        'w-full border-b',
        'border-[var(--color-warning-border,hsl(38_80%_65%))]',
        'bg-[var(--color-warning-bg,hsl(38_95%_92%))]',
        'px-4 py-3 sm:px-6',
        className,
      )}
    >
      <div className={cn('mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3', MAX_WIDTH)}>
        {/* Icon + message */}
        <div className="flex items-center gap-2.5">
          <WrenchIcon
            className={cn(
              'text-[var(--color-warning-icon,hsl(38_85%_40%))]',
              'motion-safe:animate-[wrench-wobble_1.5s_ease-in-out_infinite]',
              'motion-reduce:animate-none',
            )}
          />
          <p
            className="text-sm font-medium leading-snug text-[var(--color-warning-text,hsl(38_70%_22%))]"
            style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.25vw, 0.9375rem)' }}
          >
            {message}
          </p>
        </div>

        {/* Estimated time badge */}
        {estimatedTime && (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 self-start rounded-full',
              'border border-[var(--color-warning-border,hsl(38_80%_65%))]',
              'bg-[var(--color-warning-badge-bg,hsl(38_90%_86%))]',
              'px-3 py-1 text-xs font-medium',
              'text-[var(--color-warning-text,hsl(38_70%_22%))]',
              'sm:ml-auto sm:self-center',
            )}
          >
            <ClockIcon className="text-[var(--color-warning-icon,hsl(38_85%_40%))]" />
            {estimatedTime}
          </span>
        )}
      </div>

      {/* Wrench wobble keyframe */}
      <style>{`
        @keyframes wrench-wobble {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-12deg); }
          75%      { transform: rotate(12deg); }
        }
      `}</style>
    </div>
  );
}
