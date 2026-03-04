"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { Calendar, Menu } from "lucide-react";

export function MobileHeader({
  isNavOpen,
  onToggleNav,
  menuButtonRef,
}: {
  isNavOpen: boolean;
  onToggleNav: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="relative flex h-12 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)] md:hidden">
      <div className="overflow-hidden rounded-sm">
        <Image
          src="/logo.png"
          alt="Logo"
          width={20}
          height={20}
          className="size-6"
          priority
        />
      </div>
      <button
        ref={menuButtonRef}
        type="button"
        aria-label={
          isNavOpen ? "Close navigation menu" : "Open navigation menu"
        }
        className="ml-auto inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
        onClick={onToggleNav}
      >
        <Menu className="size-4" />
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14">
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
