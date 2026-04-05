// @version 1.0.0
// @category empty-state
// @name empty-state-error
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface EmptyStateErrorProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export default function EmptyStateError({
  title = "Something went wrong",
  description = "We couldn't load the data. Please try again.",
  retryLabel = "Retry",
  onRetry,
  className,
}: EmptyStateErrorProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--destructive, red) 10%, transparent)" }}>
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--destructive, red)" }} aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
          </svg>
        </div>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            {retryLabel}
          </button>
        )}
      </div>
    </section>
  );
}
