import type { LucideIcon } from "lucide-react";
import type { AppPath } from "@/types/domain/app-path";

export type NavItem = {
  href: AppPath;
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
