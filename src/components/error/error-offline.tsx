// @version 1.0.0
// @category error
// @name error-offline
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface ErrorOfflineProps {
  headline?: string;
  description?: string;
  className?: string;
}

export default function ErrorOffline({
  headline = "You're Offline",
  description = "Check your internet connection and try again.",
  className,
}: ErrorOfflineProps) {
  return (
    <section className={cn("flex min-h-[60vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 5%, transparent)" }}>
          <svg className="size-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
          </svg>
        </div>
        <h1 className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h1>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>
      </div>
    </section>
  );
}
