import {
  isDashboardPathWithinRoute,
  normalizeDashboardPathname,
} from "@/app/(dashboard)/_routes/dashboard-pathname";
import type { AppPath } from "@/types/domain/app-path";
import type { NavGroups } from "./nav-types";

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
  const items = [
    ...groups.main,
    ...(groups.secondary ?? []),
    ...(groups.tertiary ?? []),
  ];

  return items.find((item) => isNavItemActive(normalizedPathname, item.href))?.href ?? null;
}
