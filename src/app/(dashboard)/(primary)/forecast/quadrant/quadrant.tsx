"use client";

import { QuadrantAxes } from "./quadrant-axes";
import { QuadrantPoints } from "./quadrant-points";
import { QuadrantTooltip } from "./quadrant-tooltip";
import type { QuadrantChartData } from "./quadrant-types";
import { useQuadrant } from "./use-quadrant";

export function Quadrant({ chart }: { chart: QuadrantChartData }) {
  const {
    displayedHoveredPoint,
    displayedHoverPosition,
    displayedHoverBounds,
    handleSvgMouseMove,
    handleSvgMouseLeave,
    handlePointHover,
    handlePointMove,
  } = useQuadrant({ chart });

  return (
    <div className="relative w-full">
      <svg
        width={chart.layout.dimensions.width}
        height={chart.layout.dimensions.height}
        viewBox={`0 0 ${chart.layout.dimensions.width} ${chart.layout.dimensions.height}`}
        className="h-auto w-full text-muted-foreground"
        onMouseMove={handleSvgMouseMove}
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
        hoveredPoint={displayedHoveredPoint}
        hoverPosition={displayedHoverPosition}
        hoverBounds={displayedHoverBounds}
        disagreeThreshold={chart.disagreeThreshold}
      />
    </div>
  );
}
