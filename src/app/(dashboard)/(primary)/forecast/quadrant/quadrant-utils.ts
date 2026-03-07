import type {
  QuadrantChartLayout,
  QuadrantPoint,
  QuadrantPointSeed,
} from "./quadrant-types";

type QuadrantLayoutOptions = {
  dimensions: { width: number; height: number };
  padding: { top: number; right: number; bottom: number; left: number };
  axisLabelOffset: { x: number; y: number };
  xMid: number;
  yMid: number;
  maxValue?: number;
  tickCount?: number;
};

type PointColorOptions = {
  xMid: number;
  yMid: number;
  disagreeThreshold: number;
};

type ProjectQuadrantPointsOptions = PointColorOptions & {
  maxValue?: number;
  labelRightEdgeThreshold?: number;
};

export function linearScale(
  domainMin: number,
  domainMax: number,
  rangeMin: number,
  rangeMax: number,
) {
  const span = domainMax - domainMin;
  const range = rangeMax - rangeMin;

  if (span === 0) {
    return () => rangeMin;
  }

  return (value: number) => rangeMin + ((value - domainMin) / span) * range;
}

export function ticksLinear(max: number, count: number) {
  if (count <= 0) return [0, max];
  const step = max / count;
  return Array.from({ length: count + 1 }, (_, index) =>
    Math.round(step * index),
  );
}

export function buildQuadrantLayout({
  dimensions,
  padding,
  axisLabelOffset,
  xMid,
  yMid,
  maxValue = 100,
  tickCount = 4,
}: QuadrantLayoutOptions): QuadrantChartLayout {
  const innerWidth = dimensions.width - padding.left - padding.right;
  const innerHeight = dimensions.height - padding.top - padding.bottom;

  const plotArea = {
    left: padding.left,
    right: padding.left + innerWidth,
    top: padding.top,
    bottom: padding.top + innerHeight,
  };

  const xScale = linearScale(0, maxValue, plotArea.left, plotArea.right);
  const yScale = linearScale(0, maxValue, plotArea.bottom, plotArea.top);
  const ticks = ticksLinear(maxValue, tickCount);

  return {
    dimensions,
    plotArea,
    axisLabelOffset,
    ticks: ticks.map((value) => ({
      value,
      x: xScale(value),
      y: yScale(value),
    })),
    midLines: {
      x: xScale(xMid),
      y: yScale(yMid),
    },
  };
}

export function getQuadrantPointColor(
  point: QuadrantPointSeed,
  { xMid, yMid, disagreeThreshold }: PointColorOptions,
) {
  const isRight = point.x >= xMid;
  const isTop = point.y >= yMid;
  const delta = point.y - point.x;
  const isDisagreement = Math.abs(delta) > disagreeThreshold;

  if (isDisagreement && ((isTop && isRight) || (!isTop && !isRight))) {
    return delta > 0
      ? "text-emerald-400 dark:text-emerald-300"
      : "text-red-400 dark:text-red-300";
  }

  if (isTop && isRight) return "text-foreground";
  if (isTop && !isRight) return "text-emerald-600 dark:text-emerald-500";
  if (!isTop && isRight) return "text-red-600 dark:text-red-500";
  return "text-muted-foreground";
}

export function projectQuadrantPoints(
  points: QuadrantPointSeed[],
  layout: QuadrantChartLayout,
  {
    xMid,
    yMid,
    disagreeThreshold,
    maxValue = 100,
    labelRightEdgeThreshold = 78,
  }: ProjectQuadrantPointsOptions,
): QuadrantPoint[] {
  const xScale = linearScale(
    0,
    maxValue,
    layout.plotArea.left,
    layout.plotArea.right,
  );
  const yScale = linearScale(
    0,
    maxValue,
    layout.plotArea.bottom,
    layout.plotArea.top,
  );

  return points.map((point) => {
    const isNearRightEdge = point.x > labelRightEdgeThreshold;

    return {
      ...point,
      xPx: xScale(point.x),
      yPx: yScale(point.y),
      labelOffset: isNearRightEdge ? -8 : 8,
      labelAnchor: isNearRightEdge ? "end" : "start",
      colorClassName: getQuadrantPointColor(point, {
        xMid,
        yMid,
        disagreeThreshold,
      }),
    };
  });
}
