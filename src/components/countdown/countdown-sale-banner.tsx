// @version 1.0.0
// @category countdown
// @name countdown-sale-banner
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BANNER_PY = "clamp(0.75rem,2vw,1rem)";
const BANNER_PX = "clamp(1rem,4vw,2rem)";
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CountdownSaleBannerProps {
  message: string;
  targetDate: string;
  ctaLabel?: string;
  ctaHref?: string;
  onDismiss?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pad(n: number): string { return String(n).padStart(2, "0"); }

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CountdownSaleBanner({
  message,
  targetDate,
  ctaLabel,
  ctaHref = "#",
  onDismiss,
  className,
}: CountdownSaleBannerProps) {
  const target = new Date(targetDate).getTime();
  const [now, setNow] = useState(Date.now());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MS_PER_SECOND);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const expired = diff <= 0;

  const hours = Math.floor(diff / MS_PER_HOUR);
  const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

  if (!visible || expired) return null;

  return (
    <div
      className={cn(
        "relative w-full",
        "motion-safe:animate-in motion-safe:slide-in-from-top motion-safe:duration-300",
        "motion-reduce:animate-none",
        className,
      )}
      role="alert"
      style={{
        padding: `${BANNER_PY} ${BANNER_PX}`,
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
        <span className="font-medium">{message}</span>

        <span className="font-bold tabular-nums" role="timer" aria-live="polite">
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>

        {ctaLabel && (
          <a
            href={ctaHref}
            className={cn(
              "rounded-full px-4 py-1 text-xs font-semibold",
              "motion-safe:transition-opacity motion-safe:duration-150 hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
            style={{
              backgroundColor: "var(--primary-foreground)",
              color: "var(--primary)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            {ctaLabel}
          </a>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={() => { setVisible(false); onDismiss(); }}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Dismiss banner"
          style={{ ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))" }}
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
