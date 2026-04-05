// @version 1.0.0
// @category tabs
// @name tabs-icon-labels
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tab { id: string; label: string; icon?: React.ReactNode; content: React.ReactNode; }
interface TabsIconLabelsProps { tabs: Tab[]; className?: string; }

export default function TabsIconLabels({ tabs, className }: TabsIconLabelsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-1 border-b" style={{ borderColor: "var(--border)" }} role="tablist">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" aria-selected={tab.id === active} onClick={() => setActive(tab.id)} className={cn("flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 rounded-t")} style={{ borderBottomColor: tab.id === active ? "var(--primary)" : "transparent", color: tab.id === active ? "var(--primary)" : "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">{current?.content}</div>
    </div>
  );
}
