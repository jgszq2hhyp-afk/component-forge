// @version 1.0.0
// @category sidebar
// @name sidebar-profile
// @source custom

import { cn } from "@/lib/utils";

const AVATAR_SIZE = 48;

interface ProfileLink { label: string; href: string; }
interface SidebarProfileProps { name: string; email?: string; avatarSrc?: string; links?: ProfileLink[]; className?: string; }

export default function SidebarProfile({ name, email, avatarSrc, links = [], className }: SidebarProfileProps) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <aside className={cn("w-64 rounded-xl border p-4", className)} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      <div className="mb-4 flex items-center gap-3">
        {avatarSrc ? (
          <img src={avatarSrc} alt={name} className="rounded-full object-cover" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} />
        ) : (
          <div className="flex items-center justify-center rounded-full text-sm font-bold" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)" }}>{initials}</div>
        )}
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{name}</p>
          {email && <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{email}</p>}
        </div>
      </div>
      {links.length > 0 && (
        <nav>
          <ul className="space-y-1" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2" style={{ color: "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
