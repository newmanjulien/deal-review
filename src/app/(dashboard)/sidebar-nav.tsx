"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type SidebarNavProps = {
  items: NavItem[];
  activeHref: string | null;
  setHoveredHref: (href: string | null) => void;
  navRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLSpanElement | null>;
  itemRefs: RefObject<Record<string, HTMLSpanElement | null>>;
};

export function SidebarNav({
  items,
  activeHref,
  setHoveredHref,
  navRef,
  indicatorRef,
  itemRefs,
}: SidebarNavProps) {
  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className="relative flex flex-1 flex-col gap-1"
      onMouseLeave={() => setHoveredHref(null)}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sidebar-nav-indicator pointer-events-none absolute rounded-sm bg-zinc-200 transition-[top,left,width,height,opacity] duration-200 ease-out"
      />
      {items.map((item) => (
        <span
          key={item.href}
          ref={(el) => {
            itemRefs.current[item.href] = el;
          }}
          onMouseEnter={() => setHoveredHref(item.href)}
          className="relative z-10 inline-flex"
        >
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className={cn(
              "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2",
              activeHref === item.href && "text-zinc-900",
            )}
          >
            <Link href={item.href} aria-label={item.label}>
              <item.icon className="size-3.5" />
            </Link>
          </Button>
        </span>
      ))}
    </nav>
  );
}
