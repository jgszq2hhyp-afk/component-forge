// @version 1.0.0
// @category portfolio
// @name portfolio-image-grid
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface PortfolioItem { title: string; category?: string; imageSrc: string; imageAlt?: string; href?: string; }

interface PortfolioImageGridProps {
  headline?: string;
  items: PortfolioItem[];
  className?: string;
}

export default function PortfolioImageGrid({ headline, items, className }: PortfolioImageGridProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "pig-heading" : undefined}>
      <div className="mx-auto max-w-6xl">
        {headline && <h2 id="pig-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Tag = item.href ? "a" : "div";
            return (
              <Tag key={item.title} {...(item.href ? { href: item.href } : {})} className="group relative aspect-[4/3] overflow-hidden rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                <img src={item.imageSrc} alt={item.imageAlt ?? item.title} className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end p-4" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--background) 80%, transparent) 0%, transparent 60%)" }}>
                  {item.category && <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>{item.category}</span>}
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
