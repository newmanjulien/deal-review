import type { ReactElement, ReactNode } from "react";

export type HeaderPerson = {
  name: string;
  avatar: string;
};

export type HeaderMenuAlign = "start" | "center" | "end";

export type HeaderMenuProps = {
  trigger: ReactElement;
  children: ReactNode;
  id?: string;
  align?: HeaderMenuAlign;
  sideOffset?: number;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};
