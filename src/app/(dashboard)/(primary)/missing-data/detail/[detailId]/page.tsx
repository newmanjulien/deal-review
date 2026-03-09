import { notFound } from "next/navigation";
import { missingDataData } from "../../missing-data-data";
import { MissingDataDetail } from "./missing-data-detail";

type MissingDataDetailPageProps = {
  params: Promise<{ detailId: string }>;
};

export default async function MissingDataDetailPageRoute({
  params,
}: MissingDataDetailPageProps) {
  const { detailId } = await params;
  const detail = missingDataData.queries.getDetailById(detailId);

  if (!detail) {
    notFound();
  }

  return <MissingDataDetail detailId={detailId} />;
}
