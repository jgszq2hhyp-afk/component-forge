// @source 21st.dev/r/Shatlyk1011/animated-dropdown
"use client";

import { useState, useRef, useEffect, type FC, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Icons (inline SVG to avoid lucide-react dependency)
// ---------------------------------------------------------------------------

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// useClickOutside hook
// ---------------------------------------------------------------------------

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

// ---------------------------------------------------------------------------
// OnClickOutside wrapper
// ---------------------------------------------------------------------------

interface OnClickOutsideProps {
  children: ReactNode;
  onClickOutside: () => void;
  classes?: string;
}

const OnClickOutside: FC<OnClickOutsideProps> = ({
  children,
  onClickOutside,
  classes,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, onClickOutside);

  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DropdownItem {
  name: string;
  link: string;
}

interface AnimatedDropdownProps {
  items?: DropdownItem[];
  text?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEMO_ITEMS: DropdownItem[] = [
  { name: "Documentation", link: "#" },
  { name: "Components", link: "#" },
  { name: "Examples", link: "#" },
  { name: "GitHub", link: "#" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavigationAnimatedDropdown({
  items = DEMO_ITEMS,
  text = "Select Option",
  className,
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OnClickOutside onClickOutside={() => setIsOpen(false)}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn("group relative inline-block", className)}
      >
        {/* Trigger button (inline — no shadcn Button) */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
            "h-10 px-4 py-2",
            "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]",
            "hover:bg-[var(--muted-foreground)]/10",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
          )}
        >
          <span>{text}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" as const }}
            className="motion-reduce:transition-none"
          >
            <ChevronDownIcon className="h-5 w-5" />
          </motion.div>
        </button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              className={cn(
                "absolute top-[calc(100%+0.5rem)] left-1/2 z-50 w-fit min-w-full -translate-x-1/2",
                "overflow-hidden rounded-md",
                "bg-[var(--card)]",
                "border-2 border-[var(--border)]",
                "shadow-lg",
                "motion-reduce:transition-none",
              )}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.03 },
                  },
                }}
              >
                {items.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className={cn(
                      "inline-block w-full px-3 py-2 text-sm",
                      "border-b-2 border-[var(--border)] last:border-b-0",
                      "bg-[var(--card)] hover:bg-[var(--muted-foreground)]/10",
                      "transition-colors duration-150",
                      "text-[var(--foreground)] no-underline",
                      "motion-reduce:transition-none",
                    )}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OnClickOutside>
  );
}
