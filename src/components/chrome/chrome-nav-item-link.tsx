"use client";

import type { ComponentProps, ComponentType } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppPath } from "@/types/domain/app-path";

export type ChromeNavItem = {
  href: AppPath;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type ChromeNavItemLinkProps = {
  item: ChromeNavItem;
  buttonSize: ComponentProps<typeof Button>["size"];
  buttonClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  onClick?: () => void;
};

export function ChromeNavItemLink({
  item,
  buttonSize,
  buttonClassName,
  iconClassName,
  labelClassName,
  showLabel = true,
  onClick,
}: ChromeNavItemLinkProps) {
  return (
    <Button asChild variant="ghost" size={buttonSize} className={buttonClassName}>
      <Link href={item.href} onClick={onClick}>
        <item.icon className={cn("size-3.5 shrink-0", iconClassName)} />
        {showLabel ? (
          <span className={cn("truncate text-left", labelClassName)}>{item.label}</span>
        ) : (
          <span className="sr-only">{item.label}</span>
        )}
      </Link>
    </Button>
  );
}
