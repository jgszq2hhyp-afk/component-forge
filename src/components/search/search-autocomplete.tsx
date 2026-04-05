// @version 1.0.0
// @category search
// @name search-autocomplete
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

interface SearchAutocompleteProps { suggestions: string[]; placeholder?: string; onSelect?: (value: string) => void; className?: string; }

export default function SearchAutocomplete({ suggestions, placeholder = "Search...", onSelect, className }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0 ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [];

  const handleSelect = useCallback((val: string) => {
    setQuery(val);
    setOpen(false);
    onSelect?.(val);
  }, [onSelect]);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <svg className="absolute top-1/2 left-3 size-4 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} placeholder={placeholder} className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} role="combobox" aria-expanded={open && filtered.length > 0} aria-haspopup="listbox" />
      </div>
      {open && filtered.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }} role="listbox">
          {filtered.map((s) => (
            <li key={s}>
              <button type="button" onMouseDown={() => handleSelect(s)} className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)] focus-visible:outline-none" style={{ color: "var(--foreground)" }} role="option">
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
