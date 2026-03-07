import {
  Activity,
  CircleOff,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
  type LucideIcon,
} from "lucide-react";
import type { HeaderPerson } from "@/components/canvas/canvas-types";
import { MISSING_DATA_PAGE_CONFIG } from "./(primary)/missing-data/missing-data-config";
import { missingDataSharedPeople } from "./(primary)/missing-data/missing-data-data";
import { OPPORTUNITIES_PAGE_CONFIG } from "./(primary)/opportunities/opportunities-config";
import { opportunitiesSharedPeople } from "./(primary)/opportunities/opportunities-data";
import { LAST_MEETING_PAGE_CONFIG } from "./(primary)/since-last-meeting/last-meeting-config";
import { lastMeetingSharedPeople } from "./(primary)/since-last-meeting/last-meeting-data";

export type DashboardNavGroup = "main" | "secondary" | "tertiary";

export type DashboardRouteId =
  | "since-last-meeting"
  | "forecast"
  | "missing-data"
  | "opportunities"
  | "conversations"
  | "contact-support";

export type PrimaryPageHeaderData = {
  breadcrumbLabel: string;
  sharedPeople: HeaderPerson[];
};

export type DashboardRouteConfig = {
  id: DashboardRouteId;
  href: `/${string}`;
  implemented: boolean;
  default?: true;
  primaryHeader?: PrimaryPageHeaderData;
  nav?: {
    group: DashboardNavGroup;
    label: string;
    icon: LucideIcon;
  };
};

export const DASHBOARD_ROUTE_PATHS: Record<DashboardRouteId, `/${string}`> = {
  "since-last-meeting": "/since-last-meeting",
  forecast: "/forecast",
  "missing-data": "/missing-data",
  opportunities: "/opportunities",
  conversations: "/conversations",
  "contact-support": "/contact-support",
};

export const DASHBOARD_ROUTES: DashboardRouteConfig[] = [
  {
    id: "since-last-meeting",
    href: DASHBOARD_ROUTE_PATHS["since-last-meeting"],
    implemented: true,
    default: true,
    primaryHeader: {
      breadcrumbLabel: LAST_MEETING_PAGE_CONFIG.headerTitle,
      sharedPeople: lastMeetingSharedPeople,
    },
    nav: {
      group: "main",
      label: "Since last meeting",
      icon: Activity,
    },
  },
  {
    id: "forecast",
    href: DASHBOARD_ROUTE_PATHS.forecast,
    implemented: true,
    nav: {
      group: "main",
      label: "Forecast",
      icon: LayoutGrid,
    },
  },
  {
    id: "missing-data",
    href: DASHBOARD_ROUTE_PATHS["missing-data"],
    implemented: true,
    primaryHeader: {
      breadcrumbLabel: MISSING_DATA_PAGE_CONFIG.headerTitle,
      sharedPeople: missingDataSharedPeople,
    },
    nav: {
      group: "main",
      label: "Missing data and timelines",
      icon: CircleOff,
    },
  },
  {
    id: "opportunities",
    href: DASHBOARD_ROUTE_PATHS.opportunities,
    implemented: true,
    primaryHeader: {
      breadcrumbLabel: OPPORTUNITIES_PAGE_CONFIG.headerTitle,
      sharedPeople: opportunitiesSharedPeople,
    },
    nav: {
      group: "main",
      label: "Opportunities and risks",
      icon: Lightbulb,
    },
  },
  {
    id: "conversations",
    href: DASHBOARD_ROUTE_PATHS.conversations,
    implemented: true,
    nav: {
      group: "secondary",
      label: "All conversations",
      icon: List,
    },
  },
  {
    id: "contact-support",
    href: DASHBOARD_ROUTE_PATHS["contact-support"],
    implemented: false,
    nav: {
      group: "tertiary",
      label: "Contact support",
      icon: CircleQuestionMark,
    },
  },
];

const DEFAULT_ROUTE = DASHBOARD_ROUTES.find(
  (route) => route.implemented && route.default,
);

if (!DEFAULT_ROUTE) {
  throw new Error("Dashboard route registry is missing an implemented default route.");
}

const PRIMARY_HEADER_ROUTES = DASHBOARD_ROUTES.filter(
  (route): route is DashboardRouteConfig & { primaryHeader: PrimaryPageHeaderData } =>
    route.implemented && Boolean(route.primaryHeader),
);

function normalizePathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function isPathWithinRoute(pathname: string, routePath: string): boolean {
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

export function getPrimaryPageHeader(pathname: string): PrimaryPageHeaderData | null {
  const normalizedPathname = normalizePathname(pathname);

  let bestMatch: { routePath: string; data: PrimaryPageHeaderData } | null = null;
  for (const route of PRIMARY_HEADER_ROUTES) {
    if (!isPathWithinRoute(normalizedPathname, route.href)) {
      continue;
    }

    if (!bestMatch || route.href.length > bestMatch.routePath.length) {
      bestMatch = {
        routePath: route.href,
        data: route.primaryHeader,
      };
    }
  }

  return bestMatch?.data ?? null;
}

export const DEFAULT_DASHBOARD_ROUTE = DEFAULT_ROUTE.href;
