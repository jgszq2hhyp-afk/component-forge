// @source 21st.dev/r/reapollo/glassmorphism-portfolio-block-shadcnui
"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SVGProps } from "react";

type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

function Twitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Dribbble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

function Github(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' fill='%23cbd5e1'/%3E%3C/svg%3E";

type Highlight = {
  title: string;
  description: string;
};

type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: SvgIconComponent;
};

const highlights: Highlight[] = [
  {
    title: "Collaborations",
    description:
      "Linear, Framer, Gamma, Clearbit, and early-stage founders crafting premium launches.",
  },
  {
    title: "Latest drop",
    description:
      "Aurora OS motion system - 47 reusable blueprints, adaptive tokens, and launch storyboard.",
  },
  {
    title: "Availability",
    description:
      "2 advisory spots for Q1 - Remote friendly across EU & US time zones.",
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "Twitter",
    handle: "@caspermotions",
    href: "#",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    handle: "Casper Lightman",
    href: "#",
    icon: Linkedin,
  },
  {
    label: "Dribbble",
    handle: "caspermotion",
    href: "#",
    icon: Dribbble,
  },
  {
    label: "GitHub",
    handle: "casper-studio",
    href: "#",
    icon: Github,
  },
];

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function PortfolioGlassBlock() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="relative overflow-hidden rounded-3xl border border-[var(--border)]/50 bg-[var(--background)]/45 p-8 backdrop-blur-2xl md:p-12 motion-reduce:transform-none"
        >
          {/* Glass gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left column - Main content */}
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/50 bg-[var(--background)]/55 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/70 backdrop-blur transition-colors hover:bg-[var(--background)]/70">
                Portfolio Insight
              </span>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl motion-reduce:transform-none"
                >
                  Casper Lightman, Product Designer & Motion Director
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl text-base leading-relaxed text-[var(--foreground)]/70 md:text-md motion-reduce:transform-none"
                >
                  Principal product designer pairing narrative motion with
                  premium SaaS brands. Casper leads founders and product teams
                  through expressive design systems that convert curiosity into
                  momentum.
                </motion.p>
              </div>

              {/* Highlights grid */}
              <div className="grid gap-4 sm:grid-cols-1">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-[var(--border)]/40 bg-[var(--background)]/60 p-5 backdrop-blur transition-all hover:border-[var(--border)]/60 hover:shadow-lg motion-reduce:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--foreground)]/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
                    <div className="relative space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]/40">
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]/70">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 gap-4 motion-reduce:transform-none"
              >
                <button
                  onClick={() =>
                    window.open("#", "_blank")
                  }
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-foreground)] transition-all hover:shadow-lg sm:w-auto"
                >
                  View case studies
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>

            {/* Right column - Profile card */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[var(--primary)]/15 via-transparent to-transparent blur-3xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--border)]/50 bg-[var(--background)]/60 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6 motion-reduce:transform-none"
                  >
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/20 blur-2xl" />
                    <img
                      src={AVATAR}
                      alt="Casper Lightman"
                      className="relative h-32 w-32 rounded-full border border-[var(--border)]/40 object-cover shadow-[0_25px_60px_rgba(15,23,42,0.3)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1 motion-reduce:transform-none"
                  >
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                      Casper Lightman
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--foreground)]/45">
                      Product Designer - Motion Director
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--foreground)]/70 motion-reduce:transform-none"
                  >
                    Partnering with future-facing teams to choreograph
                    interfaces that feel cinematic yet effortless.
                  </motion.p>
                </div>

                {/* Social links */}
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        variants={itemVariants}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-[var(--border)]/40 bg-[var(--background)]/70 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--border)]/60 hover:bg-[var(--background)]/80 hover:shadow-md motion-reduce:transform-none"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]/40 bg-[var(--background)]/70 text-[var(--foreground)]/80 shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition-all group-hover:shadow-[0_10px_30px_rgba(15,23,42,0.3)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] dark:group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[var(--foreground)]">
                              {social.label}
                            </p>
                            <p className="text-xs text-[var(--foreground)]/60">
                              {social.handle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-[var(--foreground)]/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]/70" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
