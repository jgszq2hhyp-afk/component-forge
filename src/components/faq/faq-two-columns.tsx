// @version 2.0.0 // @category faq // @name faq-two-columns // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SECTION_MAX_WIDTH = '64rem'; // max-w-5xl
const COLUMN_GAP_X = '3rem'; // gap-x-12
const COLUMN_GAP_Y = '2.5rem'; // gap-y-10

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqTwoColumnsProps {
  headline?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FaqTwoColumns({
  headline = 'Frequently asked questions',
  description,
  items,
  className,
}: FaqTwoColumnsProps) {
  // Split items into two roughly equal columns
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  return (
    <section
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mb-14 text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Two-column grid as definition list */}
        <dl
          className="grid md:grid-cols-2"
          style={{ columnGap: COLUMN_GAP_X, rowGap: COLUMN_GAP_Y }}
        >
          <div className="flex flex-col" style={{ gap: COLUMN_GAP_Y }}>
            {leftItems.map((item) => (
              <div key={item.question}>
                <dt
                  className="text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.question}
                </dt>
                <dd
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {item.answer}
                </dd>
              </div>
            ))}
          </div>
          <div className="flex flex-col" style={{ gap: COLUMN_GAP_Y }}>
            {rightItems.map((item) => (
              <div key={item.question}>
                <dt
                  className="text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.question}
                </dt>
                <dd
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {item.answer}
                </dd>
              </div>
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}
