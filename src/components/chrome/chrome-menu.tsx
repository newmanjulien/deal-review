"use client";

import type { ReactElement, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
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
