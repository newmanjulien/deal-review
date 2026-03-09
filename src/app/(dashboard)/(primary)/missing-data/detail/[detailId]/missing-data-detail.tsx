"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplayTableRow } from "@/components/data-display/data-display-types";
import { missingDataData } from "../../missing-data-data";

type MissingDataDetailTableRow = DataDisplayTableRow<{
  signal: string;
  status: string;
}>;

type MissingDataDetailProps = {
  detailId: string;
};

export function MissingDataDetail({ detailId }: MissingDataDetailProps) {
  const detail = missingDataData.queries.getDetailById(detailId);
  if (!detail) {
    return null;
  }

  return (
    <DataDisplay<MissingDataDetailTableRow>
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
          kind: "table",
          rows: detail.detail.tableRows,
          columns: missingDataData.views.detailTableColumns,
        },
      ]}
    />
  );
}
