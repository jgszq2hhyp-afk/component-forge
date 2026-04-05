// @version 1.0.0
// @category careers
// @name careers-team-testimonial
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PADDING_Y = "clamp(3rem,8vw,6rem)";
const SECTION_PADDING_X = "clamp(1rem,4vw,2rem)";
const AVATAR_SIZE_PX = 48;
const INITIALS_LENGTH = 2;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

interface CareersTeamTestimonialProps {
  headline?: string;
  testimonials: Testimonial[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, INITIALS_LENGTH);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersTeamTestimonial({
  headline = "What Our Team Says",
  testimonials,
  className,
}: CareersTeamTestimonialProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PADDING_Y} ${SECTION_PADDING_X}` }}
      aria-labelledby={headline ? "team-testimonial-heading" : undefined}
    >
      <div className="mx-auto max-w-7xl">
        {headline && (
          <h2
            id="team-testimonial-heading"
            className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={`${t.name}-${t.role}`}
              className={cn(
                "flex flex-col gap-4 rounded-xl border p-6",
                "motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-md",
                "motion-reduce:transition-none",
              )}
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              {/* Quote icon */}
              <svg
                className="size-8 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ color: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <p
                className="flex-1 text-sm leading-relaxed italic"
                style={{ color: "var(--foreground)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-2">
                {t.avatarSrc ? (
                  <img
                    src={t.avatarSrc}
                    alt={t.name}
                    className="rounded-full object-cover"
                    style={{ width: AVATAR_SIZE_PX, height: AVATAR_SIZE_PX }}
                  />
                ) : (
                  <span
                    className="flex items-center justify-center rounded-full text-xs font-semibold"
                    style={{
                      width: AVATAR_SIZE_PX,
                      height: AVATAR_SIZE_PX,
                      backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }}
                    aria-hidden="true"
                  >
                    {getInitials(t.name)}
                  </span>
                )}
                <div>
                  <cite
                    className="not-italic text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t.name}
                  </cite>
                  <p
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
