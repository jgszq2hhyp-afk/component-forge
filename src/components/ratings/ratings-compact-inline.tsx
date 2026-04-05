// @version 1.0.0
// @category ratings
// @name ratings-compact-inline
// @source custom

import { cn } from "@/lib/utils";

interface RatingsCompactInlineProps { rating: number; reviewCount?: number; maxRating?: number; className?: string; }

export default function RatingsCompactInline({ rating, reviewCount, maxRating = 5, className }: RatingsCompactInlineProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--primary)" }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
      <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>{rating.toFixed(1)}</span>
      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>/ {maxRating}</span>
      {reviewCount !== undefined && <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>({reviewCount})</span>}
    </div>
  );
}
