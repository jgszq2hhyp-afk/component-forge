// @version 1.0.0
// @category comparison
// @name comparison-toggle-cards
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface OptionData {
  title: string;
  features: string[];
}

interface ComparisonToggleCardsProps {
  headline?: string;
  optionA: OptionData;
  optionB: OptionData;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparisonToggleCards({
  headline,
  optionA,
  optionB,
  className,
}: ComparisonToggleCardsProps) {
  const [active, setActive] = useState<"a" | "b">("a");

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "ctc-heading" : undefined}
    >
      <div className="mx-auto max-w-4xl">
        {headline && (
          <h2
            id="ctc-heading"
            className="mb-8 text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        {/* Toggle */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-sm font-medium" style={{ color: active === "a" ? "var(--foreground)" : "var(--muted-foreground)" }}>{optionA.title}</span>
          <button
            type="button"
            role="switch"
            aria-checked={active === "b"}
            onClick={() => setActive((p) => (p === "a" ? "b" : "a"))}
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
            style={{
              backgroundColor: active === "b" ? "var(--primary)" : "var(--border)",
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-6 rounded-full shadow transition-transform duration-200",
                "motion-reduce:transition-none",
                active === "b" && "translate-x-5",
              )}
              style={{ backgroundColor: "var(--background)" }}
              aria-hidden="true"
            />
          </button>
          <span className="text-sm font-medium" style={{ color: active === "b" ? "var(--foreground)" : "var(--muted-foreground)" }}>{optionB.title}</span>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { key: "a" as const, data: optionA },
            { key: "b" as const, data: optionB },
          ].map(({ key, data }) => (
            <div
              key={key}
              className={cn(
                "rounded-xl border-2 p-6 transition-all duration-200",
                "motion-reduce:transition-none",
              )}
              style={{
                borderColor: active === key ? "var(--primary)" : "var(--border)",
                backgroundColor: "var(--card)",
                opacity: active === key ? 1 : 0.6,
              }}
            >
              <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--foreground)" }}>{data.title}</h3>
              <ul className="space-y-2" role="list">
                {data.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
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
