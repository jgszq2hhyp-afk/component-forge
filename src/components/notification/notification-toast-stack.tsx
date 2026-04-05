// @version 1.0.0
// @category notification
// @name Notification Toast Stack
// @source custom

"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_AUTO_DISMISS_MS = 5000;
const TOAST_GAP = "0.75rem";
const TOAST_MAX_WIDTH = "24rem";
const PROGRESS_BAR_HEIGHT = "0.1875rem";
const ICON_SIZE = "h-5 w-5";
const DISMISS_BUTTON_SIZE = "h-8 w-8";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToastType = "success" | "error" | "warning" | "info";

type ToastPosition =
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";

interface Toast {
  /** Unique identifier */
  id: string;
  /** Visual type controlling icon and accent */
  type: ToastType;
  /** Title text shown in bold */
  title: string;
  /** Optional description below the title */
  message?: string;
}

interface NotificationToastStackProps {
  /** Array of active toasts to display */
  toasts: Toast[];
  /** Corner position of the stack */
  position?: ToastPosition;
  /** Milliseconds before auto-dismiss. Set 0 to disable. */
  autoDismissMs?: number;
  /** Callback when a toast is dismissed */
  onDismiss?: (id: string) => void;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Position mapping
// ---------------------------------------------------------------------------

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-left": "bottom-4 left-4",
};

const SLIDE_ORIGIN: Record<ToastPosition, string> = {
  "top-right": "motion-safe:animate-slide-in-right",
  "bottom-right": "motion-safe:animate-slide-in-right",
  "top-left": "motion-safe:animate-slide-in-left",
  "bottom-left": "motion-safe:animate-slide-in-left",
};

// ---------------------------------------------------------------------------
// Icon components
// ---------------------------------------------------------------------------

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
        d="M7 7l6 6M13 7l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

const TOAST_ICONS: Record<ToastType, () => ReactNode> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

// ---------------------------------------------------------------------------
// Toast type styles — CSS variable-based colors
// ---------------------------------------------------------------------------

const TOAST_TYPE_STYLES: Record<
  ToastType,
  { icon: string; progress: string; border: string }
> = {
  success: {
    icon: "text-[var(--primary)]",
    progress: "bg-[var(--primary)]",
    border: "border-l-[var(--primary)]",
  },
  error: {
    icon: "text-[var(--destructive)]",
    progress: "bg-[var(--destructive)]",
    border: "border-l-[var(--destructive)]",
  },
  warning: {
    icon: "text-[var(--accent)]",
    progress: "bg-[var(--accent)]",
    border: "border-l-[var(--accent)]",
  },
  info: {
    icon: "text-[var(--ring)]",
    progress: "bg-[var(--ring)]",
    border: "border-l-[var(--ring)]",
  },
};

// ---------------------------------------------------------------------------
// Single toast item
// ---------------------------------------------------------------------------

function ToastItem({
  toast,
  autoDismissMs,
  onDismiss,
  slideClass,
}: {
  toast: Toast;
  autoDismissMs: number;
  onDismiss?: (id: string) => void;
  slideClass: string;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const styles = TOAST_TYPE_STYLES[toast.type];
  const IconComponent = TOAST_ICONS[toast.type];

  const handleDismiss = useCallback(() => {
    onDismiss?.(toast.id);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    if (autoDismissMs <= 0) return;
    timerRef.current = setTimeout(handleDismiss, autoDismissMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoDismissMs, handleDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "relative overflow-hidden rounded-lg border border-l-4 shadow-lg",
        "bg-[var(--card)] border-[var(--border)]",
        styles.border,
        slideClass,
        "motion-reduce:animate-none"
      )}
      style={{ maxWidth: TOAST_MAX_WIDTH }}
    >
      {/* Content */}
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <span className={cn("mt-0.5 shrink-0", styles.icon)}>
          <IconComponent />
        </span>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-semibold text-[var(--foreground)]"
            style={{ fontSize: "clamp(0.8125rem, 0.8vw + 0.5rem, 0.9375rem)" }}
          >
            {toast.title}
          </p>
          {toast.message && (
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {toast.message}
            </p>
          )}
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={`Dismiss ${toast.title}`}
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
      </div>

      {/* Progress bar */}
      {autoDismissMs > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: PROGRESS_BAR_HEIGHT }}
          aria-hidden="true"
        >
          <div
            className={cn("h-full", styles.progress, "motion-reduce:hidden")}
            style={{
              animation: `toast-progress ${autoDismissMs}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function NotificationToastStack({
  toasts,
  position = "top-right",
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
  onDismiss,
  className,
}: NotificationToastStackProps) {
  const positionClass = POSITION_CLASSES[position];
  const slideClass = SLIDE_ORIGIN[position];

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 300ms ease-out; }
        .animate-slide-in-left { animation: slide-in-left 300ms ease-out; }
      `}</style>

      <section
        aria-label="Notifications"
        className={cn(
          "pointer-events-none fixed z-50 flex flex-col",
          positionClass,
          className
        )}
        style={{ gap: TOAST_GAP }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem
              toast={toast}
              autoDismissMs={autoDismissMs}
              onDismiss={onDismiss}
              slideClass={slideClass}
            />
          </div>
        ))}
      </section>
    </>
  );
}
