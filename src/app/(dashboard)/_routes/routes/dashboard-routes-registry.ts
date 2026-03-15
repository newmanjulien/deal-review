import {
  Activity,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
} from "lucide-react";
import { FORECAST_PAGE_CONFIG } from "../../(primary)/forecast/forecast-config";
import { forecastData } from "../../(primary)/forecast/forecast-data";
import { OPPORTUNITIES_PAGE_CONFIG } from "../../(primary)/opportunities/opportunities-config";
import { opportunitiesData } from "../../(primary)/opportunities/opportunities-data";
import { SINCE_LAST_MEETING_PAGE_CONFIG } from "../../(primary)/since-last-meeting/since-last-meeting-config";
import { sinceLastMeetingData } from "../../(primary)/since-last-meeting/since-last-meeting-data";
import { CONVERSATIONS_PAGE_CONFIG } from "../../(secondary)/conversations/conversations-config";
import { OPTIONAL_APPS_PAGE_CONFIG } from "../../(secondary)/optional-apps/optional-apps-config";
import { DASHBOARD_ROUTE_PATHS } from "../dashboard-routes-types";
import type { DashboardRouteConfig } from "../dashboard-routes-types";

export const DASHBOARD_ROUTES = [
  {
    id: "since-last-meeting",
    href: DASHBOARD_ROUTE_PATHS["since-last-meeting"],
    implemented: true,
    default: true,
    chrome: {
      header: {
        variant: "contextual",
        leadingControl: { kind: "meeting-date" },
        breadcrumbs: [{ label: SINCE_LAST_MEETING_PAGE_CONFIG.headerTitle }],
        sharedPeople: sinceLastMeetingData.views.sharedPeople,
      },
      capabilities: { questions: true },
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
    chrome: {
      header: {
        variant: "contextual",
        leadingControl: { kind: "meeting-date" },
        breadcrumbs: [{ label: FORECAST_PAGE_CONFIG.headerTitle }],
        sharedPeople: forecastData.views.sharedPeople,
      },
      capabilities: { questions: true },
    },
    nav: {
      group: "main",
      label: "Forecast",
      icon: LayoutGrid,
    },
  },
  // {
  //   id: "missing-data",
  //   href: DASHBOARD_ROUTE_PATHS["missing-data"],
  //   implemented: true,
  //   chrome: {
  //     header: {
  //       variant: "contextual",
  //       leadingControl: { kind: "meeting-date" },
  //       breadcrumbs: [{ label: MISSING_DATA_PAGE_CONFIG.headerTitle }],
  //       sharedPeople: missingDataData.views.sharedPeople,
  //     },
  //     capabilities: { questions: true },
  //   },
  //   nav: {
  //     group: "main",
  //     label: "Missing data and timelines",
  //     icon: CircleOff,
  //   },
  // },
  {
    id: "opportunities",
    href: DASHBOARD_ROUTE_PATHS.opportunities,
    implemented: true,
    chrome: {
      header: {
        variant: "contextual",
        leadingControl: { kind: "meeting-date" },
        breadcrumbs: [{ label: OPPORTUNITIES_PAGE_CONFIG.headerTitle }],
        sharedPeople: opportunitiesData.views.sharedPeople,
      },
      capabilities: { questions: true },
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
    chrome: {
      header: {
        variant: "title",
        title: CONVERSATIONS_PAGE_CONFIG.headerTitle,
      },
      capabilities: { questions: false },
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
    chrome: {
      header: {
        variant: "title",
        title: OPTIONAL_APPS_PAGE_CONFIG.headerTitle,
      },
      capabilities: { questions: false },
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
] satisfies DashboardRouteConfig[];
