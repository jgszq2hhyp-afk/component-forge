// @version 1.0.0
// @category cookie-consent
// @name cookie-consent-bottom-bar
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BAR_PX = "clamp(0.75rem,2vw,1.5rem)";
const BTN_CLASSES = "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CookieConsentBottomBarProps {
  message?: string;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CookieConsentBottomBar({
  message = "This site uses cookies to enhance your browsing experience.",
  onAccept,
  onReject,
  className,
}: CookieConsentBottomBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleAccept = () => { onAccept?.(); setVisible(false); };
  const handleReject = () => { onReject?.(); setVisible(false); };

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t",
        "motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300",
        "motion-reduce:animate-none",
        className,
      )}
      role="dialog"
      aria-label="Cookie consent"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        padding: BAR_PX,
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm" style={{ color: "var(--foreground)" }}>
          {message}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleReject}
            className={BTN_CLASSES}
            style={{
              backgroundColor: "transparent",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className={BTN_CLASSES}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
