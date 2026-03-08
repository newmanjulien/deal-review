"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDashboardChromeModel } from "@/app/(dashboard)/_chrome/chrome-ui";
import { DASHBOARD_ROUTE_PATHS } from "@/app/(dashboard)/_routes/dashboard-routes";
import { SidebarNav } from "./sidebar-nav";
import { useSidebarNavMotion } from "./use-sidebar-nav-motion";
import { useDashboardSidebar } from "./sidebar-ui";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
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
        "flex shrink-0 self-stretch flex-col overflow-hidden pt-2.5 transition-[width,padding] duration-200",
        isExpanded ? "w-56 items-stretch px-2" : "w-10 items-start pl-0.5",
        className,
      )}
      aria-label="Dashboard sidebar"
    >
      <Link
        href={DASHBOARD_ROUTE_PATHS["since-last-meeting"]}
        aria-label="Go to since last meeting"
        className={cn(
          "mb-4 overflow-hidden rounded-sm",
          isExpanded && "ml-0.5 w-fit self-start",
        )}
      >
        {isExpanded ? (
          <Image
            src="/logo-wide.png"
            alt="Logo"
            width={120}
            height={24}
            className="block h-6 w-auto"
            priority
          />
        ) : (
          <Image
            src="/logo.png"
            alt="Logo"
            width={20}
            height={20}
            className="size-6"
            priority
          />
        )}
      </Link>

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
