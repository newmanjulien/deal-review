import {
  Activity,
  Box,
  CircleOff,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
  type LucideIcon,
} from "lucide-react";

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

export const primaryNavGroups: NavGroups = {
  main: [
    {
      href: "/since-last-meeting",
      label: "Since last meeting",
      icon: Activity,
    },
    { href: "/forecast", label: "Forecast", icon: LayoutGrid },
    {
      href: "/questions",
      label: "Missing data and timelines",
      icon: CircleOff,
    },
    { href: "/ideas", label: "Opportunities and risks", icon: Lightbulb },
  ],
  secondary: [
    { href: "/conversations", label: "All conversations", icon: List },
    { href: "/optional-apps", label: "Optional apps", icon: Box },
  ],
  tertiary: [
    {
      href: "/contact-support",
      label: "Contact support",
      icon: CircleQuestionMark,
    },
  ],
};

export function normalizeNavGroups(groups: NavGroups): NormalizedNavGroups {
  const main = groups.main;
  const secondary = groups.secondary ?? [];
  const tertiary = groups.tertiary ?? [];

  return {
    main,
    secondary,
    tertiary,
    hasSecondary: secondary.length > 0,
    showMainSecondaryDivider: main.length > 0 && secondary.length > 0,
  };
}

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveHref(pathname: string, groups: NavGroups): string | null {
  const normalizedGroups = normalizeNavGroups(groups);
  const items = [
    ...normalizedGroups.main,
    ...normalizedGroups.secondary,
    ...normalizedGroups.tertiary,
  ];
  return (
    items.find((item) => isNavItemActive(pathname, item.href))?.href ?? null
  );
}
