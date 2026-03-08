"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavGroups, NavItem } from "./nav-types";
import { normalizeNavGroups } from "./nav-utils";

type RailNavProps = {
  groups: NavGroups;
  activeHref: string | null;
  onHoveredHrefChange: (href: string | null) => void;
  navRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLSpanElement | null>;
  setItemRef: (href: string, el: HTMLSpanElement | null) => void;
  expanded?: boolean;
  className?: string;
};

type RailNavItemProps = {
  item: NavItem;
  section: "main" | "secondary" | "tertiary";
  expanded: boolean;
  isActive: boolean;
  onHoveredHrefChange: (href: string | null) => void;
  setItemRef: (href: string, el: HTMLSpanElement | null) => void;
};

function RailNavItem({
  item,
  section,
  expanded,
  isActive,
  onHoveredHrefChange,
  setItemRef,
}: RailNavItemProps) {
  const isTertiary = section === "tertiary";

  return (
    <span
      ref={(el) => {
        if (isTertiary) return;
        setItemRef(item.href, el);
      }}
      onMouseEnter={
        !isTertiary ? () => onHoveredHrefChange(item.href) : undefined
      }
      className={cn(
        "relative z-10",
        expanded ? "block w-full" : "inline-flex",
        isTertiary && !expanded && "self-center",
      )}
    >
      <Button
        asChild
        variant="ghost"
        size={expanded ? "default" : "icon-sm"}
        className={cn(
          expanded
            ? "h-7 w-full justify-start gap-2.5 rounded-sm border border-transparent px-2 text-xs text-zinc-600 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2"
            : isTertiary
              ? "size-7 rounded-full border border-zinc-100 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2"
              : "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2",
          isActive
            ? expanded
              ? "text-zinc-900"
              : isTertiary
                ? "border-zinc-300 bg-white text-zinc-900"
                : "text-zinc-900"
            : null,
        )}
      >
        <Link href={item.href}>
          <item.icon className="size-3.5 shrink-0" />
          {expanded ? (
            <span className="truncate text-left font-normal">{item.label}</span>
          ) : (
            <span className="sr-only">{item.label}</span>
          )}
        </Link>
      </Button>
    </span>
  );
}

export function RailNav({
  groups,
  activeHref,
  onHoveredHrefChange,
  navRef,
  indicatorRef,
  setItemRef,
  expanded = false,
  className,
}: RailNavProps) {
  const normalizedGroups = normalizeNavGroups(groups);

  const renderItems = (
    sectionItems: NavItem[],
    section: "main" | "secondary" | "tertiary",
  ) =>
    sectionItems.map((item) => (
      <RailNavItem
        key={item.href}
        item={item}
        section={section}
        expanded={expanded}
        isActive={activeHref === item.href}
        onHoveredHrefChange={onHoveredHrefChange}
        setItemRef={setItemRef}
      />
    ));

  return (
    <nav
      ref={navRef}
      aria-label="aria"
      className={cn("relative flex min-h-0 flex-1 flex-col", className)}
      onMouseLeave={() => onHoveredHrefChange(null)}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sidebar-nav-indicator pointer-events-none absolute rounded-sm bg-zinc-200/60 transition-[top,left,width,height,opacity] duration-200 ease-out"
      />
      <div className="flex flex-col gap-1.5">
        {renderItems(normalizedGroups.main, "main")}
      </div>
      {normalizedGroups.hasSecondary ? (
        <div className="flex flex-col">
          {normalizedGroups.showMainSecondaryDivider ? (
            <div className="py-3">
              <span
                aria-hidden="true"
                className={cn(
                  "block h-px bg-zinc-200/50",
                  expanded ? "mx-2 w-auto" : "mx-auto w-4",
                )}
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-1.5">
            {renderItems(normalizedGroups.secondary, "secondary")}
          </div>
        </div>
      ) : null}
      {normalizedGroups.tertiary.length > 0 ? (
        <div className="mt-auto flex flex-col pb-1 pt-3">
          <div className="flex flex-col gap-1.5">
            {renderItems(normalizedGroups.tertiary, "tertiary")}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
