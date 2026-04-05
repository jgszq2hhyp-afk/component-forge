// @version 1.0.0
// @category search
// @name search-inline-bar
// @source custom

import { cn } from "@/lib/utils";

interface SearchInlineBarProps { placeholder?: string; className?: string; }

export default function SearchInlineBar({ placeholder = "Search...", className }: SearchInlineBarProps) {
  return (
    <form className={cn("w-full max-w-lg", className)} onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <svg className="absolute top-1/2 left-3 size-4 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <input type="search" placeholder={placeholder} className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} />
      </div>
    </form>
  );
}
