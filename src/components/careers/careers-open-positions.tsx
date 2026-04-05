// @version 1.0.0
// @category careers
// @name careers-open-positions
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PADDING_Y = "clamp(3rem,8vw,6rem)";
const SECTION_PADDING_X = "clamp(1rem,4vw,2rem)";

const TYPE_COLORS: Record<string, string> = {
  "full-time": "var(--primary)",
  "part-time": "var(--accent, var(--muted-foreground))",
  remote: "var(--primary)",
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Position {
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "remote";
  href: string;
}

interface CareersOpenPositionsProps {
  headline?: string;
  positions: Position[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function groupByLocation(positions: Position[]): Map<string, Position[]> {
  const map = new Map<string, Position[]>();
  for (const pos of positions) {
    const group = map.get(pos.location) ?? [];
    group.push(pos);
    map.set(pos.location, group);
  }
  return map;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersOpenPositions({
  headline = "Open Positions",
  positions,
  className,
}: CareersOpenPositionsProps) {
  const grouped = groupByLocation(positions);

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PADDING_Y} ${SECTION_PADDING_X}` }}
      aria-labelledby={headline ? "positions-heading" : undefined}
    >
      <div className="mx-auto max-w-4xl">
        {headline && (
          <h2
            id="positions-heading"
            className="mb-[clamp(2rem,4vw,3rem)] font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        {positions.length === 0 && (
          <p style={{ color: "var(--muted-foreground)" }}>
            No open positions at the moment. Check back soon!
          </p>
        )}

        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([location, jobs]) => (
            <div key={location}>
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                {location}
              </h3>
              <ul className="divide-y" style={{ borderColor: "var(--border)" }} role="list">
                {jobs.map((job) => (
                  <li key={`${job.title}-${job.department}`}>
                    <a
                      href={job.href}
                      className={cn(
                        "flex flex-wrap items-center justify-between gap-3 py-4",
                        "transition-colors duration-200",
                        "motion-safe:hover:bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]",
                        "rounded-lg px-3 -mx-3",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      )}
                      style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
                    >
                      <div>
                        <span
                          className="font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {job.title}
                        </span>
                        <span
                          className="ml-2 text-sm"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {job.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[job.type] ?? "var(--muted-foreground)"} 10%, transparent)`,
                            color: TYPE_COLORS[job.type] ?? "var(--muted-foreground)",
                          }}
                        >
                          {job.type}
                        </span>
                        <svg
                          className="size-4"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          <path d="M5 10h10M11 6l4 4-4 4" />
                        </svg>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
