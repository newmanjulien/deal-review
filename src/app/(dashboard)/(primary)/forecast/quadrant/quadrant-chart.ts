import {
  buildQuadrantLayout,
  projectQuadrantPoints,
  QUADRANT_BEHAVIOR_CONFIG,
  QUADRANT_EXAMPLE_CHART_CONFIG,
  QUADRANT_LAYOUT_CONFIG,
  quadrantExamplePointSeeds,
  type QuadrantChartData,
  type QuadrantPointSeed,
} from ".";

type CreateQuadrantChartDataOptions = {
  chart: {
    id: string;
    title: string;
    subtitle: string;
    xLabel: string;
    yLabel: string;
  };
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
    id: chart.id,
    title: chart.title,
    subtitle: chart.subtitle,
    xLabel: chart.xLabel,
    yLabel: chart.yLabel,
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
