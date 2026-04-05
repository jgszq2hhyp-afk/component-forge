// @version 1.0.0
// @category notification
// @name Notification Inline Alert
// @source custom

"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_SIZE = "h-5 w-5";
const DISMISS_BUTTON_SIZE = "h-7 w-7";
const ALERT_BORDER_WIDTH = "4px";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AlertVariant = "info" | "success" | "warning" | "error";

interface NotificationInlineAlertProps {
  /** Visual variant controlling icon, border accent, and color */
  variant: AlertVariant;
  /** Alert title */
  title: string;
  /** Optional description text */
  message?: string;
  /** Optional action link label */
  actionLabel?: string;
  /** Optional action link href */
  actionHref?: string;
  /** Dismiss handler — parent controls rendering */
  onDismiss?: () => void;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Variant styles — CSS variable-based colors
// ---------------------------------------------------------------------------

const VARIANT_STYLES: Record<
  AlertVariant,
  { border: string; icon: string; bg: string }
> = {
  info: {
    border: "border-l-[var(--ring)]",
    icon: "text-[var(--ring)]",
    bg: "bg-[var(--card)]",
  },
  success: {
    border: "border-l-[var(--primary)]",
    icon: "text-[var(--primary)]",
    bg: "bg-[var(--card)]",
  },
  warning: {
    border: "border-l-[var(--accent)]",
    icon: "text-[var(--accent)]",
    bg: "bg-[var(--card)]",
  },
  error: {
    border: "border-l-[var(--destructive)]",
    icon: "text-[var(--destructive)]",
    bg: "bg-[var(--card)]",
  },
};

// ---------------------------------------------------------------------------
// Icon components
// ---------------------------------------------------------------------------

function InfoIcon() {
  return (
    <svg
      className={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9v5M10 6.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      className={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2L1 18h18L10 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 8v4M10 14.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6v5M10 13.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const VARIANT_ICONS: Record<AlertVariant, () => ReactNode> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

// ---------------------------------------------------------------------------
// ARIA role mapping
// ---------------------------------------------------------------------------

const VARIANT_ROLE: Record<AlertVariant, "status" | "alert"> = {
  info: "status",
  success: "status",
  warning: "alert",
  error: "alert",
};

const VARIANT_LIVE: Record<AlertVariant, "polite" | "assertive"> = {
  info: "polite",
  success: "polite",
  warning: "assertive",
  error: "assertive",
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function NotificationInlineAlert({
  variant,
  title,
  message,
  actionLabel,
  actionHref,
  onDismiss,
  className,
}: NotificationInlineAlertProps) {
  const styles = VARIANT_STYLES[variant];
  const IconComponent = VARIANT_ICONS[variant];

  return (
    <div
      role={VARIANT_ROLE[variant]}
      aria-live={VARIANT_LIVE[variant]}
      className={cn(
        "relative flex items-start gap-3 rounded-lg border border-[var(--border)] p-4",
        "motion-safe:animate-fade-in motion-reduce:animate-none",
        styles.bg,
        styles.border,
        className
      )}
      style={{ borderLeftWidth: ALERT_BORDER_WIDTH }}
    >
      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-0.25rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 200ms ease-out; }
      `}</style>

      {/* Icon */}
      <span className={cn("mt-0.5 shrink-0", styles.icon)}>
        <IconComponent />
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className="text-sm font-semibold text-[var(--foreground)]"
          style={{ fontSize: "clamp(0.8125rem, 0.8vw + 0.5rem, 0.9375rem)" }}
        >
          {title}
        </p>

        {message && (
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {message}
          </p>
        )}

        {actionLabel && actionHref && (
          <a
            href={actionHref}
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-sm font-medium",
              "text-[var(--primary)] underline-offset-4 hover:underline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded-sm"
            )}
            style={
              {
                "--tw-ring-color": "var(--ring)",
              } as React.CSSProperties
            }
          >
            {actionLabel}
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.25 3.5L8.75 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-md",
            "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            "transition-colors focus-visible:outline-none focus-visible:ring-2",
            DISMISS_BUTTON_SIZE
          )}
          style={
            {
              "--tw-ring-color": "var(--ring)",
            } as React.CSSProperties
          }
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
