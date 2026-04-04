// @version 2.0.0
// @category features
// @name feature-comparison
// @source self-authored

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_SIZE = 20;
const MAX_CONTENT_WIDTH = "56rem"; // max-w-4xl
const MAX_HEADER_WIDTH = "42rem"; // max-w-2xl

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ComparisonFeature {
  label: string;
  ours: string | boolean;
  theirs: string | boolean;
}

interface FeatureComparisonProps {
  headline?: string;
  subheadline?: string;
  ourLabel?: string;
  theirLabel?: string;
  featureColumnLabel?: string;
  features: ComparisonFeature[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckCircle() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      role="img"
      aria-label="Yes"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.5L8.5 12.5L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XCircle() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      role="img"
      aria-label="No"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Cell renderer
// ---------------------------------------------------------------------------

function CellValue({
  value,
  isOurs,
}: {
  value: string | boolean;
  isOurs: boolean;
}) {
  if (typeof value === "boolean") {
    return (
      <span
        style={{
          color: value
            ? isOurs
              ? "var(--primary)"
              : "var(--muted-foreground)"
            : "var(--muted-foreground)",
          opacity: value ? 1 : 0.4,
        }}
      >
        {value ? <CheckCircle /> : <XCircle />}
      </span>
    );
  }

  return (
    <span
      className="text-sm font-medium"
      style={{
        color: isOurs ? "var(--foreground)" : "var(--muted-foreground)",
      }}
    >
      {value}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FeatureComparison({
  headline,
  subheadline,
  ourLabel = "Us",
  theirLabel = "Others",
  featureColumnLabel = "Feature",
  features,
  className,
}: FeatureComparisonProps) {
  return (
    <section
      aria-label={headline ?? "Feature comparison"}
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24",
        className,
      )}
      style={{
        maxWidth: MAX_CONTENT_WIDTH,
        backgroundColor: "var(--background)",
      }}
    >
      {/* Header */}
      {(headline || subheadline) && (
        <div
          className="mx-auto text-center mb-12 lg:mb-16"
          style={{ maxWidth: MAX_HEADER_WIDTH }}
        >
          {headline && (
            <h2
              className="font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.875rem, 2.5vw + 0.5rem, 3rem)",
                color: "var(--foreground)",
              }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {subheadline}
            </p>
          )}
        </div>
      )}

      {/* Responsive table wrapper: horizontal scroll on small screens */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            minWidth: "28rem",
          }}
          role="table"
          aria-label={headline ?? "Feature comparison table"}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-3 gap-4 px-4 sm:px-6 py-4 border-b"
            style={{ borderColor: "var(--border)" }}
            role="row"
          >
            <div
              className="text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
              role="columnheader"
            >
              {featureColumnLabel}
            </div>
            <div className="text-center" role="columnheader">
              <span
                className="inline-block text-sm font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {ourLabel}
              </span>
            </div>
            <div className="text-center" role="columnheader">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--muted-foreground)" }}
              >
                {theirLabel}
              </span>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className={cn(
                "grid grid-cols-3 gap-4 px-4 sm:px-6 py-4",
                index < features.length - 1 && "border-b",
              )}
              style={{
                borderColor: "var(--border)",
                backgroundColor:
                  index % 2 === 0 ? "transparent" : "var(--accent)",
              }}
              role="row"
            >
              <div
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
                role="cell"
              >
                {feature.label}
              </div>
              <div className="flex justify-center" role="cell">
                <CellValue value={feature.ours} isOurs />
              </div>
              <div className="flex justify-center" role="cell">
                <CellValue value={feature.theirs} isOurs={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
