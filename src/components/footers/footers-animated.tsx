// @source 21st.dev/r/decodewithdeepak/modem-animated-footer

"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FootersAnimatedProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default Icons (inline SVG to avoid lucide-react dependency)
// ---------------------------------------------------------------------------

function NotepadIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
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
      style={style}
    >
      <path d="M8 2v4" />
      <path d="M12 2v4" />
      <path d="M16 2v4" />
      <rect width="16" height="18" x="4" y="4" rx="2" />
      <path d="M8 10h6" />
      <path d="M8 14h8" />
      <path d="M8 18h5" />
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

function GithubIcon({ className }: { className?: string }) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Default Data
// ---------------------------------------------------------------------------

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <TwitterIcon className="h-5 w-5" />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <LinkedinIcon className="h-5 w-5" />,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: <GithubIcon className="h-5 w-5" />,
    href: "#",
    label: "GitHub",
  },
  {
    icon: <MailIcon className="h-5 w-5" />,
    href: "#",
    label: "Email",
  },
];

const DEFAULT_NAV_LINKS: FooterLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FootersAnimated({
  brandName = "YourBrand",
  brandDescription = "Building the future of digital experiences with modern design and cutting-edge technology.",
  socialLinks = DEFAULT_SOCIAL_LINKS,
  navLinks = DEFAULT_NAV_LINKS,
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FootersAnimatedProps) {
  return (
    <section
      className={cn("relative mt-0 w-full overflow-hidden", className)}
    >
      <footer
        className="relative mt-20 border-t"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
        }}
      >
        <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[35rem] md:min-h-[40rem]">
          {/* Top section */}
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              {/* Brand name + description */}
              <div className="flex flex-1 flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {brandName}
                  </span>
                </div>
                <p
                  className="w-full max-w-sm text-center px-4 font-semibold sm:w-96 sm:px-0"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {brandDescription}
                </p>
              </div>

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="mb-8 mt-3 flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={cn(
                        "transition-colors duration-300",
                        "motion-reduce:transition-none"
                      )}
                      style={{ color: "var(--muted-foreground)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--muted-foreground)")
                      }
                    >
                      <div className="h-6 w-6 transition-transform duration-300 hover:scale-110 motion-reduce:transition-none">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Nav links */}
              {navLinks.length > 0 && (
                <div className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      className={cn(
                        "transition-colors duration-300",
                        "motion-reduce:transition-none"
                      )}
                      href={link.href}
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--foreground)";
                        e.currentTarget.style.fontWeight = "600";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--muted-foreground)";
                        e.currentTarget.style.fontWeight = "500";
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p
              className="text-center text-base md:text-left"
              style={{ color: "var(--muted-foreground)" }}
            >
              &copy;{new Date().getFullYear()} {brandName}. All rights
              reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-base transition-colors duration-300",
                    "motion-reduce:transition-none"
                  )}
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.fontWeight = "500";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted-foreground)";
                    e.currentTarget.style.fontWeight = "400";
                  }}
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background brand text */}
        <div
          className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2 select-none text-center px-4 font-extrabold leading-none tracking-tighter md:bottom-32"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
            backgroundImage:
              "linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 20%, transparent), color-mix(in oklch, var(--foreground) 10%, transparent), transparent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Center logo badge */}
        <div
          className={cn(
            "absolute bottom-24 left-1/2 z-10 -translate-x-1/2 rounded-3xl border-2 p-3 backdrop-blur-sm",
            "transition-colors duration-400",
            "motion-reduce:transition-none",
            "md:bottom-20"
          )}
          style={{
            borderColor: "var(--border)",
            backgroundColor: "color-mix(in oklch, var(--background) 60%, transparent)",
          }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg sm:h-16 sm:w-16 md:h-24 md:w-24"
            style={{
              background:
                "linear-gradient(135deg, var(--foreground), color-mix(in oklch, var(--foreground) 80%, transparent))",
            }}
          >
            {brandIcon || (
              <NotepadIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 drop-shadow-lg" style={{ color: "var(--background)" }} />
            )}
          </div>
        </div>

        {/* Decorative bottom line */}
        <div
          className="absolute bottom-32 left-1/2 h-1 w-full -translate-x-1/2 backdrop-blur-sm sm:bottom-34"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border), transparent)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-28 h-24 w-full blur-[1em]"
          style={{
            background:
              "linear-gradient(to top, var(--background), color-mix(in oklch, var(--background) 80%, transparent), color-mix(in oklch, var(--background) 40%, transparent))",
          }}
        />
      </footer>
    </section>
  );
}
