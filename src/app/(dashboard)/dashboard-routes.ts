import {
  Activity,
  CircleOff,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
  type LucideIcon,
} from "lucide-react";
import type { HeaderPerson } from "@/app/(dashboard)/_header/header-types";
import { FORECAST_PAGE_CONFIG } from "./(primary)/forecast/forecast-config";
import { forecastSharedPeople } from "./(primary)/forecast/forecast-data";
import { MISSING_DATA_PAGE_CONFIG } from "./(primary)/missing-data/missing-data-config";
import {
  getMissingDataCardById,
  missingDataSharedPeople,
} from "./(primary)/missing-data/missing-data-data";
import { OPPORTUNITIES_PAGE_CONFIG } from "./(primary)/opportunities/opportunities-config";
import { opportunitiesSharedPeople } from "./(primary)/opportunities/opportunities-data";
import { LAST_MEETING_PAGE_CONFIG } from "./(primary)/since-last-meeting/last-meeting-config";
import { lastMeetingSharedPeople } from "./(primary)/since-last-meeting/last-meeting-data";
import { CONVERSATIONS_PAGE_CONFIG } from "./(secondary)/conversations/conversations-config";
import { OPTIONAL_APPS_PAGE_CONFIG } from "./(secondary)/optional-apps/optional-apps-config";

export type DashboardNavGroup = "main" | "secondary" | "tertiary";

export type DashboardRouteId =
  | "since-last-meeting"
  | "forecast"
  | "missing-data"
  | "opportunities"
  | "conversations"
  | "optional-apps"
  | "contact-support";

export type DashboardHeaderLeadingControl =
  | { kind: "meeting-date" }
  | {
      kind: "back-link";
      href: `/${string}`;
      label: string;
    };

export type DashboardHeaderBreadcrumb = {
  label: string;
  href?: `/${string}`;
};

export type DashboardHeaderData = {
  leading: DashboardHeaderLeadingControl;
  breadcrumbs: DashboardHeaderBreadcrumb[];
  sharedPeople?: HeaderPerson[];
};

export type DashboardRouteConfig = {
  id: DashboardRouteId;
  href: `/${string}`;
  implemented: boolean;
  default?: true;
  header?: DashboardHeaderData;
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
  "optional-apps": "/optional-apps",
  "contact-support": "/contact-support",
};

export const DASHBOARD_ROUTES: DashboardRouteConfig[] = [
  {
    id: "since-last-meeting",
    href: DASHBOARD_ROUTE_PATHS["since-last-meeting"],
    implemented: true,
    default: true,
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: LAST_MEETING_PAGE_CONFIG.headerTitle }],
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
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: FORECAST_PAGE_CONFIG.headerTitle }],
      sharedPeople: forecastSharedPeople,
    },
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
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: MISSING_DATA_PAGE_CONFIG.headerTitle }],
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
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: OPPORTUNITIES_PAGE_CONFIG.headerTitle }],
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
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: CONVERSATIONS_PAGE_CONFIG.headerTitle }],
    },
    nav: {
      group: "secondary",
      label: "All conversations",
      icon: List,
    },
  },
  {
    id: "optional-apps",
    href: DASHBOARD_ROUTE_PATHS["optional-apps"],
    implemented: true,
    header: {
      leading: { kind: "meeting-date" },
      breadcrumbs: [{ label: OPTIONAL_APPS_PAGE_CONFIG.headerTitle }],
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

const HEADER_ROUTES = DASHBOARD_ROUTES.filter(
  (route): route is DashboardRouteConfig & { header: DashboardHeaderData } =>
    route.implemented && Boolean(route.header),
);

type DashboardHeaderResolver = (pathname: string) => DashboardHeaderData | null;

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

function resolveMissingDataCardHeader(pathname: string): DashboardHeaderData | null {
  const match = pathname.match(/^\/missing-data\/cards\/([^/]+)$/);
  if (!match?.[1]) {
    return null;
  }

  let cardId = match[1];
  try {
    cardId = decodeURIComponent(cardId);
  } catch {
    return null;
  }

  const card = getMissingDataCardById(cardId);
  if (!card) {
    return null;
  }

  return {
    leading: {
      kind: "back-link",
      href: DASHBOARD_ROUTE_PATHS["missing-data"],
      label: MISSING_DATA_PAGE_CONFIG.headerTitle,
    },
    breadcrumbs: [{ label: card.title }],
    sharedPeople: missingDataSharedPeople,
  };
}

const DASHBOARD_HEADER_DYNAMIC_RESOLVERS: DashboardHeaderResolver[] = [
  resolveMissingDataCardHeader,
];

export function getDashboardHeader(pathname: string): DashboardHeaderData | null {
  const normalizedPathname = normalizePathname(pathname);

  for (const resolveHeader of DASHBOARD_HEADER_DYNAMIC_RESOLVERS) {
    const dynamicHeader = resolveHeader(normalizedPathname);
    if (dynamicHeader) {
      return dynamicHeader;
    }
  }

  let bestMatch: { routePath: string; data: DashboardHeaderData } | null = null;
  for (const route of HEADER_ROUTES) {
    if (!isPathWithinRoute(normalizedPathname, route.href)) {
      continue;
    }

    if (!bestMatch || route.href.length > bestMatch.routePath.length) {
      bestMatch = {
        routePath: route.href,
        data: route.header,
      };
    }
  }

  return bestMatch?.data ?? null;
}

export const DEFAULT_DASHBOARD_ROUTE = DEFAULT_ROUTE.href;
