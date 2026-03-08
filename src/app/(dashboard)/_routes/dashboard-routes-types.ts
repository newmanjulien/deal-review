import type { LucideIcon } from "lucide-react";
import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";
import type { NavGroups } from "@/app/(dashboard)/_nav/nav-types";

export type DashboardNavGroup = "main" | "secondary" | "tertiary";

export type DashboardRouteId =
  | "since-last-meeting"
  | "forecast"
  | "missing-data"
  | "opportunities"
  | "conversations"
  | "optional-apps"
  | "contact-support";

export type DashboardChromeRouteId = DashboardRouteId | "missing-data-card";

export type DashboardChromeLeadingControl =
  | { kind: "meeting-date" }
  | {
      kind: "back-link";
      href: `/${string}`;
      label: string;
    };

export type DashboardChromeBreadcrumb = {
  label: string;
  href?: `/${string}`;
};

export type DashboardChromeHeader = {
  leadingControl: DashboardChromeLeadingControl;
  breadcrumbs: DashboardChromeBreadcrumb[];
  sharedPeople?: HeaderPerson[];
};

export type DashboardChromeCapabilities = {
  questions: boolean;
};

export type DashboardRouteChrome = {
  header: DashboardChromeHeader;
  capabilities: DashboardChromeCapabilities;
};

export type DashboardRouteConfig = {
  id: DashboardRouteId;
  href: `/${string}`;
  implemented: boolean;
  default?: true;
  chrome?: DashboardRouteChrome;
  nav?: {
    group: DashboardNavGroup;
    label: string;
    icon: LucideIcon;
  };
};

export type DashboardChromeModel = {
  routeId: DashboardChromeRouteId;
  pathname: string;
  header: DashboardChromeHeader;
  nav: {
    groups: NavGroups;
    activeHref: string | null;
  };
  capabilities: DashboardChromeCapabilities;
};
