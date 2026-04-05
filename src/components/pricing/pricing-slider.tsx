// @version 1.0.0
// @category pricing
// @name pricing-slider
// @source custom

'use client';

import { useState, useCallback, useRef, useEffect, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const PRICE_CLAMP = 'clamp(2rem, 1.5rem + 2vw, 2.75rem)';
const UNIT_PRICE_CLAMP = 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)';
const SECTION_MAX_WIDTH = '72rem';
const SLIDER_TRACK_HEIGHT = '6px';
const SLIDER_THUMB_SIZE = '24px';
const CARD_BORDER_RADIUS = '1rem';
const PRICE_ANIMATION_DURATION_MS = 300;
const SLIDER_STEP = 1;
const DEFAULT_MIN_UNITS = 1;
const DEFAULT_MAX_UNITS = 100;
const DEFAULT_UNITS = 10;
const DEFAULT_CURRENCY = '$';
const DEFAULT_UNIT_LABEL = 'users';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingTier {
  name: string;
  basePrice: number;
  unitPrice: number;
  features: string[];
  highlighted?: boolean;
  cta?: string;
  ctaHref?: string;
}

interface PricingSliderProps {
  headline?: string;
  description?: string;
  tiers: PricingTier[];
  unit?: string;
  minUnits?: number;
  maxUnits?: number;
  defaultUnits?: number;
  currency?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(value: number, currency: string): string {
  return `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function calculateTotalPrice(tier: PricingTier, units: number): number {
  return tier.basePrice + tier.unitPrice * units;
}

// ---------------------------------------------------------------------------
// Animated Price Display
// ---------------------------------------------------------------------------

function AnimatedPrice({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const previousValueRef = useRef(value);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = formatPrice(value, currency);
      previousValueRef.current = value;
      return;
    }

    const startValue = previousValueRef.current;
    const endValue = value;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / PRICE_ANIMATION_DURATION_MS, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * eased;

      if (el) {
        el.textContent = formatPrice(Math.round(currentValue * 100) / 100, currency);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = endValue;
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, currency]);

  return (
    <span
      ref={displayRef}
      className="font-bold tracking-tight tabular-nums"
      style={{
        fontSize: PRICE_CLAMP,
        color: 'var(--foreground)',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {formatPrice(value, currency)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Check Icon
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tier Card
// ---------------------------------------------------------------------------

function TierCard({
  tier,
  units,
  unit,
  currency,
}: {
  tier: PricingTier;
  units: number;
  unit: string;
  currency: string;
}) {
  const totalPrice = calculateTotalPrice(tier, units);

  return (
    <article
      className={cn(
        'relative flex flex-col rounded-2xl border p-8',
        'transition-shadow duration-200 motion-reduce:transition-none',
        tier.highlighted && 'shadow-lg',
      )}
      style={{
        borderColor: tier.highlighted ? 'var(--primary)' : 'var(--border)',
        borderWidth: tier.highlighted ? '2px' : '1px',
        backgroundColor: 'var(--background)',
        borderRadius: CARD_BORDER_RADIUS,
      }}
    >
      {/* Highlighted badge */}
      {tier.highlighted && (
        <span
          className="absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          Popular
        </span>
      )}

      {/* Tier name */}
      <h3
        className="text-lg font-semibold"
        style={{ color: 'var(--foreground)' }}
      >
        {tier.name}
      </h3>

      {/* Dynamic price */}
      <div className="mt-6 flex flex-col">
        <AnimatedPrice value={totalPrice} currency={currency} />
        <span
          className="mt-1"
          style={{
            fontSize: UNIT_PRICE_CLAMP,
            color: 'var(--muted-foreground)',
          }}
        >
          {currency}{tier.basePrice} base + {currency}{tier.unitPrice}/{unit}
        </span>
      </div>

      {/* Features */}
      <ul
        className="mt-8 flex-1 space-y-3"
        aria-label={`${tier.name} features`}
      >
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 shrink-0"
              aria-hidden="true"
              style={{ color: 'var(--primary)' }}
            >
              <CheckIcon />
            </span>
            <span
              className="text-sm"
              style={{ color: 'var(--foreground)' }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={tier.ctaHref ?? '#'}
        className={cn(
          'mt-8 inline-flex items-center justify-center',
          'rounded-lg px-6 py-3 text-sm font-semibold',
          'transition-all duration-200 motion-reduce:transition-none',
          'hover:brightness-110',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'active:scale-[0.98]',
        )}
        style={
          tier.highlighted
            ? {
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }
            : {
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                ['--tw-ring-color' as string]: 'var(--foreground)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }
        }
      >
        {tier.cta ?? 'Get started'}
      </a>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Slider styles (injected as a style tag for the range input)
// ---------------------------------------------------------------------------

const sliderStyles = `
  .pricing-slider-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: ${SLIDER_TRACK_HEIGHT};
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    background: linear-gradient(
      to right,
      var(--primary) var(--slider-progress, 0%),
      color-mix(in oklch, var(--foreground) 15%, transparent) var(--slider-progress, 0%)
    );
  }

  .pricing-slider-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${SLIDER_THUMB_SIZE};
    height: ${SLIDER_THUMB_SIZE};
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid var(--background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 150ms ease;
  }

  .pricing-slider-range::-moz-range-thumb {
    width: ${SLIDER_THUMB_SIZE};
    height: ${SLIDER_THUMB_SIZE};
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid var(--background);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 150ms ease;
  }

  .pricing-slider-range:focus-visible {
    outline: none;
  }

  .pricing-slider-range:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--primary);
  }

  .pricing-slider-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .pricing-slider-range::-webkit-slider-thumb {
      transition: none;
    }
    .pricing-slider-range::-moz-range-thumb {
      transition: none;
    }
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PricingSlider({
  headline = 'Pay only for what you use',
  description,
  tiers,
  unit = DEFAULT_UNIT_LABEL,
  minUnits = DEFAULT_MIN_UNITS,
  maxUnits = DEFAULT_MAX_UNITS,
  defaultUnits = DEFAULT_UNITS,
  currency = DEFAULT_CURRENCY,
  className,
}: PricingSliderProps) {
  const [units, setUnits] = useState(defaultUnits);

  const sliderProgress =
    ((units - minUnits) / (maxUnits - minUnits)) * 100;

  const handleSliderChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUnits(Number(e.target.value));
    },
    [],
  );

  return (
    <section
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Scoped slider styles */}
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />

      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mx-auto mb-6 max-w-2xl text-center">
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
              className="mt-4 leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: SUBHEADING_CLAMP,
              }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Slider */}
        <div className="mx-auto mb-14 max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="pricing-slider-input"
              className="text-sm font-medium"
              style={{ color: 'var(--foreground)' }}
            >
              {units.toLocaleString('en-US')} {unit}
            </label>
            <output
              htmlFor="pricing-slider-input"
              className="text-sm font-semibold tabular-nums rounded-full px-3 py-1"
              style={{
                backgroundColor: 'color-mix(in oklch, var(--primary) 12%, transparent)',
                color: 'var(--primary)',
              }}
            >
              {units.toLocaleString('en-US')} {unit}
            </output>
          </div>

          <input
            id="pricing-slider-input"
            type="range"
            min={minUnits}
            max={maxUnits}
            step={SLIDER_STEP}
            value={units}
            onChange={handleSliderChange}
            className="pricing-slider-range"
            style={{
              ['--slider-progress' as string]: `${sliderProgress}%`,
            }}
            aria-valuenow={units}
            aria-valuemin={minUnits}
            aria-valuemax={maxUnits}
            aria-valuetext={`${units} ${unit}`}
            aria-label={`Select number of ${unit}`}
          />

          <div
            className="mt-2 flex justify-between text-xs"
            style={{ color: 'var(--muted-foreground)' }}
            aria-hidden="true"
          >
            <span>{minUnits.toLocaleString('en-US')}</span>
            <span>{maxUnits.toLocaleString('en-US')}</span>
          </div>
        </div>

        {/* Tier cards grid */}
        <div
          className={cn(
            'grid gap-8',
            tiers.length === 1 && 'md:grid-cols-1 max-w-md mx-auto',
            tiers.length === 2 && 'md:grid-cols-2 max-w-3xl mx-auto',
            tiers.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3',
          )}
          role="list"
          aria-label="Pricing tiers"
        >
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              tier={tier}
              units={units}
              unit={unit}
              currency={currency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
