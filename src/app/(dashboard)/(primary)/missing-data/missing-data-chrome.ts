import type { DashboardChromeModel } from "@/app/(dashboard)/_routes/dashboard-routes-types";
import { MISSING_DATA_PAGE_CONFIG } from "./missing-data-config";
import {
  getMissingDataCardById,
  missingDataSharedPeople,
} from "./missing-data-data";

type DashboardChromeMatch = Omit<DashboardChromeModel, "pathname" | "nav">;

const MISSING_DATA_ROUTE_HREF = "/missing-data" as const;

export function resolveMissingDataCardChrome(
  pathname: string,
): DashboardChromeMatch | null {
  const match = pathname.match(/^\/missing-data\/cards\/([^/]+)$/);
  if (!match?.[1]) {
    return null;
  }

  let cardId = match[1];
  try {
    cardId = decodeURIComponent(cardId);
  } catch {
    return null;
  }

  const card = getMissingDataCardById(cardId);
  if (!card) {
    return null;
  }

  return {
    routeId: "missing-data-card",
    header: {
      leadingControl: {
        kind: "back-link",
        href: MISSING_DATA_ROUTE_HREF,
        label: MISSING_DATA_PAGE_CONFIG.headerTitle,
      },
      breadcrumbs: [{ label: card.title }],
      sharedPeople: missingDataSharedPeople,
    },
    capabilities: {
      questions: true,
    },
  };
}
