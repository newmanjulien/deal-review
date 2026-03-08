import {
  Activity,
  CircleOff,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
} from "lucide-react";
import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";
import type { NavGroups, NavItem } from "@/app/(dashboard)/_nav/nav-types";
import { FORECAST_PAGE_CONFIG } from "../(primary)/forecast/forecast-config";
import { forecastSharedPeople } from "../(primary)/forecast/forecast-data";
import { MISSING_DATA_PAGE_CONFIG } from "../(primary)/missing-data/missing-data-config";
import { missingDataSharedPeople } from "../(primary)/missing-data/missing-data-data";
import { OPPORTUNITIES_PAGE_CONFIG } from "../(primary)/opportunities/opportunities-config";
import { opportunitiesSharedPeople } from "../(primary)/opportunities/opportunities-data";
import { SINCE_LAST_MEETING_PAGE_CONFIG } from "../(primary)/since-last-meeting/since-last-meeting-config";
import { sinceLastMeetingSharedPeople } from "../(primary)/since-last-meeting/since-last-meeting-data";
import { CONVERSATIONS_PAGE_CONFIG } from "../(secondary)/conversations/conversations-config";
import { OPTIONAL_APPS_PAGE_CONFIG } from "../(secondary)/optional-apps/optional-apps-config";
import { DASHBOARD_ROUTE_PATHS } from "./dashboard-routes-types";
import type {
  DashboardNavGroup,
  DashboardRouteChrome,
  DashboardRouteConfig,
} from "./dashboard-routes-types";

export { DASHBOARD_ROUTE_PATHS } from "./dashboard-routes-types";

function createRouteChrome({
  headerTitle,
  questions,
  sharedPeople,
}: {
  headerTitle: string;
  questions: boolean;
  sharedPeople?: HeaderPerson[];
}): DashboardRouteChrome {
  const header = {
    leadingControl: { kind: "meeting-date" as const },
    breadcrumbs: [{ label: headerTitle }],
  };

  if (sharedPeople) {
    return {
      header: { ...header, sharedPeople },
      capabilities: { questions },
    };
  }

  return {
    header,
    capabilities: { questions },
  };
}

export const DASHBOARD_ROUTES = [
  {
    id: "since-last-meeting",
    href: DASHBOARD_ROUTE_PATHS["since-last-meeting"],
    implemented: true,
    default: true,
    chrome: createRouteChrome({
      headerTitle: SINCE_LAST_MEETING_PAGE_CONFIG.headerTitle,
      questions: true,
      sharedPeople: sinceLastMeetingSharedPeople,
    }),
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
    chrome: createRouteChrome({
      headerTitle: FORECAST_PAGE_CONFIG.headerTitle,
      questions: true,
      sharedPeople: forecastSharedPeople,
    }),
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
    chrome: createRouteChrome({
      headerTitle: MISSING_DATA_PAGE_CONFIG.headerTitle,
      questions: true,
      sharedPeople: missingDataSharedPeople,
    }),
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
    chrome: createRouteChrome({
      headerTitle: OPPORTUNITIES_PAGE_CONFIG.headerTitle,
      questions: true,
      sharedPeople: opportunitiesSharedPeople,
    }),
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
    chrome: createRouteChrome({
      headerTitle: CONVERSATIONS_PAGE_CONFIG.headerTitle,
      questions: false,
    }),
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
    chrome: createRouteChrome({
      headerTitle: OPTIONAL_APPS_PAGE_CONFIG.headerTitle,
      questions: false,
    }),
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
] satisfies DashboardRouteConfig[];

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
