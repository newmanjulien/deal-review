"use client";

import {
  QuadrantAxes,
  QuadrantPoints,
  QuadrantTooltip,
  type QuadrantChartData,
  useQuadrant,
} from ".";

export function Quadrant({ chart }: { chart: QuadrantChartData }) {
  const {
    refs: { svgRef },
    state: { displayedHoveredPoint, displayedHoverPosition, displayedHoverBounds },
    actions: {
      handleSvgMouseEnter,
      handleSvgMouseMove,
      handleSvgMouseLeave,
      handlePointHover,
      handlePointMove,
    },
  } = useQuadrant({ chart });

  return (
    <div className="relative w-full rounded-sm border border-zinc-100 bg-white p-3 sm:p-4">
      <svg
        ref={svgRef}
        width={chart.layout.dimensions.width}
        height={chart.layout.dimensions.height}
        viewBox={`0 0 ${chart.layout.dimensions.width} ${chart.layout.dimensions.height}`}
        className="h-auto w-full text-zinc-400"
        onMouseEnter={handleSvgMouseEnter}
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
