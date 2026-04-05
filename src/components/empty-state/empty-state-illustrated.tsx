// @version 1.0.0
// @category empty-state
// @name Empty State Illustrated
// @source custom

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ILLUSTRATION_SIZE = "h-48 w-48";
const CTA_PADDING_X = "px-6";
const CTA_PADDING_Y = "py-2.5";
const SECTION_MAX_WIDTH = "28rem";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type IllustrationType = "no-data" | "no-results" | "empty-inbox";

interface EmptyStateIllustratedProps {
  /** Built-in illustration to display */
  illustration?: IllustrationType;
  /** Headline text */
  title: string;
  /** Optional description beneath the title */
  description?: string;
  /** Call-to-action button label */
  ctaText?: string;
  /** Call-to-action href */
  ctaHref?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Inline SVG illustrations — clean line art using currentColor
// ---------------------------------------------------------------------------

function NoDataIllustration() {
  return (
    <svg
      className={ILLUSTRATION_SIZE}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Clipboard */}
      <rect
        x="55"
        y="35"
        width="90"
        height="130"
        rx="8"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        opacity="0.5"
      />
      <rect
        x="75"
        y="25"
        width="50"
        height="20"
        rx="4"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        fill="var(--background)"
      />
      {/* Lines placeholder */}
      <line
        x1="75"
        y1="75"
        x2="125"
        y2="75"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="90"
        x2="115"
        y2="90"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="105"
        x2="120"
        y2="105"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Question mark */}
      <text
        x="100"
        y="145"
        textAnchor="middle"
        fontSize="24"
        fill="var(--muted-foreground)"
        opacity="0.4"
        fontFamily="system-ui, sans-serif"
      >
        ?
      </text>
    </svg>
  );
}

function NoResultsIllustration() {
  return (
    <svg
      className={ILLUSTRATION_SIZE}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Magnifying glass */}
      <circle
        cx="90"
        cy="85"
        r="40"
        stroke="var(--muted-foreground)"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <line
        x1="120"
        y1="115"
        x2="155"
        y2="150"
        stroke="var(--muted-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Cross inside lens */}
      <path
        d="M78 73l24 24M102 73L78 97"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small dots decorating */}
      <circle cx="50" cy="140" r="3" fill="var(--border)" opacity="0.3" />
      <circle cx="160" cy="55" r="2.5" fill="var(--border)" opacity="0.3" />
      <circle cx="45" cy="60" r="2" fill="var(--border)" opacity="0.2" />
    </svg>
  );
}

function EmptyInboxIllustration() {
  return (
    <svg
      className={ILLUSTRATION_SIZE}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Inbox tray */}
      <path
        d="M40 100h35l15 25h20l15-25h35v55a8 8 0 01-8 8H48a8 8 0 01-8-8v-55z"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        opacity="0.5"
      />
      {/* Lid / flap */}
      <path
        d="M40 100l25-55h70l25 55"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        opacity="0.5"
        strokeLinejoin="round"
      />
      {/* Empty indicator — dashed line */}
      <line
        x1="80"
        y1="135"
        x2="120"
        y2="135"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
      {/* Sparkle decorations */}
      <path
        d="M155 45l2-6 2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
        fill="var(--border)"
        opacity="0.3"
      />
      <path
        d="M50 55l1.5-4.5 1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"
        fill="var(--border)"
        opacity="0.2"
      />
    </svg>
  );
}

const ILLUSTRATIONS: Record<IllustrationType, () => React.JSX.Element> = {
  "no-data": NoDataIllustration,
  "no-results": NoResultsIllustration,
  "empty-inbox": EmptyInboxIllustration,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function EmptyStateIllustrated({
  illustration = "no-data",
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: EmptyStateIllustratedProps) {
  const IllustrationComponent = ILLUSTRATIONS[illustration];

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
        className="flex flex-col items-center gap-6"
        style={{ maxWidth: SECTION_MAX_WIDTH }}
      >
        {/* Illustration */}
        <div className="motion-safe:animate-float motion-reduce:animate-none">
          <IllustrationComponent />
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-2">
          <h2
            className="font-semibold tracking-tight text-[var(--foreground)]"
            style={{
              fontSize: "clamp(1.25rem, 1.5vw + 0.75rem, 1.75rem)",
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="max-w-prose leading-relaxed text-[var(--muted-foreground)]"
              style={{
                fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1rem)",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* CTA */}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className={cn(
              "inline-flex items-center justify-center rounded-lg font-medium",
              "bg-[var(--primary)] text-[var(--primary-foreground)]",
              "hover:opacity-90 transition-opacity",
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
            {ctaText}
          </a>
        )}
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
