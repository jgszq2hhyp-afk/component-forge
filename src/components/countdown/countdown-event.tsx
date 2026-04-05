// @version 1.0.0
// @category countdown
// @name countdown-event
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
const DIGIT_SIZE = "clamp(2rem,5vw,3.5rem)";
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CountdownEventProps {
  headline?: string;
  targetDate: string;
  expiredMessage?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calcTimeLeft(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / MS_PER_DAY),
    hours: Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CountdownEvent({
  headline = "Event Starts In",
  targetDate,
  expiredMessage = "The event has started!",
  className,
}: CountdownEventProps) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => {
      const tl = calcTimeLeft(target);
      setTimeLeft(tl);
      if (!tl) clearInterval(id);
    }, MS_PER_SECOND);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: string }[] = timeLeft
    ? [
        { label: "Days", value: pad(timeLeft.days) },
        { label: "Hours", value: pad(timeLeft.hours) },
        { label: "Minutes", value: pad(timeLeft.minutes) },
        { label: "Seconds", value: pad(timeLeft.seconds) },
      ]
    : [];

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby="ce-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="ce-heading"
          className="mb-8 font-bold tracking-tight"
          style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
        >
          {headline}
        </h2>

        {timeLeft ? (
          <div className="flex justify-center gap-4" role="timer" aria-live="polite">
            {units.map((u) => (
              <div key={u.label} className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center rounded-xl border"
                  style={{
                    width: "clamp(4rem,12vw,6rem)",
                    height: "clamp(4rem,12vw,6rem)",
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                  }}
                >
                  <span
                    className="font-bold tabular-nums"
                    style={{ fontSize: DIGIT_SIZE, color: "var(--foreground)" }}
                  >
                    {u.value}
                  </span>
                </div>
                <span
                  className="mt-2 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg font-medium" style={{ color: "var(--primary)" }}>
            {expiredMessage}
          </p>
        )}
      </div>
    </section>
  );
}
