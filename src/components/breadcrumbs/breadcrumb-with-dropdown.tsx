"use client"

// @version 1.0.0
// @category breadcrumbs
// @name breadcrumb-with-dropdown
// @source custom

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_MAX_VISIBLE = 3 as const;
const SEPARATOR_CHAR = '/' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbWithDropdownProps {
  /** Ordered list of breadcrumb items */
  items: BreadcrumbItem[];
  /** Maximum number of visible items before collapsing (min 2) */
  maxVisible?: number;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Chevron Separator                                                 */
/* ------------------------------------------------------------------ */

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="mx-1.5 select-none text-[var(--color-text-muted,hsl(0_0%_60%))]"
    >
      {SEPARATOR_CHAR}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbWithDropdown({
  items,
  maxVisible = DEFAULT_MAX_VISIBLE,
  className,
}: BreadcrumbWithDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const effectiveMax = Math.max(2, maxVisible);
  const shouldCollapse = items.length > effectiveMax;

  // Close dropdown on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, handleClickOutside]);

  // Close on Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  /* Determine which items to show */
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const hiddenItems = shouldCollapse ? items.slice(1, items.length - (effectiveMax - 1)) : [];
  const trailingItems = shouldCollapse ? items.slice(items.length - (effectiveMax - 1)) : items.slice(1);

  const linkClasses = cn(
    'text-sm text-[var(--color-text-muted,hsl(0_0%_40%))]',
    'hover:text-[var(--color-text,hsl(0_0%_10%))] hover:underline',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
    'motion-safe:transition-colors motion-safe:duration-200',
    'motion-reduce:transition-none',
    'rounded-sm',
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex flex-wrap items-center" role="list">
        {/* First item always visible */}
        <li className="flex items-center">
          <a href={firstItem.href} className={linkClasses}>
            {firstItem.label}
          </a>
        </li>

        {/* Collapsed "..." dropdown */}
        {shouldCollapse && hiddenItems.length > 0 && (
          <li className="flex items-center">
            <Separator />
            <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-haspopup="true"
                className={cn(
                  'rounded-md px-1.5 py-0.5 text-sm font-medium',
                  'text-[var(--color-text-muted,hsl(0_0%_40%))]',
                  'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                  'cursor-pointer',
                )}
              >
                &hellip;
              </button>

              {open && (
                <div
                  role="menu"
                  className={cn(
                    'absolute left-0 top-full z-20 mt-1',
                    'min-w-[10rem] rounded-lg border border-[var(--color-border,hsl(0_0%_88%))]',
                    'bg-[var(--color-surface,hsl(0_0%_100%))]',
                    'py-1 shadow-lg',
                    'motion-safe:animate-[dropdown-fade_0.15s_ease-out]',
                    'motion-reduce:animate-none',
                  )}
                >
                  {hiddenItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={cn(
                        'block px-3 py-1.5 text-sm',
                        'text-[var(--color-text,hsl(0_0%_15%))]',
                        'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))]',
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        )}

        {/* Trailing visible items */}
        {trailingItems.map((item, idx) => {
          const isLast = idx === trailingItems.length - 1 && !shouldCollapse
            ? true
            : shouldCollapse && idx === trailingItems.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              <Separator />
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-sm font-semibold text-[var(--color-text,hsl(0_0%_8%))]"
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={linkClasses}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>

      <style>{`
        @keyframes dropdown-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
