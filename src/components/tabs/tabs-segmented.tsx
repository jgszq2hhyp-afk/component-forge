// @version 1.0.0
// @category tabs
// @name tabs-segmented
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tab { id: string; label: string; content: React.ReactNode; }
interface TabsSegmentedProps { tabs: Tab[]; className?: string; }

export default function TabsSegmented({ tabs, className }: TabsSegmentedProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active);

  return (
    <div className={cn("w-full", className)}>
      <div className="inline-flex gap-1 rounded-lg border p-1" style={{ borderColor: "var(--border)" }} role="tablist">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" aria-selected={tab.id === active} onClick={() => setActive(tab.id)} className="rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: tab.id === active ? "var(--primary)" : "transparent", color: tab.id === active ? "var(--primary-foreground)" : "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">{current?.content}</div>
    </div>
  );
}
