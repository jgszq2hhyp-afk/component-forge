// @version 1.0.0
// @category map
// @name map-store-locator
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface Store {
  name: string;
  address: string;
  phone?: string;
  hours?: string;
}

interface MapStoreLocatorProps {
  headline?: string;
  stores: Store[];
  className?: string;
}

export default function MapStoreLocator({
  headline = "Find a Store",
  stores,
  className,
}: MapStoreLocatorProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="msl-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="msl-heading" className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {stores.map((store) => (
            <article key={store.name} className="rounded-xl border p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <div className="mb-2 flex items-start gap-3">
                <svg className="mt-0.5 size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{store.name}</h3>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{store.address}</p>
                </div>
              </div>
              {store.phone && <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Phone: {store.phone}</p>}
              {store.hours && <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Hours: {store.hours}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
