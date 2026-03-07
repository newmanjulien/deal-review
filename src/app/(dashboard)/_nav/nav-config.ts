import { Activity, CircleOff, LayoutGrid, Lightbulb, List } from "lucide-react";
import { DASHBOARD_ROUTE_PATHS } from "../dashboard-routes";
import type { NavGroups } from "./nav-types";

export const PRIMARY_NAV_GROUPS: NavGroups = {
  main: [
    {
      href: DASHBOARD_ROUTE_PATHS["since-last-meeting"],
      label: "Since last meeting",
      icon: Activity,
    },
    {
      href: DASHBOARD_ROUTE_PATHS.forecast,
      label: "Forecast",
      icon: LayoutGrid,
    },
    {
      href: DASHBOARD_ROUTE_PATHS["missing-data"],
      label: "Missing data and timelines",
      icon: CircleOff,
    },
    {
      href: DASHBOARD_ROUTE_PATHS.opportunities,
      label: "Opportunities and risks",
      icon: Lightbulb,
    },
  ],
  secondary: [
    {
      href: DASHBOARD_ROUTE_PATHS.conversations,
      label: "All conversations",
      icon: List,
    },
  ],
};
