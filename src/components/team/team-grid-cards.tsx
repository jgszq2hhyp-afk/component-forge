// @version 2.0.0
// @category team
// @name Team Grid Cards
// @source custom-implementation

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Social icon size class */
const SOCIAL_ICON_SIZE = "h-4 w-4";

/** Bordered variant avatar size */
const BORDERED_AVATAR_SIZE = "h-24 w-24";

/** Simple variant avatar size */
const SIMPLE_AVATAR_SIZE = "h-40 w-40";

/** Section layout */
const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const HEADER_MARGIN_BOTTOM = "mb-12";
const GRID_GAP = "gap-8";
const CARD_PADDING = "p-6";
const CARD_RADIUS = "rounded-2xl";
const OVERLAY_ASPECT = "aspect-[3/4]";
const HEADING_CLAMP = "clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";

/** Focus ring class applied to all interactive elements */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialLink {
  platform: "linkedin" | "twitter" | "github" | "website";
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
  socials?: SocialLink[];
}

interface TeamGridCardsProps {
  members?: TeamMember[];
  heading?: string;
  subheading?: string;
  columns?: 2 | 3 | 4;
  variant?: "simple" | "overlay" | "bordered";
  className?: string;
}

// ---------------------------------------------------------------------------
// Social icon component
// ---------------------------------------------------------------------------

function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-5.606a4.5 4.5 0 00-6.364-6.364L4.5 8.25m9.86-5.606a4.5 4.5 0 016.364 6.364l-4.5 4.5" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultMembers: TeamMember[] = [
  {
    name: "Anna Schmidt",
    role: "CEO & Co-Founder",
    imageSrc: "/team/anna.jpg",
    bio: "10+ years in tech leadership",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    name: "Max Weber",
    role: "CTO & Co-Founder",
    imageSrc: "/team/max.jpg",
    bio: "Former lead engineer at Stripe",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "github", url: "#" },
    ],
  },
  {
    name: "Lena Müller",
    role: "Head of Design",
    imageSrc: "/team/lena.jpg",
    bio: "Design systems expert",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    name: "Tom Fischer",
    role: "Head of Engineering",
    imageSrc: "/team/tom.jpg",
    bio: "Full-stack architect",
    socials: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
];

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

// ---------------------------------------------------------------------------
// Social links sub-component
// ---------------------------------------------------------------------------

function SocialLinks({
  member,
  linkClassName,
}: {
  member: TeamMember;
  linkClassName?: string;
}) {
  if (!member.socials || member.socials.length === 0) return null;

  return (
    <nav aria-label={`${member.name} social links`} className="flex justify-center gap-3">
      {member.socials.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "transition-colors motion-reduce:transition-none rounded-sm",
            FOCUS_RING,
            linkClassName,
          )}
          style={{
            ['--tw-ring-color' as string]: RING_COLOR_VALUE,
          }}
          aria-label={`${member.name} on ${s.platform}`}
        >
          <SocialIcon platform={s.platform} className={SOCIAL_ICON_SIZE} />
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function TeamGridCards({
  members = defaultMembers,
  heading = "Meet Our Team",
  subheading,
  columns = 4,
  variant = "simple",
  className,
}: TeamGridCardsProps) {
  return (
    <section
      className={cn(SECTION_PADDING_Y, "bg-[var(--team-bg,transparent)]", className)}
      aria-label="Our team"
    >
      <div className={MAX_WIDTH}>
        {(heading || subheading) && (
          <header className={cn(HEADER_MARGIN_BOTTOM, "text-center")}>
            {heading && (
              <h2
                className="font-bold text-[var(--team-heading-color,hsl(0_0%_9%))]"
                style={{ fontSize: HEADING_CLAMP }}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 max-w-2xl mx-auto text-base text-[var(--team-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        <div className={cn("grid", GRID_GAP, columnClasses[columns])}>
          {members.map((member) => {
            if (variant === "overlay") {
              return (
                <article
                  key={member.name}
                  className={cn("group relative overflow-hidden", CARD_RADIUS, OVERLAY_ASPECT)}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-lg font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-white/70">{member.role}</p>
                    {member.socials && member.socials.length > 0 && (
                      <div className="mt-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:opacity-100 motion-reduce:transition-none">
                        {member.socials.map((s) => (
                          <a
                            key={s.platform}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "text-white/80 hover:text-white transition-colors motion-reduce:transition-none rounded-sm",
                              FOCUS_RING,
                            )}
                            style={{
                              ['--tw-ring-color' as string]: RING_COLOR_VALUE,
                            }}
                            aria-label={`${member.name} on ${s.platform}`}
                          >
                            <SocialIcon platform={s.platform} className={SOCIAL_ICON_SIZE} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            }

            if (variant === "bordered") {
              return (
                <article
                  key={member.name}
                  className={cn(
                    CARD_RADIUS,
                    CARD_PADDING,
                    "text-center",
                    "border border-[var(--team-card-border,hsl(0_0%_0%/0.08))]",
                    "bg-[var(--team-card-bg,transparent)]",
                  )}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className={cn("mx-auto rounded-full object-cover", BORDERED_AVATAR_SIZE)}
                    loading="lazy"
                  />
                  <p className="mt-4 text-base font-semibold text-[var(--team-name-color,hsl(0_0%_9%))]">
                    {member.name}
                  </p>
                  <p className="text-sm text-[var(--team-role-color,hsl(0_0%_45%))]">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="mt-2 text-sm text-[var(--team-bio-color,hsl(0_0%_55%))]">
                      {member.bio}
                    </p>
                  )}
                  <div className="mt-4">
                    <SocialLinks
                      member={member}
                      linkClassName="text-[var(--team-social-color,hsl(0_0%_50%))] hover:text-[var(--team-social-hover,hsl(0_0%_20%))]"
                    />
                  </div>
                </article>
              );
            }

            // simple variant (default)
            return (
              <article key={member.name} className="text-center">
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className={cn("mx-auto rounded-2xl object-cover", SIMPLE_AVATAR_SIZE)}
                  loading="lazy"
                />
                <p className="mt-4 text-base font-semibold text-[var(--team-name-color,hsl(0_0%_9%))]">
                  {member.name}
                </p>
                <p className="text-sm text-[var(--team-role-color,hsl(0_0%_45%))]">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-2 text-sm text-[var(--team-bio-color,hsl(0_0%_55%))]">
                    {member.bio}
                  </p>
                )}
                <div className="mt-3">
                  <SocialLinks
                    member={member}
                    linkClassName="text-[var(--team-social-color,hsl(0_0%_50%))] hover:text-[var(--team-social-hover,hsl(0_0%_20%))]"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
