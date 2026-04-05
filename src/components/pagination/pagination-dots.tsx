// @version 1.0.0
// @category pagination
// @name pagination-dots
// @source custom

import { cn } from "@/lib/utils";

const DOT_SIZE = 10;

interface PaginationDotsProps {
  total: number;
  current: number;
  className?: string;
}

export default function PaginationDots({ total, current, className }: PaginationDotsProps) {
  return (
    <nav className={cn("flex items-center justify-center gap-2", className)} aria-label="Pagination">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className="rounded-full motion-safe:transition-all motion-safe:duration-200" style={{ width: i === current ? DOT_SIZE * 2.5 : DOT_SIZE, height: DOT_SIZE, backgroundColor: i === current ? "var(--primary)" : "var(--border)", borderRadius: "9999px" }} aria-current={i === current ? "page" : undefined} aria-label={`Page ${i + 1}`} />
      ))}
    </nav>
  );
}
