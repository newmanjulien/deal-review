"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ConversationsKanbanChromeProps = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  children: ReactNode;
};

export function ConversationsKanbanChrome({
  canScrollLeft,
  canScrollRight,
  children,
}: ConversationsKanbanChromeProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/80 to-transparent transition-opacity",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent transition-opacity",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
        />

        {children}
      </div>
    </section>
  );
}
