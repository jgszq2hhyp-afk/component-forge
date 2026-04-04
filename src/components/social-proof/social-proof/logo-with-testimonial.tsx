// @version 1.0.0
// @category social-proof
// @name Logo With Testimonial
// @source custom-implementation

import { cn } from "@/lib/utils";

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
    quote: "This product transformed how we work. Our team productivity increased by 40% in the first month.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Acme Corp",
    logoSrc: "/logos/acme.svg",
  },
  {
    quote: "The best investment we made this year. Simple to implement, powerful results.",
    author: "Marcus Johnson",
    role: "Head of Engineering",
    company: "Globex",
    logoSrc: "/logos/globex.svg",
  },
  {
    quote: "Outstanding support and a product that just works. We migrated in under a week.",
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
          "py-16 sm:py-24 bg-[var(--testimonial-bg,transparent)]",
          className
        )}
        aria-label="Customer testimonial"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={t.logoSrc}
            alt={t.company}
            className="mx-auto mb-8 h-8 w-auto opacity-50 grayscale"
            loading="lazy"
          />
          <blockquote>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[var(--testimonial-quote-color,hsl(0_0%_15%))]">
              &ldquo;{t.quote}&rdquo;
            </p>
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            {t.avatarSrc && (
              <img
                src={t.avatarSrc}
                alt={t.author}
                className="h-12 w-12 rounded-full object-cover"
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
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-[var(--testimonial-bg,transparent)]",
        className
      )}
      aria-label="Customer testimonials"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mb-12 text-center text-sm font-medium uppercase tracking-wider text-[var(--testimonial-heading-color,hsl(0_0%_45%))]">
            {heading}
          </h2>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className={cn(
                "rounded-2xl p-6 sm:p-8",
                "bg-[var(--testimonial-card-bg,hsl(0_0%_98%))]",
                "border border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))]"
              )}
            >
              <img
                src={t.logoSrc}
                alt={t.company}
                className="mb-6 h-6 w-auto opacity-40 grayscale"
                loading="lazy"
              />
              <blockquote>
                <p className="text-base leading-relaxed text-[var(--testimonial-quote-color,hsl(0_0%_25%))]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--testimonial-card-border,hsl(0_0%_0%/0.06))] pt-6">
                {t.avatarSrc ? (
                  <img
                    src={t.avatarSrc}
                    alt={t.author}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--testimonial-avatar-bg,hsl(0_0%_90%))] text-sm font-semibold text-[var(--testimonial-avatar-color,hsl(0_0%_30%))]">
                    {t.author.split(" ").map((n) => n[0]).join("")}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
