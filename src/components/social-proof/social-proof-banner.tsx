// @version 2.0.0
// @category social-proof
// @name Social Proof Banner
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PY = "py-10 sm:py-14";
const MAX_WIDTH = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const STAT_PX = "px-6 sm:px-10";
const DIVIDER_HEIGHT = "h-12";

interface Stat {
  value: string;
  label: string;
}

interface SocialProofBannerProps {
  headline?: string;
  stats?: Stat[];
  variant?: "dark" | "light" | "accent";
  className?: string;
}

const defaultStats: Stat[] = [
  { value: "1,000+", label: "Companies" },
  { value: "50K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Rating" },
];

const variantStyles: Record<
  string,
  { bg: string; headline: string; value: string; label: string; divider: string }
> = {
  dark: {
    bg: "bg-[var(--proof-banner-bg,hsl(0_0%_5%))]",
    headline: "text-[var(--proof-banner-headline,hsl(0_0%_100%))]",
    value: "text-[var(--proof-banner-value,hsl(0_0%_100%))]",
    label: "text-[var(--proof-banner-label,hsl(0_0%_60%))]",
    divider: "bg-[var(--proof-banner-divider,hsl(0_0%_100%/0.1))]",
  },
  light: {
    bg: "bg-[var(--proof-banner-bg,hsl(0_0%_98%))]",
    headline: "text-[var(--proof-banner-headline,hsl(0_0%_9%))]",
    value: "text-[var(--proof-banner-value,hsl(0_0%_9%))]",
    label: "text-[var(--proof-banner-label,hsl(0_0%_45%))]",
    divider: "bg-[var(--proof-banner-divider,hsl(0_0%_0%/0.08))]",
  },
  accent: {
    bg: "bg-[var(--proof-banner-bg,hsl(220_80%_55%))]",
    headline: "text-[var(--proof-banner-headline,hsl(0_0%_100%))]",
    value: "text-[var(--proof-banner-value,hsl(0_0%_100%))]",
    label: "text-[var(--proof-banner-label,hsl(0_0%_100%/0.7))]",
    divider: "bg-[var(--proof-banner-divider,hsl(0_0%_100%/0.2))]",
  },
};

export default function SocialProofBanner({
  headline = "Trusted by 1,000+ companies worldwide",
  stats = defaultStats,
  variant = "dark",
  className,
}: SocialProofBannerProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={cn(SECTION_PY, styles.bg, className)}
      aria-label="Social proof statistics"
    >
      <div className={MAX_WIDTH}>
        {headline && (
          <p
            className={cn(
              "mb-8 text-center font-medium",
              "text-[clamp(1rem,0.5rem+1vw,1.125rem)]",
              styles.headline
            )}
          >
            {headline}
          </p>
        )}

        <dl className="flex flex-wrap items-center justify-center gap-y-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className={cn(STAT_PX, "text-center")}>
                <dt className="order-2">
                  <span
                    className={cn(
                      "mt-1 block text-sm font-medium",
                      styles.label
                    )}
                  >
                    {stat.label}
                  </span>
                </dt>
                <dd className="order-1">
                  <span
                    className={cn(
                      "font-bold tracking-tight",
                      "text-[clamp(1.5rem,1rem+1.5vw,2.25rem)]",
                      styles.value
                    )}
                  >
                    {stat.value}
                  </span>
                </dd>
              </div>
              {i < stats.length - 1 && (
                <div
                  className={cn(
                    "hidden sm:block w-px",
                    DIVIDER_HEIGHT,
                    styles.divider
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
