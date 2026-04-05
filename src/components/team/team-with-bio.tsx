// @version 2.0.0
// @category team
// @name Team With Bio
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PY = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8";
const CARD_RADIUS = "rounded-2xl";
const TOGGLE_SIZE = "h-8 w-8";
const CHEVRON_SIZE = "h-4 w-4";
const IMAGE_WIDTH_SM = "sm:w-40";
const IMAGE_WIDTH_LG = "lg:w-48";
const EXPANDED_MAX_HEIGHT = "max-h-96";
const COLLAPSED_MAX_HEIGHT = "max-h-0";

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  shortBio: string;
  fullBio: string;
  socials?: { platform: string; url: string }[];
}

interface TeamWithBioProps {
  members?: TeamMember[];
  heading?: string;
  subheading?: string;
  className?: string;
}

const defaultMembers: TeamMember[] = [
  {
    name: "Anna Schmidt",
    role: "CEO & Co-Founder",
    imageSrc: "/team/anna.jpg",
    shortBio: "Visionary leader with deep tech expertise.",
    fullBio:
      "Anna has over 15 years of experience in tech leadership, having previously led product teams at two unicorn startups. She founded the company with a mission to democratize enterprise software for small businesses. Her background spans product management, strategy, and operations across SaaS and fintech sectors.",
  },
  {
    name: "Max Weber",
    role: "CTO & Co-Founder",
    imageSrc: "/team/max.jpg",
    shortBio: "Infrastructure and scalability architect.",
    fullBio:
      "Max is a systems thinker who spent 8 years at Stripe building payment infrastructure that processed billions in transactions. He leads the engineering organization with a focus on developer experience, system reliability, and thoughtful technical architecture. He holds a PhD in distributed computing.",
  },
  {
    name: "Lena M\u00FCller",
    role: "Head of Design",
    imageSrc: "/team/lena.jpg",
    shortBio: "Design systems and user experience expert.",
    fullBio:
      "Lena brings a decade of design experience from agencies and product companies. She previously built the design system at a leading European neobank and is passionate about accessibility, inclusive design, and bridging the gap between design and engineering teams.",
  },
];

export default function TeamWithBio({
  members = defaultMembers,
  heading = "Leadership Team",
  subheading,
  className,
}: TeamWithBioProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleBio = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      className={cn(
        SECTION_PY,
        "bg-[var(--team-bio-bg,transparent)]",
        className
      )}
      aria-label="Team members"
    >
      <div className={MAX_WIDTH}>
        {(heading || subheading) && (
          <header className="mb-12 text-center">
            {heading && (
              <h2
                className={cn(
                  "font-bold",
                  "text-[clamp(1.5rem,1rem+1.5vw,1.875rem)]",
                  "text-[var(--team-bio-heading-color,hsl(0_0%_9%))]"
                )}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--team-bio-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        <div className="space-y-6" role="list">
          {members.map((member, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <article
                key={member.name}
                role="listitem"
                className={cn(
                  CARD_RADIUS,
                  "overflow-hidden",
                  "transition-shadow duration-300 motion-reduce:!transition-none",
                  "border border-[var(--team-bio-card-border,hsl(0_0%_0%/0.08))]",
                  "bg-[var(--team-bio-card-bg,hsl(0_0%_100%))]",
                  isExpanded && "shadow-lg"
                )}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={member.imageSrc}
                      alt={`Portrait of ${member.name}`}
                      className={cn(
                        "h-48 w-full object-cover sm:h-auto",
                        IMAGE_WIDTH_SM,
                        IMAGE_WIDTH_LG
                      )}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          id={`bio-heading-${i}`}
                          className="text-lg font-semibold text-[var(--team-bio-name-color,hsl(0_0%_9%))]"
                        >
                          {member.name}
                        </h3>
                        <p className="text-sm font-medium text-[var(--team-bio-role-color,hsl(220_80%_55%))]">
                          {member.role}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleBio(i)}
                        className={cn(
                          "flex-shrink-0 flex items-center justify-center rounded-full border",
                          TOGGLE_SIZE,
                          "transition-colors motion-reduce:!transition-none",
                          "border-[var(--team-bio-btn-border,hsl(0_0%_0%/0.1))]",
                          "text-[var(--team-bio-btn-color,hsl(0_0%_40%))]",
                          "hover:bg-[var(--team-bio-btn-hover-bg,hsl(0_0%_95%))]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--team-bio-focus-ring,hsl(220_80%_55%))] focus-visible:ring-offset-2"
                        )}
                        aria-expanded={isExpanded}
                        aria-controls={`bio-${i}`}
                        aria-label={
                          isExpanded
                            ? `Collapse ${member.name}'s bio`
                            : `Expand ${member.name}'s bio`
                        }
                      >
                        <svg
                          className={cn(
                            CHEVRON_SIZE,
                            "transition-transform duration-200 motion-reduce:!transition-none",
                            isExpanded && "rotate-180"
                          )}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-3 text-sm text-[var(--team-bio-short-color,hsl(0_0%_40%))]">
                      {member.shortBio}
                    </p>

                    <div
                      id={`bio-${i}`}
                      className={cn(
                        "overflow-hidden",
                        "transition-all duration-300 motion-reduce:!transition-none",
                        isExpanded
                          ? `${EXPANDED_MAX_HEIGHT} opacity-100 mt-4`
                          : `${COLLAPSED_MAX_HEIGHT} opacity-0`
                      )}
                      role="region"
                      aria-labelledby={`bio-heading-${i}`}
                    >
                      <div className="border-t border-[var(--team-bio-divider,hsl(0_0%_0%/0.06))] pt-4">
                        <p className="text-sm leading-relaxed text-[var(--team-bio-full-color,hsl(0_0%_30%))]">
                          {member.fullBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
