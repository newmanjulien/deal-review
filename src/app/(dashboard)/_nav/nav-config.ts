import {
  DASHBOARD_ROUTES,
  type DashboardNavGroup,
} from "../dashboard-routes";
import type { NavGroups, NavItem } from "./nav-types";

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

export const PRIMARY_NAV_GROUPS: NavGroups = {
  main: navItemsByGroup.main,
  secondary: navItemsByGroup.secondary,
  tertiary: navItemsByGroup.tertiary,
};
