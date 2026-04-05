// @version 1.0.0
// @category pagination
// @name pagination-simple
// @source custom

import { cn } from "@/lib/utils";

const BTN_CLASSES = "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface PaginationSimpleProps {
  currentPage: number;
  totalPages: number;
  baseHref?: string;
  className?: string;
}

export default function PaginationSimple({ currentPage, totalPages, baseHref = "#", className }: PaginationSimpleProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  return (
    <nav className={cn("flex items-center justify-center gap-2", className)} aria-label="Pagination">
      <a href={hasPrev ? `${baseHref}?page=${currentPage - 1}` : undefined} className={cn(BTN_CLASSES, !hasPrev && "pointer-events-none opacity-40")} style={{ color: "var(--foreground)", border: "1px solid var(--border)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} aria-disabled={!hasPrev}>
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        <span className="ml-1">Prev</span>
      </a>
      <span className="text-sm tabular-nums" style={{ color: "var(--muted-foreground)" }}>Page {currentPage} of {totalPages}</span>
      <a href={hasNext ? `${baseHref}?page=${currentPage + 1}` : undefined} className={cn(BTN_CLASSES, !hasNext && "pointer-events-none opacity-40")} style={{ color: "var(--foreground)", border: "1px solid var(--border)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} aria-disabled={!hasNext}>
        <span className="mr-1">Next</span>
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </a>
    </nav>
  );
}
