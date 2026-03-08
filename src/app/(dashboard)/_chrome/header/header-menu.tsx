"use client";

import type { ComponentProps } from "react";
import type { HeaderMenuProps } from "@/app/(dashboard)/_chrome/header/header-types";
import {
  ChromeMenu,
  ChromeMenuCheckboxItem,
  ChromeMenuItem,
  ChromeMenuList,
  ChromeMenuSectionLabel,
} from "@/components/chrome";

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
  ...props
}: ComponentProps<typeof ChromeMenuSectionLabel>) {
  return <ChromeMenuSectionLabel {...props} />;
}

export function HeaderMenuList({ ...props }: ComponentProps<typeof ChromeMenuList>) {
  return <ChromeMenuList {...props} />;
}

export function HeaderMenuItem({ ...props }: ComponentProps<typeof ChromeMenuItem>) {
  return <ChromeMenuItem {...props} />;
}

export function HeaderMenuCheckboxItem({
  ...props
}: ComponentProps<typeof ChromeMenuCheckboxItem>) {
  return <ChromeMenuCheckboxItem {...props} />;
}
