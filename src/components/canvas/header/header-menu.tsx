"use client";

import type { ComponentProps } from "react";
import { type HeaderMenuProps } from "@/components/canvas/canvas-types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
    <DropdownMenu
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        id={id}
        align={align}
        sideOffset={sideOffset}
        className={cn("w-64 p-1", className)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
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
  onSelect,
  ...props
}: ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-zinc-700 transition-colors hover:bg-zinc-100",
        className,
      )}
      onSelect={(event) => {
        onSelect?.(event);
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export function HeaderMenuCheckboxItem({
  className,
  onSelect,
  ...props
}: ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return (
    <DropdownMenuCheckboxItem
      className={cn("gap-2 rounded-md py-1 pr-2 text-xs", className)}
      onSelect={(event) => {
        onSelect?.(event);
        event.preventDefault();
      }}
      {...props}
    />
  );
}
