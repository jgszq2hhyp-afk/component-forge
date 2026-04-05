// @version 1.0.0
// @category pagination
// @name PaginationNumbered
// @source custom

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─── Named Constants ─── */
const BODY_FONT_SIZE = "clamp(0.875rem, 1.2vw, 1rem)";
const BUTTON_SIZE = "2.5rem";
const BUTTON_BORDER_RADIUS = "0.5rem";
const GAP = "0.375rem";
const ICON_SIZE = "1.25rem";
const ELLIPSIS_SYMBOL = "\u2026";
const SIBLING_COUNT = 1;
const BOUNDARY_COUNT = 1;

/* ─── Props ─── */
interface PaginationNumberedProps {
  currentPage: number;
  totalPages: number;
  baseHref: string;
  className?: string;
}

/* ─── Icons ─── */
function ChevronLeftIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ─── Helper: Build page range ─── */
type PageItem = number | "ellipsis-start" | "ellipsis-end";

function buildPageRange(
  currentPage: number,
  totalPages: number
): PageItem[] {
  const items: PageItem[] = [];

  if (totalPages <= (BOUNDARY_COUNT + SIBLING_COUNT) * 2 + 3) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
    return items;
  }

  const leftBound = Math.max(currentPage - SIBLING_COUNT, BOUNDARY_COUNT + 2);
  const rightBound = Math.min(
    currentPage + SIBLING_COUNT,
    totalPages - BOUNDARY_COUNT - 1
  );

  /* Start boundary */
  for (let i = 1; i <= BOUNDARY_COUNT; i++) {
    items.push(i);
  }

  /* Left ellipsis */
  if (leftBound > BOUNDARY_COUNT + 1) {
    items.push("ellipsis-start");
  } else {
    items.push(BOUNDARY_COUNT + 1);
  }

  /* Sibling pages */
  for (let i = leftBound; i <= rightBound; i++) {
    if (!items.includes(i)) {
      items.push(i);
    }
  }

  /* Right ellipsis */
  if (rightBound < totalPages - BOUNDARY_COUNT) {
    items.push("ellipsis-end");
  } else {
    if (!items.includes(totalPages - BOUNDARY_COUNT)) {
      items.push(totalPages - BOUNDARY_COUNT);
    }
  }

  /* End boundary */
  for (let i = totalPages - BOUNDARY_COUNT + 1; i <= totalPages; i++) {
    if (!items.includes(i)) {
      items.push(i);
    }
  }

  return items;
}

/* ─── Helper: Build href ─── */
function buildHref(baseHref: string, page: number): string {
  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}page=${page}`;
}

/* ─── Shared button styles ─── */
const baseButtonStyle: React.CSSProperties = {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: BUTTON_BORDER_RADIUS,
  fontSize: BODY_FONT_SIZE,
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

/* ─── Component ─── */
export default function PaginationNumbered({
  currentPage,
  totalPages,
  baseHref,
  className,
}: PaginationNumberedProps): ReactNode {
  if (totalPages <= 1) return null;

  const clampedCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const pages = buildPageRange(clampedCurrent, totalPages);
  const hasPrevious = clampedCurrent > 1;
  const hasNext = clampedCurrent < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex w-full items-center justify-center", className)}
    >
      <ul
        className="flex flex-wrap items-center"
        style={{ gap: GAP }}
      >
        {/* ── Previous ── */}
        <li>
          {hasPrevious ? (
            <a
              href={buildHref(baseHref, clampedCurrent - 1)}
              aria-label="Go to previous page"
              className={cn(
                "inline-flex items-center justify-center",
                "motion-safe:transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              )}
              style={{
                ...baseButtonStyle,
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <ChevronLeftIcon />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center justify-center"
              style={{
                ...baseButtonStyle,
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <ChevronLeftIcon />
            </span>
          )}
        </li>

        {/* ── Page Numbers ── */}
        {pages.map((item) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <li key={item} aria-hidden="true">
                <span
                  className="inline-flex items-center justify-center select-none"
                  style={{
                    width: BUTTON_SIZE,
                    height: BUTTON_SIZE,
                    fontSize: BODY_FONT_SIZE,
                    color: "var(--muted-foreground)",
                  }}
                >
                  {ELLIPSIS_SYMBOL}
                </span>
              </li>
            );
          }

          const isCurrent = item === clampedCurrent;

          return (
            <li key={item}>
              <a
                href={buildHref(baseHref, item)}
                aria-label={`Go to page ${item}`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex items-center justify-center font-medium",
                  "motion-safe:transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                )}
                style={{
                  ...baseButtonStyle,
                  backgroundColor: isCurrent ? "var(--primary)" : "var(--card)",
                  color: isCurrent ? "var(--primary-foreground)" : "var(--foreground)",
                  border: isCurrent
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                }}
              >
                {item}
              </a>
            </li>
          );
        })}

        {/* ── Next ── */}
        <li>
          {hasNext ? (
            <a
              href={buildHref(baseHref, clampedCurrent + 1)}
              aria-label="Go to next page"
              className={cn(
                "inline-flex items-center justify-center",
                "motion-safe:transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              )}
              style={{
                ...baseButtonStyle,
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <ChevronRightIcon />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center justify-center"
              style={{
                ...baseButtonStyle,
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <ChevronRightIcon />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
