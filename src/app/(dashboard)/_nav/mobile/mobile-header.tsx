"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { Calendar, Menu } from "lucide-react";
import {
  HEADER_MEETING_DATES,
  HEADER_MENU_CONFIG,
} from "@/app/(dashboard)/_header";
import { DASHBOARD_ROUTE_PATHS } from "@/app/(dashboard)/dashboard-routes";

export function MobileHeader({
  onToggleNav,
  menuButtonRef,
}: {
  onToggleNav: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="relative flex h-11 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)] md:hidden">
      <Link
        href={DASHBOARD_ROUTE_PATHS["since-last-meeting"]}
        aria-label="aria"
        className="overflow-hidden rounded-sm"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={20}
          height={20}
          className="size-6"
          priority
        />
      </Link>
      <button
        ref={menuButtonRef}
        type="button"
        aria-label="aria"
        className="ml-auto inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
        onClick={onToggleNav}
      >
        <Menu className="size-4" />
      </button>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14">
        <button
          type="button"
          aria-label="aria"
          className="pointer-events-auto inline-flex h-8 min-w-0 max-w-full items-center justify-center gap-1.5 rounded-sm px-2 text-center text-xs font-medium tracking-wide text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span className="truncate">
            {HEADER_MEETING_DATES[0]}{" "}
            {HEADER_MENU_CONFIG.meetingDate.triggerSuffix}
          </span>
        </button>
      </div>
    </header>
  );
}
