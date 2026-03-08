"use client";

import Image from "next/image";
import { useState } from "react";
import { PRIMARY_NAV_GROUPS, RailNav, useNav } from "..";
import { useSidebarNavMotion } from "@/app/(dashboard)/_nav/sidebar/use-sidebar-nav-motion";
import { useDashboardSidebar } from "@/app/(dashboard)/_nav/sidebar/sidebar-ui";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const { isExpanded } = useDashboardSidebar();
  const { activeHref } = useNav(PRIMARY_NAV_GROUPS);
  const { refs, actions } = useSidebarNavMotion({
    activeHref,
    hoveredHref,
  });

  return (
    <aside
      className={cn(
        "flex shrink-0 self-stretch flex-col overflow-hidden pt-2.5 transition-[width,padding] duration-200",
        isExpanded ? "w-56 items-stretch px-2" : "w-10 items-start pl-0.5",
        className,
      )}
      aria-label="aria"
    >
      <div
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
      </div>

      <RailNav
        groups={PRIMARY_NAV_GROUPS}
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
