// @source 21st.dev/r/Mazyar%20kawa/activity-dropdown
"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Inline SVG Icons (replacing @tabler/icons-react)
// ---------------------------------------------------------------------------

function BellIcon({ className }: { className?: string }) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function MessageCircleIcon({ className }: { className?: string }) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    </svg>
  );
}

function AwardIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function CheckboxIcon({ className }: { className?: string }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Activity {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

interface ActivityDropdownProps {
  activities?: Activity[];
  title?: string;
  subtitle?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 1,
    icon: <MessageCircleIcon className="h-4 w-4" />,
    iconBg: "bg-[var(--muted-foreground)]/20",
    title: "New Message!",
    description: "Sarah sent you a message.",
    time: "Just Now",
  },
  {
    id: 2,
    icon: <AwardIcon className="h-4 w-4" />,
    iconBg: "bg-[var(--muted-foreground)]/20",
    title: "Level Up!",
    description: "You've unlocked a new achievement.",
    time: "2 min ago",
  },
  {
    id: 3,
    icon: <CalendarIcon className="h-4 w-4" />,
    iconBg: "bg-[var(--muted-foreground)]/20",
    title: "Reminder: Meeting Today",
    description: "Your team meeting starts in 30 minutes.",
    time: "3 hours ago",
  },
  {
    id: 4,
    icon: <TagIcon className="h-4 w-4" />,
    iconBg: "bg-[var(--muted-foreground)]/20",
    title: "Special Offer!",
    description: "Save 20% off on subscription upgrade.",
    time: "12 hours ago",
  },
  {
    id: 5,
    icon: <CheckboxIcon className="h-4 w-4" />,
    iconBg: "bg-[var(--muted-foreground)]/20",
    title: "Task Assigned!",
    description: "A new task is awaiting your action.",
    time: "Yesterday",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NotificationActivityDropdown({
  activities = DEFAULT_ACTIVITIES,
  title = `${DEFAULT_ACTIVITIES.length} New Activities`,
  subtitle = "What's happening around you",
  className,
}: ActivityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-w-md cursor-pointer overflow-hidden select-none",
        "bg-[var(--card)] text-[var(--foreground)]",
        "shadow-xl shadow-black/10 dark:shadow-black/50",
        "transition-all duration-500 ease-in-out motion-reduce:transition-none",
        isOpen ? "rounded-3xl" : "rounded-2xl",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
      }}
      aria-expanded={isOpen}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--muted-foreground)]/10 transition-colors duration-300">
          <BellIcon className="h-5 w-5 text-[var(--muted-foreground)]" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {title}
          </h3>
          <p
            className={cn(
              "text-sm text-[var(--muted-foreground)]",
              "transition-all duration-500 ease-in-out motion-reduce:transition-none",
              isOpen
                ? "mt-0 max-h-0 opacity-0"
                : "mt-0.5 max-h-6 opacity-100",
            )}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center">
          <ChevronUpIcon
            className={cn(
              "h-5 w-5 text-[var(--muted-foreground)]",
              "transition-transform duration-500 ease-in-out motion-reduce:transition-none",
              isOpen ? "rotate-0" : "rotate-180",
            )}
          />
        </div>
      </div>

      {/* Activity List */}
      <div
        className={cn(
          "grid",
          "transition-all duration-500 ease-in-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-2 pb-4">
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl p-3",
                    "transition-all duration-500 ease-in-out motion-reduce:transition-none",
                    "hover:bg-[var(--muted-foreground)]/10",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      "bg-[var(--muted-foreground)]/10 transition-colors duration-300",
                    )}
                  >
                    <span className="text-[var(--muted-foreground)]">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">
                      {activity.title}
                    </h4>
                    <p className="truncate text-sm text-[var(--muted-foreground)]">
                      {activity.description}
                    </p>
                  </div>
                  <span className="shrink-0 pt-0.5 text-xs text-[var(--muted-foreground)]">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
