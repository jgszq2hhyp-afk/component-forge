// @version 1.0.0
// @category cards
// @name cards-glassmorphism
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADLINE_CLAMP = 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)';
const CARD_TITLE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)';
const METRIC_CLAMP = 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 6vw, 6rem)';
const CARD_BORDER_RADIUS = '1rem';
const ICON_CONTAINER_SIZE = 48;
const BLUR_AMOUNT = '16px';
const GLASS_BG_OPACITY = '0.12';
const NOISE_OPACITY = '0.04';
const BORDER_OPACITY = '0.18';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GlassCard {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Optional icon element */
  icon?: ReactNode;
  /** Optional metric / KPI value */
  metric?: string;
}

interface CardsGlassmorphismProps {
  /** Array of card data */
  cards: GlassCard[];
  /** Optional section headline */
  headline?: string;
  /** Grid columns: 2 or 3 */
  columns?: 2 | 3;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Column map
// ---------------------------------------------------------------------------

const COLUMN_MAP: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
};

// ---------------------------------------------------------------------------
// Gradient mesh background (decorative)
// ---------------------------------------------------------------------------

function GradientMeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Top-left gradient blob */}
      <div
        className="absolute -left-[15%] -top-[20%] h-[60%] w-[50%] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Bottom-right gradient blob */}
      <div
        className="absolute -bottom-[15%] -right-[10%] h-[55%] w-[45%] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Center accent blob */}
      <div
        className="absolute left-[30%] top-[40%] h-[40%] w-[40%] rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--ring) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single glass card
// ---------------------------------------------------------------------------

function GlassCardItem({ card }: { card: GlassCard }) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[var(--glass-radius)]',
        'motion-safe:transition-transform motion-safe:duration-300',
        'hover:-translate-y-1',
        'motion-reduce:transition-none',
      )}
      style={
        {
          '--glass-radius': CARD_BORDER_RADIUS,
          backdropFilter: `blur(${BLUR_AMOUNT})`,
          WebkitBackdropFilter: `blur(${BLUR_AMOUNT})`,
        } as React.CSSProperties
      }
    >
      {/* Glass background layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: `color-mix(in srgb, var(--card) ${Number(GLASS_BG_OPACITY) * 100}%, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          opacity: NOISE_OPACITY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* Subtle border via box-shadow */}
      <div
        className="absolute inset-0 -z-10 rounded-[var(--glass-radius)]"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--border) ${Number(BORDER_OPACITY) * 100}%, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 sm:p-7">
        {/* Icon */}
        {card.icon && (
          <div
            className={cn(
              'flex items-center justify-center rounded-xl',
              'bg-[var(--accent)] text-[var(--primary)]',
            )}
            style={{
              width: ICON_CONTAINER_SIZE,
              height: ICON_CONTAINER_SIZE,
            }}
            aria-hidden="true"
          >
            {card.icon}
          </div>
        )}

        {/* Metric */}
        {card.metric && (
          <p
            className="font-bold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: METRIC_CLAMP }}
          >
            {card.metric}
          </p>
        )}

        {/* Title */}
        <h3
          className="font-semibold leading-tight text-[var(--foreground)]"
          style={{ fontSize: CARD_TITLE_CLAMP }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
          {card.description}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component (Server Component)
// ---------------------------------------------------------------------------

export default function CardsGlassmorphism({
  cards,
  headline,
  columns = 3,
  className,
}: CardsGlassmorphismProps) {
  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        paddingInline: 'clamp(1rem, 4vw, 2rem)',
      }}
      aria-label={headline ?? 'Glassmorphism cards'}
    >
      {/* Decorative gradient mesh */}
      <GradientMeshBackground />

      <div className="relative mx-auto max-w-7xl">
        {/* Headline */}
        {headline && (
          <h2
            className="mb-8 text-center font-bold tracking-tight text-[var(--foreground)] sm:mb-12"
            style={{ fontSize: HEADLINE_CLAMP }}
          >
            {headline}
          </h2>
        )}

        {/* Card grid */}
        <div
          className={cn(
            'grid grid-cols-1 gap-5 sm:gap-6',
            COLUMN_MAP[columns],
          )}
          role="list"
        >
          {cards.map((card, index) => (
            <div role="listitem" key={`${card.title}-${index}`}>
              <GlassCardItem card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
