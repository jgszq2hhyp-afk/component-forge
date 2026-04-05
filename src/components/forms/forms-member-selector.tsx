// @source 21st.dev/r/osiris-balonga/member-selector

"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Inline SVG Icons (replace lucide-react)
// ---------------------------------------------------------------------------

function PlusIcon({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CheckIcon({ className, strokeWidth = 3 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Member {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface MemberSelectorProps {
  members?: Member[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  max?: number;
  maxVisible?: number;
  label?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data (SVG data-URI placeholders for avatars)
// ---------------------------------------------------------------------------

const svgAvatar = (initials: string, hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="hsl(${hue},60%,75%)"/><text x="24" y="24" dy=".35em" text-anchor="middle" font-family="system-ui" font-size="18" font-weight="600" fill="hsl(${hue},40%,25%)">${initials}</text></svg>`
  )}`;

const DEFAULT_MEMBERS: Member[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: svgAvatar("AJ", 210) },
  { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: svgAvatar("BS", 30) },
  { id: "3", name: "Clara Davis", email: "clara@example.com", avatar: svgAvatar("CD", 150) },
  { id: "4", name: "David Lee", email: "david@example.com", avatar: svgAvatar("DL", 270) },
  { id: "5", name: "Emma Wilson", email: "emma@example.com", avatar: svgAvatar("EW", 340) },
  { id: "6", name: "Frank Brown", email: "frank@example.com", avatar: svgAvatar("FB", 90) },
  { id: "7", name: "Grace Taylor", email: "grace@example.com", avatar: svgAvatar("GT", 60) },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ---------------------------------------------------------------------------
// Avatar sub-component
// ---------------------------------------------------------------------------

interface AvatarProps {
  member: Member;
  isSelected: boolean;
  onClick: () => void;
}

function Avatar({ member, isSelected, onClick }: AvatarProps) {
  return (
    <motion.button
      layoutId={`member-${member.id}`}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-1.5 outline-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
    >
      <div
        className={cn(
          "relative w-12 h-12 rounded-full overflow-hidden transition-all duration-200 motion-reduce:transition-none",
          "group-focus-visible:ring-2 group-focus-visible:ring-[var(--ring)] group-focus-visible:ring-offset-2",
          !isSelected && "opacity-50 hover:opacity-75"
        )}
      >
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-200 motion-reduce:transition-none",
              !isSelected && "grayscale"
            )}
          />
        ) : (
          <div
            className={cn(
              "w-full h-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
              isSelected
                ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                : "bg-[var(--muted)] text-[var(--muted-foreground)]"
            )}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
            className="absolute bottom-5 right-0 w-4 h-4 rounded-full bg-[var(--foreground)] flex items-center justify-center shadow-sm"
          >
            <PlusIcon className="w-2.5 h-2.5 text-[var(--background)]" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        layoutId={`member-name-${member.id}`}
        className={cn(
          "text-xs font-medium truncate max-w-[60px] transition-colors duration-200",
          isSelected ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
        )}
      >
        {member.name.split(" ")[0]}
      </motion.span>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// AddButton sub-component
// ---------------------------------------------------------------------------

interface AddButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

function AddButton({ onClick, isOpen }: AddButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5 outline-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 motion-reduce:transition-none",
          "group-focus-visible:ring-2 group-focus-visible:ring-[var(--ring)] group-focus-visible:ring-offset-2",
          isOpen
            ? "border-[var(--primary)] bg-[var(--primary)]/10"
            : "border-[var(--muted-foreground)]/40 hover:border-[var(--muted-foreground)]/60 hover:bg-[var(--muted)]/50"
        )}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <PlusIcon
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              isOpen ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
            )}
          />
        </motion.div>
      </div>
      <span
        className={cn(
          "text-xs font-medium transition-colors duration-200",
          isOpen ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
        )}
      >
        Add
      </span>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Dropdown sub-component
// ---------------------------------------------------------------------------

interface DropdownProps {
  members: Member[];
  selected: string[];
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function Dropdown({
  members,
  selected,
  onSelect,
  searchQuery,
  onSearchChange,
}: DropdownProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredMembers = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return members
      .filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email?.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const aSelected = selected.includes(a.id);
        const bSelected = selected.includes(b.id);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
      });
  }, [members, selected, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" as const }}
      className="absolute top-full right-0 mt-2 w-72 rounded-xl shadow-lg overflow-hidden z-50 bg-[var(--card)] border border-[var(--border)]"
    >
      <div className="p-3 border-b border-[var(--border)]">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search members..."
            className={cn(
              "w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-colors",
              "bg-[var(--muted)]/50 border border-transparent",
              "focus:border-[var(--primary)]/50 focus:bg-[var(--background)]",
              "placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]"
            )}
          />
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--muted-foreground)]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member, index) => {
            const isSelected = selected.includes(member.id);
            return (
              <motion.button
                key={member.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.02, duration: 0.15 }}
                onClick={() => onSelect(member.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors",
                  isSelected
                    ? "bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10"
                    : "hover:bg-[var(--muted)]/50"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200",
                    !isSelected && "grayscale opacity-60"
                  )}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={cn(
                        "w-full h-full flex items-center justify-center text-xs font-medium",
                        isSelected
                          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                      )}
                    >
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div
                    className={cn(
                      "text-sm font-medium truncate transition-colors",
                      isSelected ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80"
                    )}
                  >
                    {member.name}
                  </div>
                  {member.email && (
                    <div className="text-xs text-[var(--muted-foreground)] truncate">
                      {member.email}
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200",
                    isSelected
                      ? "bg-[var(--primary)]"
                      : "border-2 border-[var(--muted-foreground)]/30"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                    >
                      <CheckIcon className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filteredMembers.length === 0 && (
          <div className="px-3 py-8 text-center text-sm text-[var(--muted-foreground)]">
            No members found
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FormsMemberSelector({
  members = DEFAULT_MEMBERS,
  selected: controlledSelected,
  onChange,
  max,
  maxVisible = 5,
  label = "Team Members",
  className,
}: MemberSelectorProps) {
  const [internalSelected, setInternalSelected] = React.useState<string[]>(["1", "3"]);
  const selected = controlledSelected ?? internalSelected;

  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedMembers = React.useMemo(() => {
    return [...members].sort((a, b) => {
      const aSelected = selected.includes(a.id);
      const bSelected = selected.includes(b.id);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [members, selected]);

  const visibleMembers = sortedMembers.slice(0, maxVisible);

  const toggleMember = (id: string) => {
    const isCurrentlySelected = selected.includes(id);

    let newSelected: string[];
    if (isCurrentlySelected) {
      newSelected = selected.filter((s) => s !== id);
    } else {
      if (max && selected.length >= max) return;
      newSelected = [...selected, id];
    }

    if (onChange) {
      onChange(newSelected);
    } else {
      setInternalSelected(newSelected);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">
          {label}
        </div>
      )}
      <div ref={containerRef} className="flex items-start gap-4 flex-wrap">
        <LayoutGroup>
          {visibleMembers.map((member) => (
            <Avatar
              key={member.id}
              member={member}
              isSelected={selected.includes(member.id)}
              onClick={() => toggleMember(member.id)}
            />
          ))}

          <div className="relative">
            <AddButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

            <AnimatePresence>
              {isOpen && (
                <Dropdown
                  members={members}
                  selected={selected}
                  onSelect={toggleMember}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
