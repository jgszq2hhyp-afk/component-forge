// @version 1.0.0
// @category tables
// @name table-sortable
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";

interface Column { key: string; label: string; sortable?: boolean; }
interface TableSortableProps { columns: Column[]; rows: Record<string, string | number>[]; className?: string; }

export default function TableSortable({ columns, rows, className }: TableSortableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }, [sortKey]);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir]);

  return (
    <div className={cn("overflow-x-auto rounded-xl border", className)} style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>
                {col.sortable ? (
                  <button type="button" onClick={() => handleSort(col.key)} className="inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 rounded" style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                    {col.label}
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: sortKey === col.key ? "var(--primary)" : "var(--muted-foreground)" }}><path d="m7 15 5 5 5-5M7 9l5-5 5 5" /></svg>
                  </button>
                ) : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--border)", backgroundColor: i % 2 === 1 ? "color-mix(in srgb, var(--foreground) 2%, var(--background))" : "var(--background)" }}>
              {columns.map((col) => <td key={col.key} className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
