import type { NavGroups, NavItem } from "@/app/(dashboard)/_nav/nav-types";
import type { DashboardNavGroup } from "../dashboard-routes-types";
import { DASHBOARD_ROUTES } from "../routes/dashboard-routes-registry";

const DEFAULT_ROUTE = DASHBOARD_ROUTES.find(
  (route) => route.implemented && route.default,
);

if (!DEFAULT_ROUTE) {
  throw new Error("Dashboard route registry is missing an implemented default route.");
}

const navItemsByGroup: Record<DashboardNavGroup, NavItem[]> = {
  main: [],
  secondary: [],
  tertiary: [],
};

for (const route of DASHBOARD_ROUTES) {
  if (!route.implemented || !route.nav) {
    continue;
  }

  navItemsByGroup[route.nav.group].push({
    href: route.href,
    label: route.nav.label,
    icon: route.nav.icon,
  });
}

export const DASHBOARD_NAV_GROUPS: NavGroups = {
  main: navItemsByGroup.main,
  secondary: navItemsByGroup.secondary,
  tertiary: navItemsByGroup.tertiary,
};

export const DEFAULT_DASHBOARD_ROUTE = DEFAULT_ROUTE.href;
