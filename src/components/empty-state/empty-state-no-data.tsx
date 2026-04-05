// @version 1.0.0
// @category empty-state
// @name empty-state-no-data
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface EmptyStateNoDataProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function EmptyStateNoData({
  title = "No data yet",
  description = "Data will appear here once it becomes available.",
  className,
}: EmptyStateNoDataProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 5%, transparent)" }}>
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
            <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
      </div>
    </section>
  );
}
