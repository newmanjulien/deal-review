"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConversationsKanbanChromeProps = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  children: ReactNode;
};

export function ConversationsKanbanChrome({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  children,
}: ConversationsKanbanChromeProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-end gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={onScrollLeft}
          disabled={!canScrollLeft}
          aria-label="aria"
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={onScrollRight}
          disabled={!canScrollRight}
          aria-label="aria"
        >
          <ChevronRight className="size-3.5" />
        </Button>
      </div>

      <div className="relative">
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
