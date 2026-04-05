// @source 21st.dev/r/ruixenui/footer-1

"use client";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLinkConfig {
  type: "instagram" | "twitter" | "linkedin";
  href: string;
  label: string;
}

interface FootersMinimal21stProps {
  logoText?: string;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLinkConfig[];
  copyright?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ICON_MAP: Record<SocialLinkConfig["type"], React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
};

// ---------------------------------------------------------------------------
// Default Data
// ---------------------------------------------------------------------------

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#", badge: "New" },
      { label: "Docs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Settings", href: "#" },
    ],
  },
];

const DEFAULT_SOCIAL: SocialLinkConfig[] = [
  { type: "instagram", href: "#", label: "Instagram" },
  { type: "twitter", href: "#", label: "Twitter" },
  { type: "linkedin", href: "#", label: "LinkedIn" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FootersMinimal21st({
  logoText = "Acme Inc.",
  description = "High-quality components built with Tailwind CSS and React for modern web applications.",
  columns = DEFAULT_COLUMNS,
  socialLinks = DEFAULT_SOCIAL,
  copyright = `\u00A9 ${new Date().getFullYear()} Acme Inc. All Rights Reserved.`,
  className,
}: FootersMinimal21stProps) {
  return (
    <footer
      className={cn("w-full border-t", className)}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-0">
          {/* Brand column */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <span
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {logoText}
            </span>
            <p style={{ color: "var(--muted-foreground)" }}>{description}</p>

            {/* Social icons */}
            <div className="mt-2 flex space-x-4">
              {socialLinks.map(({ type, href, label }) => {
                const Icon = ICON_MAP[type];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "transition-colors",
                      "motion-reduce:transition-none"
                    )}
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--foreground)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--muted-foreground)")
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-8 md:w-2/3">
            {columns.map((col) => (
              <div
                key={col.title}
                className="flex min-w-[120px] flex-col space-y-2"
              >
                <h4
                  className="font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {col.title}
                </h4>
                {col.links.map(({ label, href, badge }) => (
                  <a
                    key={label}
                    href={href}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      "motion-reduce:transition-none"
                    )}
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--foreground)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--muted-foreground)")
                    }
                  >
                    {label}
                    {badge && (
                      <span
                        className="rounded px-1 text-xs"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--background)",
                        }}
                      >
                        {badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-12 flex flex-col items-center justify-between border-t pt-6 text-sm md:flex-row"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          <p>{copyright}</p>
          <div className="mt-2 flex space-x-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:underline"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
