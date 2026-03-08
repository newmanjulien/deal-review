"use client";

import type { ComponentProps, ReactElement, ReactNode } from "react";
import { ChromeMenu } from "@/components/chrome";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type HeaderMenuProps = {
  trigger: ReactElement;
  children: ReactNode;
  id?: string;
  align?: ComponentProps<typeof ChromeMenu>["align"];
  sideOffset?: number;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

export function HeaderMenu({
  trigger,
  children,
  id,
  align = "end",
  sideOffset = 4,
  className,
  open,
  defaultOpen,
  onOpenChange,
  modal,
}: HeaderMenuProps) {
  return (
    <ChromeMenu
      trigger={trigger}
      contentId={id}
      align={align}
      sideOffset={sideOffset}
      className={className}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </ChromeMenu>
  );
}

export function HeaderMenuSectionLabel({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuLabel>) {
  return (
    <DropdownMenuLabel
      className={cn(
        "px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-zinc-500",
        className,
      )}
      {...props}
    />
  );
}

export function HeaderMenuList({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("mt-1 space-y-1", className)} {...props} />;
}

export function HeaderMenuItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-zinc-700 transition-colors hover:bg-zinc-100",
        className,
      )}
      {...props}
    />
  );
}

export function HeaderMenuCheckboxItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return (
    <DropdownMenuCheckboxItem
      className={cn("gap-2 rounded-md py-1 pr-2 text-xs", className)}
      {...props}
    />
  );
}
