// @source 21st.dev/r/originui/select-native/select-with-option-groups-native

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OptionGroup {
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

interface FormsSelectGroupedProps {
  label?: string;
  placeholder?: string;
  groups?: OptionGroup[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_GROUPS: OptionGroup[] = [
  {
    label: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    label: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
    ],
  },
  {
    label: "Database",
    options: [
      { value: "postgres", label: "PostgreSQL" },
      { value: "mysql", label: "MySQL" },
      { value: "mongodb", label: "MongoDB" },
      { value: "redis", label: "Redis" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Chevron Icon
// ---------------------------------------------------------------------------

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FormsSelectGrouped({
  label = "Select a technology",
  placeholder = "Choose an option",
  groups = DEFAULT_GROUPS,
  value: controlledValue,
  onChange,
  className,
  disabled = false,
}: FormsSelectGroupedProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={cn("w-full max-w-xs space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border text-sm shadow-sm transition-shadow",
            "h-9 pe-8 ps-3",
            "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]",
            "shadow-black/5",
            "focus-visible:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring)]/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-[var(--muted-foreground)]"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-[var(--muted-foreground)]/80 peer-disabled:opacity-50">
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
