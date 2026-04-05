// @version 1.0.0
// @category empty-state
// @name Empty State Minimal
// @source custom

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_CONTAINER_SIZE = "h-16 w-16";
const CONTENT_MAX_WIDTH = "24rem";
const CTA_PADDING_X = "px-5";
const CTA_PADDING_Y = "py-2";
const DEFAULT_ICON_SIZE = "h-8 w-8";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EmptyStateMinimalProps {
  /** Custom icon node displayed in the icon area */
  icon?: ReactNode;
  /** Headline text */
  title: string;
  /** Optional description beneath the title */
  description?: string;
  /** Call-to-action label */
  ctaText?: string;
  /** Call-to-action href */
  ctaHref?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Default icon — simple circle with plus
// ---------------------------------------------------------------------------

function DefaultIcon() {
  return (
    <svg
      className={DEFAULT_ICON_SIZE}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 10v12M10 16h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function EmptyStateMinimal({
  icon,
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: EmptyStateMinimalProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
      style={{
        padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
      }}
    >
      <div
        className="flex flex-col items-center gap-5"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Icon area with subtle background circle */}
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "bg-[var(--card)] text-[var(--muted-foreground)]",
            "border border-[var(--border)]",
            "motion-safe:animate-icon-pop motion-reduce:animate-none",
            ICON_CONTAINER_SIZE
          )}
        >
          {icon ?? <DefaultIcon />}
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-1.5">
          <h2
            className="font-semibold tracking-tight text-[var(--foreground)]"
            style={{
              fontSize: "clamp(1.125rem, 1.2vw + 0.6rem, 1.5rem)",
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="max-w-prose leading-relaxed text-[var(--muted-foreground)]"
              style={{
                fontSize: "clamp(0.8125rem, 0.5vw + 0.65rem, 0.9375rem)",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* CTA link styled as subtle button */}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
              "border border-[var(--border)] bg-[var(--background)]",
              "text-[var(--foreground)]",
              "hover:bg-[var(--card)] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              CTA_PADDING_X,
              CTA_PADDING_Y
            )}
            style={
              {
                "--tw-ring-color": "var(--ring)",
                "--tw-ring-offset-color": "var(--background)",
                fontSize: "clamp(0.8125rem, 0.5vw + 0.65rem, 0.9375rem)",
              } as React.CSSProperties
            }
          >
            {/* Arrow icon */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 3v10M3 8l5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {ctaText}
          </a>
        )}
      </div>

      {/* Icon pop animation */}
      <style>{`
        @keyframes icon-pop {
          0% { opacity: 0; transform: scale(0.8); }
          60% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-icon-pop { animation: icon-pop 400ms ease-out; }
      `}</style>
    </section>
  );
}
