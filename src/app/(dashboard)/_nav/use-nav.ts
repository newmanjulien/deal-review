"use client";

import { usePathname } from "next/navigation";
import { getActiveHref } from "./nav-utils";
import type { NavGroups } from "./nav-types";

export function useNav(groups: NavGroups) {
  const pathname = usePathname();

  return {
    pathname,
    activeHref: getActiveHref(pathname, groups),
  };
}
