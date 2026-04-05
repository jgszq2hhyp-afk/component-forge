// @version 1.0.0
// @category breadcrumbs
// @name BreadcrumbWithIcon
// @source custom

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const ICON_SIZE = 16;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbWithIconProps {
  items: BreadcrumbItem[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChevronSeparator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[var(--muted-foreground)]"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbWithIcon({
  items,
  className,
}: BreadcrumbWithIconProps) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('w-full px-[clamp(1rem,4vw,2rem)] py-3', className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm" role="list">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isCurrent = index === lastIndex;
          const icon = isFirst ? (item.icon ?? <HomeIcon />) : item.icon;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span className="select-none">
                  <ChevronSeparator />
                </span>
              )}

              {isCurrent || !item.href ? (
                <span
                  className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]"
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {icon && <span className="shrink-0">{icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1.5',
                    'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
                    'underline-offset-4 hover:underline',
                    'transition-colors duration-200 motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                  )}
                  style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
                >
                  {icon && <span className="shrink-0">{icon}</span>}
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
