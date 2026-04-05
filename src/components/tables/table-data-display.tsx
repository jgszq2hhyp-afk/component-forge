// @version 1.0.0
// @category tables
// @name table-data-display
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADLINE_CLAMP = 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 6vw, 6rem)';
const CELL_PADDING_X = '1rem';
const CELL_PADDING_Y = '0.75rem';
const HEADER_FONT_SIZE = '0.75rem';
const BODY_FONT_SIZE = '0.875rem';
const STICKY_COLUMN_WIDTH = '10rem';
const BORDER_RADIUS = '0.75rem';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TableColumn {
  /** Unique key matching a field in row data */
  key: string;
  /** Display label for the column header */
  label: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

interface TableDataDisplayProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data -- each row maps column keys to values */
  rows: Record<string, string | number>[];
  /** Optional section headline */
  headline?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Alignment helper
// ---------------------------------------------------------------------------

const ALIGN_MAP: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function alignClass(align?: 'left' | 'center' | 'right'): string {
  return ALIGN_MAP[align ?? 'left'];
}

// ---------------------------------------------------------------------------
// Main component (Server Component)
// ---------------------------------------------------------------------------

export default function TableDataDisplay({
  columns,
  rows,
  headline,
  className,
}: TableDataDisplayProps) {
  const hasRows = rows.length > 0;
  const hasColumns = columns.length > 0;

  return (
    <section
      className={cn('w-full', className)}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        paddingInline: 'clamp(1rem, 4vw, 2rem)',
      }}
      aria-label={headline ?? 'Data table'}
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

        {/* Scrollable container */}
        <div
          className={cn(
            'overflow-x-auto rounded-[var(--table-radius)]',
            'border border-[var(--border)]',
          )}
          style={{ '--table-radius': BORDER_RADIUS } as React.CSSProperties}
          role="region"
          aria-label={headline ? `${headline} table` : 'Data table'}
          tabIndex={0}
        >
          <table className="w-full border-collapse text-[var(--foreground)]">
            {/* Header */}
            {hasColumns && (
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--accent)]">
                  {columns.map((col, colIndex) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={cn(
                        'whitespace-nowrap font-semibold uppercase tracking-wider',
                        'text-[var(--muted-foreground)]',
                        alignClass(col.align),
                        colIndex === 0 &&
                          'sticky left-0 z-10 bg-[var(--accent)]',
                      )}
                      style={{
                        padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                        fontSize: HEADER_FONT_SIZE,
                        minWidth:
                          colIndex === 0 ? STICKY_COLUMN_WIDTH : undefined,
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Body */}
            <tbody>
              {hasRows ? (
                rows.map((row, rowIndex) => {
                  const isEven = rowIndex % 2 === 0;

                  return (
                    <tr
                      key={rowIndex}
                      className={cn(
                        'border-b border-[var(--border)] last:border-b-0',
                        'motion-safe:transition-colors motion-safe:duration-150',
                        'hover:bg-[var(--accent)]',
                        isEven ? 'bg-[var(--card)]' : 'bg-[var(--background)]',
                      )}
                    >
                      {columns.map((col, colIndex) => {
                        const cellValue = row[col.key] ?? '';

                        return (
                          <td
                            key={col.key}
                            className={cn(
                              'whitespace-nowrap',
                              alignClass(col.align),
                              colIndex === 0 &&
                                'sticky left-0 z-10 font-medium',
                              colIndex === 0 && isEven
                                ? 'bg-[var(--card)]'
                                : colIndex === 0
                                  ? 'bg-[var(--background)]'
                                  : '',
                            )}
                            style={{
                              padding: `${CELL_PADDING_Y} ${CELL_PADDING_X}`,
                              fontSize: BODY_FONT_SIZE,
                              minWidth:
                                colIndex === 0
                                  ? STICKY_COLUMN_WIDTH
                                  : undefined,
                            }}
                          >
                            {cellValue}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-sm text-[var(--muted-foreground)]"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Row count for screen readers */}
        <div className="sr-only" aria-live="polite">
          {hasRows
            ? `Table showing ${rows.length} row${rows.length !== 1 ? 's' : ''} and ${columns.length} column${columns.length !== 1 ? 's' : ''}.`
            : 'Table is empty.'}
        </div>
      </div>
    </section>
  );
}
