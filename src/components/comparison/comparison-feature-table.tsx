// @version 1.0.0
// @category comparison
// @name comparison-feature-table
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 1rem, 3.5rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const PLAN_NAME_SIZE = '0.9375rem';
const PRICE_SIZE = 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)';
const CELL_PADDING_Y = '0.875rem';
const CHECK_ICON_SIZE = 20;
const CROSS_ICON_SIZE = 20;
const ICON_STROKE_WIDTH = 2;
const HEADER_BG_MIX_PERCENT = '5%';
const ROW_HOVER_MIX_PERCENT = '3%';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Plan {
  name: string;
  price: string;
  features: boolean[];
}

interface ComparisonFeatureTableProps {
  headline: string;
  features: { name: string }[];
  plans: Plan[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-components: Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width={CHECK_ICON_SIZE}
      height={CHECK_ICON_SIZE}
      viewBox={`0 0 ${CHECK_ICON_SIZE} ${CHECK_ICON_SIZE}`}
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      <path
        d="M5 10l4 4 6-8"
        stroke="var(--primary)"
        strokeWidth={ICON_STROKE_WIDTH}
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
      viewBox={`0 0 ${CROSS_ICON_SIZE} ${CROSS_ICON_SIZE}`}
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="var(--muted-foreground)"
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.4}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function ComparisonFeatureTable({
  headline,
  features,
  plans,
  className,
}: ComparisonFeatureTableProps) {
  const headingId = 'feature-table-heading';

  return (
    <section
      aria-labelledby={headingId}
      className={cn('relative', className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Section Header */}
        <header className="text-center">
          <h2
            id={headingId}
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
        </header>

        {/* Table Container - horizontal scroll on mobile */}
        <div
          className="mt-12 md:mt-16 -mx-4 overflow-x-auto px-4 pb-2"
          role="region"
          aria-label="Feature comparison table"
          tabIndex={0}
          style={{
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
        >
          <table
            className="w-full min-w-[36rem] border-collapse"
            style={{ color: 'var(--foreground)' }}
          >
            {/* Table Head */}
            <thead>
              <tr>
                {/* Empty corner cell */}
                <th
                  scope="col"
                  className="text-left p-4 font-medium text-sm"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--primary) ${HEADER_BG_MIX_PERCENT}, var(--background))`,
                    color: 'var(--muted-foreground)',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'var(--border)',
                  }}
                >
                  Features
                </th>

                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className="p-4 text-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--primary) ${HEADER_BG_MIX_PERCENT}, var(--background))`,
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'var(--border)',
                    }}
                  >
                    <span
                      className="block font-semibold"
                      style={{
                        fontSize: PLAN_NAME_SIZE,
                        color: 'var(--foreground)',
                      }}
                    >
                      {plan.name}
                    </span>
                    <span
                      className="mt-1 block font-bold tracking-tight"
                      style={{
                        fontSize: PRICE_SIZE,
                        color: 'var(--primary)',
                      }}
                    >
                      {plan.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr
                  key={feature.name}
                  className="transition-colors duration-150 motion-reduce:transition-none"
                  style={{
                    backgroundColor:
                      featureIndex % 2 === 1
                        ? `color-mix(in srgb, var(--primary) ${ROW_HOVER_MIX_PERCENT}, var(--background))`
                        : 'var(--background)',
                  }}
                >
                  <th
                    scope="row"
                    className="text-left text-sm font-normal"
                    style={{
                      padding: `${CELL_PADDING_Y} 1rem`,
                      color: 'var(--foreground)',
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'var(--border)',
                    }}
                  >
                    {feature.name}
                  </th>

                  {plans.map((plan) => {
                    const hasFeature = plan.features[featureIndex] ?? false;

                    return (
                      <td
                        key={`${plan.name}-${feature.name}`}
                        className="text-center"
                        style={{
                          padding: `${CELL_PADDING_Y} 1rem`,
                          borderBottomWidth: '1px',
                          borderBottomStyle: 'solid',
                          borderBottomColor: 'var(--border)',
                        }}
                      >
                        {hasFeature ? (
                          <>
                            <CheckIcon />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <CrossIcon />
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
