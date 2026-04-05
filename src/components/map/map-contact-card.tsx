// @version 1.0.0
// @category map
// @name map-contact-card
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

interface MapContactCardProps {
  headline?: string;
  address: string;
  mapEmbedUrl?: string;
  contactDetails?: ContactDetail[];
  className?: string;
}

export default function MapContactCard({
  headline = "Visit Us",
  address,
  mapEmbedUrl,
  contactDetails = [],
  className,
}: MapContactCardProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="grid lg:grid-cols-2">
          {mapEmbedUrl ? (
            <div className="aspect-video lg:aspect-auto">
              <iframe src={mapEmbedUrl} className="size-full border-0" title="Location map" loading="lazy" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center lg:aspect-auto" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
              <svg className="size-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--muted-foreground)", opacity: 0.3 }} aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
          )}
          <div className="p-6 lg:p-8">
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{headline}</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{address}</p>
            {contactDetails.length > 0 && (
              <ul className="mt-4 space-y-2" role="list">
                {contactDetails.map((d) => (
                  <li key={d.label}>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="mt-0.5 block text-sm font-medium underline decoration-1 underline-offset-2" style={{ color: "var(--primary)" }}>{d.value}</a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--foreground)" }}>{d.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
