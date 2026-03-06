"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getActiveHref, type NavGroups } from "./nav-utils";

export function useNav(groups: NavGroups) {
  const pathname = usePathname();

  const activeHref = useMemo(
    () => getActiveHref(pathname, groups),
    [pathname, groups],
  );

  return {
    state: {
      activeHref,
      pathname,
    },
  };
}
