"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebarNavMotion } from "@/lib/sidebar-nav-motion";
import { cn } from "@/lib/utils";
import { getActiveHref, Nav, primaryNavItems } from "./nav";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const activeHref = getActiveHref(pathname, primaryNavItems);
  const { navRef, indicatorRef, setItemRef } = useSidebarNavMotion({
    activeHref,
    hoveredHref,
  });

  return (
    <aside
      className={cn("flex h-full w-10 shrink-0 flex-col items-start p-2", className)}
      aria-label="Sidebar"
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
        items={primaryNavItems}
        activeHref={activeHref}
        setHoveredHref={setHoveredHref}
        navRef={navRef}
        indicatorRef={indicatorRef}
        setItemRef={setItemRef}
        variant="rail"
      />
    </aside>
  );
}
