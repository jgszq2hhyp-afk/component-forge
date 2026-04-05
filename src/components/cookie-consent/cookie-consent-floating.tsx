// @version 1.0.0
// @category cookie-consent
// @name cookie-consent-floating
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CARD_MAX_W = "22rem";
const BTN_CLASSES = "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CookieConsentFloatingProps {
  message?: string;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CookieConsentFloating({
  message = "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
  onAccept,
  onReject,
  className,
}: CookieConsentFloatingProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleAccept = () => { onAccept?.(); setVisible(false); };
  const handleReject = () => { onReject?.(); setVisible(false); };

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50",
        "motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in motion-safe:duration-300",
        "motion-reduce:animate-none",
        className,
      )}
      role="dialog"
      aria-label="Cookie consent"
      style={{ maxWidth: CARD_MAX_W }}
    >
      <div
        className="rounded-xl border p-5 shadow-lg"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
          {message}
        </p>
        <div className="flex gap-2">
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
            className={cn(BTN_CLASSES, "flex-1")}
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
