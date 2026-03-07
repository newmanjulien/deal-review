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
              className="stroke-border opacity-50"
            />
            <line
              x1={tick.x}
              x2={tick.x}
              y1={plotArea.top}
              y2={plotArea.bottom}
              className="stroke-border opacity-50"
            />
            <text
              x={plotArea.left - 12}
              y={tick.y + 4}
              textAnchor="end"
              className="fill-current text-xs"
            >
              {tick.value}%
            </text>
            <text
              x={tick.x}
              y={plotArea.bottom + 22}
              textAnchor="middle"
              className="fill-current text-xs"
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
        className="stroke-border [stroke-width:1.5]"
      />
      <line
        x1={plotArea.left}
        x2={plotArea.right}
        y1={layout.midLines.y}
        y2={layout.midLines.y}
        className="stroke-border [stroke-width:1.5]"
      />

      <text
        x={plotArea.left - axisLabelOffset.x}
        y={chartCenterY}
        textAnchor="middle"
        className="fill-current text-xs"
        transform={`rotate(-90 ${plotArea.left - axisLabelOffset.x} ${chartCenterY})`}
      >
        {chart.yLabel}
      </text>
      <text
        x={chartCenterX}
        y={plotArea.bottom + axisLabelOffset.y}
        textAnchor="middle"
        className="fill-current text-xs"
      >
        {chart.xLabel}
      </text>
    </>
  );
}
