"use client";

import { QuadrantAxes } from "./quadrant-axes";
import { QuadrantPoints } from "./quadrant-points";
import { QuadrantTooltip } from "./quadrant-tooltip";
import type { QuadrantChartData } from "./quadrant-types";
import { useQuadrant } from "./use-quadrant";

export function Quadrant({ chart }: { chart: QuadrantChartData }) {
  const {
    hoveredPoint,
    pointerContext,
    handleSvgMouseLeave,
    handlePointHover,
    handlePointMove,
  } = useQuadrant();
  const { dimensions, plotArea, axisLabelOffset } = chart.layout;
  const leftOverflow = Math.max(0, axisLabelOffset.x - plotArea.left + 8);
  const bottomOverflow = Math.max(
    0,
    plotArea.bottom + axisLabelOffset.y - dimensions.height + 8,
  );

  return (
    <div className="relative w-full">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`${-leftOverflow} 0 ${dimensions.width + leftOverflow} ${
          dimensions.height + bottomOverflow
        }`}
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full text-muted-foreground"
        onMouseLeave={handleSvgMouseLeave}
      >
        <QuadrantAxes chart={chart} layout={chart.layout} />
        <QuadrantPoints
          points={chart.points}
          onHover={handlePointHover}
          onMove={handlePointMove}
        />
      </svg>

      <QuadrantTooltip
        hoveredPoint={hoveredPoint}
        pointerContext={pointerContext}
        disagreeThreshold={chart.disagreeThreshold}
      />
    </div>
  );
}
