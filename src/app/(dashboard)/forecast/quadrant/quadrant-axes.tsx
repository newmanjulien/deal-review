import type { QuadrantChartData, QuadrantChartLayout } from "./quadrant-types";

type QuadrantAxesProps = {
  chart: QuadrantChartData;
  layout: QuadrantChartLayout;
};

export function QuadrantAxes({ chart, layout }: QuadrantAxesProps) {
  const { plotArea, axisLabelOffset } = layout;
  const chartCenterX = plotArea.left + (plotArea.right - plotArea.left) / 2;
  const chartCenterY = plotArea.top + (plotArea.bottom - plotArea.top) / 2;

  return (
    <>
      {layout.ticks.map((tick) => {
        return (
          <g key={tick.value}>
            <line
              x1={plotArea.left}
              x2={plotArea.right}
              y1={tick.y}
              y2={tick.y}
              stroke="#f4f4f5"
            />
            <line
              x1={tick.x}
              x2={tick.x}
              y1={plotArea.top}
              y2={plotArea.bottom}
              stroke="#f4f4f5"
            />
            <text
              x={plotArea.left - 12}
              y={tick.y + 4}
              textAnchor="end"
              fontSize="12"
              fill="currentColor"
            >
              {tick.value}%
            </text>
            <text
              x={tick.x}
              y={plotArea.bottom + 22}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
            >
              {tick.value}%
            </text>
          </g>
        );
      })}

      <line
        x1={layout.midLines.x}
        x2={layout.midLines.x}
        y1={plotArea.top}
        y2={plotArea.bottom}
        stroke="#d4d4d8"
        strokeWidth={1.5}
      />
      <line
        x1={plotArea.left}
        x2={plotArea.right}
        y1={layout.midLines.y}
        y2={layout.midLines.y}
        stroke="#d4d4d8"
        strokeWidth={1.5}
      />

      <text
        x={plotArea.left - axisLabelOffset.x}
        y={chartCenterY}
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        transform={`rotate(-90 ${plotArea.left - axisLabelOffset.x} ${chartCenterY})`}
      >
        {chart.yLabel}
      </text>
      <text
        x={chartCenterX}
        y={plotArea.bottom + axisLabelOffset.y}
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
      >
        {chart.xLabel}
      </text>
    </>
  );
}
