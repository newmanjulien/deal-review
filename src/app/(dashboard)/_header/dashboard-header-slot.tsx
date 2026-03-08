"use client";

import { usePathname } from "next/navigation";
import { getDashboardHeader } from "@/app/(dashboard)/dashboard-routes";
import { DashboardHeader } from "./dashboard-header";

export function DashboardHeaderSlot() {
  const pathname = usePathname();
  const headerData = getDashboardHeader(pathname);

  if (!headerData) {
    return null;
  }

  return <DashboardHeader key={pathname} {...headerData} />;
}
