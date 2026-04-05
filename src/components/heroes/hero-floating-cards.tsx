// @version 1.0.0
// @category heroes
// @name hero-floating-cards
// @source aura-inspired

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FLOAT_DURATION_BASE = 6;
const FLOAT_DURATION_VARIANCE = 3;
const FLOAT_AMPLITUDE = '14px';
const FLOAT_ROTATION = '3deg';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FloatingCard {
  icon: React.ReactNode;
  label: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

interface HeroFloatingCardsProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  cards?: FloatingCard[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Default SVG icons
// ---------------------------------------------------------------------------

const IconStar = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconShield = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconZap = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconGlobe = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconHeart = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconCode = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// ---------------------------------------------------------------------------
// Default cards
// ---------------------------------------------------------------------------

const DEFAULT_CARDS: FloatingCard[] = [
  {
    icon: IconZap,
    label: 'Fast',
    position: { top: '12%', left: '6%' },
  },
  {
    icon: IconShield,
    label: 'Secure',
    position: { top: '8%', right: '8%' },
  },
  {
    icon: IconStar,
    label: 'Modern',
    position: { top: '45%', left: '2%' },
  },
  {
    icon: IconGlobe,
    label: 'Scalable',
    position: { top: '42%', right: '3%' },
  },
  {
    icon: IconHeart,
    label: 'Reliable',
    position: { bottom: '18%', left: '10%' },
  },
  {
    icon: IconCode,
    label: 'Open',
    position: { bottom: '14%', right: '10%' },
  },
];

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

function buildKeyframes(cardCount: number): string {
  let css = '';
  for (let i = 0; i < cardCount; i++) {
    const duration = FLOAT_DURATION_BASE + (i % 3) * FLOAT_DURATION_VARIANCE;
    const delay = i * 0.4;
    // Alternate rotation direction per card
    const rotDir = i % 2 === 0 ? '' : '-';

    css += `
@keyframes hfc-float-${i} {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-${FLOAT_AMPLITUDE}) rotate(${rotDir}${FLOAT_ROTATION});
  }
}

@keyframes hfc-card-enter-${i} {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hfc-card-${i} {
  animation:
    hfc-card-enter-${i} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both,
    hfc-float-${i} ${duration}s ease-in-out ${delay + 0.7}s infinite;
}
`;
  }

  css += `
@keyframes hfc-fade-up {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.hfc-headline {
  animation: hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.hfc-subheadline {
  animation: hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
}

.hfc-cta {
  animation: hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

@media (prefers-reduced-motion: reduce) {
  .hfc-headline,
  .hfc-subheadline,
  .hfc-cta,
  ${Array.from({ length: cardCount }, (_, i) => `.hfc-card-${i}`).join(',\n  ')} {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
`;

  return css;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroFloatingCards({
  headline,
  subheadline,
  ctaText = 'Get Started',
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  cards = DEFAULT_CARDS,
  className,
}: HeroFloatingCardsProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24',
        className,
      )}
    >
      {/* Injected keyframes */}
      <style dangerouslySetInnerHTML={{ __html: buildKeyframes(cards.length) }} />

      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, oklch(from var(--primary) l c h / 0.06), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Floating cards — hidden on small screens, visible md+ */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {cards.map((card, i) => (
          <div
            key={i}
            className={cn(
              'absolute flex items-center gap-3 rounded-xl border px-4 py-3',
              'shadow-lg backdrop-blur-sm',
              `hfc-card-${i}`,
            )}
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--card-foreground)',
              ...card.position,
              width: 'max-content',
              maxWidth: '180px',
              opacity: 0,
            }}
          >
            <span
              className="shrink-0"
              style={{ color: 'var(--primary)' }}
            >
              {card.icon}
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--card-foreground)' }}>
              {card.label}
            </span>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1
          className="hfc-headline font-serif font-bold tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: 1.1,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            className="hfc-subheadline mx-auto mt-6 max-w-2xl text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {subheadline}
          </p>
        )}

        <div className="hfc-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={ctaHref}
            className="inline-flex h-12 items-center rounded-lg px-8 text-base font-semibold shadow-md transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              focusVisibleRingColor: 'var(--primary)',
            }}
          >
            {ctaText}
          </a>

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="inline-flex h-12 items-center rounded-lg border px-8 text-base font-semibold transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                backgroundColor: 'transparent',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>

        {/* Mobile cards — stacked row below CTA */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 md:hidden"
          role="list"
        >
          {cards.slice(0, 4).map((card, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
              }}
              role="listitem"
            >
              <span className="shrink-0" style={{ color: 'var(--primary)' }}>
                {card.icon}
              </span>
              <span className="text-xs font-medium">{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { FloatingCard, HeroFloatingCardsProps };
