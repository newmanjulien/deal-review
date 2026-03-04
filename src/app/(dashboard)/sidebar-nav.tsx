"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-config";

type SidebarNavProps = {
  items: NavItem[];
  activeHref: string | null;
  setHoveredHref?: (href: string | null) => void;
  navRef?: RefObject<HTMLElement | null>;
  indicatorRef?: RefObject<HTMLSpanElement | null>;
  itemRefs?: RefObject<Record<string, HTMLSpanElement | null>>;
  variant?: "rail" | "drawer";
  onItemSelect?: () => void;
  className?: string;
};

export function SidebarNav({
  items,
  activeHref,
  setHoveredHref,
  navRef,
  indicatorRef,
  itemRefs,
  variant = "rail",
  onItemSelect,
  className,
}: SidebarNavProps) {
  const isRail = variant === "rail";

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={cn(
        "relative flex flex-col",
        isRail ? "flex-1 gap-1" : "gap-1.5",
        className,
      )}
      onMouseLeave={isRail ? () => setHoveredHref?.(null) : undefined}
    >
      {isRail ? (
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="sidebar-nav-indicator pointer-events-none absolute rounded-sm bg-zinc-200 transition-[top,left,width,height,opacity] duration-200 ease-out"
        />
      ) : null}
      {items.map((item) => (
        <span
          key={item.href}
          ref={(el) => {
            if (!isRail || !itemRefs) return;
            itemRefs.current[item.href] = el;
          }}
          onMouseEnter={
            isRail ? () => setHoveredHref?.(item.href) : undefined
          }
          className="relative z-10 inline-flex"
        >
          <Button
            asChild
            variant="ghost"
            size={isRail ? "icon-sm" : "default"}
            className={cn(
              isRail
                ? "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2"
                : "h-10 w-full justify-start gap-2.5 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2",
              activeHref === item.href &&
                (isRail
                  ? "text-zinc-900"
                  : "bg-zinc-100 text-zinc-900"),
            )}
          >
            <Link
              href={item.href}
              aria-label={isRail ? item.label : undefined}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={onItemSelect}
            >
              <item.icon className="size-3.5" />
              {!isRail ? <span>{item.label}</span> : null}
            </Link>
          </Button>
        </span>
      ))}
    </nav>
  );
}
