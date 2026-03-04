// Navigation shared by mobile drawer and sidebar.

"use client";

import Link from "next/link";
import {
  Activity,
  CircleQuestionMark,
  CircleOff,
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
};

export type NavGroups = {
  main: NavItem[];
  secondary: NavItem[];
  tertiary?: NavItem[];
};

export const primaryNavGroups: NavGroups = {
  main: [
    {
      href: "/since-last-meeting",
      label: "Since last meeting",
      icon: Activity,
    },
    { href: "/forecast", label: "Forecast", icon: LayoutGrid },
    {
      href: "/questions",
      label: "Missing data and timelines",
      icon: CircleOff,
    },
    { href: "/ideas", label: "Opportunities and risks", icon: Lightbulb },
  ],
  secondary: [
    { href: "/conversations", label: "All conversations", icon: List },
  ],
  tertiary: [
    {
      href: "/contact-support",
      label: "Contact support",
      icon: CircleQuestionMark,
    },
  ],
};

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveHref(
  pathname: string,
  groups: NavGroups,
): string | null {
  const items = [
    ...groups.main,
    ...groups.secondary,
    ...(groups.tertiary ?? []),
  ];
  return (
    items.find((item) => isNavItemActive(pathname, item.href))?.href ?? null
  );
}

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
  const tertiaryItems = groups.tertiary ?? [];

  const renderItems = (
    sectionItems: NavItem[],
    section: "main" | "secondary" | "tertiary",
  ) =>
    sectionItems.map((item) => (
      <span
        key={item.href}
        ref={(el) => {
          if (!isRail || !setItemRef || section === "tertiary") return;
          setItemRef(item.href, el);
        }}
        onMouseEnter={
          isRail && section !== "tertiary"
            ? () => setHoveredHref?.(item.href)
            : undefined
        }
        className={cn(
          "relative z-10 inline-flex",
          isRail && section === "tertiary" ? "self-center" : "",
        )}
      >
        <Button
          asChild
          variant="ghost"
          size={isRail ? "icon-sm" : "default"}
          className={cn(
            isRail && section !== "tertiary"
              ? "size-7 rounded-sm border border-transparent text-zinc-500 transition-colors hover:bg-transparent hover:text-zinc-800 focus-visible:ring-2"
              : section === "tertiary" && isRail
                ? "size-7 rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-[0_1px_2px_rgba(24,24,27,0.1)] transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:ring-2"
                : "h-10 w-full justify-start gap-2.5 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 focus-visible:ring-2",
            activeHref === item.href &&
              (isRail && section !== "tertiary"
                ? "text-zinc-900"
                : section === "tertiary" && isRail
                  ? "border-zinc-300 bg-white text-zinc-900"
                  : "bg-zinc-100/70 text-zinc-900"),
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
        {renderItems(groups.main, "main")}
      </div>
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
          {renderItems(groups.secondary, "secondary")}
        </div>
      </div>
      {tertiaryItems.length > 0 ? (
        <div
          className={cn("mt-auto flex flex-col", isRail ? "pb-1 pt-3" : "pt-6")}
        >
          <div className={cn("flex flex-col", itemGapClass)}>
            {renderItems(tertiaryItems, "tertiary")}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
