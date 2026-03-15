import type { DashboardChromeModel } from "@/app/(dashboard)/_routes/dashboard-routes-types";
import { MISSING_DATA_PAGE_CONFIG } from "./missing-data-config";
import { missingDataData } from "./missing-data-data";

type DashboardChromeMatch = Omit<DashboardChromeModel, "pathname" | "nav">;

const MISSING_DATA_ROUTE_HREF = "/missing-data" as const;

export function resolveMissingDataDetailChrome(
  pathname: string,
): DashboardChromeMatch | null {
  const match = pathname.match(/^\/missing-data\/detail\/([^/]+)$/);
  if (!match?.[1]) {
    return null;
  }

  let detailId = match[1];
  try {
    detailId = decodeURIComponent(detailId);
  } catch {
    return null;
  }

  const detail = missingDataData.queries.getDetailById(detailId);
  if (!detail) {
    return null;
  }

  return {
    routeId: "missing-data-detail",
    header: {
      variant: "contextual",
      leadingControl: {
        kind: "back-link",
        href: MISSING_DATA_ROUTE_HREF,
        label: MISSING_DATA_PAGE_CONFIG.headerTitle,
      },
      breadcrumbs: [{ label: detail.title }],
      sharedPeople: missingDataData.views.sharedPeople,
    },
    capabilities: {
      questions: true,
    },
  };
}
