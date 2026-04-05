// @version 1.0.0
// @category tables
// @name table-responsive-cards
// @source custom

import { cn } from "@/lib/utils";

interface TableResponsiveCardsProps { headers: string[]; rows: string[][]; className?: string; }

export default function TableResponsiveCards({ headers, rows, className }: TableResponsiveCardsProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border md:block" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
              {headers.map((h) => <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                {row.map((cell, j) => <td key={j} className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <div key={i} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            {row.map((cell, j) => (
              <div key={j} className={cn("flex justify-between py-1", j > 0 && "border-t")} style={{ borderColor: "var(--border)" }}>
                <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{headers[j]}</span>
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
