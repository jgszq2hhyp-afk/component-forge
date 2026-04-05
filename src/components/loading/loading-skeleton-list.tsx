// @version 1.0.0
// @category loading
// @name loading-skeleton-list
// @source custom

import { cn } from "@/lib/utils";

const ROW_COUNT = 5;
const AVATAR_SIZE = 40;

interface LoadingSkeletonListProps {
  rows?: number;
  className?: string;
}

export default function LoadingSkeletonList({
  rows = ROW_COUNT,
  className,
}: LoadingSkeletonListProps) {
  return (
    <div className={cn("w-full space-y-3", className)} role="status" aria-label="Loading content">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
          {/* Avatar skeleton */}
          <div
            className="shrink-0 rounded-full motion-safe:animate-pulse"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, backgroundColor: "color-mix(in srgb, var(--foreground) 8%, transparent)" }}
            aria-hidden="true"
          />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded motion-safe:animate-pulse" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 10%, transparent)" }} aria-hidden="true" />
            <div className="h-3 w-2/3 rounded motion-safe:animate-pulse" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 6%, transparent)", animationDelay: "150ms" }} aria-hidden="true" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading content</span>
    </div>
  );
}
