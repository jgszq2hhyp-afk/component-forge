// @version 1.0.0
// @category pagination
// @name PaginationLoadMore
// @source custom

"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─── Named Constants ─── */
const BODY_FONT_SIZE = "clamp(0.875rem, 1.2vw, 1rem)";
const LABEL_FONT_SIZE = "clamp(0.75rem, 1vw, 0.875rem)";
const BUTTON_PADDING_X = "clamp(1.5rem, 3vw, 2.5rem)";
const BUTTON_PADDING_Y = "0.75rem";
const BUTTON_BORDER_RADIUS = "0.5rem";
const PROGRESS_HEIGHT = "0.375rem";
const PROGRESS_BORDER_RADIUS = "9999px";
const SECTION_GAP = "1.25rem";
const SPINNER_SIZE = "1.25rem";
const SPINNER_BORDER_WIDTH = "2px";

/* ─── Props ─── */
interface PaginationLoadMoreProps {
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  loadedCount: number;
  totalCount: number;
  loadMoreLabel?: string;
  className?: string;
}

/* ─── Spinner ─── */
function LoadingSpinner(): ReactNode {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="motion-safe:animate-spin motion-reduce:hidden"
      style={{
        display: "inline-block",
        width: SPINNER_SIZE,
        height: SPINNER_SIZE,
        borderWidth: SPINNER_BORDER_WIDTH,
        borderStyle: "solid",
        borderColor: "var(--primary-foreground)",
        borderTopColor: "transparent",
        borderRadius: "50%",
      }}
    />
  );
}

/* ─── Reduced Motion Fallback ─── */
function LoadingDots(): ReactNode {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="hidden motion-reduce:inline"
      style={{ fontSize: BODY_FONT_SIZE }}
    >
      Loading...
    </span>
  );
}

/* ─── Component ─── */
export default function PaginationLoadMore({
  onLoadMore,
  isLoading = false,
  hasMore = true,
  loadedCount,
  totalCount,
  loadMoreLabel = "Load more",
  className,
}: PaginationLoadMoreProps): ReactNode {
  const safeTotal = Math.max(totalCount, 1);
  const safeLoaded = Math.min(loadedCount, safeTotal);
  const percentage = Math.round((safeLoaded / safeTotal) * 100);

  return (
    <div
      className={cn("flex w-full flex-col items-center", className)}
      style={{ gap: SECTION_GAP }}
      role="region"
      aria-label="Load more results"
    >
      {/* ── Result Count ── */}
      <p
        className="text-center"
        style={{
          fontSize: BODY_FONT_SIZE,
          color: "var(--muted-foreground)",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        Showing{" "}
        <span
          className="font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {safeLoaded}
        </span>{" "}
        of{" "}
        <span
          className="font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {totalCount}
        </span>
      </p>

      {/* ── Progress Bar ── */}
      <div
        className="w-full max-w-xs overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% loaded`}
        style={{
          height: PROGRESS_HEIGHT,
          borderRadius: PROGRESS_BORDER_RADIUS,
          backgroundColor: "var(--muted)",
        }}
      >
        <div
          className="h-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
          style={{
            width: `${percentage}%`,
            borderRadius: PROGRESS_BORDER_RADIUS,
            backgroundColor: "var(--primary)",
          }}
        />
      </div>

      {/* ── Percentage Label ── */}
      <p
        className="text-center"
        style={{
          fontSize: LABEL_FONT_SIZE,
          color: "var(--muted-foreground)",
        }}
        aria-hidden="true"
      >
        {percentage}%
      </p>

      {/* ── Load More Button ── */}
      {hasMore ? (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className={cn(
            "inline-flex items-center justify-center gap-2 font-medium",
            "motion-safe:transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
          style={{
            paddingInline: BUTTON_PADDING_X,
            paddingBlock: BUTTON_PADDING_Y,
            borderRadius: BUTTON_BORDER_RADIUS,
            fontSize: BODY_FONT_SIZE,
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "1px solid var(--primary)",
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <LoadingDots />
              <span className="motion-reduce:hidden">{loadMoreLabel}</span>
            </>
          ) : (
            loadMoreLabel
          )}
        </button>
      ) : (
        <p
          className="text-center font-medium"
          style={{
            fontSize: BODY_FONT_SIZE,
            color: "var(--muted-foreground)",
          }}
        >
          All results loaded
        </p>
      )}
    </div>
  );
}
