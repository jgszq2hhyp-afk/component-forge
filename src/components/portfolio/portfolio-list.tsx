// @version 1.0.0
// @category portfolio
// @name portfolio-list
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface PortfolioProject { title: string; year: string; category: string; href?: string; }

interface PortfolioListProps {
  headline?: string;
  projects: PortfolioProject[];
  className?: string;
}

export default function PortfolioList({ headline = "Selected Work", projects, className }: PortfolioListProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="pl-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="pl-heading" className="mb-8 font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        <div className="divide-y" style={{ ['--tw-divide-color' as string]: "var(--border)" }}>
          {projects.map((p) => {
            const Tag = p.href ? "a" : "div";
            return (
              <Tag key={`${p.title}-${p.year}`} {...(p.href ? { href: p.href } : {})} className={cn("flex items-center justify-between py-4", p.href && "group cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded")}>
                <div>
                  <h3 className="text-base font-medium motion-safe:transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{p.category}</p>
                </div>
                <span className="text-sm tabular-nums" style={{ color: "var(--muted-foreground)" }}>{p.year}</span>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
