import { CircleOff, Clock3 } from "lucide-react";
import type {
  DataDisplayTile,
  DataDisplayTileWithDetail,
} from "@/components/data-display/data-display-types";
import { dashboardSellersData } from "../../_data/dashboard-sellers-data";

type MissingDataTableRow = {
  id: string;
  signal: string;
  status: string;
};

type MissingDataTile = DataDisplayTile<MissingDataTableRow>;

const [julienSeller, yashSeller] = dashboardSellersData.views.people;

const missingDataTiles: MissingDataTile[] = [
  {
    id: "118",
    title: "Not sure who is the economic buyer at Honeywell",
    icon: CircleOff,
    dealLabel: "Honeywell",
    avatars: [yashSeller.avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
  {
    id: "120",
    title: "Deadline for 3M's RFP is unknown",
    description:
      "Procurement has not confirmed a due date. We might want to find this out",
    icon: CircleOff,
    dealLabel: "3M",
    avatars: [julienSeller.avatar, yashSeller.avatar],
    priority: "medium",
    priorityLabel: "Medium priority",
    href: "/missing-data/detail/120",
    detail: {
      timelineItems: [
        {
          id: "120-stage-change",
          title: "RFP owner changed and timeline slipped",
          occurredOnIso: "2026-01-04",
          body: "The original owner left the project and the new owner has not confirmed a revised date. Last two calls closed without next-step commitments.",
        },
        {
          id: "120-procurement-update",
          title: "Procurement requested updated checklist",
          occurredOnIso: "2026-01-08",
          body: "Procurement asked for a revised requirements checklist and security mapping before sharing an updated RFP deadline.",
        },
      ],
      tableRows: [
        {
          id: "120-owner",
          signal: "Economic buyer is not confirmed",
          status: "Missing",
        },
        {
          id: "120-date",
          signal: "RFP close date",
          status: "Unknown",
        },
        {
          id: "120-procurement",
          signal: "Procurement checkpoint",
          status: "Pending",
        },
      ],
    },
  },
] as const;

const timelineTiles: MissingDataTile[] = [
  {
    id: "119",
    title: "Director of Finance hasn't answered for 2 weeks",
    icon: Clock3,
    dealLabel: "Timeline review",
    avatars: [julienSeller.avatar, yashSeller.avatar],
    priority: "medium",
    priorityLabel: "Medium priority",
  },
] as const;

const allTiles = [...missingDataTiles, ...timelineTiles] as const;
const tilesById = Object.fromEntries(
  allTiles.map((tile) => [tile.id, tile]),
) as Record<string, MissingDataTile>;

function hasDetail(
  tile: MissingDataTile,
): tile is DataDisplayTileWithDetail<MissingDataTableRow> {
  return Boolean(tile.detail && tile.description?.trim().length);
}

function getDetailById(
  detailId: string,
): DataDisplayTileWithDetail<MissingDataTableRow> | null {
  const tile = tilesById[detailId];
  if (!tile || !hasDetail(tile)) {
    return null;
  }

  return tile;
}

export const missingDataData = {
  records: {
    tiles: {
      missingData: missingDataTiles,
      timelines: timelineTiles,
      all: allTiles,
    },
  },
  views: {
    sharedPeople: dashboardSellersData.views.people,
    sections: {
      missingDataTiles,
      timelineTiles,
    },
  },
  queries: {
    getTileById: (tileId: string) => tilesById[tileId] ?? null,
    hasDetail,
    getDetailById,
  },
} as const;
