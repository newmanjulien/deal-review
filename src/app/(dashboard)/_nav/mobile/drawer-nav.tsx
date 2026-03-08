"use client";

import { ChromeNavItemLink } from "@/components/chrome";
import { cn } from "@/lib/utils";
import type { AppPath } from "@/types/domain/app-path";
import type { NavGroups, NavItem } from "../nav-types";

type DrawerNavProps = {
  groups: NavGroups;
  activeHref: AppPath | null;
  onItemSelect?: () => void;
  className?: string;
};

type DrawerNavItemProps = {
  item: NavItem;
  isActive: boolean;
  onItemSelect?: () => void;
};

function DrawerNavItem({ item, isActive, onItemSelect }: DrawerNavItemProps) {
  return (
    <span className="relative z-10 inline-flex">
      <ChromeNavItemLink
        item={item}
        buttonSize="default"
        onClick={onItemSelect}
        buttonClassName={cn(
          "h-10 w-full justify-start gap-2.5 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 focus-visible:ring-2",
          isActive && "bg-zinc-100/70 text-zinc-900",
        )}
      />
    </span>
  );
}

export function DrawerNav({
  groups,
  activeHref,
  onItemSelect,
  className,
}: DrawerNavProps) {
  const secondaryItems = groups.secondary ?? [];
  const tertiaryItems = groups.tertiary ?? [];
  const hasSecondary = secondaryItems.length > 0;
  const showMainSecondaryDivider = groups.main.length > 0 && hasSecondary;

  const renderItems = (sectionItems: NavItem[]) =>
    sectionItems.map((item) => (
      <DrawerNavItem
        key={item.href}
        item={item}
        isActive={activeHref === item.href}
        onItemSelect={onItemSelect}
      />
    ));

  return (
    <nav
      aria-label="Dashboard navigation"
      className={cn("relative flex min-h-full flex-col", className)}
    >
      <div className="flex flex-col gap-1.5">{renderItems(groups.main)}</div>
      {hasSecondary ? (
        <div className="flex flex-col">
          {showMainSecondaryDivider ? (
            <div className="py-4">
              <span aria-hidden="true" className="block h-px w-full bg-zinc-200/50" />
            </div>
          ) : null}
          <div className="flex flex-col gap-1.5">{renderItems(secondaryItems)}</div>
        </div>
      ) : null}
      {tertiaryItems.length > 0 ? (
        <div className="mt-auto flex flex-col pt-6">
          <div className="flex flex-col gap-1.5">{renderItems(tertiaryItems)}</div>
        </div>
      ) : null}
    </nav>
  );
}
