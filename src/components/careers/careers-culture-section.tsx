// @version 1.0.0
// @category careers
// @name Careers Culture Section
// @source custom

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const IMAGE_ASPECT = "aspect-[4/3]";
const GRID_GAP = "gap-6";
const ICON_SIZE = "h-10 w-10";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Perk {
  icon: ReactNode;
  title: string;
  description: string;
}

interface CareersCultureSectionProps {
  headline?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  perks: Perk[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PerkCard({ perk }: { perk: Perk }) {
  return (
    <article className="flex gap-4">
      <div
        className={cn(
          "shrink-0 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]",
          ICON_SIZE,
        )}
        aria-hidden="true"
      >
        {perk.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          {perk.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {perk.description}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CareersCultureSection({
  headline = "Our Culture",
  description = "We believe great work happens when people feel valued, supported, and inspired. Here's what makes us different.",
  imageSrc,
  imageAlt,
  perks,
  className,
}: CareersCultureSectionProps) {
  const headingId = "careers-culture-heading";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image column */}
          <figure className="relative overflow-hidden rounded-2xl">
            <div className={IMAGE_ASPECT}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/* Content column */}
          <div>
            <header>
              <h2
                id={headingId}
                className="font-bold tracking-tight text-[var(--foreground)]"
                style={{ fontSize: HEADING_CLAMP }}
              >
                {headline}
              </h2>
              {description && (
                <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
                  {description}
                </p>
              )}
            </header>

            {perks.length > 0 && (
              <div
                className={cn("mt-8 grid grid-cols-1 sm:grid-cols-2", GRID_GAP)}
              >
                {perks.map((perk) => (
                  <PerkCard key={perk.title} perk={perk} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
