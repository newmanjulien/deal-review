import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavGroups = {
  main: NavItem[];
  secondary?: NavItem[];
  tertiary?: NavItem[];
};

export type NormalizedNavGroups = {
  main: NavItem[];
  secondary: NavItem[];
  tertiary: NavItem[];
  hasSecondary: boolean;
  showMainSecondaryDivider: boolean;
};
