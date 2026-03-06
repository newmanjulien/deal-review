// Navigation shared by mobile drawer and sidebar.

"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { normalizeNavGroups } from "./nav-utils";
import type { NavGroups, NavItem } from "./nav-types";
import { cn } from "@/lib/utils";

type NavSection = "main" | "secondary" | "tertiary";

type NavProps = {
  groups: NavGroups;
  activeHref: string | null;
  setHoveredHref?: (href: string | null) => void;
  navRef?: RefObject<HTMLElement | null>;
  indicatorRef?: RefObject<HTMLSpanElement | null>;
  setItemRef?: (href: string, el: HTMLSpanElement | null) => void;
  variant?: "rail" | "drawer";
  onItemSelect?: () => void;
  className?: string;
};

type RailNavItemProps = {
  item: NavItem;
  section: NavSection;
  isActive: boolean;
  setHoveredHref?: (href: string | null) => void;
  setItemRef?: (href: string, el: HTMLSpanElement | null) => void;
  onItemSelect?: () => void;
};

function RailNavItem({
  item,
  section,
  isActive,
  setHoveredHref,
  setItemRef,
  onItemSelect,
}: RailNavItemProps) {
  const isTertiary = section === "tertiary";

  return (
    <span
      ref={(el) => {
        if (isTertiary) return;
        setItemRef?.(item.href, el);
      }}
      onMouseEnter={!isTertiary ? () => setHoveredHref?.(item.href) : undefined}
      className={cn("relative z-10 inline-flex", isTertiary && "self-center")}
    >
      <Button
        asChild
        variant="ghost"
        size="icon-sm"
        className={cn(
          isTertiary
            ? "size-7 rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-[0_1px_2px_rgba(24,24,27,0.1)] transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2"
            : "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2",
          isActive &&
            (isTertiary
              ? "border-zinc-300 bg-white text-zinc-900"
              : "text-zinc-900"),
        )}
      >
        <Link href={item.href} onClick={onItemSelect}>
          <item.icon className="size-3.5" />
          <span className="sr-only">{item.label}</span>
        </Link>
      </Button>
    </span>
  );
}

type DrawerNavItemProps = {
  item: NavItem;
  isActive: boolean;
  onItemSelect?: () => void;
};

function DrawerNavItem({ item, isActive, onItemSelect }: DrawerNavItemProps) {
  return (
    <span className="relative z-10 inline-flex">
      <Button
        asChild
        variant="ghost"
        size="default"
        className={cn(
          "h-10 w-full justify-start gap-2.5 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 focus-visible:ring-2",
          isActive && "bg-zinc-100/70 text-zinc-900",
        )}
      >
        <Link href={item.href} onClick={onItemSelect}>
          <item.icon className="size-3.5" />
          <span>{item.label}</span>
        </Link>
      </Button>
    </span>
  );
}

export function Nav({
  groups,
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
  const itemGapClass = isRail ? "gap-1" : "gap-1.5";
  const normalizedGroups = normalizeNavGroups(groups);

  const renderItems = (sectionItems: NavItem[], section: NavSection) =>
    sectionItems.map((item) =>
      isRail ? (
        <RailNavItem
          key={item.href}
          item={item}
          section={section}
          isActive={activeHref === item.href}
          setHoveredHref={setHoveredHref}
          setItemRef={setItemRef}
          onItemSelect={onItemSelect}
        />
      ) : (
        <DrawerNavItem
          key={item.href}
          item={item}
          isActive={activeHref === item.href}
          onItemSelect={onItemSelect}
        />
      ),
    );

  return (
    <nav
      ref={navRef}
      aria-label="aria"
      className={cn(
        "relative flex flex-col",
        isRail ? "min-h-0 flex-1" : "min-h-full",
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
        {renderItems(normalizedGroups.main, "main")}
      </div>
      {normalizedGroups.hasSecondary ? (
        <div className={cn("flex flex-col")}>
          {normalizedGroups.showMainSecondaryDivider ? (
            <div className={cn(isRail ? "py-3" : "py-4")}>
              <span
                aria-hidden="true"
                className={cn(
                  "block h-px bg-zinc-200/50",
                  isRail ? "mx-auto w-4" : "w-full",
                )}
              />
            </div>
          ) : null}
          <div className={cn("flex flex-col", itemGapClass)}>
            {renderItems(normalizedGroups.secondary, "secondary")}
          </div>
        </div>
      ) : null}
      {normalizedGroups.tertiary.length > 0 ? (
        <div
          className={cn("mt-auto flex flex-col", isRail ? "pb-1 pt-3" : "pt-6")}
        >
          <div className={cn("flex flex-col", itemGapClass)}>
            {renderItems(normalizedGroups.tertiary, "tertiary")}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
