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
  className?: string;
};

type RailNavItemProps = {
  item: NavItem;
  section: "main" | "secondary" | "tertiary";
  isActive: boolean;
  onHoveredHrefChange: (href: string | null) => void;
  setItemRef: (href: string, el: HTMLSpanElement | null) => void;
};

function RailNavItem({
  item,
  section,
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
      className={cn("relative z-10 inline-flex", isTertiary && "self-center")}
    >
      <Button
        asChild
        variant="ghost"
        size="icon-sm"
        className={cn(
          isTertiary
            ? "size-7 rounded-full border border-zinc-100 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2"
            : "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2",
          isActive &&
            (isTertiary
              ? "border-zinc-300 bg-white text-zinc-900"
              : "text-zinc-900"),
        )}
      >
        <Link href={item.href}>
          <item.icon className="size-3.5" />
          <span className="sr-only">{item.label}</span>
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
        className="sidebar-nav-indicator pointer-events-none absolute rounded-sm bg-zinc-200 transition-[top,left,width,height,opacity] duration-200 ease-out"
      />
      <div className="flex flex-col gap-1">
        {renderItems(normalizedGroups.main, "main")}
      </div>
      {normalizedGroups.hasSecondary ? (
        <div className="flex flex-col">
          {normalizedGroups.showMainSecondaryDivider ? (
            <div className="py-3">
              <span
                aria-hidden="true"
                className="mx-auto block h-px w-4 bg-zinc-200/50"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            {renderItems(normalizedGroups.secondary, "secondary")}
          </div>
        </div>
      ) : null}
      {normalizedGroups.tertiary.length > 0 ? (
        <div className="mt-auto flex flex-col pb-1 pt-3">
          <div className="flex flex-col gap-1">
            {renderItems(normalizedGroups.tertiary, "tertiary")}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
