// @version 1.0.0
// @category careers
// @name careers-benefits-grid
// @source custom

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_HEADLINE = "Why work with us";

const CARD_BASE =
  "group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 " +
  "transition-shadow duration-300 ease-out " +
  "hover:shadow-[0_8px_32px_-4px_var(--shadow,hsl(215_20%_65%_/_0.15))] " +
  "focus-visible:outline-none focus-visible:ring-2";

const ICON_WRAPPER =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl " +
  "bg-[var(--primary)] text-[var(--primary-foreground)] " +
  "transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none";

const TITLE_CLASS =
  "text-[var(--card-foreground)] font-semibold leading-snug " +
  "text-[clamp(1rem,2vw+0.5rem,1.125rem)]";

const DESC_CLASS =
  "text-[var(--muted-foreground)] text-sm leading-relaxed";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Benefit {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface CareersBenefitsGridProps {
  headline?: string;
  benefits: Benefit[];
  className?: string;
}

// ─── Fallback icon when none provided ────────────────────────────────────────
function DefaultBenefitIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <article
      className={CARD_BASE}
      style={
        {
          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
        } as React.CSSProperties
      }
    >
      <div className={ICON_WRAPPER} aria-hidden="true">
        {benefit.icon ?? <DefaultBenefitIcon />}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className={TITLE_CLASS}>{benefit.title}</h3>
        <p className={DESC_CLASS}>{benefit.description}</p>
      </div>

      {/* Subtle gradient overlay on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04] motion-reduce:transition-none"
      />
    </article>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CareersBenefitsGrid({
  headline = DEFAULT_HEADLINE,
  benefits,
  className,
}: CareersBenefitsGridProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section
      aria-labelledby="benefits-heading"
      className={cn("w-full py-16 px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <header className="mb-12 text-center">
          <h2
            id="benefits-heading"
            className="font-bold text-[var(--foreground)] text-[clamp(1.5rem,3vw+1rem,2.5rem)] leading-tight"
          >
            {headline}
          </h2>
        </header>

        {/* Grid */}
        <ul
          role="list"
          className={cn(
            "grid gap-6",
            "grid-cols-1 sm:grid-cols-2",
            benefits.length >= 3 ? "lg:grid-cols-3" : "",
            benefits.length >= 4 ? "xl:grid-cols-4" : "",
          )}
        >
          {benefits.map((benefit, index) => (
            <li key={`${benefit.title}-${index}`}>
              <BenefitCard benefit={benefit} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
