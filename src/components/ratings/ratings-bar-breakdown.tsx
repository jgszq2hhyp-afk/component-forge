// @version 1.0.0
// @category ratings
// @name ratings-bar-breakdown
// @source custom

import { cn } from "@/lib/utils";

const BAR_HEIGHT = 8;
const STAR_COUNT = 5;

interface RatingsBarBreakdownProps { distribution: number[]; totalReviews: number; averageRating: number; className?: string; }

export default function RatingsBarBreakdown({ distribution, totalReviews, averageRating, className }: RatingsBarBreakdownProps) {
  const maxCount = Math.max(...distribution, 1);
  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "var(--foreground)" }}>{averageRating.toFixed(1)}</span>
        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>out of 5 ({totalReviews} reviews)</span>
      </div>
      <div className="space-y-2">
        {Array.from({ length: STAR_COUNT }, (_, i) => STAR_COUNT - i).map((star) => {
          const count = distribution[star - 1] ?? 0;
          const pct = (count / maxCount) * 100;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-3 text-right text-xs tabular-nums font-medium" style={{ color: "var(--foreground)" }}>{star}</span>
              <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--primary)" }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <div className="flex-1 overflow-hidden rounded-full" style={{ height: BAR_HEIGHT, backgroundColor: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "var(--primary)" }} />
              </div>
              <span className="w-8 text-right text-xs tabular-nums" style={{ color: "var(--muted-foreground)" }}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
