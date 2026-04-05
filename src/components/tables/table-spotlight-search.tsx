// @source 21st.dev/r/hamiddos/spotlight-table
// @category tables
// @name Spotlight Search Table

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Row {
  id: number | string;
  [key: string]: unknown;
}

interface Column {
  key: string;
  label: string;
}

interface SpotlightSearchTableProps {
  columns?: Column[];
  rows?: Row[];
  placeholder?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default data                                                       */
/* ------------------------------------------------------------------ */

const DEFAULT_COLUMNS: Column[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const DEFAULT_ROWS: Row[] = [
  { id: 1, name: "Astra", role: "Engineer", status: "Active" },
  { id: 2, name: "Bravo", role: "Design", status: "Active" },
  { id: 3, name: "Charlie", role: "Marketing", status: "Offline" },
  { id: 4, name: "Delta", role: "Sales", status: "Active" },
  { id: 5, name: "Echo", role: "Engineering", status: "Active" },
  { id: 6, name: "Foxtrot", role: "Design", status: "Away" },
];

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ value }: { value: string }) {
  const isActive = value === "Active";
  const isAway = value === "Away";
  return (
    <span
      className="rounded px-2 py-1 text-xs font-medium"
      style={{
        backgroundColor: isActive
          ? "color-mix(in srgb, var(--primary) 15%, transparent)"
          : isAway
            ? "color-mix(in srgb, var(--ring) 15%, transparent)"
            : "color-mix(in srgb, var(--muted-foreground) 15%, transparent)",
        color: isActive
          ? "var(--primary)"
          : isAway
            ? "var(--ring)"
            : "var(--muted-foreground)",
      }}
    >
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SpotlightSearchTable({
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  placeholder = "Search name or role…",
  className,
}: SpotlightSearchTableProps) {
  const [query, setQuery] = useState("");
  const lower = query.toLowerCase();

  return (
    <div
      className={cn(
        "grid min-h-screen place-content-center p-8",
        className
      )}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Search input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="mb-4 max-w-sm rounded-lg border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
        aria-label="Search table"
      />

      {/* Table */}
      <table className="min-w-[500px] border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted-foreground)" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const hit =
              lower.length > 0 &&
              Object.values(row).some((v) =>
                String(v).toLowerCase().includes(lower)
              );
            const dimmed = lower.length > 0 && !hit;

            return (
              <tr
                key={row.id}
                className="transition-opacity duration-200 motion-reduce:transition-none"
                style={{ opacity: dimmed ? 0.2 : 1 }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-sm">
                    {col.key === "status" ? (
                      <StatusBadge value={String(row[col.key])} />
                    ) : (
                      String(row[col.key] ?? "")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
