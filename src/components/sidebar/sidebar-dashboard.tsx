// @version 1.0.0
// @category sidebar
// @name sidebar-dashboard
// @source custom

import { cn } from "@/lib/utils";

interface NavItem { label: string; href: string; icon?: React.ReactNode; active?: boolean; }
interface SidebarDashboardProps { title?: string; items: NavItem[]; className?: string; }

export default function SidebarDashboard({ title, items, className }: SidebarDashboardProps) {
  return (
    <aside className={cn("w-64 border-r p-4", className)} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      {title && <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{title}</h2>}
      <nav>
        <ul className="space-y-1" role="list">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2")} style={{ color: item.active ? "var(--primary)" : "var(--muted-foreground)", backgroundColor: item.active ? "color-mix(in srgb, var(--primary) 8%, transparent)" : "transparent", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
