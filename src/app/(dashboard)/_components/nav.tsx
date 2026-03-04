//navigation which is used by both mobile-drawer and sidebar

"use client";

import Link from "next/link";
import {
  Activity,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
  type LucideIcon,
} from "lucide-react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  section?: "main" | "secondary";
};

export const primaryNavItems: NavItem[] = [
  { href: "/", label: "Since last meeting", icon: Activity },
  { href: "/forecast", label: "Forecast", icon: LayoutGrid },
  {
    href: "/questions",
    label: "Missing data and timelines",
    icon: CircleQuestionMark,
  },
  { href: "/ideas", label: "Opportunities and risks", icon: Lightbulb },
  {
    href: "/conversations",
    label: "All conversations",
    icon: List,
    section: "secondary",
  },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveHref(
  pathname: string,
  items: NavItem[],
): string | null {
  return (
    items.find((item) => isNavItemActive(pathname, item.href))?.href ?? null
  );
}

type NavProps = {
  items: NavItem[];
  activeHref: string | null;
  setHoveredHref?: (href: string | null) => void;
  navRef?: RefObject<HTMLElement | null>;
  indicatorRef?: RefObject<HTMLSpanElement | null>;
  setItemRef?: (href: string, el: HTMLSpanElement | null) => void;
  variant?: "rail" | "drawer";
  onItemSelect?: () => void;
  className?: string;
};

export function Nav({
  items,
  activeHref,
  setHoveredHref,
  navRef,
  indicatorRef,
  setItemRef,
  variant = "rail",
  onItemSelect,
  className,
}: NavProps) {
  const isRail = variant === "rail";
  const mainItems = items.filter((item) => item.section !== "secondary");
  const secondaryItems = items.filter((item) => item.section === "secondary");
  const hasSecondaryItems = secondaryItems.length > 0;
  const itemGapClass = isRail ? "gap-1" : "gap-1.5";

  const renderItems = (sectionItems: NavItem[]) =>
    sectionItems.map((item) => (
      <span
        key={item.href}
        ref={(el) => {
          if (!isRail || !setItemRef) return;
          setItemRef(item.href, el);
        }}
        onMouseEnter={isRail ? () => setHoveredHref?.(item.href) : undefined}
        className="relative z-10 inline-flex"
      >
        <Button
          asChild
          variant="ghost"
          size={isRail ? "icon-sm" : "default"}
          className={cn(
            isRail
              ? "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2"
              : "h-10 w-full justify-start gap-2.5 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 focus-visible:ring-2",
            activeHref === item.href &&
              (isRail ? "text-zinc-900" : "bg-zinc-100/70 text-zinc-900"),
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
    ));

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className={cn(
        "relative flex min-h-full flex-col",
        isRail ? "flex-1" : "",
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
      <div className={cn("flex flex-col", itemGapClass)}>
        {renderItems(mainItems)}
      </div>
      {hasSecondaryItems ? (
        <div className={cn("flex flex-col")}>
          <div className={cn(isRail ? "py-3" : "py-4")}>
            <span
              aria-hidden="true"
              className={cn(
                "block h-px bg-zinc-200/50",
                isRail ? "mx-auto w-4" : "w-full",
              )}
            />
          </div>
          <div className={cn("flex flex-col", itemGapClass)}>
            {renderItems(secondaryItems)}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
