"use client";

import { useDashboardChromeUi } from "@/app/(dashboard)/_chrome/chrome-ui";

export function useDashboardSidebar() {
  const {
    state: { isSidebarExpanded },
    actions: { toggleSidebar, collapseSidebar },
  } = useDashboardChromeUi();

  return {
    isExpanded: isSidebarExpanded,
    toggleSidebar,
    collapseSidebar,
  };
}
