// @version 1.0.0
// @category team
// @name team-compact-list
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const AVATAR_SIZE = 40;

interface TeamMember { name: string; role: string; avatarSrc?: string; }
interface TeamCompactListProps { headline?: string; members: TeamMember[]; className?: string; }

export default function TeamCompactList({ headline, members, className }: TeamCompactListProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "tcl-heading" : undefined}>
      <div className="mx-auto max-w-2xl">
        {headline && <h2 id="tcl-heading" className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <ul className="divide-y" style={{ ['--tw-divide-color' as string]: "var(--border)" }} role="list">
          {members.map((m) => (
            <li key={m.name} className="flex items-center gap-3 py-3">
              {m.avatarSrc ? (
                <img src={m.avatarSrc} alt={m.name} className="rounded-full object-cover" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} />
              ) : (
                <div className="flex items-center justify-center rounded-full text-xs font-bold" style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)" }}>
                  {m.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{m.name}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
