import type { NavGroups, NormalizedNavGroups } from "./nav-types";

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
