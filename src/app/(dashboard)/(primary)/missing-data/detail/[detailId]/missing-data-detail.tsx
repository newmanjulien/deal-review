"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplayOrgChartNode } from "@/components/data-display/data-display-types";
import { missingDataData } from "../../missing-data-data";

type MissingDataDetailProps = {
  detailId: string;
};

const ORG_CHART_ROOT: DataDisplayOrgChartNode = {
  id: "ava-morgan",
  name: "Ava Morgan",
  role: "Chief Financial Officer",
  lastContacted: {
    by: "Julien Newman",
    on: "January 12, 2025",
  },
  directReports: [
    {
      id: "jon-kim",
      name: "Jon Kim",
      role: "VP, Finance Operations",
      lastContacted: {
        by: "Yash Patel",
        on: "February 4, 2025",
      },
      directReports: [
        {
          id: "nora-ali",
          name: "Nora Ali",
          role: "Director, Revenue Operations",
          lastContacted: {
            by: "Julien Newman",
            on: "February 18, 2025",
          },
        },
        {
          id: "marco-reed",
          name: "Marco Reed",
          role: "Manager, Forecasting Systems",
          lastContacted: {
            by: "Yash Patel",
            on: "January 29, 2025",
          },
        },
      ],
    },
    {
      id: "sophie-cho",
      name: "Sophie Cho",
      role: "Head of Procurement",
      lastContacted: {
        by: "Julien Newman",
        on: "March 1, 2025",
      },
      directReports: [
        {
          id: "emily-diaz",
          name: "Emily Diaz",
          role: "Senior Sourcing Lead",
          lastContacted: {
            by: "Julien Newman",
            on: "February 7, 2025",
          },
        },
      ],
    },
  ],
};

export function MissingDataDetail({ detailId }: MissingDataDetailProps) {
  const detail = missingDataData.queries.getDetailById(detailId);
  if (!detail) {
    return null;
  }

  return (
    <DataDisplay
      mode="detail"
      hero={{
        id: detail.id,
        icon: detail.icon,
        title: detail.title,
        description: detail.description,
      }}
      sections={[
        {
          id: "activity",
          label: "Activity",
          kind: "timeline",
          items: detail.detail.timelineItems,
        },
        {
          id: "org-chart",
          label: "Org chart",
          kind: "org-chart",
          root: ORG_CHART_ROOT,
        },
        {
          id: "update",
          label: "Update",
          kind: "upload",
          uploadLabel: "Upload files",
          uploadDescription:
            "Upload screenshots or any docs with the information we're missing",
        },
      ]}
    />
  );
}
