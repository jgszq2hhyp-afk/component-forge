import Link from "next/link";
import fs from "fs";
import path from "path";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COMPONENTS_DIR = path.join(process.cwd(), "src/components");
const ANIMATIONS_DIR = path.join(process.cwd(), "src/animations");

const CATEGORY_META: Record<string, { description: string; icon: string }> = {
  about: { description: "Company mission, history & values sections", icon: "🏢" },
  animations: { description: "Text marquee and motion components", icon: "✨" },
  avatar: { description: "Avatar groups and profile cards", icon: "👤" },
  backgrounds: { description: "Aurora, particles, gradient mesh & dot grid", icon: "🎨" },
  banners: { description: "Announcements, notifications & promotions", icon: "📢" },
  blog: { description: "Blog grids, featured posts & layouts", icon: "📝" },
  breadcrumbs: { description: "Navigation breadcrumb trails", icon: "🔗" },
  cards: { description: "Bento grids, glassmorphism & hover reveals", icon: "🃏" },
  careers: { description: "Job listings and culture sections", icon: "💼" },
  comparison: { description: "Feature tables and plan comparisons", icon: "⚖️" },
  contact: { description: "Contact forms and info cards", icon: "📬" },
  content: { description: "Text+image and two-column layouts", icon: "📄" },
  "cookie-consent": { description: "GDPR cookie banners & preference modals", icon: "🍪" },
  countdown: { description: "Launch countdown timers", icon: "⏱️" },
  cta: { description: "Call-to-action sections and floating bars", icon: "🎯" },
  dashboard: { description: "Stats overview, activity feed & charts", icon: "📊" },
  dividers: { description: "Wave, diagonal & curved section separators", icon: "〰️" },
  ecommerce: { description: "Product grids, detail pages & collections", icon: "🛒" },
  "empty-state": { description: "No data and no results placeholders", icon: "📭" },
  error: { description: "404, 500 and maintenance pages", icon: "⚠️" },
  faq: { description: "Accordions, timelines & searchable FAQs", icon: "❓" },
  features: { description: "Feature grids, bento layouts & comparisons", icon: "⭐" },
  footers: { description: "Footer layouts with CTAs and newsletters", icon: "🦶" },
  forms: { description: "Multi-step wizards, surveys & advanced forms", icon: "📋" },
  gallery: { description: "Masonry, lightbox, carousel & filterable", icon: "🖼️" },
  heroes: { description: "Hero sections with video, parallax & scroll", icon: "🦸" },
  integrations: { description: "Integration logos and showcase grids", icon: "🔌" },
  loading: { description: "Skeletons, spinners & progress bars", icon: "⏳" },
  login: { description: "Login and registration forms", icon: "🔐" },
  "logo-cloud": { description: "Scrolling and static logo displays", icon: "🏷️" },
  map: { description: "Location sections and store finders", icon: "📍" },
  "mobile-menu": { description: "Fullscreen overlays and drawer menus", icon: "📱" },
  modal: { description: "Lightbox, dialogs & command palette", icon: "🪟" },
  navigation: { description: "Navbars, mega menus & sidebars", icon: "🧭" },
  newsletter: { description: "Email signup sections", icon: "✉️" },
  notification: { description: "Toast stacks and inline alerts", icon: "🔔" },
  onboarding: { description: "Welcome wizards, tours & checklists", icon: "🚀" },
  pagination: { description: "Numbered pages and load more buttons", icon: "📖" },
  portfolio: { description: "Case studies and filterable project grids", icon: "💎" },
  pricing: { description: "Pricing cards, tables & sliders", icon: "💰" },
  process: { description: "Horizontal steps and vertical timelines", icon: "🔄" },
  ratings: { description: "Star ratings and review card grids", icon: "⭐" },
  search: { description: "Search heroes and results sections", icon: "🔍" },
  services: { description: "Service grids and pricing cards", icon: "🛠️" },
  sidebar: { description: "Blog sidebars and table of contents", icon: "📑" },
  "social-proof": { description: "Trust badges, logo carousels & banners", icon: "🏆" },
  stats: { description: "Animated counters, radial progress & grids", icon: "📈" },
  tables: { description: "Data tables and comparison matrices", icon: "📊" },
  tabs: { description: "Animated underline, vertical & pill tabs", icon: "🗂️" },
  team: { description: "Team grids, carousels & story timelines", icon: "👥" },
  testimonials: { description: "Quotes, carousels, video walls & marquees", icon: "💬" },
  ui: { description: "Interactive UI primitives and micro-interactions", icon: "🧩" },
  video: { description: "Video heroes, showcases & testimonials", icon: "🎬" },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface CategoryInfo {
  name: string;
  count: number;
  description: string;
  icon: string;
}

function getCategories(): CategoryInfo[] {
  const categories: CategoryInfo[] = [];

  // Components
  if (fs.existsSync(COMPONENTS_DIR)) {
    const dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
    for (const dir of dirs) {
      if (!dir.isDirectory() || dir.name.startsWith("_")) continue;
      const files = fs.readdirSync(path.join(COMPONENTS_DIR, dir.name)).filter(f => f.endsWith(".tsx"));
      const meta = CATEGORY_META[dir.name] ?? { description: `${dir.name} components`, icon: "📦" };
      categories.push({ name: dir.name, count: files.length, ...meta });
    }
  }

  // Animations (subfolders)
  if (fs.existsSync(ANIMATIONS_DIR)) {
    const dirs = fs.readdirSync(ANIMATIONS_DIR, { withFileTypes: true });
    let totalAnimations = 0;
    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;
      const files = fs.readdirSync(path.join(ANIMATIONS_DIR, dir.name)).filter(f => f.endsWith(".tsx"));
      totalAnimations += files.length;
    }
    if (totalAnimations > 0) {
      categories.push({
        name: "animations-lib",
        count: totalAnimations,
        description: "Entrance, hover, micro & scroll-driven animations",
        icon: "🎭",
      });
    }
  }

  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const categories = getCategories();
  const totalComponents = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      {/* -- Nav -- */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Component Forge
          </Link>
          <div className="flex items-center gap-4">
            <span
              className="hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-flex"
              style={{
                backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              {totalComponents} components
            </span>
            <a
              href="https://github.com/jgszq2hhyp-afk/component-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)]"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* -- Hero -- */}
      <section className="relative overflow-hidden py-[clamp(3rem,10vw,8rem)]">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Component Forge
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {totalComponents} award-winning components across {categories.length} categories.
            Built for Next.js 15, TypeScript strict, fully accessible.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: totalComponents.toString(), label: "Components" },
              { value: categories.length.toString(), label: "Categories" },
              { value: "91+", label: "Quality Score" },
              { value: "A11y", label: "Compliant" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                  {stat.value}
                </span>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Category Grid -- */}
      <section
        className="border-t py-[clamp(2rem,6vw,4rem)]"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-8 text-[clamp(1.25rem,2.5vw,2rem)] font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            All Categories
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/components/${cat.name}`}
                className="group flex flex-col gap-3 rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 motion-reduce:transition-none"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--foreground) 6%, transparent)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-semibold capitalize tracking-tight"
                    style={{ color: "var(--foreground)" }}
                  >
                    {cat.name.replace(/-/g, " ")}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {cat.description}
                  </p>
                </div>
                <svg
                  className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-60"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--muted-foreground)" }}
                  aria-hidden="true"
                >
                  <path d="M5 10h10M11 6l4 4-4 4" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- Footer -- */}
      <footer className="border-t py-8" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Component Forge &mdash; {totalComponents} components, continuously improved.
          </p>
        </div>
      </footer>
    </>
  );
}
