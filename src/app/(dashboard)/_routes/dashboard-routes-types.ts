import type { LucideIcon } from "lucide-react";
import type { HeaderPerson } from "@/types/domain/people";
import type { NavGroups } from "@/app/(dashboard)/_nav/nav-types";
import type { AppPath } from "@/types/domain/app-path";

export const DASHBOARD_ROUTE_PATHS = {
  "since-last-meeting": "/since-last-meeting",
  forecast: "/forecast",
  "missing-data": "/missing-data",
  opportunities: "/opportunities",
  conversations: "/conversations",
  "optional-apps": "/optional-apps",
  "contact-support": "/contact-support",
} as const satisfies Record<string, AppPath>;

export type DashboardNavGroup = "main" | "secondary" | "tertiary";
export type DashboardRouteId = keyof typeof DASHBOARD_ROUTE_PATHS;
export type DashboardChromeRouteId = DashboardRouteId | "missing-data-detail";

export type DashboardChromeLeadingControl =
  | { kind: "meeting-date" }
  | {
      kind: "back-link";
      href: AppPath;
      label: string;
    };

export type DashboardChromeBreadcrumb = {
  label: string;
  href?: AppPath;
};

type DashboardChromeHeaderBase = {
  showOverflowMenu?: boolean;
};

export type DashboardChromeContextualHeader = DashboardChromeHeaderBase & {
  variant: "contextual";
  leadingControl: DashboardChromeLeadingControl;
  breadcrumbs: DashboardChromeBreadcrumb[];
  sharedPeople?: HeaderPerson[];
};

export type DashboardChromeTitleHeader = DashboardChromeHeaderBase & {
  variant: "title";
  title: string;
};

export type DashboardChromeHeader =
  | DashboardChromeContextualHeader
  | DashboardChromeTitleHeader;

export type DashboardChromeCapabilities = {
  questions: boolean;
};

export type DashboardRouteChrome = {
  header: DashboardChromeHeader;
  capabilities: DashboardChromeCapabilities;
};

export type DashboardRouteNav = {
  group: DashboardNavGroup;
  label: string;
  icon: LucideIcon;
};

type DashboardRouteConfigBase = {
  id: DashboardRouteId;
  href: AppPath;
  nav?: DashboardRouteNav;
};

export type DashboardImplementedRouteConfig = DashboardRouteConfigBase & {
  implemented: true;
  default?: true;
  chrome: DashboardRouteChrome;
};

export type DashboardPlannedRouteConfig = DashboardRouteConfigBase & {
  implemented: false;
  default?: never;
  chrome?: never;
};

export type DashboardRouteConfig =
  | DashboardImplementedRouteConfig
  | DashboardPlannedRouteConfig;

export type DashboardChromeModel = {
  routeId: DashboardChromeRouteId;
  pathname: string;
  header: DashboardChromeHeader;
  nav: {
    groups: NavGroups;
    activeHref: AppPath | null;
  };
  capabilities: DashboardChromeCapabilities;
};
