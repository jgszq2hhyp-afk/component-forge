// @version 1.0.0
// @category content
// @name content-stats-with-text
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const STAT_VALUE_SIZE = "clamp(2rem,4vw,3rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Stat {
  value: string;
  label: string;
}

interface ContentStatsWithTextProps {
  headline: string;
  description: string;
  stats: Stat[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentStatsWithText({
  headline,
  description,
  stats,
  className,
}: ContentStatsWithTextProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby="cswt-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Text */}
          <div>
            <h2
              id="cswt-heading"
              className="mb-4 font-bold tracking-tight"
              style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
            >
              {headline}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border p-5 text-center"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                <p
                  className="font-bold tracking-tight"
                  style={{ fontSize: STAT_VALUE_SIZE, color: "var(--primary)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
