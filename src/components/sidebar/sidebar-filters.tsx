// @version 1.0.0
// @category sidebar
// @name sidebar-filters
// @source custom

import { cn } from "@/lib/utils";

interface FilterSection { title: string; options: string[]; }
interface SidebarFiltersProps { sections: FilterSection[]; className?: string; }

export default function SidebarFilters({ sections, className }: SidebarFiltersProps) {
  return (
    <aside className={cn("w-64 space-y-6", className)}>
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{section.title}</h3>
          <ul className="space-y-1" role="list">
            {section.options.map((opt) => (
              <li key={opt}>
                <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm" style={{ color: "var(--foreground)" }}>
                  <input type="checkbox" className="size-4 rounded border accent-[var(--primary)]" style={{ borderColor: "var(--border)" }} />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
