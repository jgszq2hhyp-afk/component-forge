// @version 2.0.0
// @category social-proof
// @name Logo With Testimonial
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PY = "py-16 sm:py-24";
const MAX_WIDTH_WIDE = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const MAX_WIDTH_NARROW = "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8";
const CARD_RADIUS = "rounded-2xl";
const LOGO_HEIGHT_SINGLE = "h-8";
const LOGO_HEIGHT_GRID = "h-6";
const AVATAR_SIZE_SINGLE = "h-12 w-12";
const AVATAR_SIZE_GRID = "h-10 w-10";

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
          SECTION_PY,
          "bg-[var(--testimonial-bg,transparent)]",
          className
        )}
        aria-label="Customer testimonial"
      >
        <div className={cn(MAX_WIDTH_NARROW, "text-center")}>
          <img
            src={t.logoSrc}
            alt={`${t.company} logo`}
            className={cn(
              "mx-auto mb-8 w-auto opacity-50 grayscale",
              LOGO_HEIGHT_SINGLE
            )}
            loading="lazy"
          />
          <figure>
            <blockquote>
              <p
                className={cn(
                  "font-medium leading-relaxed",
                  "text-[clamp(1.25rem,0.75rem+1.5vw,1.875rem)]",
                  "text-[var(--testimonial-quote-color,hsl(0_0%_15%))]"
                )}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              {t.avatarSrc && (
                <img
                  src={t.avatarSrc}
                  alt=""
                  className={cn(
                    AVATAR_SIZE_SINGLE,
                    "rounded-full object-cover"
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
        SECTION_PY,
        "bg-[var(--testimonial-bg,transparent)]",
        className
      )}
      aria-label="Customer testimonials"
    >
      <div className={MAX_WIDTH_WIDE}>
        {heading && (
          <h2 className="mb-12 text-center text-sm font-medium uppercase tracking-wider text-[var(--testimonial-heading-color,hsl(0_0%_45%))]">
            {heading}
          </h2>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className={cn(
                CARD_RADIUS,
                "p-6 sm:p-8",
                "bg-[var(--testimonial-card-bg,hsl(0_0%_98%))]",
                "border border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))]",
                "focus-within:ring-2 focus-within:ring-[var(--testimonial-focus-ring,hsl(220_80%_55%))] focus-within:ring-offset-2"
              )}
            >
              <img
                src={t.logoSrc}
                alt={`${t.company} logo`}
                className={cn(
                  "mb-6 w-auto opacity-40 grayscale",
                  LOGO_HEIGHT_GRID
                )}
                loading="lazy"
              />
              <figure>
                <blockquote>
                  <p className="text-base leading-relaxed text-[var(--testimonial-quote-color,hsl(0_0%_25%))]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))] pt-6">
                  {t.avatarSrc ? (
                    <img
                      src={t.avatarSrc}
                      alt=""
                      className={cn(
                        AVATAR_SIZE_GRID,
                        "rounded-full object-cover"
                      )}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full text-sm font-semibold",
                        AVATAR_SIZE_GRID,
                        "bg-[var(--testimonial-avatar-bg,hsl(0_0%_90%))]",
                        "text-[var(--testimonial-avatar-color,hsl(0_0%_30%))]"
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
