// @version 1.0.0
// @category tables
// @name table-striped
// @source custom

import { cn } from "@/lib/utils";

interface TableStripedProps { headers: string[]; rows: string[][]; className?: string; }

export default function TableStriped({ headers, rows, className }: TableStripedProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border", className)} style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 5%, var(--background))" }}>
            {headers.map((h) => <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--border)", backgroundColor: i % 2 === 0 ? "var(--background)" : "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}>
              {row.map((cell, j) => <td key={j} className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
