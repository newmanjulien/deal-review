import {
  isDashboardPathWithinRoute,
  normalizeDashboardPathname,
} from "@/app/(dashboard)/_routes/dashboard-pathname";
import type { AppPath } from "@/types/domain/app-path";
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

export function isNavItemActive(pathname: string, href: AppPath): boolean {
  const normalizedPathname = normalizeDashboardPathname(pathname);
  const normalizedHref = normalizeDashboardPathname(href);

  if (href === "/") {
    return normalizedPathname === "/";
  }

  return isDashboardPathWithinRoute(normalizedPathname, normalizedHref);
}

export function getActiveHref(pathname: string, groups: NavGroups): AppPath | null {
  const normalizedPathname = normalizeDashboardPathname(pathname);
  const normalizedGroups = normalizeNavGroups(groups);
  const items = [
    ...normalizedGroups.main,
    ...normalizedGroups.secondary,
    ...normalizedGroups.tertiary,
  ];

  return items.find((item) => isNavItemActive(normalizedPathname, item.href))?.href ?? null;
}
