// @version 1.0.0
// @category empty-state
// @name empty-state-search
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface EmptyStateSearchProps {
  query?: string;
  suggestions?: string[];
  className?: string;
}

export default function EmptyStateSearch({
  query,
  suggestions = [],
  className,
}: EmptyStateSearchProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 5%, transparent)" }}>
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
          No results found{query ? ` for "${query}"` : ""}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
        {suggestions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Try searching for:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <span key={s} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
