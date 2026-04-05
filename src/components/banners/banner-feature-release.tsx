// @version 1.0.0
// @category banners
// @name banner-feature-release
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const VARIANT_STYLES = {
  info: {
    bg: 'bg-[var(--color-info-bg,hsl(220_80%_95%))]',
    border: 'border-[var(--color-info-border,hsl(220_70%_80%))]',
    text: 'text-[var(--color-info-text,hsl(220_70%_30%))]',
    icon: 'text-[var(--color-info-icon,hsl(220_70%_50%))]',
  },
  success: {
    bg: 'bg-[var(--color-success-bg,hsl(145_60%_93%))]',
    border: 'border-[var(--color-success-border,hsl(145_50%_70%))]',
    text: 'text-[var(--color-success-text,hsl(145_50%_22%))]',
    icon: 'text-[var(--color-success-icon,hsl(145_55%_38%))]',
  },
  warning: {
    bg: 'bg-[var(--color-warning-bg,hsl(38_95%_92%))]',
    border: 'border-[var(--color-warning-border,hsl(38_80%_65%))]',
    text: 'text-[var(--color-warning-text,hsl(38_70%_25%))]',
    icon: 'text-[var(--color-warning-icon,hsl(38_85%_45%))]',
  },
} as const;

type Variant = keyof typeof VARIANT_STYLES;

const DEFAULT_VARIANT: Variant = 'info';
const DEFAULT_HREF = '#' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BannerFeatureReleaseProps {
  /** Headline / feature title */
  title: string;
  /** Link target for "Learn more" */
  href?: string;
  /** Visual variant */
  variant?: Variant;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sparkle Icon (inline SVG)                                         */
/* ------------------------------------------------------------------ */

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
    >
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BannerFeatureRelease({
  title,
  href = DEFAULT_HREF,
  variant = DEFAULT_VARIANT,
  className,
}: BannerFeatureReleaseProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="banner"
      className={cn(
        'w-full border-b',
        styles.bg,
        styles.border,
        'px-4 py-3 sm:px-6',
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3">
        {/* Sparkle icon */}
        <SparkleIcon
          className={cn(
            styles.icon,
            'motion-safe:animate-[sparkle-spin_2s_ease-in-out_infinite]',
            'motion-reduce:animate-none',
          )}
        />

        {/* Title */}
        <p
          className={cn(
            'text-sm font-medium leading-snug',
            styles.text,
          )}
          style={{ fontSize: 'clamp(0.8125rem, 0.75rem + 0.25vw, 0.9375rem)' }}
        >
          {title}
        </p>

        {/* Learn more link */}
        <a
          href={href}
          className={cn(
            'ml-1 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-2',
            styles.text,
            'hover:opacity-80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
            'motion-safe:transition-opacity motion-safe:duration-200',
            'motion-reduce:transition-none',
            'rounded-sm',
          )}
        >
          Mehr erfahren
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* Sparkle spin keyframe */}
      <style>{`
        @keyframes sparkle-spin {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50%      { transform: rotate(15deg) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
