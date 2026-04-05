// @source 21st.dev/r/isaiahbjork/agent-plan
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TaskStatus = "completed" | "in-progress" | "pending" | "need-help" | "failed";

interface Subtask {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  tools?: string[];
}

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dependencies?: string[];
  subtasks: Subtask[];
}

interface AgentPlanProps {
  tasks?: Task[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const STATUS_META: Record<
  TaskStatus,
  { label: string; iconColor: string; bgColor: string }
> = {
  completed: {
    label: "Completed",
    iconColor: "oklch(0.75 0.18 145)",
    bgColor: "oklch(0.75 0.18 145 / 0.15)",
  },
  "in-progress": {
    label: "In Progress",
    iconColor: "var(--primary)",
    bgColor: "color-mix(in srgb, var(--primary) 15%, transparent)",
  },
  pending: {
    label: "Pending",
    iconColor: "var(--muted-foreground)",
    bgColor: "color-mix(in srgb, var(--muted-foreground) 15%, transparent)",
  },
  "need-help": {
    label: "Need Help",
    iconColor: "var(--ring)",
    bgColor: "color-mix(in srgb, var(--ring) 15%, transparent)",
  },
  failed: {
    label: "Failed",
    iconColor: "var(--destructive)",
    bgColor: "color-mix(in srgb, var(--destructive) 15%, transparent)",
  },
};

function StatusIcon({ status, size = 18 }: { status: TaskStatus; size?: number }) {
  const color = STATUS_META[status].iconColor;

  switch (status) {
    case "completed":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "in-progress":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 3"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "pending":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "need-help":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "failed":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      );
  }
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: meta.bgColor, color: meta.iconColor }}
    >
      <StatusIcon status={status} size={12} />
      {meta.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------

const expandVariants = {
  hidden: { height: 0, opacity: 0, overflow: "hidden" as const },
  visible: {
    height: "auto",
    opacity: 1,
    overflow: "hidden" as const,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    height: 0,
    opacity: 0,
    overflow: "hidden" as const,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Research competitor websites",
    status: "completed",
    subtasks: [
      {
        id: "1-1",
        title: "Scrape top 5 competitor landing pages",
        status: "completed",
        description: "Collect HTML structure, copy, and visual layout from competitor sites.",
        tools: ["Web Scraper", "Puppeteer"],
      },
      {
        id: "1-2",
        title: "Analyze design patterns",
        status: "completed",
        description: "Identify common UI patterns, color schemes, and CTAs.",
        tools: ["Vision API"],
      },
    ],
  },
  {
    id: "2",
    title: "Generate website wireframes",
    status: "in-progress",
    dependencies: ["Research competitor websites"],
    subtasks: [
      {
        id: "2-1",
        title: "Create hero section layout",
        status: "completed",
        description: "Design above-the-fold hero with headline, subline, and CTA.",
        tools: ["Figma MCP", "Design Tokens"],
      },
      {
        id: "2-2",
        title: "Build pricing comparison table",
        status: "in-progress",
        description: "Responsive pricing grid with feature comparison.",
        tools: ["Component Library"],
      },
      {
        id: "2-3",
        title: "Design mobile navigation",
        status: "pending",
        description: "Hamburger menu with slide-in drawer for mobile viewports.",
      },
    ],
  },
  {
    id: "3",
    title: "Deploy staging environment",
    status: "pending",
    dependencies: ["Generate website wireframes"],
    subtasks: [
      {
        id: "3-1",
        title: "Configure Vercel project",
        status: "pending",
        description: "Set up environment variables, domain, and build settings.",
        tools: ["Vercel CLI"],
      },
      {
        id: "3-2",
        title: "Run Lighthouse audit",
        status: "pending",
        description: "Performance, accessibility, and SEO checks.",
        tools: ["Lighthouse", "PageSpeed API"],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Subtask row
// ---------------------------------------------------------------------------

function SubtaskRow({ subtask }: { subtask: Subtask }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg border transition-colors"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "color-mix(in srgb, var(--card) 60%, transparent)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm motion-reduce:transition-none"
      >
        <StatusIcon status={subtask.status} size={16} />
        <span className="flex-1 font-medium" style={{ color: "var(--foreground)" }}>
          {subtask.title}
        </span>
        <motion.svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={expandVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="motion-reduce:!transition-none"
          >
            <div
              className="border-t px-3 py-3 text-sm"
              style={{ borderColor: "var(--border)" }}
            >
              {subtask.description && (
                <p className="mb-2" style={{ color: "var(--muted-foreground)" }}>
                  {subtask.description}
                </p>
              )}
              {subtask.tools && subtask.tools.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {subtask.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Task card
// ---------------------------------------------------------------------------

function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = useState(task.status === "in-progress");

  return (
    <div
      className="rounded-xl border shadow-sm"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left motion-reduce:transition-none"
      >
        <StatusIcon status={task.status} />
        <span className="flex-1 font-semibold" style={{ color: "var(--foreground)" }}>
          {task.title}
        </span>

        <div className="flex items-center gap-2">
          {task.dependencies && task.dependencies.length > 0 && (
            <span
              className="hidden items-center gap-1 rounded-md px-2 py-0.5 text-xs sm:inline-flex"
              style={{
                backgroundColor: "color-mix(in srgb, var(--muted-foreground) 12%, transparent)",
                color: "var(--muted-foreground)",
              }}
            >
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {task.dependencies.length}
            </span>
          )}

          <StatusBadge status={task.status} />

          <motion.svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="motion-reduce:transition-none"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={expandVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="motion-reduce:!transition-none"
          >
            <div
              className="space-y-2 border-t px-4 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              {task.dependencies && task.dependencies.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Depends on:
                  </span>
                  {task.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--border) 60%, transparent)",
                        color: "var(--foreground)",
                      }}
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              )}

              {task.subtasks.map((sub) => (
                <SubtaskRow key={sub.id} subtask={sub} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DashboardAgentPlan({
  tasks = DEFAULT_TASKS,
  className,
}: AgentPlanProps) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl space-y-3", className)}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
