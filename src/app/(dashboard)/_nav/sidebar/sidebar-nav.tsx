"use client";

import type { RefObject } from "react";
import { ChromeNavItemLink } from "@/components/chrome";
import { cn } from "@/lib/utils";
import type { AppPath } from "@/types/app-path";
import type { NavGroups, NavItem } from "../nav-types";
import { normalizeNavGroups } from "../nav-utils";

type SidebarSection = "main" | "secondary" | "tertiary";

type SidebarNavProps = {
  groups: NavGroups;
  activeHref: AppPath | null;
  onHoveredHrefChange: (href: AppPath | null) => void;
  navRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLSpanElement | null>;
  setItemRef: (href: AppPath, el: HTMLSpanElement | null) => void;
  expanded?: boolean;
  className?: string;
};

type SidebarNavItemProps = {
  item: NavItem;
  section: SidebarSection;
  expanded: boolean;
  isActive: boolean;
  onHoveredHrefChange: (href: AppPath | null) => void;
  setItemRef: (href: AppPath, el: HTMLSpanElement | null) => void;
};

type SidebarNavItemGroupProps = {
  items: NavItem[];
  section: SidebarSection;
  expanded: boolean;
  activeHref: AppPath | null;
  onHoveredHrefChange: (href: AppPath | null) => void;
  setItemRef: (href: AppPath, el: HTMLSpanElement | null) => void;
};

function getItemContainerClassName(expanded: boolean, isTertiary: boolean) {
  return cn(
    "relative z-10",
    expanded ? "block w-full" : "inline-flex",
    isTertiary && !expanded && "self-center",
  );
}

function getItemButtonClassName({
  expanded,
  isTertiary,
  isActive,
}: {
  expanded: boolean;
  isTertiary: boolean;
  isActive: boolean;
}) {
  const baseClassName = expanded
    ? "h-7 w-full justify-start gap-2.5 rounded-sm border border-transparent px-2 text-xs text-zinc-600 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2"
    : isTertiary
      ? "size-7 rounded-full border border-zinc-100 bg-white text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2"
      : "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2";

  const activeClassName = !isActive
    ? null
    : expanded
      ? "text-zinc-900"
      : isTertiary
        ? "border-zinc-300 bg-white text-zinc-900"
        : "text-zinc-900";

  return cn(baseClassName, activeClassName);
}

function getSecondaryDividerClassName(expanded: boolean) {
  return cn(
    "block h-px bg-zinc-200/50",
    expanded ? "mx-2 w-auto" : "mx-auto w-4",
  );
}

function SidebarNavItem({
  item,
  section,
  expanded,
  isActive,
  onHoveredHrefChange,
  setItemRef,
}: SidebarNavItemProps) {
  const isTertiary = section === "tertiary";

  return (
    <span
      ref={(el) => {
        if (isTertiary) return;
        setItemRef(item.href, el);
      }}
      onMouseEnter={!isTertiary ? () => onHoveredHrefChange(item.href) : undefined}
      className={getItemContainerClassName(expanded, isTertiary)}
    >
      <ChromeNavItemLink
        item={item}
        buttonSize={expanded ? "default" : "icon-sm"}
        showLabel={expanded}
        buttonClassName={getItemButtonClassName({ expanded, isTertiary, isActive })}
        labelClassName={expanded ? "font-[460]" : undefined}
      />
    </span>
  );
}

function SidebarNavItemGroup({
  items,
  section,
  expanded,
  activeHref,
  onHoveredHrefChange,
  setItemRef,
}: SidebarNavItemGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <SidebarNavItem
          key={item.href}
          item={item}
          section={section}
          expanded={expanded}
          isActive={activeHref === item.href}
          onHoveredHrefChange={onHoveredHrefChange}
          setItemRef={setItemRef}
        />
      ))}
    </div>
  );
}

export function SidebarNav({
  groups,
  activeHref,
  onHoveredHrefChange,
  navRef,
  indicatorRef,
  setItemRef,
  expanded = false,
  className,
}: SidebarNavProps) {
  const normalizedGroups = normalizeNavGroups(groups);

  return (
    <nav
      ref={navRef}
      aria-label="Dashboard navigation"
      className={cn("relative flex min-h-0 flex-1 flex-col", className)}
      onMouseLeave={() => onHoveredHrefChange(null)}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="sidebar-nav-indicator pointer-events-none absolute rounded-sm bg-zinc-200/60 transition-[top,left,width,height,opacity] duration-200 ease-out"
      />
      <SidebarNavItemGroup
        items={normalizedGroups.main}
        section="main"
        expanded={expanded}
        activeHref={activeHref}
        onHoveredHrefChange={onHoveredHrefChange}
        setItemRef={setItemRef}
      />
      {normalizedGroups.hasSecondary ? (
        <div className="flex flex-col">
          {normalizedGroups.showMainSecondaryDivider ? (
            <div className="py-3">
              <span aria-hidden="true" className={getSecondaryDividerClassName(expanded)} />
            </div>
          ) : null}
          <SidebarNavItemGroup
            items={normalizedGroups.secondary}
            section="secondary"
            expanded={expanded}
            activeHref={activeHref}
            onHoveredHrefChange={onHoveredHrefChange}
            setItemRef={setItemRef}
          />
        </div>
      ) : null}
      {normalizedGroups.tertiary.length > 0 ? (
        <div className="mt-auto flex flex-col pb-1 pt-3">
          <SidebarNavItemGroup
            items={normalizedGroups.tertiary}
            section="tertiary"
            expanded={expanded}
            activeHref={activeHref}
            onHoveredHrefChange={onHoveredHrefChange}
            setItemRef={setItemRef}
          />
        </div>
      ) : null}
    </nav>
  );
}
