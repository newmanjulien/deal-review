import { Lightbulb, TriangleAlert } from "lucide-react";
import type {
  DataDisplayTile,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";
import { dashboardSellersData } from "../../_data/dashboard-sellers-data";

type OpportunitiesTile = DataDisplayTile<DataDisplayTableRow>;

const [julienSeller, yashSeller] = dashboardSellersData.views.people;

const opportunitiesTiles: OpportunitiesTile[] = [
  {
    id: "118",
    title: "CFO was a customer at his last job",
    icon: Lightbulb,
    dealLabel: "Honeywell",
    avatars: [yashSeller.avatar, julienSeller.avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;

const risksTiles: OpportunitiesTile[] = [
  {
    id: "118",
    title: "We've lost multiple RFPs at 3M",
    icon: TriangleAlert,
    dealLabel: "3M",
    avatars: [yashSeller.avatar, julienSeller.avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;

const allTiles = [...opportunitiesTiles, ...risksTiles] as const;
const tilesById = Object.fromEntries(allTiles.map((tile) => [tile.id, tile])) as Record<
  string,
  OpportunitiesTile
>;

export const opportunitiesData = {
  records: {
    tiles: {
      opportunities: opportunitiesTiles,
      risks: risksTiles,
      all: allTiles,
    },
  },
  views: {
    sharedPeople: dashboardSellersData.views.people,
    sections: {
      opportunitiesTiles,
      risksTiles,
    },
  },
  queries: {
    getTileById: (tileId: string) => tilesById[tileId] ?? null,
  },
} as const;
