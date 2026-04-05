// @version 1.0.0
// @category ecommerce
// @name ecommerce-product-quick-view
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface EcommerceProductQuickViewProps {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  badge?: string;
  features?: string[];
  className?: string;
}

export default function EcommerceProductQuickView({
  name,
  price,
  originalPrice,
  description,
  imageSrc,
  imageAlt = "",
  badge,
  features,
  className,
}: EcommerceProductQuickViewProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 overflow-hidden rounded-xl border md:grid-cols-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
          {/* Image */}
          <div className="relative aspect-square">
            <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
            {badge && (
              <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                {badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{name}</h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums" style={{ color: "var(--foreground)" }}>{price}</span>
              {originalPrice && (
                <span className="text-sm line-through" style={{ color: "var(--muted-foreground)" }}>{originalPrice}</span>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>

            {features && features.length > 0 && (
              <ul className="mt-4 space-y-1.5" role="list">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
