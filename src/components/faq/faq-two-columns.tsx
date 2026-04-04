// @version 1.0.0 // @category faq // @name faq-two-columns // @source custom

import { cn } from '@/lib/utils';

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

  const renderItem = (item: FaqItem) => (
    <div key={item.question}>
      <h3
        className="text-base font-semibold"
        style={{ color: 'var(--foreground)' }}
      >
        {item.question}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {item.answer}
      </p>
    </div>
  );

  return (
    <section
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
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
        </div>

        {/* Two-column grid */}
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div className="space-y-10">{leftItems.map(renderItem)}</div>
          <div className="space-y-10">{rightItems.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
}
