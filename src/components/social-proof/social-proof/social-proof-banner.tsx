// @version 1.0.0
// @category social-proof
// @name Social Proof Banner
// @source custom-implementation

import { cn } from "@/lib/utils";

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

const variantStyles: Record<string, { bg: string; headline: string; value: string; label: string; divider: string }> = {
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
      className={cn("py-10 sm:py-14", styles.bg, className)}
      aria-label="Social proof"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {headline && (
          <p
            className={cn(
              "mb-8 text-center text-base sm:text-lg font-medium",
              styles.headline
            )}
          >
            {headline}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-y-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="px-6 sm:px-10 text-center">
                <p
                  className={cn(
                    "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
                    styles.value
                  )}
                >
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm font-medium",
                    styles.label
                  )}
                >
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div
                  className={cn(
                    "hidden sm:block h-12 w-px",
                    styles.divider
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
