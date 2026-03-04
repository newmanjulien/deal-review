import {
  Activity,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const primaryNavItems: NavItem[] = [
  { href: "/", label: "Activity", icon: Activity },
  { href: "/forecast", label: "Forecast", icon: LayoutGrid },
  { href: "/questions", label: "Questions", icon: CircleQuestionMark },
  { href: "/ideas", label: "Ideas", icon: Lightbulb },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
