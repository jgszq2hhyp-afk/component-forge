// @version 1.0.0
// @category pagination
// @name pagination-compact
// @source custom

import { cn } from "@/lib/utils";

interface PaginationCompactProps {
  currentPage: number;
  totalPages: number;
  baseHref?: string;
  className?: string;
}

export default function PaginationCompact({ currentPage, totalPages, baseHref = "#", className }: PaginationCompactProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const btnStyle = { color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)} aria-label="Pagination">
      <a href={hasPrev ? `${baseHref}?page=${currentPage - 1}` : undefined} className={cn("rounded p-2 focus-visible:outline-none focus-visible:ring-2", !hasPrev && "pointer-events-none opacity-30")} style={btnStyle} aria-disabled={!hasPrev} aria-label="Previous page">
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </a>
      <span className="px-2 text-sm tabular-nums font-medium" style={{ color: "var(--foreground)" }}>{currentPage} / {totalPages}</span>
      <a href={hasNext ? `${baseHref}?page=${currentPage + 1}` : undefined} className={cn("rounded p-2 focus-visible:outline-none focus-visible:ring-2", !hasNext && "pointer-events-none opacity-30")} style={btnStyle} aria-disabled={!hasNext} aria-label="Next page">
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </a>
    </nav>
  );
}
