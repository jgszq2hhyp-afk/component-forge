// @version 1.0.0
// @category integrations
// @name IntegrationsLogoGrid
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const LOGO_SIZE = 64;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface IntegrationItem {
  name: string;
  logoSrc: string;
  href?: string;
}

interface IntegrationsLogoGridProps {
  headline?: string;
  subheadline?: string;
  integrations: IntegrationItem[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function LogoCard({ integration }: { integration: IntegrationItem }) {
  const content = (
    <>
      <Image
        src={integration.logoSrc}
        alt={`${integration.name} logo`}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none"
      />
      <span className="mt-3 text-sm font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-200 motion-reduce:transition-none">
        {integration.name}
      </span>
    </>
  );

  const sharedClasses = cn(
    'group flex flex-col items-center justify-center rounded-xl border border-[var(--border)]',
    'bg-[var(--card)] p-[clamp(1.25rem,2.5vw,2rem)]',
    'transition-all duration-300 ease-out',
    'hover:border-[var(--primary)] hover:shadow-md',
    'motion-safe:transition-all motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  );

  if (integration.href) {
    return (
      <a
        href={integration.href}
        className={sharedClasses}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={sharedClasses}
      style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
    >
      {content}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function IntegrationsLogoGrid({
  headline,
  subheadline,
  integrations,
  className,
}: IntegrationsLogoGridProps) {
  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={headline ? 'integrations-logo-heading' : undefined}
    >
      {(headline || subheadline) && (
        <header className="mx-auto max-w-3xl text-center mb-[clamp(2rem,5vw,4rem)]">
          {headline && (
            <h2
              id="integrations-logo-heading"
              className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)]"
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className="mt-3 text-[clamp(1rem,1.5vw,1.25rem)] text-[var(--muted-foreground)]">
              {subheadline}
            </p>
          )}
        </header>
      )}

      <div
        className="mx-auto grid max-w-5xl grid-cols-2 gap-[clamp(0.75rem,2vw,1.25rem)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        role="list"
      >
        {integrations.map((integration) => (
          <LogoCard key={integration.name} integration={integration} />
        ))}
      </div>
    </section>
  );
}
