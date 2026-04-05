// @version 1.0.0
// @category breadcrumbs
// @name breadcrumb-pill-style
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const MAX_ITEMS_SAFETY = 20 as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Navigation target */
  href: string;
}

interface BreadcrumbPillStyleProps {
  /** Ordered list of breadcrumb items (last = current page) */
  items: BreadcrumbItem[];
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Chevron Icon                                                      */
/* ------------------------------------------------------------------ */

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn('size-4 shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pill classes                                                      */
/* ------------------------------------------------------------------ */

const PILL_BASE = cn(
  'inline-flex items-center rounded-full',
  'border px-3 py-1 text-xs font-medium leading-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
);

const PILL_LINK = cn(
  PILL_BASE,
  'border-[var(--color-border,hsl(0_0%_85%))]',
  'bg-[var(--color-surface,hsl(0_0%_100%))]',
  'text-[var(--color-text-muted,hsl(0_0%_35%))]',
  'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
  'hover:text-[var(--color-text,hsl(0_0%_10%))]',
  'motion-safe:transition-colors motion-safe:duration-200',
  'motion-reduce:transition-none',
);

const PILL_CURRENT = cn(
  PILL_BASE,
  'border-[var(--color-primary,hsl(220_70%_50%))]',
  'bg-[var(--color-primary-light,hsl(220_80%_96%))]',
  'text-[var(--color-primary,hsl(220_70%_50%))]',
  'font-semibold',
);

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbPillStyle({
  items,
  className,
}: BreadcrumbPillStyleProps) {
  const safeItems = items.slice(0, MAX_ITEMS_SAFETY);

  if (safeItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5" role="list">
        {safeItems.map((item, index) => {
          const isLast = index === safeItems.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {/* Chevron separator (not before first item) */}
              {index > 0 && (
                <ChevronIcon className="text-[var(--color-text-muted,hsl(0_0%_60%))]" />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className={PILL_CURRENT}
                  style={{
                    fontSize: 'clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem)',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={PILL_LINK}
                  style={{
                    fontSize: 'clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem)',
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
