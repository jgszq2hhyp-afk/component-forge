// @version 1.0.0
// @category integrations
// @name IntegrationsShowcase
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const LOGO_SIZE = 48;
const CHECK_ICON_SIZE = 16;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface IntegrationShowcaseItem {
  name: string;
  description: string;
  logoSrc: string;
  features: string[];
  href?: string;
}

interface IntegrationsShowcaseProps {
  headline?: string;
  integrations: IntegrationShowcaseItem[];
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

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function IntegrationsShowcase({
  headline,
  integrations,
  className,
}: IntegrationsShowcaseProps) {
  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={headline ? 'integrations-showcase-heading' : undefined}
    >
      {headline && (
        <h2
          id="integrations-showcase-heading"
          className="mx-auto max-w-3xl text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)] mb-[clamp(2rem,5vw,4rem)]"
        >
          {headline}
        </h2>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <article
            key={integration.name}
            className={cn(
              'group flex flex-col rounded-2xl border border-[var(--border)]',
              'bg-[var(--card)] p-[clamp(1.25rem,2.5vw,2rem)]',
              'transition-all duration-300 ease-out',
              'hover:border-[var(--primary)] hover:shadow-lg',
              'motion-safe:transition-all motion-reduce:transition-none',
            )}
            style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
          >
            <div className="flex items-center gap-3">
              <Image
                src={integration.logoSrc}
                alt={`${integration.name} logo`}
                width={LOGO_SIZE}
                height={LOGO_SIZE}
                className="rounded-lg object-contain"
              />
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {integration.name}
              </h3>
            </div>

            <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
              {integration.description}
            </p>

            <ul className="mt-4 flex-1 space-y-2" role="list">
              {integration.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-sm text-[var(--foreground)]">{feature}</span>
                </li>
              ))}
            </ul>

            {integration.href && (
              <a
                href={integration.href}
                className={cn(
                  'mt-5 inline-flex items-center gap-1.5 text-sm font-medium',
                  'text-[var(--primary)] hover:underline',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                )}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
              >
                Learn more
                <ArrowIcon />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
