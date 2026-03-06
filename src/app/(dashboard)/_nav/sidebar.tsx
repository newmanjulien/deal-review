"use client";

import Image from "next/image";
import { useState } from "react";
import { PRIMARY_NAV_GROUPS } from "./nav-config";
import { useNav } from "./use-nav";
import { useSidebarNavMotion } from "@/app/(dashboard)/_nav/use-sidebar-nav-motion";
import { cn } from "@/lib/utils";
import { Nav } from "./nav";

export function Sidebar({ className }: { className?: string }) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const {
    state: { activeHref },
  } = useNav(PRIMARY_NAV_GROUPS);
  const { refs, actions } = useSidebarNavMotion({
    activeHref,
    hoveredHref,
  });

  return (
    <aside
      className={cn(
        "flex w-10 shrink-0 self-stretch flex-col items-start pt-2.5 pl-0.5",
        className,
      )}
      aria-label="aria"
    >
      <div className="mb-4 overflow-hidden rounded-sm">
        <Image
          src="/logo.png"
          alt="Logo"
          width={20}
          height={20}
          className="size-6"
          priority
        />
      </div>

      <Nav
        groups={PRIMARY_NAV_GROUPS}
        activeHref={activeHref}
        setHoveredHref={setHoveredHref}
        navRef={refs.navRef}
        indicatorRef={refs.indicatorRef}
        setItemRef={actions.setItemRef}
        variant="rail"
      />
    </aside>
  );
}
