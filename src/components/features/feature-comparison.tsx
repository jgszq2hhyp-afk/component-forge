// @version 1.0.0
// @category features
// @name feature-comparison
// @source self-authored

import { cn } from '@/lib/utils';

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
  features: ComparisonFeature[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckCircle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-label="Ja"
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
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-label="Nein"
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
  if (typeof value === 'boolean') {
    return (
      <span
        style={{
          color: value
            ? isOurs
              ? 'var(--primary)'
              : 'var(--muted-foreground)'
            : 'var(--muted-foreground)',
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
        color: isOurs ? 'var(--foreground)' : 'var(--muted-foreground)',
      }}
    >
      {value}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureComparison({
  headline,
  subheadline,
  ourLabel = 'Wir',
  theirLabel = 'Andere',
  features,
  className,
}: FeatureComparisonProps) {
  return (
    <section
      className={cn(
        'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      {(headline || subheadline) && (
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          {headline && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {subheadline}
            </p>
          )}
        </div>
      )}

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Header row */}
        <div
          className="grid grid-cols-3 gap-4 px-6 py-4 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
            Feature
          </div>
          <div className="text-center">
            <span
              className="inline-block text-sm font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {ourLabel}
            </span>
          </div>
          <div className="text-center">
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {theirLabel}
            </span>
          </div>
        </div>

        {/* Feature rows */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              'grid grid-cols-3 gap-4 px-6 py-4',
              index < features.length - 1 && 'border-b',
            )}
            style={{
              borderColor: 'var(--border)',
              backgroundColor:
                index % 2 === 0 ? 'transparent' : 'var(--accent)',
            }}
          >
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--foreground)' }}
            >
              {feature.label}
            </div>
            <div className="flex justify-center">
              <CellValue value={feature.ours} isOurs />
            </div>
            <div className="flex justify-center">
              <CellValue value={feature.theirs} isOurs={false} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
