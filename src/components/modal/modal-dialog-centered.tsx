// @version 1.0.0
// @category modal
// @name Modal Dialog Centered
// @source custom

"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION_MS = 200;
const DIALOG_MAX_WIDTH = "28rem";
const ICON_SIZE = "h-10 w-10";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DialogVariant = "info" | "warning" | "destructive";

interface ModalDialogCenteredProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback to close the dialog */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Label for the confirm button */
  confirmLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Visual variant controlling icon and accent color */
  variant?: DialogVariant;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Variant config
// ---------------------------------------------------------------------------

interface VariantConfig {
  iconBg: string;
  iconColor: string;
  confirmBg: string;
  confirmHoverBg: string;
  confirmText: string;
  icon: ReactNode;
}

function getVariantConfig(variant: DialogVariant): VariantConfig {
  const configs: Record<DialogVariant, VariantConfig> = {
    info: {
      iconBg: "color-mix(in oklch, var(--primary) 12%, transparent)",
      iconColor: "var(--primary)",
      confirmBg: "var(--primary)",
      confirmHoverBg: "color-mix(in oklch, var(--primary) 85%, black)",
      confirmText: "var(--primary-foreground)",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    warning: {
      iconBg: "color-mix(in oklch, var(--accent) 20%, transparent)",
      iconColor: "var(--accent)",
      confirmBg: "var(--accent)",
      confirmHoverBg: "color-mix(in oklch, var(--accent) 85%, black)",
      confirmText: "var(--foreground)",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    destructive: {
      iconBg: "color-mix(in oklch, var(--destructive) 12%, transparent)",
      iconColor: "var(--destructive)",
      confirmBg: "var(--destructive)",
      confirmHoverBg: "color-mix(in oklch, var(--destructive) 85%, black)",
      confirmText: "var(--primary-foreground)",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
  };

  return configs[variant];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ModalDialogCentered({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "info",
  className,
}: ModalDialogCenteredProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const config = getVariantConfig(variant);

  // -----------------------------------------------------------------------
  // Store previous focus & auto-focus on open
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus cancel button first (safer default than confirm for destructive)
      requestAnimationFrame(() => {
        if (variant === "destructive") {
          cancelButtonRef.current?.focus();
        } else {
          confirmButtonRef.current?.focus();
        }
      });
    } else {
      previousActiveElement.current?.focus();
    }
  }, [open, variant]);

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // -----------------------------------------------------------------------
  // Focus trap + Keyboard
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // -----------------------------------------------------------------------
  // Handle confirm
  // -----------------------------------------------------------------------

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose();
  }, [onConfirm, onClose]);

  // -----------------------------------------------------------------------
  // Backdrop click
  // -----------------------------------------------------------------------

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-description" : undefined}
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
        // Fade in
        "motion-safe:animate-[modalFadeIn_200ms_ease-out_forwards]",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-sm",
          "motion-safe:animate-[modalFadeIn_200ms_ease-out_forwards]",
          "motion-reduce:opacity-100"
        )}
        style={{
          backgroundColor: "color-mix(in oklch, var(--background) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full rounded-xl shadow-2xl",
          "motion-safe:animate-[modalScaleIn_200ms_ease-out_forwards]",
          "motion-reduce:scale-100 motion-reduce:opacity-100",
          "border"
        )}
        style={{
          maxWidth: DIALOG_MAX_WIDTH,
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Icon area */}
        <div className="flex flex-col items-center pt-8 pb-2 px-6">
          <div
            className={cn(
              "flex items-center justify-center rounded-full",
              ICON_SIZE,
              "mb-4"
            )}
            style={{
              backgroundColor: config.iconBg,
              color: config.iconColor,
            }}
          >
            {config.icon}
          </div>

          {/* Title */}
          <h2
            id="dialog-title"
            className="text-[clamp(1.125rem,2.5vw,1.375rem)] font-semibold text-center leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p
              id="dialog-description"
              className="mt-2 text-sm text-center leading-relaxed max-w-[90%]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3 p-6 pt-4">
          {/* Cancel */}
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex items-center justify-center rounded-lg",
              "h-11 px-6 text-sm font-medium",
              "border",
              "motion-safe:transition-colors motion-safe:duration-150",
              "motion-reduce:transition-none",
              "hover:opacity-80",
              focusRing,
              "cursor-pointer"
            )}
            style={{
              ...ringStyle,
              color: "var(--foreground)",
              backgroundColor: "transparent",
              borderColor: "var(--border)",
            }}
          >
            {cancelLabel}
          </button>

          {/* Confirm */}
          {onConfirm && (
            <button
              ref={confirmButtonRef}
              type="button"
              onClick={handleConfirm}
              className={cn(
                "inline-flex items-center justify-center rounded-lg",
                "h-11 px-6 text-sm font-medium",
                "motion-safe:transition-colors motion-safe:duration-150",
                "motion-reduce:transition-none",
                "hover:opacity-90",
                focusRing,
                "cursor-pointer"
              )}
              style={{
                ...ringStyle,
                color: config.confirmText,
                backgroundColor: config.confirmBg,
              }}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>

      {/* Keyframe definitions */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(0.5rem); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
