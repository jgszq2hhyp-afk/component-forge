// @version 1.0.0
// @category search
// @name search-filter-sidebar
// @source custom

import { cn } from "@/lib/utils";

interface FilterGroup { label: string; options: string[]; }
interface SearchFilterSidebarProps { filters: FilterGroup[]; activeFilters?: string[]; className?: string; }

export default function SearchFilterSidebar({ filters, activeFilters = [], className }: SearchFilterSidebarProps) {
  return (
    <aside className={cn("w-full max-w-xs space-y-6", className)}>
      {filters.map((group) => (
        <div key={group.label}>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>{group.label}</h3>
          <ul className="space-y-1.5" role="list">
            {group.options.map((opt) => {
              const active = activeFilters.includes(opt);
              return (
                <li key={opt}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors" style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    <span className="flex size-4 items-center justify-center rounded border" style={{ borderColor: active ? "var(--primary)" : "var(--border)", backgroundColor: active ? "var(--primary)" : "transparent" }}>
                      {active && <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary-foreground)" }}><path d="M20 6L9 17l-5-5" /></svg>}
                    </span>
                    {opt}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
