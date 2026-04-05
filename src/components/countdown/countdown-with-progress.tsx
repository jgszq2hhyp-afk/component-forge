// @version 1.0.0
// @category countdown
// @name countdown-with-progress
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const RING_SIZE = 160;
const RING_STROKE = 8;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CountdownWithProgressProps {
  headline?: string;
  targetDate: string;
  startDate?: string;
  expiredMessage?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CountdownWithProgress({
  headline,
  targetDate,
  startDate,
  expiredMessage = "Complete!",
  className,
}: CountdownWithProgressProps) {
  const target = new Date(targetDate).getTime();
  const start = startDate ? new Date(startDate).getTime() : target - MS_PER_DAY * 30;
  const totalDuration = target - start;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MS_PER_SECOND);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, target - now);
  const elapsed = Math.max(0, now - start);
  const progress = totalDuration > 0 ? Math.min(1, elapsed / totalDuration) : 1;
  const expired = remaining <= 0;

  const days = Math.floor(remaining / MS_PER_DAY);
  const hours = Math.floor((remaining % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((remaining % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((remaining % MS_PER_MINUTE) / MS_PER_SECOND);

  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "cwp-heading" : undefined}
    >
      <div className="mx-auto max-w-md text-center">
        {headline && (
          <h2
            id="cwp-heading"
            className="mb-8 font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        {/* Progress ring */}
        <div className="mx-auto mb-6 inline-flex items-center justify-center" role="timer" aria-live="polite">
          <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
            {/* Track */}
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              style={{ stroke: "var(--border)" }}
            />
            {/* Progress */}
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-1000"
              style={{
                stroke: "var(--primary)",
                strokeDasharray: RING_CIRCUMFERENCE,
                strokeDashoffset,
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums" style={{ color: "var(--foreground)" }}>
              {expired ? "0" : days}
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
              {days === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {expired ? (
          <p className="text-lg font-medium" style={{ color: "var(--primary)" }}>{expiredMessage}</p>
        ) : (
          <p className="text-sm tabular-nums" style={{ color: "var(--muted-foreground)" }}>
            {days}d {hours}h {minutes}m {seconds}s remaining
          </p>
        )}
      </div>
    </section>
  );
}
