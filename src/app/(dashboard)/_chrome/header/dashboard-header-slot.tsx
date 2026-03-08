"use client";

import { useDashboardChromeModel } from "@/app/(dashboard)/_chrome/chrome-ui";
import { DashboardHeader } from "./dashboard-header";

export function DashboardHeaderSlot() {
  const chrome = useDashboardChromeModel();

  if (!chrome) {
    return null;
  }

  return <DashboardHeader key={chrome.pathname} chrome={chrome} />;
}
