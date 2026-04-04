// @version 1.0.0
// @category stats
// @name Stats With Icons
// @source custom-implementation

import { cn } from "@/lib/utils";

interface IconStat {
  icon: React.ReactNode;
  value: string;
  label: string;
  description?: string;
}

interface StatsWithIconsProps {
  stats?: IconStat[];
  heading?: string;
  subheading?: string;
  columns?: 2 | 3 | 4;
  variant?: "minimal" | "card" | "icon-top";
  className?: string;
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const defaultStats: IconStat[] = [
  { icon: <UsersIcon className="h-6 w-6" />, value: "10K+", label: "Active Users", description: "Growing every day" },
  { icon: <ChartIcon className="h-6 w-6" />, value: "300%", label: "ROI Average", description: "For our customers" },
  { icon: <GlobeIcon className="h-6 w-6" />, value: "40+", label: "Countries", description: "Worldwide reach" },
  { icon: <ClockIcon className="h-6 w-6" />, value: "<1hr", label: "Response Time", description: "Average support" },
];

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export default function StatsWithIcons({
  stats = defaultStats,
  heading,
  subheading,
  columns = 4,
  variant = "card",
  className,
}: StatsWithIconsProps) {
  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--stats-icon-bg,transparent)]", className)}
      aria-label="Key metrics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-icon-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--stats-icon-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid gap-6 sm:gap-8", columnClasses[columns])}>
          {stats.map((stat) => {
            if (variant === "minimal") {
              return (
                <div key={stat.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 text-[var(--stats-icon-accent,hsl(220_80%_55%))]">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--stats-icon-value-color,hsl(0_0%_9%))]">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-[var(--stats-icon-label-color,hsl(0_0%_30%))]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            }

            if (variant === "icon-top") {
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--stats-icon-badge-bg,hsl(220_80%_55%/0.1))] text-[var(--stats-icon-accent,hsl(220_80%_55%))]">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-[var(--stats-icon-value-color,hsl(0_0%_9%))]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--stats-icon-label-color,hsl(0_0%_30%))]">
                    {stat.label}
                  </p>
                  {stat.description && (
                    <p className="mt-1 text-xs text-[var(--stats-icon-desc-color,hsl(0_0%_55%))]">
                      {stat.description}
                    </p>
                  )}
                </div>
              );
            }

            // card variant (default)
            return (
              <div
                key={stat.label}
                className={cn(
                  "rounded-2xl p-6",
                  "bg-[var(--stats-icon-card-bg,hsl(0_0%_98%))]",
                  "border border-[var(--stats-icon-card-border,hsl(0_0%_0%/0.06))]"
                )}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--stats-icon-badge-bg,hsl(220_80%_55%/0.1))] text-[var(--stats-icon-accent,hsl(220_80%_55%))]">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[var(--stats-icon-value-color,hsl(0_0%_9%))]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--stats-icon-label-color,hsl(0_0%_30%))]">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="mt-2 text-xs text-[var(--stats-icon-desc-color,hsl(0_0%_55%))]">
                    {stat.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
