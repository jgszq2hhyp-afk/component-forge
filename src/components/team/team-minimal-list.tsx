// @version 2.0.0
// @category team
// @name Team Minimal List
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AVATAR_SIZE_PX = 40;
const LOCATION_ICON_SIZE_PX = 12;
const SECTION_PY = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8";
const HEADING_CLAMP = "text-[clamp(1.5rem,1rem+1.5vw,2rem)]";
const RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface TeamMember {
  name: string;
  role: string;
  avatarSrc?: string;
  department?: string;
  email?: string;
  location?: string;
}

interface TeamMinimalListProps {
  members?: TeamMember[];
  heading?: string;
  subheading?: string;
  showDepartment?: boolean;
  showLocation?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default data                                                      */
/* ------------------------------------------------------------------ */

const defaultMembers: TeamMember[] = [
  { name: "Anna Schmidt", role: "CEO & Co-Founder", avatarSrc: "/team/anna.jpg", department: "Leadership", location: "Berlin" },
  { name: "Max Weber", role: "CTO & Co-Founder", avatarSrc: "/team/max.jpg", department: "Leadership", location: "Berlin" },
  { name: "Lena Müller", role: "Head of Design", avatarSrc: "/team/lena.jpg", department: "Design", location: "Hamburg" },
  { name: "Tom Fischer", role: "Head of Engineering", avatarSrc: "/team/tom.jpg", department: "Engineering", location: "Munich" },
  { name: "Sarah Klein", role: "Head of Marketing", avatarSrc: "/team/sarah.jpg", department: "Marketing", location: "Berlin" },
  { name: "Jan Becker", role: "Senior Developer", avatarSrc: "/team/jan.jpg", department: "Engineering", location: "Remote" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TeamMinimalList({
  members = defaultMembers,
  heading = "Our Team",
  subheading,
  showDepartment = false,
  showLocation = false,
  className,
}: TeamMinimalListProps) {
  const grouped = showDepartment
    ? members.reduce<Record<string, TeamMember[]>>((acc, member) => {
        const dept = member.department ?? "Team";
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(member);
        return acc;
      }, {})
    : null;

  return (
    <section
      className={cn(SECTION_PY, "bg-[var(--team-list-bg,transparent)]", className)}
      aria-label="Team list"
      style={RING_STYLE}
    >
      <div className={MAX_WIDTH}>
        {(heading || subheading) && (
          <header className="mb-10">
            {heading && (
              <h2 className={cn("font-bold", HEADING_CLAMP, "text-[var(--team-list-heading-color,hsl(0_0%_9%))]")}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-2 text-base text-[var(--team-list-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        {grouped ? (
          <div className="space-y-10">
            {Object.entries(grouped).map(([department, deptMembers]) => (
              <section key={department} aria-label={`${department} department`}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--team-list-dept-color,hsl(0_0%_45%))]">
                  {department}
                </h3>
                <ul className="divide-y divide-[var(--team-list-divider,hsl(0_0%_0%/0.06))]" role="list">
                  {deptMembers.map((member) => (
                    <MemberRow
                      key={member.name}
                      member={member}
                      showLocation={showLocation}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-[var(--team-list-divider,hsl(0_0%_0%/0.06))]" role="list">
            {members.map((member) => (
              <MemberRow
                key={member.name}
                member={member}
                showLocation={showLocation}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MemberRow                                                         */
/* ------------------------------------------------------------------ */

function MemberRow({
  member,
  showLocation,
}: {
  member: TeamMember;
  showLocation: boolean;
}) {
  return (
    <li className="flex items-center gap-4 py-4">
      {member.avatarSrc ? (
        <img
          src={member.avatarSrc}
          alt=""
          aria-hidden="true"
          width={AVATAR_SIZE_PX}
          height={AVATAR_SIZE_PX}
          className="flex-shrink-0 rounded-full object-cover"
          style={{ width: AVATAR_SIZE_PX, height: AVATAR_SIZE_PX }}
          loading="lazy"
        />
      ) : (
        <div
          className="flex flex-shrink-0 items-center justify-center rounded-full bg-[var(--team-list-avatar-bg,hsl(0_0%_92%))] text-sm font-semibold text-[var(--team-list-avatar-color,hsl(0_0%_35%))]"
          style={{ width: AVATAR_SIZE_PX, height: AVATAR_SIZE_PX }}
          aria-hidden="true"
        >
          {getInitials(member.name)}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--team-list-name-color,hsl(0_0%_9%))] truncate">
          {member.name}
        </p>
        <p className="text-sm text-[var(--team-list-role-color,hsl(0_0%_45%))] truncate">
          {member.role}
        </p>
      </div>

      {showLocation && member.location && (
        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[var(--team-list-location-color,hsl(0_0%_55%))]">
          <svg
            className="shrink-0"
            width={LOCATION_ICON_SIZE_PX}
            height={LOCATION_ICON_SIZE_PX}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {member.location}
        </span>
      )}

      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className={cn(
            "hidden sm:inline-flex text-sm underline-offset-4",
            "text-[var(--team-list-link-color,hsl(220_80%_55%))] hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--team-list-link-color,hsl(220_80%_55%))] focus-visible:ring-offset-2 rounded-sm"
          )}
          style={RING_STYLE}
        >
          Email
        </a>
      )}
    </li>
  );
}
