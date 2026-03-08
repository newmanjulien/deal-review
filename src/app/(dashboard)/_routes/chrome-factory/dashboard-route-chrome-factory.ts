import type { HeaderPerson } from "@/types/domain/people";
import type { DashboardRouteChrome } from "../dashboard-routes-types";

export function createRouteChrome({
  headerTitle,
  questions,
  sharedPeople,
}: {
  headerTitle: string;
  questions: boolean;
  sharedPeople?: HeaderPerson[];
}): DashboardRouteChrome {
  const header = {
    leadingControl: { kind: "meeting-date" as const },
    breadcrumbs: [{ label: headerTitle }],
  };

  return {
    header: {
      ...header,
      ...(sharedPeople ? { sharedPeople } : {}),
    },
    capabilities: { questions },
  };
}
