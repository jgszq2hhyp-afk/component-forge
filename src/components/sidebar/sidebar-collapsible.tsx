// @version 1.0.0
// @category sidebar
// @name sidebar-collapsible
// @source custom

import { cn } from "@/lib/utils";

interface NavGroup { title: string; links: { label: string; href: string; }[]; }
interface SidebarCollapsibleProps { groups: NavGroup[]; className?: string; }

export default function SidebarCollapsible({ groups, className }: SidebarCollapsibleProps) {
  return (
    <aside className={cn("w-64 space-y-2 p-4", className)}>
      {groups.map((group) => (
        <details key={group.title} className="group">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {group.title}
            <svg className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </summary>
          <ul className="mt-1 space-y-0.5 pl-3" role="list">
            {group.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block rounded px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2" style={{ color: "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </aside>
  );
}
