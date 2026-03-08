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

type DashboardChromeMatch = Omit<DashboardChromeModel, "pathname" | "nav">;

type DashboardChromeDynamicResolver = (pathname: string) => DashboardChromeMatch | null;

const DASHBOARD_CHROME_DYNAMIC_RESOLVERS: DashboardChromeDynamicResolver[] = [
  resolveMissingDataCardChrome,
];

type DashboardChromeRoute = Extract<
  (typeof DASHBOARD_ROUTES)[number],
  { implemented: true }
>;

function createDashboardChromeModel(
  pathname: string,
  match: DashboardChromeMatch,
): DashboardChromeModel {
  return {
    ...match,
    pathname,
    nav: {
      groups: DASHBOARD_NAV_GROUPS,
      activeHref: getActiveHref(pathname, DASHBOARD_NAV_GROUPS),
    },
  };
}

export function resolveDashboardChrome(pathname: string): DashboardChromeModel | null {
  const normalizedPathname = normalizeDashboardPathname(pathname);

  for (const resolveDynamicChrome of DASHBOARD_CHROME_DYNAMIC_RESOLVERS) {
    const dynamicChrome = resolveDynamicChrome(normalizedPathname);
    if (dynamicChrome) {
      return createDashboardChromeModel(normalizedPathname, dynamicChrome);
    }
  }

  let bestMatch: DashboardChromeRoute | null = null;

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

  if (!bestMatch) {
    return null;
  }

  return createDashboardChromeModel(normalizedPathname, {
    routeId: bestMatch.id,
    header: bestMatch.chrome.header,
    capabilities: bestMatch.chrome.capabilities,
  });
}
