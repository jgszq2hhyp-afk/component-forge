// @source 21st.dev/r/arunachalam0606/toast
"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentType,
} from "react";
import { motion } from "framer-motion";
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
} from "sonner";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Inline SVG Icons (replacing lucide-react)
// ---------------------------------------------------------------------------

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Variant = "default" | "success" | "error" | "warning";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
}

interface ToasterShowProps {
  title?: string;
  message: string;
  variant?: Variant;
  duration?: number;
  position?: Position;
  actions?: ActionButton;
  onDismiss?: () => void;
  highlightTitle?: boolean;
}

export interface ToasterRef {
  show: (props: ToasterShowProps) => void;
}

// ---------------------------------------------------------------------------
// Style mappings
// ---------------------------------------------------------------------------

const variantStyles: Record<Variant, string> = {
  default: "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]",
  success: "bg-[var(--card)] border-green-600/50",
  error: "bg-[var(--card)] border-[var(--destructive)]/50",
  warning: "bg-[var(--card)] border-amber-600/50",
};

const titleColor: Record<Variant, string> = {
  default: "text-[var(--foreground)]",
  success: "text-green-600 dark:text-green-400",
  error: "text-[var(--destructive)]",
  warning: "text-amber-600 dark:text-amber-400",
};

const iconColor: Record<Variant, string> = {
  default: "text-[var(--muted-foreground)]",
  success: "text-green-600 dark:text-green-400",
  error: "text-[var(--destructive)]",
  warning: "text-amber-600 dark:text-amber-400",
};

const variantIcons: Record<Variant, ComponentType<{ className?: string }>> = {
  default: InfoIcon,
  success: CheckCircleIcon,
  error: AlertCircleIcon,
  warning: AlertTriangleIcon,
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.95 },
};

// ---------------------------------------------------------------------------
// Button variant styles (inline — no shadcn Button)
// ---------------------------------------------------------------------------

function getActionButtonClass(
  btnVariant: "default" | "outline" | "ghost" | undefined,
  toastVariant: Variant,
): string {
  const base =
    "inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-2.5 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] motion-reduce:transition-none";

  const variantMap: Record<Variant, string> = {
    success:
      "text-green-600 border border-green-600 hover:bg-green-600/10 dark:hover:bg-green-400/20",
    error:
      "text-[var(--destructive)] border border-[var(--destructive)] hover:bg-[var(--destructive)]/10 dark:hover:bg-[var(--destructive)]/20",
    warning:
      "text-amber-600 border border-amber-600 hover:bg-amber-600/10 dark:hover:bg-amber-400/20",
    default:
      "text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--muted-foreground)]/10",
  };

  return cn(base, variantMap[toastVariant]);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const NotificationToast = forwardRef<
  ToasterRef,
  { defaultPosition?: Position }
>(({ defaultPosition = "bottom-right" }, ref) => {
  const toastReference = useRef<ReturnType<typeof sonnerToast.custom> | null>(
    null,
  );

  useImperativeHandle(ref, () => ({
    show({
      title,
      message,
      variant = "default",
      duration = 4000,
      position = defaultPosition,
      actions,
      onDismiss,
      highlightTitle,
    }) {
      const Icon = variantIcons[variant];

      toastReference.current = sonnerToast.custom(
        (toastId) => (
          <motion.div
            variants={toastAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className={cn(
              "flex items-center justify-between w-full max-w-xs p-3 rounded-xl border shadow-md",
              "motion-reduce:transition-none",
              variantStyles[variant],
            )}
          >
            <div className="flex items-start gap-2">
              <Icon
                className={cn(
                  "h-4 w-4 mt-0.5 flex-shrink-0",
                  iconColor[variant],
                )}
              />
              <div className="space-y-0.5">
                {title && (
                  <h3
                    className={cn(
                      "text-xs font-medium leading-none",
                      titleColor[variant],
                      highlightTitle && titleColor.success,
                    )}
                  >
                    {title}
                  </h3>
                )}
                <p className="text-xs text-[var(--muted-foreground)]">
                  {message}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {actions?.label && (
                <button
                  type="button"
                  onClick={() => {
                    actions.onClick();
                    sonnerToast.dismiss(toastId);
                  }}
                  className={getActionButtonClass(actions.variant, variant)}
                >
                  {actions.label}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  sonnerToast.dismiss(toastId);
                  onDismiss?.();
                }}
                className={cn(
                  "rounded-full p-1",
                  "hover:bg-[var(--muted-foreground)]/20",
                  "transition-colors motion-reduce:transition-none",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
                )}
                aria-label="Dismiss notification"
              >
                <XIcon className="h-3 w-3 text-[var(--muted-foreground)]" />
              </button>
            </div>
          </motion.div>
        ),
        { duration, position },
      );
    },
  }));

  return (
    <SonnerToaster
      position={defaultPosition}
      toastOptions={{
        unstyled: true,
        className: "flex justify-end",
      }}
    />
  );
});

NotificationToast.displayName = "NotificationToast";

export default NotificationToast;
