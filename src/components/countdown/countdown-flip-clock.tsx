// @version 1.0.0
// @category countdown
// @name countdown-flip-clock
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
const CARD_SIZE = "clamp(3.5rem,10vw,5.5rem)";
const DIGIT_SIZE = "clamp(1.5rem,4vw,2.5rem)";
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CountdownFlipClockProps {
  headline?: string;
  targetDate: string;
  expiredMessage?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calcRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / MS_PER_DAY),
    hours: Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND),
    expired: diff <= 0,
  };
}

function pad(n: number): string { return String(n).padStart(2, "0"); }

/* ------------------------------------------------------------------ */
/*  FlipCard                                                           */
/* ------------------------------------------------------------------ */

function FlipCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg border"
        style={{
          width: CARD_SIZE,
          height: CARD_SIZE,
          borderColor: "var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        {/* Top half shade */}
        <div
          className="absolute inset-x-0 top-0 h-1/2"
          style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, transparent)" }}
          aria-hidden="true"
        />
        {/* Center line */}
        <div
          className="absolute inset-x-0 top-1/2 h-px"
          style={{ backgroundColor: "var(--border)" }}
          aria-hidden="true"
        />
        <span
          className="relative z-10 font-bold tabular-nums"
          style={{ fontSize: DIGIT_SIZE, color: "var(--foreground)" }}
        >
          {value}
        </span>
      </div>
      <span
        className="text-[0.65rem] font-semibold uppercase tracking-widest"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CountdownFlipClock({
  headline,
  targetDate,
  expiredMessage = "Time's up!",
  className,
}: CountdownFlipClockProps) {
  const target = new Date(targetDate).getTime();
  const [state, setState] = useState(() => calcRemaining(target));

  useEffect(() => {
    const id = setInterval(() => {
      const next = calcRemaining(target);
      setState(next);
      if (next.expired) clearInterval(id);
    }, MS_PER_SECOND);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "cfc-heading" : undefined}
    >
      <div className="mx-auto max-w-3xl text-center">
        {headline && (
          <h2
            id="cfc-heading"
            className="mb-8 font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        {state.expired ? (
          <p className="text-lg font-medium" style={{ color: "var(--primary)" }}>
            {expiredMessage}
          </p>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-5" role="timer" aria-live="polite">
            <FlipCard value={pad(state.days)} label="Days" />
            <FlipCard value={pad(state.hours)} label="Hours" />
            <FlipCard value={pad(state.minutes)} label="Min" />
            <FlipCard value={pad(state.seconds)} label="Sec" />
          </div>
        )}
      </div>
    </section>
  );
}
