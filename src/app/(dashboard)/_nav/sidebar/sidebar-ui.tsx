"use client";

import type { ReactNode } from "react";
import {
  DashboardChromeProvider,
  useDashboardChromeUi,
} from "@/app/(dashboard)/_chrome/chrome-ui";

export function DashboardSidebarProvider({ children }: { children: ReactNode }) {
  return <DashboardChromeProvider>{children}</DashboardChromeProvider>;
}

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
