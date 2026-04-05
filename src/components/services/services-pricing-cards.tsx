// @version 1.0.0
// @category services
// @name ServicesPricingCards
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const CHECK_ICON_SIZE = 18;
const DEFAULT_CTA_LABEL = 'Get Started';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ServicePricingItem {
  title: string;
  description: string;
  price: string;
  unit?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
}

interface ServicesPricingCardsProps {
  headline?: string;
  services: ServicePricingItem[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={CHECK_ICON_SIZE}
      height={CHECK_ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[var(--primary)] shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ServicesPricingCards({
  headline,
  services,
  className,
}: ServicesPricingCardsProps) {
  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={headline ? 'services-pricing-heading' : undefined}
    >
      {headline && (
        <h2
          id="services-pricing-heading"
          className="mx-auto max-w-3xl text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)] mb-[clamp(2rem,5vw,4rem)]"
        >
          {headline}
        </h2>
      )}

      <ul
        className="mx-auto grid max-w-7xl grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 lg:grid-cols-3 items-stretch"
        role="list"
      >
        {services.map((service) => (
          <li
            key={service.title}
            className={cn(
              'relative flex flex-col rounded-2xl border p-[clamp(1.5rem,3vw,2.5rem)]',
              'bg-[var(--card)] text-[var(--card-foreground)]',
              'transition-all duration-300 ease-out',
              'motion-safe:transition-all motion-reduce:transition-none',
              service.highlighted
                ? 'border-[var(--primary)] shadow-xl ring-1 ring-[var(--primary)]'
                : 'border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg',
            )}
            style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
          >
            {service.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--primary-foreground)]">
                Popular
              </span>
            )}

            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {service.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--foreground)]">
                {service.price}
              </span>
              {service.unit && (
                <span className="text-sm text-[var(--muted-foreground)]">
                  /{service.unit}
                </span>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-2.5" role="list">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-sm text-[var(--foreground)]">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={service.ctaHref ?? '#'}
              className={cn(
                'mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'motion-safe:transition-colors motion-reduce:transition-none',
                service.highlighted
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90'
                  : 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)]',
              )}
              style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
            >
              {service.ctaLabel ?? DEFAULT_CTA_LABEL}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
