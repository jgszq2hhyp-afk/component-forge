// @version 1.0.0
// @category tabs
// @name tabs-full-width
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tab { id: string; label: string; content: React.ReactNode; }
interface TabsFullWidthProps { tabs: Tab[]; className?: string; }

export default function TabsFullWidth({ tabs, className }: TabsFullWidthProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid border-b" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)`, borderColor: "var(--border)" }} role="tablist">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" aria-selected={tab.id === active} onClick={() => setActive(tab.id)} className="border-b-2 -mb-px py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2" style={{ borderBottomColor: tab.id === active ? "var(--primary)" : "transparent", color: tab.id === active ? "var(--primary)" : "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">{current?.content}</div>
    </div>
  );
}
