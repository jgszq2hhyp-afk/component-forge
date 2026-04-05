// @version 2.0.0
// @category social-proof
// @name Logo With Testimonial
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH_WIDE = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const MAX_WIDTH_NARROW = "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8";
const CARD_RADIUS = "rounded-2xl";
const CARD_PADDING = "p-6 sm:p-8";
const LOGO_HEIGHT_SINGLE = "h-8";
const LOGO_HEIGHT_GRID = "h-6";
const LOGO_MARGIN_BOTTOM_SINGLE = "mb-8";
const LOGO_MARGIN_BOTTOM_GRID = "mb-6";
const AVATAR_SIZE_SINGLE = "h-12 w-12";
const AVATAR_SIZE_GRID = "h-10 w-10";
const HEADING_MARGIN_BOTTOM = "mb-12";
const QUOTE_CLAMP_SINGLE = "text-[clamp(1.25rem,0.75rem+1.5vw,1.875rem)]";
const HEADING_CLAMP = "text-[clamp(0.75rem,0.5vw+0.5rem,0.875rem)]";
const FIGCAPTION_GAP_SINGLE = "gap-4";
const FIGCAPTION_GAP_GRID = "gap-3";
const FIGCAPTION_MARGIN_TOP_SINGLE = "mt-8";
const FIGCAPTION_MARGIN_TOP_GRID = "mt-6";
const FIGCAPTION_PADDING_TOP_GRID = "pt-6";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logoSrc: string;
  avatarSrc?: string;
}

interface LogoWithTestimonialProps {
  testimonials?: Testimonial[];
  heading?: string;
  layout?: "single" | "grid";
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "This product transformed how we work. Our team productivity increased by 40% in the first month.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Acme Corp",
    logoSrc: "/logos/acme.svg",
  },
  {
    quote:
      "The best investment we made this year. Simple to implement, powerful results.",
    author: "Marcus Johnson",
    role: "Head of Engineering",
    company: "Globex",
    logoSrc: "/logos/globex.svg",
  },
  {
    quote:
      "Outstanding support and a product that just works. We migrated in under a week.",
    author: "Elena Rodriguez",
    role: "VP Product",
    company: "Initech",
    logoSrc: "/logos/initech.svg",
  },
];

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function LogoWithTestimonial({
  testimonials = defaultTestimonials,
  heading = "What our customers say",
  layout = "grid",
  className,
}: LogoWithTestimonialProps) {
  if (layout === "single" && testimonials.length > 0) {
    const t = testimonials[0];
    return (
      <section
        className={cn(
          SECTION_PADDING_Y,
          "bg-[var(--testimonial-bg,transparent)]",
          className,
        )}
        aria-label="Customer testimonial"
      >
        <div className={cn(MAX_WIDTH_NARROW, "text-center")}>
          <img
            src={t.logoSrc}
            alt={`${t.company} logo`}
            className={cn(
              "mx-auto w-auto opacity-50 grayscale",
              LOGO_HEIGHT_SINGLE,
              LOGO_MARGIN_BOTTOM_SINGLE,
            )}
            loading="lazy"
          />
          <figure>
            <blockquote>
              <p
                className={cn(
                  "font-medium leading-relaxed",
                  QUOTE_CLAMP_SINGLE,
                  "text-[var(--testimonial-quote-color,hsl(0_0%_15%))]",
                )}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption
              className={cn(
                "flex items-center justify-center",
                FIGCAPTION_MARGIN_TOP_SINGLE,
                FIGCAPTION_GAP_SINGLE,
              )}
            >
              {t.avatarSrc && (
                <img
                  src={t.avatarSrc}
                  alt=""
                  className={cn(
                    AVATAR_SIZE_SINGLE,
                    "rounded-full object-cover",
                  )}
                  loading="lazy"
                />
              )}
              <div className="text-left">
                <p className="text-sm font-semibold text-[var(--testimonial-author-color,hsl(0_0%_9%))]">
                  {t.author}
                </p>
                <p className="text-sm text-[var(--testimonial-role-color,hsl(0_0%_45%))]">
                  {t.role}, {t.company}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        SECTION_PADDING_Y,
        "bg-[var(--testimonial-bg,transparent)]",
        className,
      )}
      aria-label="Customer testimonials"
    >
      <div className={MAX_WIDTH_WIDE}>
        {heading && (
          <h2
            className={cn(
              HEADING_MARGIN_BOTTOM,
              "text-center font-medium uppercase tracking-wider",
              "text-[var(--testimonial-heading-color,hsl(0_0%_45%))]",
            )}
            style={{ fontSize: HEADING_CLAMP }}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className={cn(
                CARD_RADIUS,
                CARD_PADDING,
                "bg-[var(--testimonial-card-bg,hsl(0_0%_98%))]",
                "border border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))]",
              )}
              style={{
                ['--tw-ring-color' as string]: RING_COLOR_VALUE,
              }}
            >
              <img
                src={t.logoSrc}
                alt={`${t.company} logo`}
                className={cn(
                  "w-auto opacity-40 grayscale",
                  LOGO_HEIGHT_GRID,
                  LOGO_MARGIN_BOTTOM_GRID,
                )}
                loading="lazy"
              />
              <figure>
                <blockquote>
                  <p className="text-base leading-relaxed text-[var(--testimonial-quote-color,hsl(0_0%_25%))]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption
                  className={cn(
                    "flex items-center border-t border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))]",
                    FIGCAPTION_MARGIN_TOP_GRID,
                    FIGCAPTION_GAP_GRID,
                    FIGCAPTION_PADDING_TOP_GRID,
                  )}
                >
                  {t.avatarSrc ? (
                    <img
                      src={t.avatarSrc}
                      alt=""
                      className={cn(
                        AVATAR_SIZE_GRID,
                        "rounded-full object-cover",
                      )}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full text-sm font-semibold",
                        AVATAR_SIZE_GRID,
                        "bg-[var(--testimonial-avatar-bg,hsl(0_0%_90%))]",
                        "text-[var(--testimonial-avatar-color,hsl(0_0%_30%))]",
                      )}
                      aria-hidden="true"
                    >
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[var(--testimonial-author-color,hsl(0_0%_9%))]">
                      {t.author}
                    </p>
                    <p className="text-xs text-[var(--testimonial-role-color,hsl(0_0%_45%))]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
