import HeroTypographyOnly from "@/components/heroes/hero-typography-only";
import { NavStickyBlur } from "@/components/navigation/nav-sticky-blur";
import { SectionWrapper } from "@/layouts/section-wrapper";

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: "Heroes", href: "#heroes" },
  { label: "Navigation", href: "#navigation" },
  { label: "Layouts", href: "#layouts" },
  { label: "Hooks", href: "#hooks" },
];

const categories = [
  {
    title: "Heroes",
    count: 2,
    description:
      "Full-screen hero sections with typography, split-image layouts, and animated entrances.",
    components: ["HeroTypographyOnly", "HeroSplitImage"],
    href: "#heroes",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    title: "Navigation",
    count: 1,
    description:
      "Sticky nav bars with blur backdrop, mobile slide-out menu, and scroll-aware state.",
    components: ["NavStickyBlur"],
    href: "#navigation",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: "Layouts",
    count: 3,
    description:
      "Reusable layout primitives: section wrappers, split grids, and full-bleed containers.",
    components: ["SectionWrapper", "SplitLayout", "FullBleed"],
    href: "#layouts",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Hooks",
    count: 4,
    description:
      "Utility hooks for scroll progress, intersection reveals, magnetic cursors, and reduced motion.",
    components: [
      "useIntersectionReveal",
      "useMagneticCursor",
      "useReducedMotion",
      "useScrollProgress",
    ],
    href: "#hooks",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18a4 4 0 0 0-8 0" />
        <circle cx="12" cy="11" r="3" />
        <path d="M12 2v1M4.22 4.22l.7.7M2 12h1M4.22 19.78l.7-.7M20 12h1M19.08 4.92l-.7.7M19.08 19.08l-.7-.7" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* -- Nav -- */}
      <NavStickyBlur
        logoText="Component Forge"
        links={navLinks}
        ctaText="GitHub"
        ctaHref="#"
      />

      {/* -- Hero -- */}
      <HeroTypographyOnly
        headline="Component Forge"
        subheadline="Award-winning components. Continuously improved."
        ctaText="Explore Components"
        ctaHref="#components"
        secondaryCtaText="View Source"
        secondaryCtaHref="#"
      />

      {/* -- Component Grid -- */}
      <SectionWrapper id="components" className="scroll-mt-20">
        <div className="mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            Library
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Component Categories
          </h2>
          <p
            className="mt-3 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Every component is built for production: accessible, responsive, and
            performant out of the box.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              {/* icon + count badge */}
              <div className="flex items-center justify-between">
                <div
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 8%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  {cat.icon}
                </div>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--foreground) 6%, transparent)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {cat.count} {cat.count === 1 ? "component" : "components"}
                </span>
              </div>

              {/* title + description */}
              <div>
                <h3
                  className="text-lg font-semibold tracking-tight"
                  style={{ color: "var(--foreground)" }}
                >
                  {cat.title}
                </h3>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {cat.description}
                </p>
              </div>

              {/* component list */}
              <div className="mt-auto flex flex-wrap gap-1.5">
                {cat.components.map((name) => (
                  <span
                    key={name}
                    className="rounded-md px-2 py-0.5 text-xs font-mono"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--foreground) 5%, transparent)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* arrow indicator */}
              <svg
                className="absolute right-5 top-6 size-5 opacity-0 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--muted-foreground)" }}
              >
                <path d="M5 10h10M11 6l4 4-4 4" />
              </svg>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* -- Stats / CTA -- */}
      <section
        className="border-t"
        style={{
          borderColor: "var(--border)",
          backgroundColor:
            "color-mix(in srgb, var(--foreground) 2%, var(--background))",
        }}
      >
        <SectionWrapper>
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--foreground)" }}
            >
              Built for production
            </h2>
            <p
              className="mt-3 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Every component is accessibility-tested, responsive, and ships
              with reduced-motion support. Drop them into any Next.js project.
            </p>

            {/* stat row */}
            <div className="mt-10 grid w-full max-w-md grid-cols-3 gap-6">
              {[
                { value: "10", label: "Components" },
                { value: "4", label: "Hooks" },
                { value: "A11y", label: "Compliant" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: "var(--foreground)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="mt-1 text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Get Started
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg border px-7 py-3.5 text-[0.9375rem] font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* -- Footer -- */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Component Forge &mdash; Continuously improved.
          </p>
        </div>
      </footer>
    </>
  );
}
