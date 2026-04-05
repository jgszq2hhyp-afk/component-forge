// @version 1.0.0
// @category ratings
// @name ratings-testimonial-with-stars
// @source custom

import { cn } from "@/lib/utils";

const STAR_COUNT = 5;

interface Review { author: string; role?: string; rating: number; text: string; }
interface RatingsTestimonialWithStarsProps { headline?: string; reviews: Review[]; className?: string; }

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${STAR_COUNT} stars`}>
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <svg key={i} className="size-4" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" style={{ color: "var(--primary)" }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function RatingsTestimonialWithStars({ headline, reviews, className }: RatingsTestimonialWithStarsProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: "clamp(3rem,8vw,6rem) clamp(1rem,4vw,2rem)" }} aria-labelledby={headline ? "rtws-heading" : undefined}>
      <div className="mx-auto max-w-5xl">
        {headline && <h2 id="rtws-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "var(--foreground)" }}>{headline}</h2>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={`${r.author}-${r.text.slice(0, 20)}`} className="rounded-xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <Stars rating={r.rating} />
              <p className="mt-3 text-sm leading-relaxed italic" style={{ color: "var(--foreground)" }}>&ldquo;{r.text}&rdquo;</p>
              <footer className="mt-3">
                <cite className="not-italic text-sm font-semibold" style={{ color: "var(--foreground)" }}>{r.author}</cite>
                {r.role && <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{r.role}</p>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
