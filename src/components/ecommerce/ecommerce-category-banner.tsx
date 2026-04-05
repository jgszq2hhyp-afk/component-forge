// @version 1.0.0
// @category ecommerce
// @name ecommerce-category-banner
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const BANNER_HEIGHT = "clamp(12rem,30vw,20rem)";

interface EcommerceCategoryBannerProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export default function EcommerceCategoryBanner({
  title,
  description,
  imageSrc,
  imageAlt = "",
  className,
}: EcommerceCategoryBannerProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight: BANNER_HEIGHT }}
      aria-labelledby="ecb-heading"
    >
      <img src={imageSrc} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--background) 85%, transparent), color-mix(in srgb, var(--background) 40%, transparent))" }} aria-hidden="true" />

      <div className="relative flex h-full min-h-[inherit] items-center px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-lg">
          <h2 id="ecb-heading" className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
