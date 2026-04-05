// @version 1.0.0
// @category tables
// @name table-expandable-rows
// @source custom

import { cn } from "@/lib/utils";

interface ExpandableRow { cells: string[]; detail: string; }
interface TableExpandableRowsProps { headers: string[]; rows: ExpandableRow[]; className?: string; }

export default function TableExpandableRows({ headers, rows, className }: TableExpandableRowsProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border", className)} style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
            <th className="w-8 px-2" />
            {headers.map((h) => <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="group border-t" style={{ borderColor: "var(--border)" }}>
              <td colSpan={headers.length + 1} className="p-0">
                <details className="group/detail">
                  <summary className="flex cursor-pointer items-center">
                    <span className="flex w-8 items-center justify-center px-2 py-3">
                      <svg className="size-3.5 motion-safe:transition-transform group-open/detail:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><path d="m9 18 6-6-6-6" /></svg>
                    </span>
                    {row.cells.map((cell, j) => <span key={j} className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{cell}</span>)}
                  </summary>
                  <div className="border-t px-4 py-3 text-xs leading-relaxed" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", backgroundColor: "color-mix(in srgb, var(--foreground) 2%, var(--background))" }}>
                    {row.detail}
                  </div>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
