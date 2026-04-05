// @version 1.0.0
// @category newsletter
// @name newsletter-with-image
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface NewsletterWithImageProps {
  headline?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export default function NewsletterWithImage({
  headline = "Subscribe to our newsletter",
  description = "Get weekly insights delivered to your inbox.",
  imageSrc,
  imageAlt = "",
  className,
}: NewsletterWithImageProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
        <div className="grid md:grid-cols-2">
          <div className="hidden md:block">
            <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8" style={{ backgroundColor: "var(--card)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{headline}</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Your email" className="w-full rounded-lg border px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} />
              <button type="submit" className="w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
