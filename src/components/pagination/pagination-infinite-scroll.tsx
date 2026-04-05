// @version 1.0.0
// @category pagination
// @name pagination-infinite-scroll
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

interface PaginationInfiniteScrollProps {
  hasMore: boolean;
  loading?: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function PaginationInfiniteScroll({ hasMore, loading = false, onLoadMore, children, className }: PaginationInfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMore && !loading) onLoadMore();
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(handleIntersect, { rootMargin: "200px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div className={cn("w-full", className)}>
      {children}
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />
      {loading && (
        <div className="flex justify-center py-6" role="status" aria-label="Loading more">
          <div className="size-6 rounded-full border-2 motion-safe:animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "var(--primary)" }} />
        </div>
      )}
      {!hasMore && (
        <p className="py-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>You&apos;ve reached the end</p>
      )}
    </div>
  );
}
