import {
  QUADRANT_BEHAVIOR_CONFIG,
  QUADRANT_EXAMPLE_CHART_CONFIG,
  QUADRANT_LAYOUT_CONFIG,
} from "./quadrant-config";
import { quadrantExamplePointSeeds } from "./quadrant-data";
import type { QuadrantChartData, QuadrantPointSeed } from "./quadrant-types";
import { buildQuadrantLayout, projectQuadrantPoints } from "./quadrant-utils";

type QuadrantChartMeta = Pick<
  QuadrantChartData,
  "id" | "title" | "subtitle" | "xLabel" | "yLabel"
>;

type CreateQuadrantChartDataOptions = {
  chart: QuadrantChartMeta;
  points: QuadrantPointSeed[];
};

export function createQuadrantChartData({
  chart,
  points,
}: CreateQuadrantChartDataOptions): QuadrantChartData {
  const { xMid, yMid } = QUADRANT_LAYOUT_CONFIG;
  const { disagreeThreshold, labelRightEdgeThreshold } =
    QUADRANT_BEHAVIOR_CONFIG;

  const layout = buildQuadrantLayout({
    dimensions: QUADRANT_LAYOUT_CONFIG.dimensions,
    padding: QUADRANT_LAYOUT_CONFIG.padding,
    axisLabelOffset: QUADRANT_LAYOUT_CONFIG.axisLabelOffset,
    xMid,
    yMid,
  });

  const projectedPoints = projectQuadrantPoints(points, layout, {
    xMid,
    yMid,
    disagreeThreshold,
    labelRightEdgeThreshold,
  });

  return {
    ...chart,
    xMid,
    yMid,
    disagreeThreshold,
    layout,
    points: projectedPoints,
  };
}

export const quadrantExampleChart = createQuadrantChartData({
  chart: QUADRANT_EXAMPLE_CHART_CONFIG,
  points: quadrantExamplePointSeeds,
});
