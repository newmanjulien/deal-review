"use client";

import type { ComponentProps, ReactElement, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ChromeMenuAlign = "start" | "center" | "end";

export type ChromeMenuProps = {
  trigger: ReactElement;
  children: ReactNode;
  contentId?: string;
  align?: ChromeMenuAlign;
  sideOffset?: number;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

export function ChromeMenu({
  trigger,
  children,
  contentId,
  align = "end",
  sideOffset = 4,
  className,
  open,
  defaultOpen,
  onOpenChange,
  modal,
}: ChromeMenuProps) {
  return (
    <DropdownMenu
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        id={contentId}
        align={align}
        sideOffset={sideOffset}
        className={cn("w-64 p-1", className)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChromeMenuSectionLabel({
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

export function ChromeMenuList({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("mt-1 space-y-1", className)} {...props} />;
}

export function ChromeMenuItem({
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

export function ChromeMenuCheckboxItem({
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
