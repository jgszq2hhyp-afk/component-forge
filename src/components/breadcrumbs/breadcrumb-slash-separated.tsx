// @version 1.0.0
// @category breadcrumbs
// @name breadcrumb-slash-separated
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SEPARATOR_CHAR = '/' as const;
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

interface BreadcrumbSlashSeparatedProps {
  /** Ordered list of breadcrumb items (last = current page) */
  items: BreadcrumbItem[];
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Separator                                                         */
/* ------------------------------------------------------------------ */

function SlashSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mx-2 select-none text-[var(--color-text-muted,hsl(0_0%_65%))]"
    >
      {SEPARATOR_CHAR}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbSlashSeparated({
  items,
  className,
}: BreadcrumbSlashSeparatedProps) {
  // Guard against absurdly long lists
  const safeItems = items.slice(0, MAX_ITEMS_SAFETY);

  if (safeItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex flex-wrap items-center" role="list">
        {safeItems.map((item, index) => {
          const isLast = index === safeItems.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && <SlashSeparator />}

              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    'text-sm font-semibold',
                    'text-[var(--color-text,hsl(0_0%_8%))]',
                  )}
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'text-sm',
                    'text-[var(--color-text-muted,hsl(0_0%_40%))]',
                    'hover:text-[var(--color-text,hsl(0_0%_10%))]',
                    'hover:underline underline-offset-2',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                    'motion-safe:transition-colors motion-safe:duration-200',
                    'motion-reduce:transition-none',
                    'rounded-sm',
                  )}
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)',
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
