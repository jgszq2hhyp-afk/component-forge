// @version 1.0.0
// @category tables
// @name table-comparison-matrix
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADLINE_CLAMP = 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 6vw, 6rem)';
const CELL_PADDING_X = '1rem';
const CELL_PADDING_Y = '0.75rem';
const HEADER_FONT_SIZE = '0.875rem';
const BODY_FONT_SIZE = '0.875rem';
const FEATURE_COLUMN_MIN_WIDTH = '12rem';
const PRODUCT_COLUMN_MIN_WIDTH = '8rem';
const BORDER_RADIUS = '0.75rem';
const CHECK_ICON_SIZE = 20;
const CROSS_ICON_SIZE = 20;
const PARTIAL_ICON_SIZE = 20;
const RECOMMENDED_BADGE_FONT_SIZE = '0.6875rem';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Product {
  /** Product / plan name */
  name: string;
  /** Highlight this column as recommended */
  recommended?: boolean;
}

interface Feature {
  /** Feature name */
  name: string;
  /** Value for each product column, in the same order as `products` */
  values: ('yes' | 'no' | 'partial')[];
}

interface TableComparisonMatrixProps {
  /** Product columns */
  products: Product[];
  /** Feature rows with per-product values */
  features: Feature[];
  /** Optional section headline */
  headline?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Value indicator icons (inline SVG)
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width={CHECK_ICON_SIZE}
      height={CHECK_ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-[var(--primary)]"
    >
      <path
        d="M6 10l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width={CROSS_ICON_SIZE}
      height={CROSS_ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-[var(--muted-foreground)]"
    >
      <path
        d="M7 7l6 6M13 7l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PartialIcon() {
  return (
    <svg
      width={PARTIAL_ICON_SIZE}
      height={PARTIAL_ICON_SIZE}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-[var(--muted-foreground)]"
    >
      <path
        d="M5 10h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Value cell
// ---------------------------------------------------------------------------

const VALUE_LABEL_MAP: Record<'yes' | 'no' | 'partial', string> = {
  yes: 'Included',
  no: 'Not included',
  partial: 'Partially included',
};

const VALUE_ICON_MAP: Record<'yes' | 'no' | 'partial', React.FC> = {
  yes: CheckIcon,
  no: CrossIcon,
  partial: PartialIcon,
};

function ValueCell({ value }: { value: 'yes' | 'no' | 'partial' }) {
  const Icon = VALUE_ICON_MAP[value];
  const label = VALUE_LABEL_MAP[value];

  return (
    <span className="inline-flex items-center justify-center" title={label}>
      <span className="sr-only">{label}</span>
      <Icon />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component (Server Component)
// ---------------------------------------------------------------------------

export default function TableComparisonMatrix({
  products,
  features,
  headline,
  className,
}: TableComparisonMatrixProps) {
  const hasFeatures = features.length > 0;
  const hasProducts = products.length > 0;

  return (
    <section
      className={cn('w-full', className)}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        paddingInline: 'clamp(1rem, 4vw, 2rem)',
      }}
      aria-label={headline ?? 'Feature comparison'}
    >
      <div className="mx-auto max-w-7xl">
        {/* Headline */}
        {headline && (
          <h2
            className="mb-8 text-center font-bold tracking-tight text-[var(--foreground)] sm:mb-12"
            style={{ fontSize: HEADLINE_CLAMP }}
          >
            {headline}
          </h2>
        )}

        {/* Scrollable wrapper */}
        <div
          className={cn(
            'overflow-x-auto rounded-[var(--matrix-radius)]',
            'border border-[var(--border)]',
          )}
          style={{ '--matrix-radius': BORDER_RADIUS } as React.CSSProperties}
          role="region"
          aria-label={
            headline ? `${headline} comparison table` : 'Comparison table'
          }
          tabIndex={0}
        >
          <table className="w-full border-collapse text-[var(--foreground)]">
            {/* Product header row */}
            {hasProducts && (
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {/* Empty top-left corner */}
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-[var(--background)] text-left"
                    style={{
                      padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                      minWidth: FEATURE_COLUMN_MIN_WIDTH,
                    }}
                  >
                    <span className="sr-only">Feature</span>
                  </th>

                  {/* Product columns */}
                  {products.map((product, index) => (
                    <th
                      key={`product-${index}`}
                      scope="col"
                      className={cn(
                        'text-center font-semibold',
                        product.recommended
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'bg-[var(--accent)] text-[var(--foreground)]',
                      )}
                      style={{
                        padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                        fontSize: HEADER_FONT_SIZE,
                        minWidth: PRODUCT_COLUMN_MIN_WIDTH,
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{product.name}</span>
                        {product.recommended && (
                          <span
                            className={cn(
                              'inline-block rounded-full px-2 py-0.5',
                              'bg-[var(--primary-foreground)] text-[var(--primary)]',
                              'font-medium',
                            )}
                            style={{
                              fontSize: RECOMMENDED_BADGE_FONT_SIZE,
                            }}
                          >
                            Recommended
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Feature rows */}
            <tbody>
              {hasFeatures ? (
                features.map((feature, featureIndex) => {
                  const isEven = featureIndex % 2 === 0;

                  return (
                    <tr
                      key={`feature-${featureIndex}`}
                      className={cn(
                        'border-b border-[var(--border)] last:border-b-0',
                        'motion-safe:transition-colors motion-safe:duration-150',
                        'hover:bg-[var(--accent)]',
                        isEven
                          ? 'bg-[var(--card)]'
                          : 'bg-[var(--background)]',
                      )}
                    >
                      {/* Feature name (sticky) */}
                      <th
                        scope="row"
                        className={cn(
                          'sticky left-0 z-10 text-left text-sm font-medium',
                          'text-[var(--foreground)]',
                          isEven
                            ? 'bg-[var(--card)]'
                            : 'bg-[var(--background)]',
                        )}
                        style={{
                          padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                          fontSize: BODY_FONT_SIZE,
                          minWidth: FEATURE_COLUMN_MIN_WIDTH,
                        }}
                      >
                        {feature.name}
                      </th>

                      {/* Value cells */}
                      {products.map((product, productIndex) => {
                        const value =
                          feature.values[productIndex] ?? 'no';

                        return (
                          <td
                            key={`val-${featureIndex}-${productIndex}`}
                            className={cn(
                              'text-center',
                              product.recommended &&
                                'bg-[color-mix(in_srgb,var(--primary)_5%,transparent)]',
                            )}
                            style={{
                              padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                              minWidth: PRODUCT_COLUMN_MIN_WIDTH,
                            }}
                          >
                            <ValueCell value={value} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={products.length + 1}
                    className="py-12 text-center text-sm text-[var(--muted-foreground)]"
                  >
                    No features to compare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary for screen readers */}
        <div className="sr-only" aria-live="polite">
          {hasFeatures && hasProducts
            ? `Comparison table with ${products.length} product${products.length !== 1 ? 's' : ''} and ${features.length} feature${features.length !== 1 ? 's' : ''}.`
            : 'Comparison table is empty.'}
        </div>
      </div>
    </section>
  );
}
