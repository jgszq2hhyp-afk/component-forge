// @version 1.0.0
// @category cookie-consent
// @name cookie-consent-full-overlay
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DIALOG_MAX_W = "28rem";
const BTN_CLASSES = "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CookieConsentFullOverlayProps {
  headline?: string;
  message?: string;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CookieConsentFullOverlay({
  headline = "Cookie Preferences",
  message = "We use cookies and similar technologies to provide the best experience on our website. You can choose to accept all cookies, reject non-essential ones, or customize your preferences.",
  onAcceptAll,
  onRejectAll,
  onCustomize,
  className,
}: CookieConsentFullOverlayProps) {
  const [visible, setVisible] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleAccept = useCallback(() => { onAcceptAll?.(); setVisible(false); }, [onAcceptAll]);
  const handleReject = useCallback(() => { onRejectAll?.(); setVisible(false); }, [onRejectAll]);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)}
      role="dialog"
      aria-modal="true"
      aria-label={headline}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)" }}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full rounded-2xl border p-6 shadow-2xl",
          "motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-200",
          "motion-reduce:animate-none",
        )}
        style={{
          maxWidth: DIALOG_MAX_W,
          borderColor: "var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        <h2 className="mb-3 text-lg font-bold" style={{ color: "var(--foreground)" }}>
          {headline}
        </h2>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {message}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
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
            Reject All
          </button>
          {onCustomize && (
            <button
              type="button"
              onClick={onCustomize}
              className={BTN_CLASSES}
              style={{
                backgroundColor: "transparent",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
              }}
            >
              Customize
            </button>
          )}
          <button
            type="button"
            onClick={handleAccept}
            className={cn(BTN_CLASSES, "sm:flex-1")}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
