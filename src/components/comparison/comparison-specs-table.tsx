// @version 1.0.0
// @category comparison
// @name comparison-specs-table
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Spec {
  name: string;
  values: string[];
}

interface ComparisonSpecsTableProps {
  headline?: string;
  products: string[];
  specs: Spec[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparisonSpecsTable({
  headline,
  products,
  specs,
  className,
}: ComparisonSpecsTableProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "cst-heading" : undefined}
    >
      <div className="mx-auto max-w-5xl">
        {headline && (
          <h2
            id="cst-heading"
            className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
                <th
                  scope="col"
                  className="sticky left-0 px-4 py-3 text-left font-semibold"
                  style={{
                    color: "var(--muted-foreground)",
                    backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))",
                  }}
                >
                  Specification
                </th>
                {products.map((p) => (
                  <th
                    key={p}
                    scope="col"
                    className="px-4 py-3 text-center font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, i) => (
                <tr
                  key={spec.name}
                  className="border-t"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: i % 2 === 1
                      ? "color-mix(in srgb, var(--foreground) 2%, var(--background))"
                      : "var(--background)",
                  }}
                >
                  <td
                    className="sticky left-0 px-4 py-3 font-medium"
                    style={{
                      color: "var(--foreground)",
                      backgroundColor: i % 2 === 1
                        ? "color-mix(in srgb, var(--foreground) 2%, var(--background))"
                        : "var(--background)",
                    }}
                  >
                    {spec.name}
                  </td>
                  {spec.values.map((val, j) => (
                    <td
                      key={`${spec.name}-${products[j]}`}
                      className="px-4 py-3 text-center"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
