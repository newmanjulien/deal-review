"use client";

import type { RefObject } from "react";
import { Calendar, Menu } from "lucide-react";

type MobileHeaderProps = {
  isNavOpen: boolean;
  onToggleNav: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export function MobileHeader({
  isNavOpen,
  onToggleNav,
  menuButtonRef,
}: MobileHeaderProps) {
  return (
    <header className="relative flex h-12 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)] md:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-nav-drawer"
        aria-expanded={isNavOpen}
        className="inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
        onClick={onToggleNav}
      >
        <Menu className="size-4" />
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-12">
        <button
          type="button"
          aria-label="Open date selector"
          className="pointer-events-auto inline-flex h-8 min-w-0 max-w-full items-center justify-center gap-1.5 rounded-sm px-2 text-center text-xs font-medium tracking-wide text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span className="truncate">January 26</span>
        </button>
      </div>
    </header>
  );
}
