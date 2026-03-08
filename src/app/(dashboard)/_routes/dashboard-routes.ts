import { getActiveHref } from "@/app/(dashboard)/_nav/nav-utils";
import {
  isDashboardPathWithinRoute,
  normalizeDashboardPathname,
} from "./dashboard-pathname";
import { resolveMissingDataCardChrome } from "../(primary)/missing-data/missing-data-chrome";
import {
  DASHBOARD_NAV_GROUPS,
  DASHBOARD_ROUTE_PATHS,
  DASHBOARD_ROUTES,
  DEFAULT_DASHBOARD_ROUTE,
} from "./dashboard-routes-config";
import type { DashboardChromeModel } from "./dashboard-routes-types";

export {
  DASHBOARD_NAV_GROUPS,
  DASHBOARD_ROUTE_PATHS,
  DASHBOARD_ROUTES,
  DEFAULT_DASHBOARD_ROUTE,
};

export type {
  DashboardChromeBreadcrumb,
  DashboardChromeCapabilities,
  DashboardChromeHeader,
  DashboardChromeLeadingControl,
  DashboardChromeModel,
  DashboardChromeRouteId,
  DashboardNavGroup,
  DashboardRouteChrome,
  DashboardRouteConfig,
  DashboardRouteId,
} from "./dashboard-routes-types";

function createChromeNav(pathname: string) {
  return {
    groups: DASHBOARD_NAV_GROUPS,
    activeHref: getActiveHref(pathname, DASHBOARD_NAV_GROUPS),
  };
}

export function resolveDashboardChrome(pathname: string): DashboardChromeModel | null {
  const normalizedPathname = normalizeDashboardPathname(pathname);
  const dynamicChrome = resolveMissingDataCardChrome(normalizedPathname);
  if (dynamicChrome) {
    return {
      ...dynamicChrome,
      pathname: normalizedPathname,
      nav: createChromeNav(normalizedPathname),
    };
  }

  let bestMatch: (typeof DASHBOARD_ROUTES)[number] | null = null;

  for (const route of DASHBOARD_ROUTES) {
    if (!route.implemented) {
      continue;
    }

    if (!isDashboardPathWithinRoute(normalizedPathname, route.href)) {
      continue;
    }

    if (!bestMatch || route.href.length > bestMatch.href.length) {
      bestMatch = route;
    }
  }

  if (!bestMatch || !bestMatch.implemented) {
    return null;
  }

  return {
    routeId: bestMatch.id,
    header: bestMatch.chrome.header,
    capabilities: bestMatch.chrome.capabilities,
    pathname: normalizedPathname,
    nav: createChromeNav(normalizedPathname),
  };
}
