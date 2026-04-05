// @version 1.0.0
// @category countdown
// @name countdown-minimal-inline
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CountdownMinimalInlineProps {
  targetDate: string;
  prefix?: string;
  expiredText?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CountdownMinimalInline({
  targetDate,
  prefix = "Ends in",
  expiredText = "Expired",
  className,
}: CountdownMinimalInlineProps) {
  const target = new Date(targetDate).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MS_PER_SECOND);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const expired = diff <= 0;

  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-sm font-medium tabular-nums", className)}
      style={{ color: expired ? "var(--muted-foreground)" : "var(--foreground)" }}
      role="timer"
      aria-live="polite"
    >
      {expired ? (
        expiredText
      ) : (
        <>
          {prefix && <span style={{ color: "var(--muted-foreground)" }}>{prefix}</span>}
          <span className="font-semibold" style={{ color: "var(--primary)" }}>
            {parts.join(" ")}
          </span>
        </>
      )}
    </span>
  );
}
