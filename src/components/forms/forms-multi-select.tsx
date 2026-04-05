// @source 21st.dev/r/geekles007/multiple-select

"use client";

import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Close Icon (replaces lucide X)
// ---------------------------------------------------------------------------

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TTag = {
  key: string;
  name: string;
};

interface MultipleSelectProps {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: TTag[]) => void;
  defaultValue?: TTag[];
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_TAGS: TTag[] = [
  { key: "react", name: "React" },
  { key: "nextjs", name: "Next.js" },
  { key: "typescript", name: "TypeScript" },
  { key: "tailwind", name: "Tailwind CSS" },
  { key: "framer", name: "Framer Motion" },
  { key: "prisma", name: "Prisma" },
  { key: "postgres", name: "PostgreSQL" },
  { key: "redis", name: "Redis" },
  { key: "docker", name: "Docker" },
  { key: "vercel", name: "Vercel" },
];

// ---------------------------------------------------------------------------
// Tag sub-component
// ---------------------------------------------------------------------------

type TagProps = PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    name?: string;
    className?: string;
  };

function Tag({ children, className, name, onClick }: TagProps) {
  return (
    <motion.div
      layout
      layoutId={name}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md px-2 py-1 text-sm motion-reduce:transition-none",
        "bg-[var(--muted)] text-[var(--foreground)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FormsMultiSelect({
  tags = DEFAULT_TAGS,
  customTag,
  onChange,
  defaultValue,
}: MultipleSelectProps) {
  const [selected, setSelected] = useState<TTag[]>(defaultValue ?? []);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
    onChange?.(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const onSelect = (item: TTag) => {
    setSelected((prev) => [...prev, item]);
  };

  const onDeselect = (item: TTag) => {
    setSelected((prev) => prev.filter((i) => i.key !== item.key));
  };

  return (
    <AnimatePresence mode="popLayout">
      <div className="flex w-full max-w-[450px] flex-col gap-2">
        <strong className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          Tags
        </strong>

        <motion.div
          layout
          ref={containerRef}
          className={cn(
            "flex h-12 w-full items-center overflow-x-auto scroll-smooth rounded-md border p-2",
            "border-[var(--border)] bg-[var(--muted)]/50",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          <motion.div layout className="flex items-center gap-2">
            {selected.map((item) => (
              <Tag
                name={item.key}
                key={item.key}
                className="bg-[var(--background)] shadow"
              >
                <div className="flex items-center gap-2">
                  <motion.span layout className="text-nowrap">
                    {item.name}
                  </motion.span>
                  <button
                    className="hover:text-[var(--destructive)] transition-colors"
                    onClick={() => onDeselect(item)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <XIcon size={14} />
                  </button>
                </div>
              </Tag>
            ))}
          </motion.div>
        </motion.div>

        {tags.length > selected.length && (
          <div className="flex w-full flex-wrap gap-2 rounded-md border p-2 border-[var(--border)]">
            {tags
              .filter((item) => !selected.some((i) => i.key === item.key))
              .map((item) => (
                <Tag
                  name={item.key}
                  onClick={() => onSelect(item)}
                  key={item.key}
                >
                  {customTag ? (
                    customTag(item)
                  ) : (
                    <motion.span layout className="text-nowrap">
                      {item.name}
                    </motion.span>
                  )}
                </Tag>
              ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
