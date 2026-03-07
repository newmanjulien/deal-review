import type { HeaderPerson } from "@/components/canvas/canvas-types";
import { MISSING_DATA_PAGE_CONFIG } from "../missing-data/missing-data-config";
import { missingDataSharedPeople } from "../missing-data/missing-data-data";
import { OPPORTUNITIES_PAGE_CONFIG } from "../opportunities/opportunities-config";
import { opportunitiesSharedPeople } from "../opportunities/opportunities-data";
import { LAST_MEETING_PAGE_CONFIG } from "../since-last-meeting/last-meeting-config";
import { lastMeetingSharedPeople } from "../since-last-meeting/last-meeting-data";

export const HEADER_MEETING_DATES = [
  "January 26",
  "January 12",
  "December 29",
  "December 15",
  "December 1",
];

type PrimaryPageHeaderData = {
  breadcrumbLabel: string;
  sharedPeople: HeaderPerson[];
};

const PRIMARY_PAGE_HEADER_BY_ROUTE: Record<string, PrimaryPageHeaderData> = {
  "/since-last-meeting": {
    breadcrumbLabel: LAST_MEETING_PAGE_CONFIG.headerTitle,
    sharedPeople: lastMeetingSharedPeople,
  },
  "/missing-data": {
    breadcrumbLabel: MISSING_DATA_PAGE_CONFIG.headerTitle,
    sharedPeople: missingDataSharedPeople,
  },
  "/opportunities": {
    breadcrumbLabel: OPPORTUNITIES_PAGE_CONFIG.headerTitle,
    sharedPeople: opportunitiesSharedPeople,
  },
};

function normalizePathname(pathname: string): string {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getPrimaryPageHeader(pathname: string): PrimaryPageHeaderData {
  const normalizedPathname = normalizePathname(pathname);
  const directMatch = PRIMARY_PAGE_HEADER_BY_ROUTE[normalizedPathname];
  if (directMatch) {
    return directMatch;
  }

  const nestedMatch = Object.entries(PRIMARY_PAGE_HEADER_BY_ROUTE).find(
    ([route]) => normalizedPathname.startsWith(`${route}/`),
  );
  if (nestedMatch) {
    return nestedMatch[1];
  }

  return PRIMARY_PAGE_HEADER_BY_ROUTE["/since-last-meeting"];
}
