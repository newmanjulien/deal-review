"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavGroups, NavItem } from "./nav-types";
import { normalizeNavGroups } from "./nav-utils";

type DrawerNavProps = {
  groups: NavGroups;
  activeHref: string | null;
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

export function DrawerNav({
  groups,
  activeHref,
  onItemSelect,
  className,
}: DrawerNavProps) {
  const normalizedGroups = normalizeNavGroups(groups);

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
      aria-label="aria"
      className={cn("relative flex min-h-full flex-col", className)}
    >
      <div className="flex flex-col gap-1.5">{renderItems(normalizedGroups.main)}</div>
      {normalizedGroups.hasSecondary ? (
        <div className="flex flex-col">
          {normalizedGroups.showMainSecondaryDivider ? (
            <div className="py-4">
              <span aria-hidden="true" className="block h-px w-full bg-zinc-200/50" />
            </div>
          ) : null}
          <div className="flex flex-col gap-1.5">{renderItems(normalizedGroups.secondary)}</div>
        </div>
      ) : null}
      {normalizedGroups.tertiary.length > 0 ? (
        <div className="mt-auto flex flex-col pt-6">
          <div className="flex flex-col gap-1.5">{renderItems(normalizedGroups.tertiary)}</div>
        </div>
      ) : null}
    </nav>
  );
}
