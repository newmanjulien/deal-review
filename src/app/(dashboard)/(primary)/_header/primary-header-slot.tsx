"use client";

import { usePathname } from "next/navigation";
import { getPrimaryPageHeader } from "../../dashboard-routes";
import { PrimaryHeader } from "./primary-header";

export function PrimaryHeaderSlot() {
  const pathname = usePathname();
  const headerData = getPrimaryPageHeader(pathname);

  if (!headerData) {
    return null;
  }

  return (
    <PrimaryHeader
      key={pathname}
      leading={headerData.leading}
      breadcrumbLabel={headerData.breadcrumbLabel}
      sharedPeople={headerData.sharedPeople}
    />
  );
}
