// @version 1.0.0
// @category gallery
// @name Gallery Filterable
// @source custom-implementation

"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
  description?: string;
  href?: string;
}

interface GalleryFilterableProps {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
  allLabel?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const defaultItems: GalleryItem[] = [
  { src: "/placeholder-1.jpg", alt: "Web project", title: "E-Commerce Platform", category: "Web Design", description: "Full redesign and development" },
  { src: "/placeholder-2.jpg", alt: "Brand project", title: "Tech Startup Identity", category: "Branding", description: "Logo, colors, and guidelines" },
  { src: "/placeholder-3.jpg", alt: "App project", title: "Fitness Tracker App", category: "App Design", description: "iOS and Android design" },
  { src: "/placeholder-4.jpg", alt: "Web project", title: "SaaS Dashboard", category: "Web Design", description: "Analytics dashboard UI" },
  { src: "/placeholder-5.jpg", alt: "Brand project", title: "Restaurant Rebrand", category: "Branding", description: "Complete brand overhaul" },
  { src: "/placeholder-6.jpg", alt: "App project", title: "Social Media App", category: "App Design", description: "Community platform design" },
  { src: "/placeholder-7.jpg", alt: "Print project", title: "Annual Report", category: "Print", description: "Editorial design" },
  { src: "/placeholder-8.jpg", alt: "Web project", title: "Portfolio Site", category: "Web Design", description: "Minimal portfolio" },
  { src: "/placeholder-9.jpg", alt: "Print project", title: "Packaging Design", category: "Print", description: "Product packaging" },
];

export default function GalleryFilterable({
  title = "Our Portfolio",
  subtitle = "Explore our work across different categories.",
  items = defaultItems,
  allLabel = "All",
  columns = 3,
  className,
}: GalleryFilterableProps) {
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return [allLabel, ...Array.from(cats)];
  }, [items, allLabel]);

  const filteredItems = useMemo(() => {
    if (activeCategory === allLabel) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory, allLabel]);

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <section className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--gallery-title,hsl(0_0%_9%))]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-[var(--gallery-subtitle,hsl(0_0%_40%))]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 motion-reduce:transition-none",
                activeCategory === category
                  ? "bg-[var(--gallery-tab-active-bg,hsl(0_0%_9%))] text-[var(--gallery-tab-active-text,hsl(0_0%_100%))] shadow-sm"
                  : "bg-[var(--gallery-tab-bg,hsl(0_0%_0%/0.05))] text-[var(--gallery-tab-text,hsl(0_0%_40%))] hover:bg-[var(--gallery-tab-hover-bg,hsl(0_0%_0%/0.1))] hover:text-[var(--gallery-tab-hover-text,hsl(0_0%_9%))]"
              )}
            >
              {category}
              {activeCategory === allLabel && category !== allLabel && (
                <span className="ml-1.5 text-xs opacity-60">
                  {items.filter((i) => i.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={cn("grid gap-6", colClass)}>
          {filteredItems.map((item, index) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href ? { href: item.href } : {};

            return (
              <Wrapper
                key={`${item.title}-${index}`}
                {...wrapperProps}
                className={cn(
                  "group overflow-hidden rounded-xl transition-shadow duration-300",
                  "bg-[var(--gallery-card-bg,hsl(0_0%_100%))]",
                  "border border-[var(--gallery-card-border,hsl(0_0%_0%/0.08))]",
                  "hover:shadow-lg",
                  "motion-reduce:transition-none"
                )}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-500",
                      "group-hover:scale-105",
                      "motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                    )}
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--gallery-badge-bg,hsl(0_0%_0%/0.05))] text-[var(--gallery-badge-text,hsl(0_0%_40%))]">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[var(--gallery-card-title,hsl(0_0%_9%))]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-[var(--gallery-card-desc,hsl(0_0%_40%))]">
                      {item.description}
                    </p>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-[var(--gallery-subtitle,hsl(0_0%_40%))]">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
