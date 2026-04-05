// @version 1.0.0
// @category services
// @name ServicesDetailedList
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const CHECK_ICON_SIZE = 20;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  features?: string[];
}

interface ServicesDetailedListProps {
  headline?: string;
  services: ServiceItem[];
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
      className="text-[var(--primary)] shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ServicesDetailedList({
  headline,
  services,
  className,
}: ServicesDetailedListProps) {
  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={headline ? 'services-detailed-heading' : undefined}
    >
      {headline && (
        <h2
          id="services-detailed-heading"
          className="mx-auto max-w-3xl text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)] mb-[clamp(2rem,5vw,4rem)]"
        >
          {headline}
        </h2>
      )}

      <div className="mx-auto max-w-7xl space-y-[clamp(3rem,6vw,5rem)]">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <article
              key={service.title}
              className={cn(
                'grid grid-cols-1 items-center gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-2',
                isReversed && 'lg:[direction:rtl]',
              )}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:[direction:ltr]">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt ?? service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="lg:[direction:ltr]">
                <h3 className="text-[clamp(1.25rem,2.5vw,2rem)] font-semibold text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="mt-5 space-y-2.5" role="list">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-[var(--foreground)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
