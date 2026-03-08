import { notFound } from "next/navigation";
import { DataDisplayCardDetailPage } from "@/components/data-display/card-detail-page";
import {
  getMissingDataCardById,
  missingDataTableColumns,
  missingDataTableRows,
  missingDataTimelineItems,
} from "../../missing-data-data";

type MissingDataCardDetailPageProps = {
  params: Promise<{ cardId: string }>;
};

export default async function MissingDataCardDetailPageRoute({
  params,
}: MissingDataCardDetailPageProps) {
  const { cardId } = await params;
  const card = getMissingDataCardById(cardId);

  if (!card) {
    notFound();
  }

  return (
    <DataDisplayCardDetailPage
      card={card}
      timelineItems={missingDataTimelineItems}
      tableRows={missingDataTableRows}
      tableColumns={missingDataTableColumns}
      fallbackDescription={missingDataTimelineItems[0]?.body}
    />
  );
}
