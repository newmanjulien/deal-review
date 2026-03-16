"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { useDashboardChromeModel } from "@/app/(dashboard)/_chrome/chrome-ui";
import { DASHBOARD_ROUTE_PATHS } from "@/app/(dashboard)/_routes/dashboard-routes";
import { SidebarNav } from "./sidebar-nav";
import { useSidebarNavMotion } from "./use-sidebar-nav-motion";
import { useDashboardSidebar } from "./sidebar-ui";
import { cn } from "@/lib/utils";
import type { AppPath } from "@/types/domain/app-path";

export function Sidebar({ className }: { className?: string }) {
  const [hoveredHref, setHoveredHref] = useState<AppPath | null>(null);
  const chrome = useDashboardChromeModel();
  const { isExpanded } = useDashboardSidebar();
  const activeHref = chrome?.nav.activeHref ?? null;

  const { refs, actions } = useSidebarNavMotion({
    activeHref,
    hoveredHref,
  });

  if (!chrome) {
    return null;
  }

  return (
    <aside
      className={cn(
        "flex w-[var(--dashboard-sidebar-width)] shrink-0 self-stretch flex-col overflow-hidden pt-2.5 pl-[var(--dashboard-sidebar-pad-left)] pr-[var(--dashboard-sidebar-pad-right)] transition-[width,padding] duration-200",
        isExpanded ? "items-stretch" : "items-start",
        className,
      )}
      aria-label="Dashboard sidebar"
    >
      <div className="mb-4 ml-0.5 flex w-full items-center pr-0.5">
        <Link
          href={DASHBOARD_ROUTE_PATHS["since-last-meeting"]}
          aria-label="Go to since last meeting"
          className="shrink-0 overflow-hidden rounded-sm"
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

        <div
          className={cn(
            "ml-auto flex shrink-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-200",
            isExpanded
              ? "max-w-24 translate-x-0 opacity-100"
              : "pointer-events-none max-w-0 translate-x-1 opacity-0",
          )}
        >
          <div className="inline-flex h-6 origin-center scale-110 items-center gap-1 rounded-full border border-zinc-100 bg-zinc-50 px-1 text-zinc-100">
            <span className="inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-zinc-100 bg-white">
              <Image
                src="/avatars/yash.webp"
                alt="User profile avatar"
                width={20}
                height={20}
                className="h-full w-full object-cover"
              />
            </span>
            <ChevronsUpDown
              aria-hidden="true"
              className="h-3 w-3 text-zinc-400"
            />
          </div>
        </div>
      </div>

      <SidebarNav
        groups={chrome.nav.groups}
        activeHref={activeHref}
        onHoveredHrefChange={setHoveredHref}
        navRef={refs.navRef}
        indicatorRef={refs.indicatorRef}
        setItemRef={actions.setItemRef}
        expanded={isExpanded}
      />
    </aside>
  );
}
