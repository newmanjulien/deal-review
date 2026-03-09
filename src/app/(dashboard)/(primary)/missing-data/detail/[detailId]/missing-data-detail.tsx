"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import { missingDataData } from "../../missing-data-data";

type MissingDataDetailProps = {
  detailId: string;
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
          id: "gathered",
          label: "Data gathered",
          kind: "timeline",
          items: detail.detail.timelineItems,
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
