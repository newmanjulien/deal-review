import {
  Activity,
  Box,
  CircleOff,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  List,
} from "lucide-react";
import type { NavGroups } from "./nav-types";

export const PRIMARY_NAV_GROUPS: NavGroups = {
  main: [
    {
      href: "/since-last-meeting",
      label: "Since last meeting",
      icon: Activity,
    },
    { href: "/forecast", label: "Forecast", icon: LayoutGrid },
    {
      href: "/missing-data",
      label: "Missing data and timelines",
      icon: CircleOff,
    },
    {
      href: "/opportunities",
      label: "Opportunities and risks",
      icon: Lightbulb,
    },
  ],
  secondary: [
    { href: "/conversations", label: "All conversations", icon: List },
    // { href: "/optional-apps", label: "Optional apps", icon: Box },
  ],
  tertiary: [
    {
      href: "/contact-support",
      label: "Contact support",
      icon: CircleQuestionMark,
    },
  ],
};
