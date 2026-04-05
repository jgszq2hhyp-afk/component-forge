// @version 1.0.0
// @category search
// @name search-command-bar
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface SearchCommandBarProps { placeholder?: string; shortcutKey?: string; onSearch?: (query: string) => void; className?: string; }

export default function SearchCommandBar({ placeholder = "Search...", shortcutKey = "k", onSearch, className }: SearchCommandBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcutKey) { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shortcutKey]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const handleSubmit = useCallback((e: React.FormEvent) => { e.preventDefault(); onSearch?.(query); setOpen(false); }, [query, onSearch]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cn("flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className)} style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", backgroundColor: "var(--background)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        {placeholder}
        <kbd className="ml-auto rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>⌘{shortcutKey.toUpperCase()}</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)" }} onClick={() => setOpen(false)} aria-hidden="true" />
          <form onSubmit={handleSubmit} className="relative w-full max-w-lg rounded-xl border shadow-2xl motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-150" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            <div className="flex items-center gap-3 px-4">
              <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="flex-1 border-0 bg-transparent py-4 text-sm outline-none" style={{ color: "var(--foreground)" }} />
              <kbd className="rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>ESC</kbd>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
